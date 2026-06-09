// =========================================================================
// Drop Builder — salud del proveedor (lógica pura, testeable).
// Con dropshipping, el proveedor es el mayor riesgo: vigilamos si el plazo real
// se desvía del prometido y el % de incidencias.
// =========================================================================
import type { Envio } from "@/lib/types";

export type EstadoProveedor = "bueno" | "riesgo" | "critico" | "sin_datos";

export interface SaludProveedor {
  entregas: number;
  plazoRealMedio: number;
  pctIncidencias: number;
  desviacion: number; // plazoRealMedio - plazoPrometido (días)
  estado: EstadoProveedor;
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/** Calcula la salud de un proveedor a partir de sus envíos y el plazo prometido. */
export function saludProveedor(envios: Envio[], plazoPrometido: number): SaludProveedor {
  if (envios.length === 0) {
    return { entregas: 0, plazoRealMedio: 0, pctIncidencias: 0, desviacion: 0, estado: "sin_datos" };
  }
  const plazoRealMedio = round1(envios.reduce((s, e) => s + e.dias_reales, 0) / envios.length);
  const pctIncidencias = round1((envios.filter((e) => e.incidencia).length / envios.length) * 100);
  const desviacion = round1(plazoRealMedio - plazoPrometido);

  let estado: EstadoProveedor;
  if (desviacion <= 1 && pctIncidencias < 10) estado = "bueno";
  else if (desviacion <= 3 && pctIncidencias < 25) estado = "riesgo";
  else estado = "critico";

  return { entregas: envios.length, plazoRealMedio, pctIncidencias, desviacion, estado };
}
