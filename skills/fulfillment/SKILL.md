---
name: fulfillment
description: Diseña y opera la ruta automática del pedido al proveedor para una tienda Drop Builder — enrutado del pedido, captura de tracking, notificación al cliente y gestión de incidencias de envío. Úsala al montar el fulfillment de una tienda nueva, cuando haya que conectar un proveedor/agente, o cuando Gonzalo diga "monta el fulfillment", "ruta de pedidos", "tracking de envíos" o similar.
---

# Skill: fulfillment

Convierte un pedido pagado en un envío entregado con el mínimo toque humano.
Cubre el bloque 5 del alcance operativo del Drop Builder.

## Cuándo se activa
- Montaje inicial del fulfillment de una tienda nueva (tras `spec-base44`).
- Conexión/cambio de proveedor o agente de sourcing.
- Diseño de la gestión de incidencias (retrasos, pérdidas, daños).

## Entradas que necesito
- Proveedor/agente: nombre, método de envío de pedidos (API, hoja, email, panel),
  países a los que envía, tiempos reales puerta a puerta, transportista y si da
  número de tracking.
- Tienda en Base44 (id) y dónde viven los pedidos.
- Plantillas de email de envío (de la skill `emails-flows`).

## Proceso
1. **Mapa de la ruta.** Documenta el camino real del pedido:
   `pago → captura del pedido → envío al proveedor → confirmación → tracking →
   email al cliente → entrega → cierre`. Marca cada salto como AUTO o MANUAL.
2. **Enrutado al proveedor.** Define el mecanismo según lo que soporte:
   - Si tiene API → spec del webhook Base44 `pedido.pagado` → POST al proveedor.
   - Si es hoja/CSV → exportación programada (bot de Cowork) en el formato exacto
     que pide el proveedor (SKU, variante, dirección, método).
   - Si es panel/email → checklist humano diario + plantilla de pedido.
3. **Captura de tracking.** Define de dónde sale el número (API del proveedor,
   email de confirmación, panel) y cómo entra en Base44 (campo `tracking` del
   pedido). Programa la captura (bot) si no es push.
4. **Notificación al cliente.** Dispara el email "tu pedido va en camino" con el
   link de tracking (handoff a `emails-flows`). Define SLA: tracking comunicado
   en < 48 h desde el pago.
5. **Incidencias.** Define los 3 casos y su respuesta:
   - **Retraso** (sin movimiento de tracking X días) → email proactivo + abre caso.
   - **Pérdida** (sin entrega tras ventana máx.) → reenvío o reembolso (a `soporte-devoluciones`).
   - **Daño** → solicitud de foto + reposición.
6. **Tablero.** Emite a la plataforma de métricas (Drop Builder app) los estados de
   pedido para vigilar % entregado a tiempo y backlog de incidencias.

## Salida
- `specs/fulfillment-<tienda>.md` con la ruta, mecanismo de enrutado, SLA y árbol
  de incidencias.
- Lista de tareas en ClickUp para los pasos manuales/recurrentes.
- Si hay API de proveedor: spec del endpoint para `spec-base44`.

## Guardrails
- Nunca prometer tiempos de envío que el proveedor no cumple: usa SIEMPRE el
  tiempo real puerta a puerta + margen, no el optimista del proveedor.
- Pagos/reembolsos reales los ejecuta el humano.
- Direcciones de cliente = datos personales: tratamiento mínimo, sin reenvío a
  terceros fuera del proveedor de envío. Coordinar con páginas RGPD.

## Métrica de éxito
> % de pedidos con tracking comunicado en < 48 h y % entregado dentro de la
> ventana prometida. Ambos visibles en la plataforma de métricas.
