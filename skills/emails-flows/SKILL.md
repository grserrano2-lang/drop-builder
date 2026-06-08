---
name: emails-flows
description: Diseña los emails transaccionales y flujos de ciclo de vida de una tienda Drop Builder — confirmación de pedido, envío con tracking, carrito abandonado, post-compra y petición de reseña, con foco en entregabilidad. Úsala al montar el email de una tienda nueva o cuando Gonzalo diga "monta los emails", "flujo de carrito abandonado", "email de reseña" o similar.
---

# Skill: emails-flows

Define el sistema de emails de una tienda: los transaccionales (obligatorios) y
los de ciclo de vida (recuperan ventas y piden reseñas). Cubre el bloque 6.

## Cuándo se activa
- Montaje del email de una tienda nueva (tras storefront + fulfillment).
- Diseño/ajuste de un flujo concreto (abandono, post-compra, reseña).
- Problemas de entregabilidad (emails al spam).

## Entradas que necesito
- Proveedor de email transaccional disponible (define entregabilidad).
- Dominio de la tienda (para autenticación SPF/DKIM/DMARC).
- Idioma y tono del mercado de la tienda.
- Eventos disponibles en Base44 (pedido pagado, enviado, carrito abandonado).

## Catálogo de emails
**Transaccionales (imprescindibles, se disparan por evento):**
1. **Confirmación de pedido** — al pagar. Resumen, importe, qué pasa ahora, plazo
   realista de envío.
2. **Pedido enviado + tracking** — al capturar tracking (handoff de `fulfillment`).
   Link de seguimiento y fecha estimada.
3. **Incidencia/retraso** — proactivo si el tracking no se mueve.

**Ciclo de vida (recuperan/fidelizan):**
4. **Carrito abandonado** — secuencia 3 toques (1 h / 24 h / 72 h). Recordatorio →
   resolver objeción → incentivo suave si procede.
5. **Post-compra / onboarding** — tras la entrega estimada: cómo usar/cuidar el
   producto (enlaza con el contenido SEO).
6. **Petición de reseña** — X días tras la entrega; pide reseña/foto (alimenta
   prueba social y UGC).
7. **Win-back** — recompra a los inactivos (fase posterior).

## Proceso
1. **Entregabilidad primero.** Verifica SPF/DKIM/DMARC del dominio antes de enviar
   nada en volumen. Sin autenticación, todo va al spam. (Configuración DNS = la
   ejecuta el humano; yo dejo los registros exactos a poner.)
2. **Mapea evento→email.** Cada email cuelga de un evento de Base44; documenta el
   disparador y el retardo.
3. **Redacta** asunto + cuerpo por email, en el idioma del mercado, con un único
   CTA claro. Plantillas base en `templates/emails/`.
4. **Secuencias.** Define tiempos y condición de salida (p.ej. abandono se corta si
   compra).
5. **Medición.** Tasa de apertura/clic y ventas recuperadas → a la plataforma de
   métricas si el proveedor expone datos.

## Salida
- `specs/emails-<tienda>.md`: mapa evento→email, tiempos, secuencias.
- Borradores de copy en `templates/emails/` (reutilizables, parametrizados).
- Registros DNS exactos para que el humano configure entregabilidad.

## Guardrails
- Cumplir RGPD/consentimiento: marketing solo con opt-in; transaccional siempre OK.
- Incluir baja clara en los de marketing.
- Plazos de envío honestos (coherentes con `fulfillment`).
- No comprar listas ni enviar a quien no consintió.

## Métrica de éxito
> Transaccionales entregados (no spam) + ventas recuperadas por el flujo de
> abandono y tasa de reseña por post-compra.
