---
name: soporte-devoluciones
description: Monta el soporte al cliente y el proceso de devoluciones/reembolsos (RMA) de una tienda Drop Builder — canales, agente IA opcional conectado a pedidos, y flujo realista de devolución. Úsala al montar el soporte de una tienda nueva o cuando Gonzalo diga "monta el soporte", "proceso de devoluciones", "RMA", "atención al cliente" o similar.
---

# Skill: soporte-devoluciones

Diseña cómo se atiende al cliente y cómo se gestionan devoluciones y reembolsos
sin fricción ni chargebacks. Cubre el bloque 7.

## Cuándo se activa
- Montaje del soporte de una tienda nueva.
- Diseño del proceso de devoluciones/RMA.
- Configuración de un agente IA de soporte conectado a pedidos.

## Entradas que necesito
- Canales disponibles (email, WhatsApp, chat en la tienda).
- Política comercial: plazo de devolución, quién paga el envío de vuelta, casos de
  reembolso vs. reposición.
- Acceso a pedidos en Base44 (para responder con contexto real).

## Proceso
1. **Canales.** Define los canales y el SLA de respuesta (objetivo: primera
   respuesta < 24 h). Email como base; WhatsApp/chat si el mercado lo pide.
2. **Macros de soporte.** Redacta respuestas plantilla para los casos típicos:
   "¿dónde está mi pedido?", cambio de talla/variante, producto defectuoso,
   cancelación, devolución. → `templates/soporte/`.
3. **Proceso de devolución (RMA) realista:**
   `solicitud → validación (¿en plazo? ¿motivo?) → instrucciones de envío →
   recepción/validación → reembolso o reposición → cierre`.
   Documenta plazos, quién asume el envío y los casos de NO devolución.
4. **Política pública.** Genera la página de devoluciones coherente con el proceso
   real (enlaza con `setup-pagos-impuestos` y páginas legales). Nada de prometer lo
   que no se cumple.
5. **Agente IA de soporte (opcional).** Si se activa: conectarlo de solo-lectura a
   pedidos para responder estado/tracking; SIEMPRE escala a humano cualquier acción
   con dinero (reembolso, cancelación). Define el prompt y los límites.
6. **Anti-chargeback.** Resolver rápido y por escrito ANTES de que el cliente
   reclame al banco. Vigila el ratio de chargebacks → alerta en la plataforma de
   métricas; un pico es señal de problema de producto/envío.

## Salida
- `specs/soporte-<tienda>.md`: canales, SLA, flujo RMA, política pública.
- Macros en `templates/soporte/`.
- Si hay agente IA: su prompt, alcance (solo-lectura) y reglas de escalado.

## Guardrails
- Reembolsos/cancelaciones reales = los ejecuta el humano (o con su aprobación
  explícita). El agente IA nunca mueve dinero solo.
- Datos del cliente: tratamiento mínimo, RGPD.
- Honestidad total en la política: la página pública = el proceso real.

## Métrica de éxito
> Tiempo de primera respuesta < 24 h, ratio de chargebacks bajo control, y
> devoluciones cerradas sin escalar al banco.
