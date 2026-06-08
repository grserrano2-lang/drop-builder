---
name: sync-stock
description: Mantiene el stock de la tienda sincronizado con el proveedor para una tienda Drop Builder — evita vender lo agotado, marca rupturas y avisa de mínimos. Úsala al conectar el catálogo con el stock del proveedor, al diseñar el bot de sincronización, o cuando Gonzalo diga "sincroniza el stock", "que no se venda lo agotado", "alertas de stock" o similar.
---

# Skill: sync-stock

Garantiza que la tienda no venda lo que el proveedor no tiene. Cubre el bloque 4
(sincronización de stock) y alimenta las alertas del bloque 10.

## Cuándo se activa
- Tras importar el catálogo a Base44, para cablear el stock real.
- Diseño del bot de sincronización recurrente (Cowork).
- Configuración de umbrales de stock bajo y reglas de agotado.

## Entradas que necesito
- Fuente de stock del proveedor: API, feed (CSV/XML), panel o "bajo pedido".
- Frecuencia con que cambia el stock del proveedor (tiempo real vs. diario).
- Mapeo SKU/variante tienda ↔ SKU proveedor.

## Proceso
1. **Clasifica el modelo de stock:**
   - **Bajo pedido / stock alto siempre** → no hace falta sync continuo; basta un
     check periódico de discontinuados. (Caso común en dropshipping puro.)
   - **Stock limitado y variable** → sync programado obligatorio.
2. **Mapeo de SKUs.** Tabla tienda↔proveedor; sin mapeo no hay sync fiable. Marca
   variantes (talla/color) porque suelen agotarse por variante, no por producto.
3. **Mecanismo de sync** según fuente:
   - API/feed → bot de Cowork programado: lee stock → actualiza `productos.stock`
     en Base44 → registra cambios.
   - Sin feed → check manual periódico de discontinuados (checklist en ClickUp).
4. **Reglas de agotado.** Cuando `stock = 0`: ocultar/marcar "agotado" en el
   storefront y bloquear la compra de esa variante (nunca cobrar lo que no se
   puede servir → protege la pasarela y evita chargebacks).
5. **Umbral de stock bajo.** Define umbral por producto; al cruzarlo, emite alerta
   `stock_bajo` a la plataforma de métricas (tabla `alertas`).
6. **Reconciliación.** Tras cada sync, log de qué cambió (auditoría e incidencias).

## Salida
- `specs/sync-stock-<tienda>.md`: modelo de stock, mapeo, frecuencia, umbrales.
- Definición del bot recurrente para Cowork (qué lee, cada cuánto, qué escribe).
- Reglas de agotado para `spec-base44`.

## Guardrails
- Nunca permitir comprar producto sin stock confirmado: integridad ante la
  pasarela y el cliente por encima de "no perder la venta".
- El bot solo lee del proveedor y escribe stock en Base44; no toca precios ni
  pedidos.

## Métrica de éxito
> Cero pedidos de producto agotado y alertas de stock bajo con antelación
> suficiente para reponer. Visible en la plataforma de métricas.
