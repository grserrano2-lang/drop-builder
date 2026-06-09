// =========================================================================
// Drop Builder — funciones de consulta de alto nivel usadas por el dashboard.
// Cada función decide entre MODO MOCK (lib/mock.ts) y Neon (lib/db.ts).
// =========================================================================
import { MOCK, sql } from "@/lib/db";
import * as mock from "@/lib/mock";
import { round2, tasasEmbudo, roiCreador } from "@/lib/metrics";
import { saludProveedor, type SaludProveedor } from "@/lib/supplier";
import type { Tienda, Producto, Alerta, Tarea, Proveedor, Envio } from "@/lib/types";

export interface ResumenTienda {
  tienda: Tienda;
  pedidos: number;
  ingresos: number;
  margen: number;
  chargebacks: number;
  ratioChargebacks: number;
}

const PAGADOS = new Set(["pagado"]);

export async function getConsolidado(): Promise<{
  tiendas: ResumenTienda[];
  holding: { ingresos: number; margen: number; pedidos: number };
}> {
  if (MOCK) {
    const tiendas = mock.tiendas.map((t) => {
      const ped = mock.pedidos.filter((o) => o.tienda_id === t.id);
      const pagados = ped.filter((o) => PAGADOS.has(o.estado));
      const ingresos = round2(pagados.reduce((s, o) => s + o.importe, 0));
      const margen = round2(pagados.reduce((s, o) => s + (o.importe - o.coste_total), 0));
      const chargebacks = ped.filter((o) => o.estado === "chargeback").length;
      return {
        tienda: t,
        pedidos: pagados.length,
        ingresos,
        margen,
        chargebacks,
        ratioChargebacks: ped.length ? round2(chargebacks / ped.length) : 0,
      };
    });
    const holding = {
      ingresos: round2(tiendas.reduce((s, t) => s + t.ingresos, 0)),
      margen: round2(tiendas.reduce((s, t) => s + t.margen, 0)),
      pedidos: tiendas.reduce((s, t) => s + t.pedidos, 0),
    };
    return { tiendas, holding };
  }

  const rows = await sql<{
    id: string; nombre: string; nicho: string | null; estado: Tienda["estado"];
    base44_id: string | null; creada_en: string;
    pedidos: number; ingresos: number; margen: number; chargebacks: number; total: number;
  }>`
    SELECT t.id, t.nombre, t.nicho, t.estado, t.base44_id, t.creada_en,
      COUNT(*) FILTER (WHERE p.estado = 'pagado')                       AS pedidos,
      COALESCE(SUM(p.importe) FILTER (WHERE p.estado = 'pagado'), 0)    AS ingresos,
      COALESCE(SUM(p.importe - p.coste_total) FILTER (WHERE p.estado = 'pagado'), 0) AS margen,
      COUNT(*) FILTER (WHERE p.estado = 'chargeback')                   AS chargebacks,
      COUNT(p.id)                                                       AS total
    FROM tiendas t LEFT JOIN pedidos p ON p.tienda_id = t.id
    GROUP BY t.id ORDER BY ingresos DESC`;
  const tiendas = rows.map((r) => ({
    tienda: { id: r.id, nombre: r.nombre, nicho: r.nicho, estado: r.estado, base44_id: r.base44_id, creada_en: r.creada_en },
    pedidos: Number(r.pedidos),
    ingresos: round2(Number(r.ingresos)),
    margen: round2(Number(r.margen)),
    chargebacks: Number(r.chargebacks),
    ratioChargebacks: Number(r.total) ? round2(Number(r.chargebacks) / Number(r.total)) : 0,
  }));
  const holding = {
    ingresos: round2(tiendas.reduce((s, t) => s + t.ingresos, 0)),
    margen: round2(tiendas.reduce((s, t) => s + t.margen, 0)),
    pedidos: tiendas.reduce((s, t) => s + t.pedidos, 0),
  };
  return { tiendas, holding };
}

export async function getTienda(id: string): Promise<Tienda | null> {
  if (MOCK) return mock.tiendas.find((t) => t.id === id) ?? null;
  const r = await sql<Tienda>`SELECT * FROM tiendas WHERE id = ${id}`;
  return r[0] ?? null;
}

export async function getProductos(tiendaId: string): Promise<Producto[]> {
  if (MOCK) return mock.productos.filter((p) => p.tienda_id === tiendaId);
  return sql<Producto>`SELECT id, tienda_id, nombre, precio, coste, stock FROM productos WHERE tienda_id = ${tiendaId} ORDER BY nombre`;
}

export async function getProductosTodos(): Promise<Producto[]> {
  if (MOCK) return mock.productos;
  return sql<Producto>`SELECT id, tienda_id, nombre, precio, coste, stock FROM productos ORDER BY tienda_id, nombre`;
}

export interface CreadorConRoi {
  id: string; nombre: string; handle: string | null; codigo: string;
  pct_comision: number; estado: string; ventas: number; comision: number; roi: number;
}

export async function getCreadores(): Promise<CreadorConRoi[]> {
  if (MOCK) {
    return mock.creadores.map((c) => {
      const v = mock.ventas_atribuidas.filter((x) => x.creador_id === c.id);
      const importe = v.reduce((s, x) => s + x.importe, 0);
      const comision = round2(v.reduce((s, x) => s + x.comision, 0));
      const margenGenerado = importe * 0.72 - comision; // aprox: margen bruto - comisión
      return { ...c, ventas: v.length, comision, roi: roiCreador(round2(margenGenerado), comision) };
    });
  }
  const rows = await sql<CreadorConRoi & { importe: number }>`
    SELECT c.id, c.nombre, c.handle, c.codigo, c.pct_comision, c.estado,
      COUNT(v.id) AS ventas,
      COALESCE(SUM(v.importe), 0) AS importe,
      COALESCE(SUM(v.comision), 0) AS comision
    FROM creadores c LEFT JOIN ventas_atribuidas v ON v.creador_id = c.id
    GROUP BY c.id ORDER BY comision DESC`;
  return rows.map((r) => {
    const comision = round2(Number(r.comision));
    const margenGenerado = Number(r.importe) * 0.72 - comision;
    return { ...r, ventas: Number(r.ventas), comision, roi: roiCreador(round2(margenGenerado), comision) };
  });
}

