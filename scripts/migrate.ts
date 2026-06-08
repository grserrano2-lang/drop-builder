// =========================================================================
// Aplica db/schema.sql contra Neon. Idempotente.
//   DATABASE_URL=... npm run db:migrate
// =========================================================================
import { readFile } from "node:fs/promises";
import { Pool } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ Falta DATABASE_URL. Define la connection string de Neon en .env.local.");
  process.exit(1);
}

const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
const pool = new Pool({ connectionString: url });
try {
  // El protocolo simple de Postgres ejecuta varias sentencias separadas por ';'.
  await pool.query(schema);
  console.log("✓ Esquema aplicado correctamente.");
} catch (err) {
  console.error("✗ Error aplicando el esquema:", err);
  process.exit(1);
} finally {
  await pool.end();
}
