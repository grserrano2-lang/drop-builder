# Spec de fulfillment y stock — Tienda 1

> Salida de `fulfillment` + `sync-stock`. Modelo: **dropshipping** con objetivo de
> entrega **~7 días** (proveedor con almacén UE / línea rápida). Decisiones del
> discovery: tracking automático, incidencias política estricta, devolución 14 días.

## A. Fulfillment (bloque 5)

### Ruta del pedido
`pago → captura del pedido → envío al proveedor → confirmación → tracking →
email al cliente → entrega → cierre`. Marcar cada salto AUTO o MANUAL según lo que
soporte el proveedor.

### Enrutado al proveedor
- **Si tiene API:** webhook `pedido.pagado` (Base44) → POST al proveedor con SKU,
  variante (talla/color), dirección y método. (Spec de servidor → `base44-tienda1`.)
- **Si es hoja/CSV o panel:** exportación programada (bot Cowork) en el formato del
  proveedor + checklist humano diario.

### Tracking → cliente (automático)
- Captura del número (API/email/panel) → campo `tracking` del pedido.
- Dispara el email "pedido enviado" con el enlace (copy #52b). **SLA: tracking
  comunicado < 48 h** desde el pago.

### Incidencias (política estricta, con matiz anti-chargeback)
- **Retraso** (tracking sin movimiento X días) → email proactivo (#52c) + abrir caso.
- **Pérdida** (sin entrega tras ventana máx.) → reenvío o reembolso.
- **Daño** → solicitud de foto + reposición.
- ⚠️ **Aviso:** con plazos largos, una política DEMASIADO estricta dispara
  chargebacks (umbral 1%). Recomendación: estricto en validar, **rápido en resolver**
  (#66). El reembolso real lo aprueba Gonzalo.

### Devoluciones
14 días (derecho de desistimiento UE, obligatorio). Proceso RMA en
`soporte-devoluciones` / `templates/soporte`.

## B. Sincronización de stock (bloque 4)
- **Modelo:** dropshipping → no hay stock propio; el riesgo es vender productos
  **discontinuados** por el proveedor.
- **Mapeo SKU** tienda ↔ proveedor por **variante** (talla/color se agotan por
  variante, no por producto).
- **Sync:**
  - Con API/feed → bot Cowork programado: lee disponibilidad → actualiza
    `productos.stock` en Base44 → log de cambios.
  - Sin feed → check periódico de discontinuados (checklist en el CRM / Kanban).
- **Regla de agotado:** `stock = 0` → ocultar/marcar "agotado" y **bloquear la
  compra** de esa variante (nunca cobrar lo que no se puede servir → protege la
  pasarela y evita chargebacks).
- **Umbral de stock bajo:** emite alerta `stock_bajo`/`stock_agotado` al CRM (ya
  implementado en `/api/cron/check-alerts`).

## C. Enganches con el CRM
- Estado de pedido + tracking → CRM (`/api/ingest`) para vigilar % entregado a tiempo.
- Alertas de stock → tabla `alertas` (Telegram).
- **Idea pendiente (#3 del log):** panel de salud del proveedor (plazo real medio,
  % incidencias) para vigilar al proveedor, que es el mayor riesgo del modelo.

## Guardrails
Plazos de envío **honestos** (el real, no el optimista). Nunca cobrar producto sin
stock. Reembolsos = los aprueba el humano. Datos del cliente: tratamiento mínimo (RGPD).

## Métrica de éxito
% de pedidos con tracking < 48 h y % entregado dentro de la ventana prometida,
visibles en el CRM.
