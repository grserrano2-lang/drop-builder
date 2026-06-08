---
name: compliance-legal
description: Gate de compliance OBLIGATORIO antes de construir una tienda Drop Builder — verifica que el producto no infringe marca/patente/derechos de terceros y que el negocio es legítimo. Si infringe, STOP y propone alternativa legítima. Úsala antes de cualquier build, o cuando Gonzalo diga "check de compliance", "esto infringe?", "revisa la IP", "es legal vender esto" o similar.
---

# Skill: compliance-legal

El guardarraíl duro del sistema. **Ninguna tienda se construye sin pasar este
gate.** Cubre el bloque de compliance del prompt maestro (principio 5).

## Cuándo se activa
- **SIEMPRE antes de `spec-base44`** (paso 3 del flujo de tienda nueva).
- Ante cualquier duda de marca/patente/legalidad de un producto.

## Entradas
- Producto candidato (de `research-producto`): qué es, marca, diseño, claims.
- Mercados de venta.

## Proceso (check de IP obligatorio)
1. **Marcas registradas.** ¿El producto usa logos, nombres, escudos o diseños de
   marcas/clubes/personas? → riesgo alto. Réplicas y "inspirado en <marca>" = STOP.
2. **Patentes/diseño.** ¿Copia una invención o diseño protegido? → riesgo.
3. **Derechos de autor / imagen.** Personajes, obras, imagen de personas.
4. **Producto regulado.** Salud, cosmética, alimentación, eléctrico (CE),
   menores → requisitos extra; marca para revisión especializada.
5. **Claims.** Promesas de salud/resultados sin respaldo = riesgo legal y de
   pasarela.
6. **Veredicto:**
   - ✅ **Legítimo** → sigue a `spec-base44`.
   - ⚠️ **Riesgo gestionable** → condiciones a cumplir antes de lanzar.
   - ⛔ **Infringe** → **STOP** y propón una alternativa legítima en el mismo nicho
     (producto genérico/propio sin marca de terceros).

## Salida
- `specs/compliance-<producto>.md`: checklist de IP, veredicto y, si aplica, la
  alternativa legítima propuesta.
- Decisión binaria explícita: CONSTRUIR / NO CONSTRUIR.

## Guardrails
- **No soy abogado.** Esto es diligencia razonable, no dictamen legal; casos
  límite → abogado de IP antes de lanzar.
- Cero tolerancia con infracción de marca/patente: ante la duda real, NO se lanza.
- Nunca diseñar para engañar a la pasarela sobre el producto.

## Métrica de éxito
> Cada tienda construida tiene un veredicto ✅ documentado; ningún producto con
> infracción llega a build.
