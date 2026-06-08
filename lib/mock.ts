// =========================================================================
// Drop Builder — datos de ejemplo (MODO MOCK).
// Permiten arrancar el dashboard sin DB. Niche-agnóstico: nombres genéricos.
// Fechas fijas (sin Date.now()) para que el render sea determinista.
// =========================================================================
import type {
  Tienda,
  Producto,
  Pedido,
  Creador,
  VentaAtribuida,
  EventoEmbudo,
  Alerta,
} from "@/lib/types";

export const tiendas: Tienda[] = [
  { id: "t1", nombre: "Tienda Alfa", nicho: "hogar", estado: "escalar", base44_id: "b44_alfa", creada_en: "2026-04-20" },
  { id: "t2", nombre: "Tienda Beta", nicho: "fitness", estado: "evaluando", base44_id: "b44_beta", creada_en: "2026-05-15" },
  { id: "t3", nombre: "Tienda Gamma", nicho: "mascotas", estado: "matar", base44_id: "b44_gamma", creada_en: "2026-05-01" },
];

export const productos: Producto[] = [
  { id: "p1", tienda_id: "t1", nombre: "Producto Alfa 1", precio: 59.9, coste: 14, stock: 120 },
  { id: "p2", tienda_id: "t1", nombre: "Producto Alfa 2", precio: 39.9, coste: 9, stock: 8 },
  { id: "p3", tienda_id: "t2", nombre: "Producto Beta 1", precio: 49.9, coste: 12, stock: 60 },
  { id: "p4", tienda_id: "t3", nombre: "Producto Gamma 1", precio: 34.9, coste: 11, stock: 0 },
];

export const creadores: Creador[] = [
  { id: "c1", nombre: "Creadora Uno", handle: "@uno", codigo: "UNO10", pct_comision: 0.2, estado: "activo" },
  { id: "c2", nombre: "Creador Dos", handle: "@dos", codigo: "DOS15", pct_comision: 0.25, estado: "activo" },
  { id: "c3", nombre: "Creadora Tres", handle: "@tres", codigo: "TRES20", pct_comision: 0.15, estado: "pausado" },
];

// Pedidos generados de forma determinista para tener volumen sin Date.now().
export const pedidos: Pedido[] = Array.from({ length: 60 }, (_, i) => {
  const tienda = tiendas[i % 3];
  const importe = [59.9, 39.9, 49.9, 34.9][i % 4];
  // Solo Gamma (t3) acumula chargebacks -> dispara el gate "matar" y su alerta.
  const esGamma = tienda.id === "t3";
  const estado: Pedido["estado"] =
    esGamma && i % 30 === 2 ? "chargeback" : i % 17 === 0 ? "reembolsado" : "pagado";
  const dia = String((i % 27) + 1).padStart(2, "0");
  return {
    id: `o${i + 1}`,
    tienda_id: tienda.id,
    importe,
    coste_total: importe * 0.28,
    fecha: `2026-06-${dia}`,
    estado,
  };
});

export const ventas_atribuidas: VentaAtribuida[] = pedidos
  .filter((_, i) => i % 2 === 0) // ~la mitad vienen de creadores
  .map((o, i) => {
    const creador = creadores[i % creadores.length];
    return {
      id: `v${i + 1}`,
      pedido_id: o.id,
      creador_id: creador.id,
      importe: o.importe,
      comision: Math.round(o.importe * creador.pct_comision * 100) / 100,
    };
  });

export const eventos_embudo: EventoEmbudo[] = (() => {
  const out: EventoEmbudo[] = [];
  let id = 1;
  for (const t of tiendas) {
    const base = { t1: 5000, t2: 2200, t3: 1800 }[t.id] ?? 1000;
    const counts = { vista: base, clic: Math.round(base * 0.35), atc: Math.round(base * 0.08), venta: Math.round(base * 0.02) };
    for (const [tipo, n] of Object.entries(counts) as [EventoEmbudo["tipo"], number][]) {
      out.push({ id: id++, tienda_id: t.id, creador_id: null, tipo, fecha: "2026-06-01" });
      // guardamos solo un registro agregado por tipo con el conteo en `id` lógico;
      // las queries mock leen los conteos de getEmbudoMock (abajo).
      void n;
    }
  }
  return out;
})();

// Conteos de embudo precalculados (mock) por tienda.
export const embudoCounts: Record<string, { vistas: number; clics: number; atc: number; ventas: number }> = {
  t1: { vistas: 5000, clics: 1750, atc: 400, ventas: 100 },
  t2: { vistas: 2200, clics: 770, atc: 176, ventas: 30 },
  t3: { vistas: 1800, clics: 540, atc: 90, ventas: 12 },
};

export const alertas: Alerta[] = [
  { id: 1, tienda_id: "t1", tipo: "stock_bajo", severidad: "aviso", mensaje: "Producto Alfa 2 con stock 8 (umbral 10).", resuelta: false, creada_en: "2026-06-07" },
  { id: 2, tienda_id: "t3", tipo: "pico_chargebacks", severidad: "critica", mensaje: "Ratio de chargebacks por encima del 1% en Tienda Gamma.", resuelta: false, creada_en: "2026-06-06" },
  { id: 3, tienda_id: "t3", tipo: "stock_agotado", severidad: "critica", mensaje: "Producto Gamma 1 agotado (stock 0).", resuelta: false, creada_en: "2026-06-05" },
  { id: 4, tienda_id: "t2", tipo: "caida_conversion", severidad: "info", mensaje: "Conversión de Tienda Beta por debajo de la media del holding.", resuelta: true, creada_en: "2026-06-03" },
];