export async function getEmbudo() {
  if (MOCK) {
    return mock.tiendas.map((t) => {
      const c = mock.embudoCounts[t.id] ?? { vistas: 0, clics: 0, atc: 0, ventas: 0 };
      return { tienda: t.nombre, ...c, tasas: tasasEmbudo(c) };
    });
  }
  const rows = await sql<{ tienda: string; tienda_id: string; tipo: string; n: number }>`
    SELECT t.nombre AS tienda, t.id AS tienda_id, e.tipo, COUNT(*) AS n
    FROM eventos_embudo e JOIN tiendas t ON t.id = e.tienda_id
    GROUP BY t.id, e.tipo`;
  const byTienda = new Map<string, { tienda: string; vistas: number; clics: number; atc: number; ventas: number }>();
  for (const r of rows) {
    const cur = byTienda.get(r.tienda_id) ?? { tienda: r.tienda, vistas: 0, clics: 0, atc: 0, ventas: 0 };
    if (r.tipo === "vista") cur.vistas = Number(r.n);
    if (r.tipo === "clic") cur.clics = Number(r.n);
    if (r.tipo === "atc") cur.atc = Number(r.n);
    if (r.tipo === "venta") cur.ventas = Number(r.n);
    byTienda.set(r.tienda_id, cur);
  }
  return [...byTienda.values()].map((c) => ({ ...c, tasas: tasasEmbudo(c) }));
}

export async function getAlertas(): Promise<Alerta[]> {
  if (MOCK) return [...mock.alertas].sort((a, b) => Number(a.resuelta) - Number(b.resuelta));
  return sql<Alerta>`SELECT * FROM alertas ORDER BY resuelta ASC, creada_en DESC`;
}

export async function getTareas(): Promise<Tarea[]> {
  if (MOCK) return mock.tareas;
  return sql<Tarea>`SELECT id, tienda_id, titulo, descripcion, estado, prioridad, origen, creada_en
                    FROM tareas ORDER BY creada_en DESC`;
}

export async function getCreador(id: string): Promise<CreadorConRoi | null> {
  const todos = await getCreadores();
  return todos.find((c) => c.id === id) ?? null;
}

export interface VentaCreador {
  pedido_id: string;
  importe: number;
  comision: number;
}

export async function getVentasCreador(id: string): Promise<VentaCreador[]> {
  if (MOCK) {
    return mock.ventas_atribuidas
      .filter((v) => v.creador_id === id)
      .map((v) => ({ pedido_id: v.pedido_id, importe: v.importe, comision: v.comision }));
  }
  return sql<VentaCreador>`SELECT pedido_id, importe, comision FROM ventas_atribuidas
                          WHERE creador_id = ${id} ORDER BY importe DESC`;
}

export interface ProveedorSalud {
  proveedor: Proveedor;
  salud: SaludProveedor;
}

export async function getProveedoresSalud(): Promise<ProveedorSalud[]> {
  let proveedores: Proveedor[];
  let envios: Envio[];
  if (MOCK) {
    proveedores = mock.proveedores;
    envios = mock.envios;
  } else {
    proveedores = await sql<Proveedor>`SELECT id, nombre, pais, plazo_prometido_dias FROM proveedores`;
    envios = await sql<Envio>`SELECT proveedor_id, dias_reales, incidencia FROM envios WHERE dias_reales IS NOT NULL`;
  }
  return proveedores.map((p) => ({
    proveedor: p,
    salud: saludProveedor(envios.filter((e) => e.proveedor_id === p.id), p.plazo_prometido_dias),
  }));
}

export interface PedidoExport extends Record<string, string | number> {
  pedido: string; tienda: string; importe: number; coste: number; estado: string; fecha: string;
}

export async function getPedidosExport(): Promise<PedidoExport[]> {
  if (MOCK) {
    return mock.pedidos.map((o) => ({
      pedido: o.id, tienda: o.tienda_id, importe: round2(o.importe), coste: round2(o.coste_total),
      estado: o.estado, fecha: o.fecha?.slice(0, 10) ?? o.fecha,
    }));
  }
  return sql<PedidoExport>`SELECT id AS pedido, tienda_id AS tienda, importe, coste_total AS coste,
    estado, to_char(fecha,'YYYY-MM-DD') AS fecha FROM pedidos ORDER BY fecha DESC`;
}

export interface ComisionExport extends Record<string, string | number> {
  creador: string; codigo: string; pedido: string; importe: number; comision: number;
}

export async function getComisionesExport(): Promise<ComisionExport[]> {
  if (MOCK) {
    return mock.ventas_atribuidas.map((v) => {
      const c = mock.creadores.find((x) => x.id === v.creador_id);
      return { creador: c?.nombre ?? v.creador_id, codigo: c?.codigo ?? "", pedido: v.pedido_id, importe: v.importe, comision: v.comision };
    });
  }
  return sql<ComisionExport>`SELECT c.nombre AS creador, c.codigo, v.pedido_id AS pedido,
    v.importe, v.comision FROM ventas_atribuidas v JOIN creadores c ON c.id = v.creador_id
    ORDER BY v.comision DESC`;
}
