import { getPedidosExport, getComisionesExport } from "@/lib/queries";
import { toCsv } from "@/lib/export";

export const dynamic = "force-dynamic";

// =========================================================================
// GET /api/export?tipo=pedidos|comisiones — export contable para el asesor (#90).
// Devuelve CSV. Si CRON_SECRET está definido, exige Authorization: Bearer <secret>.
// =========================================================================
function autorizado(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // local/mock sin secret
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!autorizado(req)) {
    return new Response("no autorizado", { status: 401 });
  }
  const tipo = new URL(req.url).searchParams.get("tipo") ?? "pedidos";
  let rows: Record<string, string | number>[];
  if (tipo === "comisiones") rows = await getComisionesExport();
  else if (tipo === "pedidos") rows = await getPedidosExport();
  else return new Response("tipo inválido (pedidos|comisiones)", { status: 400 });

  const csv = toCsv(rows);
  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${tipo}.csv"`,
    },
  });
}
