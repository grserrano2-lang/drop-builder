# Macros de soporte — Drop Builder

> Respuestas plantilla. Salida de `soporte-devoluciones`. Tono cercano y honesto.
> Acciones con dinero (reembolso/cancelación) = humano.

Placeholders: `{{NOMBRE_CLIENTE}}` `{{NUM_PEDIDO}}` `{{LINK_TRACKING}}`
`{{PLAZO_ENVIO}}` `{{PLAZO_DEVOLUCION}}`

---

### ¿Dónde está mi pedido?
Hola {{NOMBRE_CLIENTE}}, tu pedido {{NUM_PEDIDO}} está en ruta. Sigue el estado
aquí: {{LINK_TRACKING}}. Entrega estimada {{PLAZO_ENVIO}}. Cualquier cosa, aquí
estamos.

### Cambio de talla/variante
Sin problema. Si aún no ha salido, lo ajustamos. Si ya se envió, gestionamos el
cambio según nuestra política ({{PLAZO_DEVOLUCION}}). ¿Qué talla/variante quieres?

### Producto defectuoso/dañado
Lo sentimos mucho. ¿Nos envías una foto del problema y del pedido {{NUM_PEDIDO}}?
Con eso gestionamos reposición o solución sin coste para ti.

### Solicitud de cancelación
Si el pedido aún no ha salido, podemos cancelarlo. *(Acción de reembolso → escalar
a humano.)* Confírmame y lo tramitamos.

### Solicitud de devolución (RMA)
Aceptamos devoluciones dentro de {{PLAZO_DEVOLUCION}} con el producto en
condiciones. Pasos: 1) confirmas motivo, 2) te envío instrucciones, 3) al recibirlo
y validarlo, procesamos reembolso/reposición. *(Reembolso → humano.)*

### Pregunta pre-compra
Encantados de ayudarte a decidir. [Responder objeción concreta con honestidad; no
prometer lo que el producto no hace.]

---
> Si el cliente menciona reclamar al banco/chargeback: priorizar resolución por
> escrito YA y escalar (protege el ratio de chargebacks → alerta en métricas).
