import { NextResponse } from "next/server";
import { MOCK, sql } from "@/lib/db";
import { getConsolidado, getProductosTodos } from "@/lib/queries";
import { margenContribucion } from "@/lib/metrics";

export const dynamic = "force-dynamic";

// =========================================================================
// GET /api/cron/check-alerts — cron cada 2h (vercel.json).
// Revisa stock bajo/agotado y picos de chargebacks; genera alertas.
// En modo mock devuelve las alertas detectadas sin persistir.
// =========================================================================
const UMBRAL_STOCK = 10;
const UMBRAL_CHARGEBACK = 0.01;
const UMBRAL_MARGEN = 25; // regla de oro: margen de contribución >= 25 €

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

  // Margen por SKU: alerta si un producto no llega al umbral de 25 € (#6).
  const productos = await getProductosTodos();
  for (const p of productos) {
    const m = margenContribucion({
      precioVenta: p.precio, coste: p.coste, envio: 5,
      pctComisionCreador: 0.15, pctPasarela: 0.025,
    });
    if (m < UMBRAL_MARGEN) {
      detectadas.push({
        tienda_id: p.tienda_id,
        tipo: "margen_bajo",
        severidad: "aviso",
        mensaje: `${p.nombre}: margen ${m.toFixed(2)} € < ${UMBRAL_MARGEN} € (revisa precio/coste/envío).`,
      });
    }
  }

  if (MOCK) {
    return NextResponse.json({ ok: true, mode: "mock", detectadas, nota: `Umbrales: stock ${UMBRAL_STOCK}, chargeback ${UMBRAL_CHARGEBACK}, margen ${UMBRAL_MARGEN}€` });
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
