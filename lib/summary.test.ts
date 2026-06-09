import { test } from "node:test";
import assert from "node:assert/strict";
import { construirResumenDiario } from "./summary.ts";

const base = {
  fecha: "2026-06-09",
  holding: { ingresos: 1000, margen: 250, pedidos: 40 },
  tiendas: [
    { nombre: "Tienda Alfa", margen: 200, decision: "escalar" },
    { nombre: "Tienda Gamma", margen: -10, decision: "matar" },
  ],
  alertasCriticas: [] as string[],
  alertasAbiertas: 3,
  tareas: { backlog: 5, en_progreso: 2, hecho: 8 },
};

test("incluye holding, margen % y pedidos", () => {
  const { texto } = construirResumenDiario(base);
  assert.match(texto, /1000\.00 €/);
  assert.match(texto, /25\.0%/);
  assert.match(texto, /40 pedidos/);
});

test("lista cada tienda con su decisión", () => {
  const { texto } = construirResumenDiario(base);
  assert.match(texto, /Tienda Alfa.*escalar/);
  assert.match(texto, /Tienda Gamma.*matar/);
});

test("sin alertas críticas muestra el OK con total de abiertas", () => {
  const { texto } = construirResumenDiario(base);
  assert.match(texto, /Sin alertas críticas \(3 abiertas/);
});

test("con alertas críticas las lista", () => {
  const { texto } = construirResumenDiario({ ...base, alertasCriticas: ["Chargebacks 10% en Gamma"] });
  assert.match(texto, /1 alerta\(s\) crítica/);
  assert.match(texto, /Chargebacks 10% en Gamma/);
});

test("incluye el conteo de tareas", () => {
  const { texto } = construirResumenDiario(base);
  assert.match(texto, /5 backlog · 2 en progreso · 8 hechas/);
});

test("lista proveedores en alerta si los hay, y los omite si no", () => {
  const sin = construirResumenDiario(base);
  assert.doesNotMatch(sin.texto, /Proveedores en alerta/);
  const con = construirResumenDiario({ ...base, proveedoresCriticos: ["GuangzhouTex"] });
  assert.match(con.texto, /Proveedores en alerta: GuangzhouTex/);
});
