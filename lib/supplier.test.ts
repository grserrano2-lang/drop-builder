import { test } from "node:test";
import assert from "node:assert/strict";
import { saludProveedor } from "./supplier.ts";
import type { Envio } from "./types.ts";

const e = (dias: number, incidencia = false): Envio => ({ proveedor_id: "p1", dias_reales: dias, incidencia });

test("sin envíos devuelve sin_datos", () => {
  const s = saludProveedor([], 7);
  assert.equal(s.estado, "sin_datos");
  assert.equal(s.entregas, 0);
});

test("proveedor cumplidor → bueno", () => {
  const s = saludProveedor([e(7), e(8), e(6)], 7);
  assert.equal(s.plazoRealMedio, 7);
  assert.equal(s.desviacion, 0);
  assert.equal(s.pctIncidencias, 0);
  assert.equal(s.estado, "bueno");
});

test("desviación moderada → riesgo", () => {
  const s = saludProveedor([e(9), e(10), e(9)], 7); // media ~9.3, desv ~2.3
  assert.equal(s.estado, "riesgo");
});

test("muchas incidencias → critico", () => {
  const s = saludProveedor([e(8, true), e(9, true), e(8, false), e(9, true)], 7); // 75% incidencias
  assert.equal(s.estado, "critico");
  assert.equal(s.pctIncidencias, 75);
});

test("gran desviación de plazo → critico", () => {
  const s = saludProveedor([e(20), e(22), e(21)], 7);
  assert.equal(s.estado, "critico");
  assert.ok(s.desviacion >= 13);
});
