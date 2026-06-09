# Spec de analítica y tracking — Tienda 1

> Salida de `analitica-tracking`. Instrumenta la tienda para medir el embudo y
> atribuir cada venta a su creador desde el día uno. Decisiones del discovery:
> Pixel+CAPI, GA4+GTM, atribución código+UTM, consentimiento UE. Va con
> `specs/base44-tienda1.md`.

## 1. Eventos mínimos del embudo (consistentes en todas las herramientas)
`PageView → ViewContent → AddToCart → InitiateCheckout → Purchase`
(equivalen a vista→clic→atc→venta de la tabla `eventos_embudo` del CRM).

## 2. Capa de datos (dataLayer) — primero
El storefront empuja en cada evento: `value`, `currency` (EUR), `content_ids`,
`content_type`, y si viene de un afiliado, `creador` + `codigo`. Todo lo demás lee
de aquí (nada de scripts sueltos).

## 3. GTM como orquestador
Un solo contenedor dispara **Meta Pixel + GA4** desde el dataLayer. Vista previa de
GTM para validar antes de publicar.

## 4. Meta Pixel + Conversions API (#71)
- Cliente (pixel) + servidor (CAPI) en paralelo con **`event_id` de deduplicación**.
- CAPI recupera eventos que el navegador pierde (iOS/adblock). Es spec de servidor →
  coordina con `base44-tienda1.md` (webhook de eventos).
- **Hashear PII** (email) antes de enviarlo a CAPI (#75).

## 5. GA4 (#72)
Embudo y comportamiento; DebugView para verificar.

## 6. Atribución por creador (núcleo, #73)
- **Código de descuento único** por creador + **UTM**
  (`utm_source=creador&utm_campaign=<handle>`) en su enlace/página pública.
- En el checkout, Base44 graba `creador_id` en el pedido → se propaga a
  `VentaAtribuida` y al CRM (ROI por creador). **El código prevalece** sobre el UTM.
- **UTM canónicos (#77)** documentados por creador/canal.

## 7. Consentimiento de cookies (#74)
**Consent mode:** no disparar pixel/marketing sin consentimiento (RGPD, obligatorio
para poder hacer ads). Coordina con la página de cookies (#93).

## 8. Verificación (#76)
- Modo test de Meta + DebugView de GA4 + vista previa de GTM.
- **Compra de prueba atribuida** a un creador ficticio (valida embudo + atribución +
  dedup pixel↔CAPI).

## 9. Fase posterior (con ads)
- Atribución **multi-touch (#78)** y panel de **ROAS por creatividad (#80)** cuando
  haya inversión en ads. **Cohortes y LTV por mercado (#79)** en el CRM.

## 10. Guardrails
Consentimiento antes de tracking de marketing; **no PII en claro** a las plataformas
(hash); solo herramientas oficiales (Meta, Google); nada de fingerprinting ni evasión.
