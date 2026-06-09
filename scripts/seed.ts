// =========================================================================
// Siembra Neon con los mismos datos de ejemplo del MODO MOCK (lib/mock.ts),
// para validar el dashboard contra una DB real. Idempotente (ON CONFLICT).
//   DATABASE_URL=... npm run db:seed
// =========================================================================
import { Pool } from "@neondatabase/serverless";
import {
  tiendas, productos, creadores, pedidos, ventas_atribuidas, embudoCounts, alertas,
  tareas, proveedores, envios,
} from "../lib/mock.ts";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ Falta DATABASE_URL.");
  process.exit(1);
}
const pool = new Pool({ connectionString: url });

try {
  for (const t of tiendas) {
    await pool.query(
      `INSERT INTO tiendas (id,nombre,nicho,estado,base44_id) VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (id) DO NOTHING`,
      [t.id, t.nombre, t.nicho, t.estado, t.base44_id]
    );
  }
  for (const p of productos) {
    await pool.query(
      `INSERT INTO productos (id,tienda_id,nombre,precio,coste,stock) VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (id) DO NOTHING`,
      [p.id, p.tienda_id, p.nombre, p.precio, p.coste, p.stock]
    );
  }
  for (const c of creadores) {
    await pool.query(
      `INSERT INTO creadores (id,nombre,handle,codigo,pct_comision,estado) VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (id) DO NOTHING`,
      [c.id, c.nombre, c.handle, c.codigo, c.pct_comision, c.estado]
    );
  }
  for (const o of pedidos) {
    await pool.query(
      `INSERT INTO pedidos (id,tienda_id,importe,coste_total,fecha,estado) VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (id) DO NOTHING`,
      [o.id, o.tienda_id, o.importe, o.coste_total, o.fecha, o.estado]
    );
  }
  for (const v of ventas_atribuidas) {
    await pool.query(
      `INSERT INTO ventas_atribuidas (id,pedido_id,creador_id,importe,comision) VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (id) DO NOTHING`,
      [v.id, v.pedido_id, v.creador_id, v.importe, v.comision]
    );
  }
  // Embudo: expandimos los conteos a filas con generate_series.
  for (const [tiendaId, c] of Object.entries(embudoCounts)) {
    for (const [tipo, n] of Object.entries(c)) {
      const t = { vistas: "vista", clics: "clic", atc: "atc", ventas: "venta" }[tipo]!;
      await pool.query(
        `INSERT INTO eventos_embudo (tienda_id,tipo) SELECT $1,$2 FROM generate_series(1,$3)`,
        [tiendaId, t, n]
      );
    }
  }
  for (const a of alertas) {
    await pool.query(
      `INSERT INTO alertas (tienda_id,tipo,severidad,mensaje,resuelta) VALUES ($1,$2,$3,$4,$5)`,
      [a.tienda_id, a.tipo, a.severidad, a.mensaje, a.resuelta]
    );
  }
  for (const t of tareas) {
    await pool.query(
      `INSERT INTO tareas (id,tienda_id,titulo,descripcion,estado,prioridad,origen) VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (id) DO NOTHING`,
      [t.id, t.tienda_id, t.titulo, t.descripcion, t.estado, t.prioridad, t.origen]
    );
  }
  for (const p of proveedores) {
    await pool.query(
      `INSERT INTO proveedores (id,nombre,pais,plazo_prometido_dias) VALUES ($1,$2,$3,$4)
       ON CONFLICT (id) DO NOTHING`,
      [p.id, p.nombre, p.pais, p.plazo_prometido_dias]
    );
  }
  for (const e of envios) {
    await pool.query(
      `INSERT INTO envios (proveedor_id,dias_reales,incidencia) VALUES ($1,$2,$3)`,
      [e.proveedor_id, e.dias_reales, e.incidencia]
    );
  }
  console.log("✓ Datos de ejemplo sembrados en Neon.");
} catch (err) {
  console.error("✗ Error al sembrar:", err);
  process.exit(1);
} finally {
  await pool.end();
}
