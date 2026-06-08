---
name: crear-creatividades
description: Genera copy, guiones de UGC y briefs para creadores de una tienda Drop Builder, partiendo de los ángulos ganadores de inteligencia-ugc — ganchos, guiones de vídeo, copy de anuncio/ficha y briefs accionables. Úsala para producir creatividades de una tienda o cuando Gonzalo diga "crea creatividades", "guiones de UGC", "copy del producto", "briefs para creadores" o similar.
---

# Skill: crear-creatividades

Convierte ángulos en material listo para producir: copy, guiones de UGC y briefs
para creadores. Paso 6 del flujo. Toma input de `inteligencia-ugc`.

## Cuándo se activa
- Producción de creatividades para una tienda nueva.
- Nuevo lote de guiones/briefs para activar creadores.
- Copy de ficha de producto, anuncios o landing del creador.

## Entradas
- Ángulos ganadores (de `inteligencia-ugc`).
- Producto, precio, propuesta de valor, mercado/idioma.
- Restricciones de claims (de `compliance-legal`).

## Qué produce
1. **Guiones de UGC** (por ángulo): hook de 3 s, desarrollo (problema→producto→
   prueba), CTA con el código del creador. Formato vertical, duración objetivo,
   indicaciones de plano. Tono natural de creador, no anuncio corporativo.
2. **Briefs para creadores:** qué grabar, qué decir/no decir, do's & don'ts de
   marca, entregables y plazos. Accionable sin más explicación.
3. **Copy de ficha de producto:** título, bullets de beneficio, descripción,
   manejo de objeciones, prueba social.
4. **Copy de anuncios** (para cuando se escale a Meta): variantes de primary text +
   headline por ángulo.
5. **Copy de la página pública del creador** (handoff a `plataforma-afiliados`).

## Salida
- `templates/creatividades/<tienda>/`: guiones, briefs y copy parametrizados.
- Lote priorizado de 3-5 ángulos listos para activar creadores.

## Guardrails
- **Claims honestos:** nada de promesas de salud/resultados sin respaldo
  (coherente con `compliance-legal`).
- Contenido original; inspiración en ángulos, no copia de creatividades ajenas.
- Disclosure de publicidad cuando aplique (#ad/colaboración).
- Voz del creador real; el brief guía, no encorseta hasta sonar falso.

## Métrica de éxito
> Briefs y guiones con los que un creador produce vídeo sin preguntas, y copy de
> ficha que convierte. Medible vía atribución por creador en la plataforma.
