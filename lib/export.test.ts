import { test } from "node:test";
import assert from "node:assert/strict";
import { toCsv } from "./export.ts";

test("toCsv vacío devuelve cadena vacía", () => {
  assert.equal(toCsv([]), "");
});

test("toCsv genera cabecera y filas", () => {
  const csv = toCsv([{ a: 1, b: "x" }, { a: 2, b: "y" }]);
  assert.equal(csv, "a,b\n1,x\n2,y");
});

test("toCsv escapa comas, comillas y saltos de línea", () => {
  const csv = toCsv([{ nombre: "Pérez, Ana", nota: 'dijo "hola"', x: "a\nb" }]);
  assert.equal(csv, 'nombre,nota,x\n"Pérez, Ana","dijo ""hola""","a\nb"');
});

test("toCsv trata null/undefined como vacío", () => {
  const csv = toCsv([{ a: null, b: undefined, c: 0 }]);
  assert.equal(csv, "a,b,c\n,,0");
});
