---
name: analizar-competidor
description: Decodifica una tienda de e-commerce de referencia (por URL) en un brief de replicación para Drop Builder — stack, modelo de tráfico, programa de creadores, motor SEO, precios, señales de confianza y upsells. Úsala cuando haya una URL de tienda a analizar o cuando Gonzalo diga "analiza este competidor", "decodifica esta tienda", "qué hace esta web" o similar.
---

# Skill: analizar-competidor

Convierte la URL de una tienda exitosa en un brief de replicación accionable.
Primer paso del flujo de tienda nueva.

## Cuándo se activa
- Hay una URL de tienda de referencia que decodificar.
- Investigación de cómo monetiza/escala un competidor (con fuentes legítimas).

## Entradas
- URL de la tienda. Opcional: sus handles sociales y nombre de marca.

## Proceso
1. **Navegación pública del sitio** (WebFetch / navegación legítima, NUNCA scraping
   que viole ToS). Extrae:
   - Nicho y categorías de producto.
   - Posicionamiento y mensaje del hero.
   - Rango de precios, bundles y upsells.
   - Señales de confianza: reseñas, garantías, promesas de envío, prueba social.
   - Programa de afiliados/creadores/embajadores y su mecánica.
   - Blog/SEO: volumen y tipos de artículo (clusters de intención).
   - Captura de email/popups.
   - Pistas de stack (Base44, Shopify, custom): huellas en meta/markup.
   - Uso de UGC/prueba social.
2. **Inteligencia de anuncios (oficial):** Meta Ad Library y TikTok Creative Center
   para ver ángulos creativos en uso. Solo fuentes oficiales.
3. **Decodifica el SISTEMA, no la tienda.** Traduce cada pieza a "cómo lo
   replicamos con nuestro stack" (Base44 + afiliados + métricas en Code).
4. **Marca riesgos de IP** del nicho del competidor (réplicas, marcas) → señala que
   nuestras tiendas pasan por `compliance-legal`.

## Salida
- `specs/decode-<dominio>.md`: brief de replicación con tabla pieza→réplica,
  ángulos SEO/UGC ganadores, lo que no se pudo ver (a revisar en vivo) e
  implicaciones para nuestro motor.
- Handoff al siguiente paso: `research-producto`.

## Guardrails
- Solo fuentes oficiales y navegación pública. **Nada de scraping ni evasión de
  ToS** de ninguna plataforma.
- No copiar marca, copy ni imágenes del competidor: se decodifica el sistema, se
  crea contenido propio.

## Métrica de éxito
> Un brief del que cualquiera podría reconstruir el modelo de negocio del
> competidor y aplicarlo a un producto legítimo propio.
