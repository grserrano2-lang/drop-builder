import { NextResponse } from "next/server";
import { MOCK, sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// =========================================================================
// POST /api/ingest — puente Base44 -> Drop Builder.
// Base44 dispara aquí cada evento (p.ej. pedido.pagado). Autenticación por
// cabecera `x-ingest-token` contra INGEST_TOKEN. Guarda el evento crudo en
// ingest_log y, si es un pedido, lo upserta en `pedidos`.
// =========================================================================
interface IngestBody {
  tipo: string; // 'pedido.pagado' | 'pedido.reembolsado' | 'venta.atribuida' | ...
  data: Record<string, unknown>;
}

export async function POST(req: Request) {
  const token = req.headers.get("x-ingest-token");
  const expected = process.env.INGEST_TOKEN;
  if (!expected || token !== expected) {
    return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  }

  let body: IngestBody;
  try {
    body = (await req.json()) as IngestBody;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  if (!body?.tipo) {
    return NextResponse.json({ error: "falta 'tipo'" }, { status: 400 });
  }

  if (MOCK) {
    // En modo mock no persistimos; confirmamos recepción para poder probar el puente.
    return NextResponse.json({ ok: true, mode: "mock", recibido: body.tipo });
  }

  // Auditoría: siempre guardamos el evento crudo.
  await sql`INSERT INTO ingest_log (fuente, tipo_evento, payload)
            VALUES ('base44', ${body.tipo}, ${JSON.stringify(body.data)}::jsonb)`;

  // Upsert de pedido cuando el evento lo es.
  if (body.tipo.startsWith("pedido.")) {
    const d = body.data as {
      id: string; tienda_id: string; importe: number; coste_total?: number; estado?: string;
    };
    if (d?.id && d?.tienda_id) {
      await sql`
        INSERT INTO pedidos (id, tienda_id, importe, coste_total, estado)
        VALUES (${d.id}, ${d.tienda_id}, ${d.importe ?? 0}, ${d.coste_total ?? 0}, ${d.estado ?? "pagado"})
        ON CONFLICT (id) DO UPDATE SET importe = EXCLUDED.importe,
          coste_total = EXCLUDED.coste_total, estado = EXCLUDED.estado`;
    }
  }

  return NextResponse.json({ ok: true, mode: "neon", procesado: body.tipo });
}
