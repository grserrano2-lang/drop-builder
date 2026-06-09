# Spec de la plataforma de afiliados — Tienda 1

> Salida de `plataforma-afiliados`. Motor de creadores a comisión, el canal de
> tráfico principal (UGC primero). Se reutiliza en cada tienda. Va con
> `specs/base44-tienda1.md`. Decisiones del discovery: comisión 15%, pago manual,
> 5-15 creadores al inicio, captación por bot.

## 1. Modelo de datos (entidades Base44)
- **Creador:** nombre, handle, **código único** de descuento/atribución,
  `pct_comision` = 0.15, estado (activo/pausado/baja), método de pago (PayPal),
  idioma, enlace a su página pública.
- **VentaAtribuida:** pedido ↔ creador, importe atribuido, comisión devengada.
  Las ventas reembolsadas o con chargeback **no** generan comisión.
- **Liquidación:** periodo, suma de comisiones, estado de pago.

## 2. Páginas
1. **Registro de creador** → genera código único automáticamente.
2. **Dashboard del creador (#24):** sus ventas, comisión devengada, pagos y
   **materiales descargables** (kit de bienvenida #26: briefs, diseños, hooks).
3. **Admin de colaboradores:** alta/baja, % comisión, liquidaciones, exportación.
4. **Página pública del creador (#23 — recomendada):** su escaparate + su código
   para sus fans. No la marcaste, pero es como el creador convierte a su audiencia
   (la referencia la usa). Recomiendo incluirla; queda como opción activable.

## 3. Atribución (núcleo)
- **Código de descuento único + UTM** del creador, registrados en el checkout en
  tiempo real → `pedido.creador_id`. **El código prevalece** sobre el UTM en
  conflicto. Coordina con `analitica-tracking` (#73).
- Se propaga a `VentaAtribuida` y al CRM (ROI por creador en el panel).

## 4. Captación de creadores (bot #22)
- **Entrada:** referencias de Gonzalo (perfiles tipo objetivo) + criterios (nicho
  fútbol, idioma, tamaño de audiencia, engagement).
- **Salida:** lista de creadores afines + **borradores de DM listos para enviar**.
- **Métodos LEGÍTIMOS:** descubrimiento por hashtags/cuentas públicas y navegación
  asistida (Cowork) / fuentes oficiales. **Nada de scraping que viole ToS** de
  TikTok/IG (guardrail). El **envío real del DM lo hace Gonzalo**.

## 5. Operativa
- **Acuerdo de creador firmado (#21)** antes de activar a nadie
  (`templates/legal/acuerdo-creador.md`).
- **Liquidación semiautomática (#29):** el CRM calcula comisiones; **Gonzalo pulsa
  pagar** (PayPal/transfer). La plataforma nunca paga sola.
- Arranque de 5-15 creadores por tienda.

## 6. Mejoras aparcadas (activables si se quieren)
- **Tiers de comisión (#25):** 15% → 20% al superar X ventas. No aprobada.
- **Leaderboard (#27)** y trato preferente a top (#30): no aprobadas / fase posterior.

## 7. Guardrails
- **Pagos reales = humano.** Atribución honesta y trazable.
- **Disclosure de publicidad** (#ad/colaboración) obligatorio en el contenido.
- Acuerdo firmado antes de activar.
