// =========================================================================
// Drop Builder — capa de acceso a datos
// Si DATABASE_URL está definida -> Neon (Postgres serverless).
// Si NO -> MODO MOCK: datos de ejemplo en memoria (ver lib/mock.ts).
// El import de @neondatabase/serverless es dinámico para que el modo mock
// funcione sin tener la dependencia instalada.
// =========================================================================

export const MOCK = !process.env.DATABASE_URL;

type Row = Record<string, unknown>;

let _sql: ((strings: TemplateStringsArray, ...values: unknown[]) => Promise<Row[]>) | null = null;

async function getSql() {
  if (_sql) return _sql;
  const { neon } = await import("@neondatabase/serverless");
  _sql = neon(process.env.DATABASE_URL!) as unknown as typeof _sql;
  return _sql!;
}

/**
 * Ejecuta una consulta SQL parametrizada (tagged template) contra Neon.
 * No usar en modo mock: las funciones de lib/queries.ts deciden la rama.
 */
export async function sql<T = Row>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T[]> {
  if (MOCK) {
    throw new Error(
      "sql() llamado en MODO MOCK. Usa las funciones de lib/queries.ts, que " +
        "devuelven datos de ejemplo cuando no hay DATABASE_URL."
    );
  }
  const run = await getSql();
  return (await run(strings, ...values)) as T[];
}

/** Estado de la conexión, para /api/health. */
export async function dbStatus(): Promise<{ mode: "neon" | "mock"; ok: boolean }> {
  if (MOCK) return { mode: "mock", ok: true };
  try {
    await sql`SELECT 1`;
    return { mode: "neon", ok: true };
  } catch {
    return { mode: "neon", ok: false };
  }
}
