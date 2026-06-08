import { NextResponse } from "next/server";
import { MOCK, sql } from "@/lib/db";
import { getConsolidado } from "@/lib/queries";

export const dynamic = "force-dynamic";

// =========================================================================
// GET /api/cron/check-alerts — cron cada 2h (vercel.json).
// Revisa stock bajo/agotado y picos de chargebacks; genera alertas.
// En modo mock devuelve las alertas detectadas sin persistir.
// =========================================================================
const UMBRAL_STOCK = 10;
const UMBRAL_CHARGEBACK = 0.01;

function autorizado(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!autorizado(req)) {
    return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  }

  const detectadas: { tienda_id: string | null; tipo: string; severidad: string; mensaje: string }[] = [];
  const { tiendas } = await getConsolidado();
  for (const t of tiendas) {
    if (t.ratioChargebacks > UMBRAL_CHARGEBACK) {
      detectadas.push({
        tienda_id: t.tienda.id,
        tipo: "pico_chargebacks",
        severidad: "critica",
        mensaje: `Ratio de chargebacks ${(t.ratioChargebacks * 100).toFixed(1)}% en ${t.tienda.nombre}.`,
      });
    }
  }

  if (MOCK) {
    return NextResponse.json({ ok: true, mode: "mock", detectadas, nota: `Umbral stock ${UMBRAL_STOCK}, chargeback ${UMBRAL_CHARGEBACK}` });
  }

  // Stock bajo/agotado desde la DB.
  const bajos = await sql<{ id: string; tienda_id: string; nombre: string; stock: number }>`
    SELECT id, tienda_id, nombre, stock FROM productos WHERE stock <= ${UMBRAL_STOCK}`;
  for (const p of bajos) {
    detectadas.push({
      tienda_id: p.tienda_id,
      tipo: p.stock === 0 ? "stock_agotado" : "stock_bajo",
      severidad: p.stock === 0 ? "critica" : "aviso",
      mensaje: `${p.nombre} con stock ${p.stock} (umbral ${UMBRAL_STOCK}).`,
    });
  }

  for (const a of detectadas) {
    await sql`INSERT INTO alertas (tienda_id, tipo, severidad, mensaje)
              VALUES (${a.tienda_id}, ${a.tipo}, ${a.severidad}, ${a.mensaje})`;
  }
  return NextResponse.json({ ok: true, mode: "neon", generadas: detectadas.length, detectadas });
}
