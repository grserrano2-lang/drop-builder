import { test } from "node:test";
import assert from "node:assert/strict";
import { agruparPorEstado, contarPorEstado, COLUMNAS } from "./tasks.ts";
import type { Tarea } from "./types.ts";

const T = (id: string, estado: Tarea["estado"], prioridad: Tarea["prioridad"]): Tarea => ({
  id, tienda_id: null, titulo: id, descripcion: null, estado, prioridad, origen: "humano", creada_en: "2026-06-09",
});

test("COLUMNAS define las 3 fases del Kanban en orden", () => {
  assert.deepEqual(COLUMNAS.map((c) => c.estado), ["backlog", "en_progreso", "hecho"]);
});

test("agruparPorEstado reparte por columna", () => {
  const g = agruparPorEstado([T("a", "backlog", "media"), T("b", "hecho", "media"), T("c", "backlog", "media")]);
  assert.equal(g.backlog.length, 2);
  assert.equal(g.hecho.length, 1);
  assert.equal(g.en_progreso.length, 0);
});

test("agruparPorEstado ordena por prioridad (alta primero)", () => {
  const g = agruparPorEstado([T("baja", "backlog", "baja"), T("alta", "backlog", "alta"), T("media", "backlog", "media")]);
  assert.deepEqual(g.backlog.map((t) => t.id), ["alta", "media", "baja"]);
});

test("contarPorEstado cuenta cada columna", () => {
  const c = contarPorEstado([T("a", "backlog", "media"), T("b", "en_progreso", "alta"), T("c", "en_progreso", "baja")]);
  assert.deepEqual(c, { backlog: 1, en_progreso: 2, hecho: 0 });
});
