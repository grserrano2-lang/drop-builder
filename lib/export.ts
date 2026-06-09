// =========================================================================
// Drop Builder — exportación a CSV (lógica pura, testeable).
// Para el export contable hacia el asesor (#90).
// =========================================================================

type Celda = string | number | boolean | null | undefined;

const esc = (v: Celda): string => {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** Convierte filas (objetos homogéneos) en CSV con cabecera y escapado RFC-4180. */
export function toCsv(rows: Record<string, Celda>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const lineas = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => esc(r[h])).join(",")),
  ];
  return lineas.join("\n");
}
