import { NextResponse } from "next/server";
import { getConsolidado, getAlertas, getTareas, getProveedoresSalud } from "@/lib/queries";
import { decisionGate, semanasActiva } from "@/lib/metrics";
import { contarPorEstado } from "@/lib/tasks";
import { construirResumenDiario } from "@/lib/summary";

export const dynamic = "force-dynamic";

// =========================================================================
// GET /api/cron/daily-summary — cron diario (vercel.json, 07:00).
// Junta KPIs, decisiones de gate, alertas críticas y tareas, y construye el
// resumen para Telegram. Si ALERT_WEBHOOK_URL está definida, lo envía.
// Protegido por CRON_SECRET.
// =========================================================================
function autorizado(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // local/mock sin secret
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!autorizado(req)) {
    return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  }

  const [{ tiendas, holding }, alertas, tareas, proveedores] = await Promise.all([
    getConsolidado(),
    getAlertas(),
    getTareas(),
    getProveedoresSalud(),
  ]);
  const proveedoresCriticos = proveedores
    .filter((p) => p.salud.estado === "critico" || p.salud.estado === "riesgo")
    .map((p) => `${p.proveedor.nombre} (${p.salud.estado})`);

  const tiendasResumen = tiendas.map((t) => {
    const g = decisionGate({
      margenContribucionAcumulado: t.margen,
      semanasActiva: semanasActiva(t.tienda.creada_en, new Date().toISOString()),
      ratioChargebacks: t.ratioChargebacks,
      conversionGlobalPct: t.pedidos > 0 ? 1 : 0,
    });
    return { nombre: t.tienda.nombre, margen: t.margen, decision: g.decision };
  });

  const abiertas = alertas.filter((a) => !a.resuelta);
  const resumen = construirResumenDiario({
    fecha: new Date().toISOString().slice(0, 10),
    holding,
    tiendas: tiendasResumen,
    alertasCriticas: abiertas.filter((a) => a.severidad === "critica").map((a) => a.mensaje),
    alertasAbiertas: abiertas.length,
    tareas: contarPorEstado(tareas),
    proveedoresCriticos,
  });

  // Envío opcional al webhook (Telegram/Slack) si está configurado.
  let enviado = false;
  const webhook = process.env.ALERT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: resumen.texto }),
      });
      enviado = true;
    } catch {
      enviado = false;
    }
  }

  return NextResponse.json({ ok: true, enviado, resumen: resumen.texto });
}
