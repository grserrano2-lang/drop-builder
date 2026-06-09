import { NextResponse } from "next/server";
import { getConsolidado } from "@/lib/queries";
import { decisionGate, semanasActiva } from "@/lib/metrics";

export const dynamic = "force-dynamic";

// =========================================================================
// GET /api/cron/evaluate-gates — cron diario (vercel.json, 06:00).
// Evalúa el gate matar/escalar de cada tienda con los datos de métricas.
// Protegido por CRON_SECRET (Vercel envía Authorization: Bearer <secret>).
// =========================================================================
function autorizado(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // en local/mock sin secret, permitir
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!autorizado(req)) {
    return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  }
  const { tiendas } = await getConsolidado();
  const evaluaciones = tiendas.map((t) => {
    const semanas = semanasActiva(t.tienda.creada_en, new Date().toISOString());
    const d = decisionGate({
      margenContribucionAcumulado: t.margen,
      semanasActiva: semanas,
      ratioChargebacks: t.ratioChargebacks,
      conversionGlobalPct: t.pedidos > 0 ? 1 : 0,
    });
    return { tienda: t.tienda.nombre, id: t.tienda.id, margen: t.margen, ...d };
  });
  return NextResponse.json({ ok: true, evaluadas: evaluaciones.length, evaluaciones });
}
