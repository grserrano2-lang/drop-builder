# Plantillas de email — Drop Builder

> Borradores parametrizados. Salida de `emails-flows`. Un solo CTA por email.
> Plazos de envío SIEMPRE realistas (coherentes con `fulfillment`).

Placeholders: `{{NOMBRE_TIENDA}}` `{{NOMBRE_CLIENTE}}` `{{NUM_PEDIDO}}`
`{{RESUMEN_PEDIDO}}` `{{IMPORTE}}` `{{PLAZO_ENVIO}}` `{{LINK_TRACKING}}`
`{{LINK_CARRITO}}` `{{PRODUCTO}}` `{{LINK_RESENA}}` `{{LINK_BAJA}}`

---

## TRANSACCIONALES

### 1. Confirmación de pedido  · disparo: pedido.pagado
**Asunto:** ✅ Pedido {{NUM_PEDIDO}} confirmado
Hola {{NOMBRE_CLIENTE}}, hemos recibido tu pedido. {{RESUMEN_PEDIDO}} — Total
{{IMPORTE}}. Lo preparamos ya; te avisamos al enviarlo. Entrega estimada:
{{PLAZO_ENVIO}}.

### 2. Pedido enviado + tracking · disparo: tracking capturado
**Asunto:** 📦 Tu pedido {{NUM_PEDIDO}} va en camino
Ya está en ruta. Sigue tu envío aquí: {{LINK_TRACKING}}. Entrega estimada
{{PLAZO_ENVIO}}.  [CTA: Ver seguimiento]

### 3. Incidencia/retraso · disparo: tracking sin movimiento X días
**Asunto:** Actualización de tu pedido {{NUM_PEDIDO}}
Tu envío está tardando más de lo previsto. Estamos encima; aquí el estado:
{{LINK_TRACKING}}. Si necesitas algo, responde a este email.

## CICLO DE VIDA

### 4. Carrito abandonado (secuencia 1h / 24h / 72h) · disparo: carrito abandonado
- **1h — Asunto:** ¿Se te olvidó algo? Tu {{PRODUCTO}} te espera → {{LINK_CARRITO}}
- **24h — Asunto:** Resolvemos tus dudas sobre {{PRODUCTO}} (maneja objeción típica)
- **72h — Asunto:** Última llamada para {{PRODUCTO}} (incentivo suave si procede)
- *Salida de la secuencia:* si compra, se corta.

### 5. Post-compra / cuidado · disparo: entrega estimada + N días
**Asunto:** Saca el máximo a tu {{PRODUCTO}}
Consejos de uso/cuidado (enlaza al contenido SEO del blog). Sin venta, solo valor.

### 6. Petición de reseña · disparo: entrega + N días
**Asunto:** ¿Qué te ha parecido tu {{PRODUCTO}}?
Tu opinión nos ayuda muchísimo. Deja tu reseña (y foto si quieres): {{LINK_RESENA}}.

### 7. Win-back (fase posterior) · disparo: inactividad
**Asunto:** Te echamos de menos en {{NOMBRE_TIENDA}}
Novedades + motivo para volver.

---
> Pie de los de marketing: enlace de baja {{LINK_BAJA}} (RGPD). Transaccionales no
> lo requieren. Verificar SPF/DKIM/DMARC del dominio antes de enviar en volumen.
