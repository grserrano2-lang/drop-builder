# Copy final de emails — Tienda 1 (listo para usar)

> Salida de `emails-flows`. Copy completo (asunto + cuerpo) para pegar en el
> proveedor de email. Tono cercano de aficionado. Un solo CTA por email. Plazos de
> envío SIEMPRE honestos. Base en español; **traducir por mercado** (multi-idioma).
> Placeholders: `{{MARCA}}` `{{NOMBRE}}` `{{NUM_PEDIDO}}` `{{PRODUCTO}}`
> `{{IMPORTE}}` `{{PLAZO}}` `{{LINK_TRACKING}}` `{{LINK_CARRITO}}` `{{LINK_RESENA}}`
> `{{DESC}}` `{{LINK_BAJA}}`.

## Transaccionales

### 52a · Confirmación de pedido · disparo: pedido.pagado
**Asunto:** ✅ ¡Gol! Tu pedido {{NUM_PEDIDO}} está confirmado
Hola {{NOMBRE}}, hemos recibido tu pedido en {{MARCA}} 🙌
Resumen: {{PRODUCTO}} — Total {{IMPORTE}}.
Lo estamos preparando. Te avisamos en cuanto salga, con su seguimiento.
Entrega estimada: **{{PLAZO}}**.
¿Dudas? Responde a este email, leemos todo.

### 52b · Pedido enviado + tracking · disparo: tracking capturado
**Asunto:** 📦 Tu {{PRODUCTO}} ya está en camino
¡Buenas noticias, {{NOMBRE}}! Tu pedido {{NUM_PEDIDO}} va para tu casa.
Sigue el envío aquí 👉 {{LINK_TRACKING}}
Entrega estimada: {{PLAZO}}. Cuando llegue, etiquétanos al lucirla 😉

### 52c · Incidencia / retraso · disparo: tracking sin movimiento X días
**Asunto:** Una actualización sobre tu pedido {{NUM_PEDIDO}}
Hola {{NOMBRE}}, tu envío está tardando un poco más de lo previsto y queríamos
avisarte nosotros antes de que te preguntaras. Estado actual: {{LINK_TRACKING}}.
Estamos encima; si prefieres que te ayudemos, responde y lo resolvemos.

## Ciclo de vida

### 53 · Carrito abandonado (3 toques)
- **1 h — Asunto:** ¿Se te quedó {{PRODUCTO}} en el banquillo?
  Lo tienes guardado, vuelve cuando quieras 👉 {{LINK_CARRITO}}
- **24 h — Asunto:** ¿Te frenó la talla? Te echamos una mano
  Resolvemos dudas de tallaje/envío. Tu carrito sigue aquí: {{LINK_CARRITO}}
- **72 h — Asunto:** Última jugada para tu {{PRODUCTO}}
  Por si te decides: {{DESC}} con el código de abajo. {{LINK_CARRITO}}
  *(Sale de la secuencia si compra.)*

### 54 · Post-compra / cuidado · disparo: entrega + N días
**Asunto:** Cuida tu {{PRODUCTO}} para que dure como el primer día
Hola {{NOMBRE}}, gracias por confiar en {{MARCA}}. Tres consejos para mantener tu
camiseta impecable: [lavado del revés, agua fría, sin secadora]. Más en el blog 👇
*(Sin venta, solo valor.)*

### 54b · Petición de reseña (incentivada, real) · disparo: entrega + N días
**Asunto:** ¿Cómo te queda? Tu opinión vale un descuento
{{NOMBRE}}, ¿qué tal tu {{PRODUCTO}}? Déjanos una reseña honesta (foto si quieres) y
te damos **{{DESC}} en tu próximo pedido** como gracias. 👉 {{LINK_RESENA}}
*(Reseñas reales y verificadas únicamente.)*

### 57 · Win-back · disparo: inactividad
**Asunto:** Te hemos guardado el sitio en la grada, {{NOMBRE}}
Han caído novedades en {{MARCA}}. Vuelve a echar un vistazo 👉 [novedades]

### 59 · Aviso de drop · disparo: nuevo lanzamiento
**Asunto:** 🚨 Drop nuevo en {{MARCA}} (unidades limitadas)
Acaba de salir {{PRODUCTO}}. Cuando vuela, vuela. Míralo antes de que se agote 👉

### 55 · Bienvenida (captura de email) · disparo: alta en lista
**Asunto:** Bienvenido a {{MARCA}} — aquí tienes tu {{DESC}}
Gracias por unirte. Aquí va tu descuento de bienvenida para estrenar: [código].
Te contaremos drops y novedades (sin spam, prometido).

---
> Pie de los de marketing: enlace de baja {{LINK_BAJA}} (RGPD). Los transaccionales
> no lo requieren. Verificar SPF/DKIM/DMARC (#51) antes de enviar en volumen, o todo
> esto cae en spam.
