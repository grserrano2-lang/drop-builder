// Tests de métricas puras. Corren sin DB ni dependencias:
//   npm test   (node --experimental-strip-types --test lib/*.test.ts)
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  margenContribucion,
  margenPct,
  cumpleUmbralMargen,
  tasasEmbudo,
  decisionGate,
  roiCreador,
} from "./metrics.ts";

test("margenContribucion descuenta coste, envío, comisión y pasarela", () => {
  const m = margenContribucion({
    precioVenta: 59.9,
    coste: 14,
    envio: 5,
    pctComisionCreador: 0.2,
    pctPasarela: 0.025,
    fijaPasarela: 0.25,
  });
  // 59.9 - 14 - 5 - 11.98 - (1.4975 + 0.25) = 27.17
  assert.equal(m, 27.17);
});

test("cumpleUmbralMargen aplica la regla de oro (>=25 €)", () => {
  const p = { precioVenta: 59.9, coste: 14, envio: 5, pctComisionCreador: 0.2 };
  assert.equal(cumpleUmbralMargen(p, 25), true);
  const flojo = { precioVenta: 30, coste: 14, envio: 5, pctComisionCreador: 0.2 };
  assert.equal(cumpleUmbralMargen(flojo, 25), false);
});

test("margenPct devuelve porcentaje sobre precio", () => {
  assert.ok(margenPct({ precioVenta: 100, coste: 20, envio: 5, pctComisionCreador: 0.2 }) > 0);
  assert.equal(margenPct({ precioVenta: 0, coste: 0, envio: 0, pctComisionCreador: 0 }), 0);
});

test("tasasEmbudo calcula conversiones y evita dividir por cero", () => {
  const t = tasasEmbudo({ vistas: 1000, clics: 350, atc: 80, ventas: 20 });
  assert.equal(t.clic_vista, 35);
  assert.equal(t.venta_vista, 2);
  const z = tasasEmbudo({ vistas: 0, clics: 0, atc: 0, ventas: 0 });
  assert.equal(z.venta_vista, 0);
});

test("decisionGate: mata por chargebacks > 1%", () => {
  const d = decisionGate({ margenContribucionAcumulado: 500, semanasActiva: 3, ratioChargebacks: 0.02, conversionGlobalPct: 2 });
  assert.equal(d.decision, "matar");
});

test("decisionGate: escala con margen positivo y embudo activo", () => {
  const d = decisionGate({ margenContribucionAcumulado: 500, semanasActiva: 4, ratioChargebacks: 0.003, conversionGlobalPct: 2 });
  assert.equal(d.decision, "escalar");
});

test("decisionGate: mata al cerrar ventana sin margen", () => {
  const d = decisionGate({ margenContribucionAcumulado: -50, semanasActiva: 6, ratioChargebacks: 0.003, conversionGlobalPct: 1 });
  assert.equal(d.decision, "matar");
});

test("decisionGate: itera dentro de ventana con señal parcial", () => {
  const d = decisionGate({ margenContribucionAcumulado: 0, semanasActiva: 2, ratioChargebacks: 0.003, conversionGlobalPct: 0 });
  assert.equal(d.decision, "iterar");
});

test("roiCreador divide margen entre comisión", () => {
  assert.equal(roiCreador(300, 100), 3);
  assert.equal(roiCreador(300, 0), 0);
});
