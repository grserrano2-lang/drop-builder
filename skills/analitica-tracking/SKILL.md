---
name: analitica-tracking
description: Monta la analítica y el tracking de una tienda Drop Builder — Meta Pixel, GTM, GA4 y Conversions API, más la atribución por creador (código + UTM) conectada al checkout. Úsala al instrumentar una tienda nueva o cuando Gonzalo diga "monta el tracking", "instala el pixel", "atribución por creador", "Conversions API" o similar.
---

# Skill: analitica-tracking

Instrumenta la tienda para medir el embudo y atribuir cada venta a su creador
desde el día uno. Cubre el bloque 8 y alimenta la plataforma de métricas.

## Cuándo se activa
- Instrumentación de una tienda nueva (antes de activar tráfico).
- Configuración/depuración de pixel, GTM, GA4, CAPI.
- Diseño de la atribución por creador (código + UTM).

## Entradas que necesito
- Dominio de la tienda y acceso al storefront de Base44.
- IDs: Meta Pixel, contenedor GTM, propiedad GA4 (los crea/da el humano).
- Modelo de afiliados (de `plataforma-afiliados`): código por creador + UTM.

## Eventos mínimos del embudo (consistentes en todas las herramientas)
`PageView → ViewContent → AddToCart → InitiateCheckout → Purchase`
(equivalen a vista→clic→atc→venta de la tabla `eventos_embudo` de la app).

## Proceso
1. **Capa de datos (dataLayer) primero.** Define el dataLayer que el storefront
   empuja en cada evento (incluye value, currency, content_ids, y el `creador`/
   código si viene de un afiliado). Todo lo demás lee de aquí.
2. **GTM como orquestador.** Un solo contenedor dispara Pixel + GA4 desde el
   dataLayer; evita pegar scripts sueltos.
3. **Meta Pixel + Conversions API (CAPI).** Cliente (pixel) y servidor (CAPI) en
   paralelo con `event_id` de deduplicación → recupera eventos que el navegador
   pierde (iOS/adblock). CAPI es spec de servidor → coordina con `spec-base44`.
4. **GA4** para embudo y comportamiento; vincular si procede.
5. **Atribución por creador (el núcleo):**
   - **Código de descuento único** por creador, registrado en el pedido.
   - **UTM** (`utm_source=creador&utm_campaign=<handle>`) en su link/página pública.
   - En el checkout, Base44 graba `creador_id` en el pedido → se propaga a
     `ventas_atribuidas` y a la plataforma de métricas. El código manda sobre el
     UTM si hay conflicto.
6. **Consentimiento de cookies.** Consent mode: no disparar marketing sin
   consentimiento (RGPD). Coordina con la página de cookies.
7. **Verificación.** Comprueba cada evento (modo test de Meta, DebugView de GA4,
   vista previa de GTM) y una compra de prueba atribuida a un creador ficticio.

## Salida
- `specs/tracking-<tienda>.md`: dataLayer, mapa de eventos, plan de etiquetas GTM,
  setup de CAPI y reglas de atribución.
- Lista de IDs/accesos que el humano debe crear y pegar.
- Checklist de verificación evento por evento.

## Guardrails
- Consentimiento antes de tracking de marketing; nada de fingerprinting ni evasión.
- No enviar PII en claro a las plataformas (hashear emails para CAPI).
- Solo herramientas oficiales (Meta, Google).

## Métrica de éxito
> Embudo completo medido con dedup pixel↔CAPI y ≥95% de ventas atribuidas a su
> creador (o a "directo") en la plataforma de métricas.
