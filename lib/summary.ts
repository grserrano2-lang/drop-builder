// =========================================================================
// Drop Builder — generador del resumen diario (#87). Lógica pura y testeable.
// Construye el texto que se enviará por Telegram cada mañana.
// =========================================================================

export interface ResumenInput {
  fecha: string;
  holding: { ingresos: number; margen: number; pedidos: number };
  tiendas: { nombre: string; margen: number; decision: string }[];
  alertasCriticas: string[];
  alertasAbiertas: number;
  tareas: { backlog: number; en_progreso: number; hecho: number };
}

const eur = (n: number) => `${n.toFixed(2)} €`;
const ICONO_DECISION: Record<string, string> = { escalar: "🟢", iterar: "🟡", matar: "🔴" };

/**
 * Devuelve el resumen diario como líneas y como texto plano (Telegram).
 * Pura: no toca DB ni red; la ruta /api/cron/daily-summary le pasa los datos.
 */
export function construirResumenDiario(i: ResumenInput): { texto: string; lineas: string[] } {
  const margenPct = i.holding.ingresos > 0 ? (i.holding.margen / i.holding.ingresos) * 100 : 0;
  const lineas: string[] = [];

  lineas.push(`📊 Drop Builder — resumen del ${i.fecha}`);
  lineas.push("");
  lineas.push(
    `Holding: ${eur(i.holding.ingresos)} ingresos · ${eur(i.holding.margen)} margen ` +
      `(${margenPct.toFixed(1)}%) · ${i.holding.pedidos} pedidos`
  );

  lineas.push("");
  lineas.push("Tiendas:");
  for (const t of i.tiendas) {
    const icono = ICONO_DECISION[t.decision] ?? "•";
    lineas.push(`  ${icono} ${t.nombre}: ${eur(t.margen)} → ${t.decision}`);
  }

  lineas.push("");
  if (i.alertasCriticas.length > 0) {
    lineas.push(`🚨 ${i.alertasCriticas.length} alerta(s) crítica(s):`);
    for (const a of i.alertasCriticas) lineas.push(`  - ${a}`);
  } else {
    lineas.push(`✅ Sin alertas críticas (${i.alertasAbiertas} abiertas en total).`);
  }

  lineas.push("");
  lineas.push(
    `📋 Tareas: ${i.tareas.backlog} backlog · ${i.tareas.en_progreso} en progreso · ${i.tareas.hecho} hechas`
  );

  return { texto: lineas.join("\n"), lineas };
}
