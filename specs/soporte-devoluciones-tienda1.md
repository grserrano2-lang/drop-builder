# Spec de soporte y devoluciones (RMA) — Tienda 1

> Salida de `soporte-devoluciones`. Decisiones del discovery: soporte **24/7 con IA**
> (responde todo salvo dinero), **IA inicia devoluciones / Gonzalo aprueba** el
> reembolso, selector de idioma, dropshipping. Va con la FAQ
> (`templates/soporte/tienda1/faq.md`) y los emails.

## 1. Canales y SLA
- **Email** (base) + **chat en la tienda**; multi-idioma (selector).
- **SLA:** primera respuesta < 24 h (objetivo real con IA: minutos).

## 2. Agente IA (alcance #61/#62)
- **Solo lectura** sobre pedidos: estado, tracking, tallas, política.
- Responde con la FAQ + el estado real del pedido. **No inventa** plazos/políticas.
- **Escala a humano** SIEMPRE cualquier acción con dinero (reembolso/cancelación) y
  los casos sensibles (queja grave, mención de chargeback/abogado).

## 3. Flujo RMA (devoluciones)
`solicitud → validación (¿en plazo 14 días? ¿motivo? ¿estado?) → instrucciones →
recepción/validación → reembolso o cambio → cierre`.
- **Derecho de desistimiento UE: 14 días** (obligatorio).
- **Reembolso real:** lo aprueba/ejecuta Gonzalo (la IA solo tramita y prepara).

## 4. Matiz dropshipping (importante)
Devolver físicamente a China suele costar más que el producto. Política recomendada
por tramos (a confirmar con números reales):
- **Defectuoso/dañado o talla errónea por nuestra culpa:** foto → **reposición o
  reembolso sin pedir devolución** (más barato y mejor experiencia).
- **Desistimiento (no le gusta):** derecho legal 14 días; si el coste de retorno es
  alto, valorar reembolso parcial/total sin retorno físico caso a caso.
- Dejar la política pública **coherente** con lo que se hace de verdad (#94, #97).

## 5. Anti-chargeback (#66)
Resolver **rápido y por escrito** antes de que el cliente reclame al banco. Si
alguien menciona chargeback → prioridad máxima + escalado. El ratio se vigila en el
CRM (umbral 1%, alertas a Telegram).

## 6. Casos de NO devolución
Fuera de plazo, producto usado/dañado por el cliente, artículos personalizados (si
los hubiera). Comunicarlo con claridad y empatía.

## 7. Métricas
- **Tiempo de primera respuesta** (<24 h), **CSAT** post-resolución (#67),
  **ratio de chargebacks** y **% devoluciones**. Visibles/al CRM.

## 8. Guardrails
La IA nunca mueve dinero sola. Honestidad total en la política (la pública = la real).
Datos del cliente: tratamiento mínimo (RGPD).
