---
name: reportes-kpis
description: Genera el reporte de KPIs de una tienda Drop Builder y la decisión matar/escalar, leyendo de la plataforma de métricas — ventas, margen real, ROI por creador, embudo y chargebacks contra los gates definidos. Úsala para el reporte recurrente o cuando Gonzalo diga "reporte de KPIs", "cómo va la tienda", "matar o escalar", "dashboard de la semana" o similar.
---

# Skill: reportes-kpis

Cierra el bucle: lee la plataforma de métricas, evalúa contra los gates y emite la
decisión **matar/escalar**. Paso 9 del flujo y bloque 10 (operación recurrente).

## Cuándo se activa
- Reporte recurrente (bot de Cowork: diario/semanal).
- Decisión de matar/escalar una tienda o producto.
- Consolidado multi-tienda tipo holding.

## Entradas
- Datos de la plataforma de métricas (app Drop Builder / Neon): pedidos, margen,
  ventas atribuidas, embudo, alertas.
- Gates de decisión (umbral de margen, ventana de tiempo, ROI por creador).

## KPIs del reporte
1. **Ventas y margen de contribución** por tienda (real, tras COGS + envío +
   comisión + pasarela). Es la métrica que manda.
2. **ROI por creador** y comisiones devengadas/pagadas.
3. **Embudo:** vista→clic→atc→venta, tasas de conversión.
4. **Gasto de ads** y ROAS (cuando aplique la fase de ads).
5. **Salud:** ratio de chargebacks, incidencias de envío, stock bajo.
6. **Consolidado holding:** suma y comparación entre tiendas.

## Gates de decisión (matar/escalar)
- ✅ **ESCALAR:** margen de contribución positivo tras pagar creadores en la
  ventana objetivo (4-6 semanas) y embudo sano → más creadores / abrir ads /
  replicar a otro producto.
- ⏸️ **ITERAR:** señal parcial → ajustar precio, oferta, ángulos o creadores.
- ⛔ **MATAR:** sin margen positivo en la ventana, o chargebacks/incidencias fuera
  de control → parar y reasignar al siguiente producto.

## Salida
- Reporte (a ClickUp/Telegram y/o panel): KPIs + alertas + **decisión explícita**
  con su porqué numérico.
- Si ESCALAR/MATAR: tareas de seguimiento en ClickUp.

## Guardrails
- Decidir por el **margen de contribución real**, no por ingresos brutos.
- Las alertas críticas (chargebacks, stock) se escalan aunque no toque reporte.
- La decisión final de matar/escalar la confirma el humano; yo doy el veredicto
  con datos.

## Métrica de éxito
> Cada tienda tiene una decisión matar/escalar basada en datos dentro de su
> ventana, y el holding se ve consolidado en un panel.
