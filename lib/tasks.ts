// =========================================================================
// Drop Builder — lógica pura del backlog Kanban (testeable sin I/O).
// =========================================================================
import type { Tarea, EstadoTarea, PrioridadTarea } from "@/lib/types";

export const COLUMNAS: { estado: EstadoTarea; titulo: string }[] = [
  { estado: "backlog", titulo: "Backlog" },
  { estado: "en_progreso", titulo: "En progreso" },
  { estado: "hecho", titulo: "Hecho" },
];

const ORDEN_PRIORIDAD: Record<PrioridadTarea, number> = { alta: 0, media: 1, baja: 2 };

/** Agrupa las tareas por estado en el orden de las columnas del Kanban,
 *  ordenando dentro de cada columna por prioridad (alta primero). */
export function agruparPorEstado(tareas: Tarea[]): Record<EstadoTarea, Tarea[]> {
  const out: Record<EstadoTarea, Tarea[]> = { backlog: [], en_progreso: [], hecho: [] };
  for (const t of tareas) out[t.estado].push(t);
  for (const estado of Object.keys(out) as EstadoTarea[]) {
    out[estado].sort((a, b) => ORDEN_PRIORIDAD[a.prioridad] - ORDEN_PRIORIDAD[b.prioridad]);
  }
  return out;
}

/** Resumen de conteos por estado (para cabeceras y métricas). */
export function contarPorEstado(tareas: Tarea[]): Record<EstadoTarea, number> {
  return {
    backlog: tareas.filter((t) => t.estado === "backlog").length,
    en_progreso: tareas.filter((t) => t.estado === "en_progreso").length,
    hecho: tareas.filter((t) => t.estado === "hecho").length,
  };
}
