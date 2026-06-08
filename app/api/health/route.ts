import { NextResponse } from "next/server";
import { dbStatus } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/health — estado de la plataforma y de la conexión a datos.
export async function GET() {
  const db = await dbStatus();
  return NextResponse.json({
    service: "drop-builder-metrics",
    ok: db.ok,
    db,
    ts: new Date().toISOString(),
  });
}
