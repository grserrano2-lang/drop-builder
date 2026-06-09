// =========================================================================
// Drop Builder — métricas puras (sin I/O, testeables con `npm test`).
// Implementan las reglas del prompt maestro: margen de contribución y
// gates de decisión matar/escalar.
// =========================================================================

export interface ParamsMargen {
  precioVenta: number;
  coste: number; // COGS unitario
  envio: number; // envío puesto en destino
  pctComisionCreador: number; // 0.20 = 20% del precio de venta
  pctPasarela?: number; // 0.025 = 2.5%
  fijaPasarela?: number; // p.ej. 0.25 €
}

/**
 * Margen de contribución por venta, tras coste + envío + comisión de creador
 * + comisión de pasarela. Es la métrica que manda en Drop Builder.
 */
export function margenContribucion(p: ParamsMargen): number {
  const pasarela = p.precioVenta * (p.pctPasarela ?? 0.025) + (p.fijaPasarela ?? 0.25);
  const comision = p.precioVenta * p.pctComisionCreador;
  return round2(p.precioVenta - p.coste - p.envio - comision - pasarela);
}

/** Margen como % del precio de venta. */
export function margenPct(p: ParamsMargen): number {
  if (p.precioVenta <= 0) return 0;
  return round2((margenContribucion(p) / p.precioVenta) * 100);
}

/**
 * Regla de oro: ¿supera el umbral de margen para lanzar? (25-30 € por defecto).
 */
export function cumpleUmbralMargen(p: ParamsMargen, umbral = 25): boolean {
  return margenContribucion(p) >= umbral;
}

export interface Embudo {
  vistas: number;
  clics: number;
  atc: number; // add-to-cart
  ventas: number;
}

/** Tasas de conversión paso a paso y global (en %). */
export function tasasEmbudo(e: Embudo) {
  const pct = (a: number, b: number) => (b > 0 ? round2((a / b) * 100) : 0);
  return {
    clic_vista: pct(e.clics, e.vistas),
    atc_clic: pct(e.atc, e.clics),
    venta_atc: pct(e.ventas, e.atc),
    venta_vista: pct(e.ventas, e.vistas), // conversión global
  };
}

export type Decision = "escalar" | "iterar" | "matar";

export interface ParamsGate {
  margenContribucionAcumulado: number; // € de margen tras pagar creadores
  semanasActiva: number;
  ventanaSemanas?: number; // 4-6 por defecto -> 6
  ratioChargebacks: number; // 0.01 = 1%
  conversionGlobalPct: number;
}

/**
 * Gate matar/escalar (skill reportes-kpis):
 * - ESCALAR: margen acumulado positivo dentro de la ventana y embudo sano.
 * - MATAR: sin margen positivo al cerrar la ventana, o chargebacks fuera de control.
 * - ITERAR: en el resto de casos (señal parcial, aún dentro de ventana).
 */
export function decisionGate(p: ParamsGate): { decision: Decision; motivo: string } {
  const ventana = p.ventanaSemanas ?? 6;
  const UMBRAL_CHARGEBACK = 0.01; // 1% = zona de peligro de las pasarelas

  if (p.ratioChargebacks > UMBRAL_CHARGEBACK) {
    return {
      decision: "matar",
      motivo: `Ratio de chargebacks ${(p.ratioChargebacks * 100).toFixed(1)}% > 1% (riesgo de pasarela).`,
    };
  }
  if (p.margenContribucionAcumulado > 0 && p.conversionGlobalPct > 0) {
    return {
      decision: "escalar",
      motivo: `Margen de contribución positivo (${p.margenContribucionAcumulado.toFixed(2)} €) con embudo activo.`,
    };
  }
  if (p.semanasActiva >= ventana && p.margenContribucionAcumulado <= 0) {
    return {
      decision: "matar",
      motivo: `Sin margen positivo al cerrar la ventana de ${ventana} semanas.`,
    };
  }
  return {
    decision: "iterar",
    motivo: `Señal parcial dentro de la ventana (semana ${p.semanasActiva}/${ventana}); ajustar precio/oferta/ángulos.`,
  };
}

/** ROI de un creador: comisión pagada vs. margen generado por sus ventas. */
export function roiCreador(margenGenerado: number, comisionPagada: number): number {
  if (comisionPagada <= 0) return 0;
  return round2(margenGenerado / comisionPagada);
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/** Semanas completas que lleva activa una tienda desde su fecha de creación.
 *  `ahoraISO` se pasa como parámetro para que sea pura y testeable. */
export function semanasActiva(creadaEn: string, ahoraISO: string): number {
  const ms = Date.parse(ahoraISO) - Date.parse(creadaEn);
  if (!Number.isFinite(ms) || ms < 0) return 0;
  return Math.floor(ms / (7 * 24 * 60 * 60 * 1000));
}
