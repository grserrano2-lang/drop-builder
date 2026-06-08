---
name: research-producto
description: Investiga y valida productos para una tienda Drop Builder con foco en margen — shortlist con coste puesto en destino, precio de venta, comisión de creador y margen de contribución; descarta lo que no llega al umbral. Úsala al elegir producto para una tienda nueva o cuando Gonzalo diga "busca producto", "valida este producto", "calcula el margen", "shortlist de productos" o similar.
---

# Skill: research-producto

Encuentra y valida productos que cumplan la regla de oro del Drop Builder:
**margen ≥ 25-30 € por venta tras coste + envío + comisión del creador.** Si no
llega, no se lanza. Segundo paso del flujo.

## Cuándo se activa
- Selección de producto para una tienda nueva.
- Validación del margen de un producto candidato.

## Entradas
- Nicho/dirección (del brief de `analizar-competidor`) o producto candidato.
- Datos de proveedor/agente si ya los hay (coste, envío, tiempos).

## Proceso
1. **Genera shortlist** de candidatos en el nicho con criterios: demanda real,
   diferenciación, "wow" para UGC, peso/tamaño razonable (envío), sin estacionalidad
   extrema, y **sin riesgo de IP** (pre-filtro antes del gate de `compliance-legal`).
2. **Modelo de margen por candidato** (la decisión es numérica):
   ```
   Margen de contribución = Precio venta
                          − Coste producto (COGS)
                          − Envío puesto en destino
                          − Comisión del creador (15-30% del precio)
                          − Comisión de pasarela (~1.5-3% + fija)
   ```
   Regla: **margen ≥ 25-30 €**. Calcula también el % de margen.
3. **Realismo del proveedor:** tiempos reales puerta a puerta, sin mínimos,
   capacidad de muestra física. Sin muestra validada, el producto es hipótesis.
4. **Precio de venta** anclado al valor percibido y al mercado del competidor, no
   solo a un multiplicador de coste.
5. **Ranking** de la shortlist por margen y facilidad de UGC; recomienda el primero
   a validar con muestra.

## Salida
- `specs/research-<nicho>.md`: tabla de candidatos con coste, envío, precio,
  comisión, margen € y %, veredicto (lanzar / descartar / validar muestra).
- Recomendación priorizada + handoff a `compliance-legal`.

## Guardrails
- **El producto manda:** si el margen no llega al umbral, se descarta, no se fuerza.
- Pre-filtro de IP aquí; el gate duro es `compliance-legal` antes de construir.
- Muestra física antes de comprometer la tienda a un producto.

## Métrica de éxito
> Una shortlist con números reales donde el producto recomendado supera el umbral
> de margen y tiene proveedor fiable con muestra validable.
