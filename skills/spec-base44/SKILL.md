---
name: spec-base44
description: Genera la spec de construcción de la tienda en Base44 para Drop Builder — storefront (home, categorías, ficha, búsqueda, variantes), carrito y checkout, admin operativo y los enganches para afiliados, tracking, fulfillment y stock. Úsala para producir el plano de build de una tienda nueva o cuando Gonzalo diga "spec de Base44", "monta la tienda", "plano de la tienda" o similar.
---

# Skill: spec-base44

Produce el plano de construcción de la tienda en Base44 — listo para que el humano
lo monte. Paso 4 del flujo (tras `compliance-legal` ✅). Va de la mano de
`plataforma-afiliados`.

## Cuándo se activa
- Producto validado y con compliance ✅: toca especificar la tienda.
- Cambios estructurales del storefront o checkout.

## Entradas
- Producto y precio (de `research-producto`), veredicto ✅ (de `compliance-legal`).
- Brief de replicación (de `analizar-competidor`) si lo hay.
- Idioma/mercado de la tienda.

## Qué especifica la spec
1. **Modelo de datos** (entidades Base44): Producto (con variantes, precio, coste,
   stock), Pedido (importe, coste, estado, tracking, `creador_id`), Cliente, y las
   entidades de afiliados (handoff a `plataforma-afiliados`).
2. **Storefront:** home, páginas de categoría, ficha de producto (galería,
   variantes/tallas, descripción, prueba social), búsqueda, carrito.
3. **Checkout:** pasos, campos, captura de **código de creador/UTM** (atribución),
   conexión de pasarela (la conecta el humano), cálculo de IVA/IOSS.
4. **Admin operativo:** gestión de pedidos, productos, stock, creadores.
5. **Enganches (hooks) hacia el resto del sistema:**
   - Webhook/evento `pedido.pagado` → puente a la plataforma de métricas (Code).
   - `eventos_embudo` y dataLayer → `analitica-tracking`.
   - Campo `tracking` → `fulfillment`.
   - Campo `stock` → `sync-stock`.
6. **No funcional:** SSL, velocidad, revisión móvil, páginas legales enlazadas.

## Salida
- `specs/base44-<tienda>.md`: modelo de datos, mapa de páginas, flujo de checkout,
  lista de hooks/webhooks y checklist de QA (móvil, velocidad, SSL).
- Lista de pasos que ejecuta el humano (pasarela, dominio, publicar).

## Guardrails
- Pago, dominio y publicación = humano. Yo dejo la spec y el checklist.
- El checkout debe capturar la atribución del creador desde el día uno.
- No especificar nada que no haya pasado `compliance-legal`.

## Métrica de éxito
> Una spec con la que el humano monta la tienda en horas, con atribución de
> creador y puente de métricas funcionando desde el primer pedido.
