---
name: plataforma-afiliados
description: Especifica la plataforma de afiliados de creadores en Base44 para Drop Builder — modelo de datos (Creador, Venta atribuida, Liquidación), registro con código único, página pública del creador, dashboard y admin de colaboradores, con atribución por código + UTM en el checkout. Úsala al montar el programa de creadores de una tienda o cuando Gonzalo diga "plataforma de afiliados", "programa de creadores", "página del creador", "comisiones" o similar.
---

# Skill: plataforma-afiliados

Especifica el motor de creadores a comisión — el canal de tráfico principal del
Drop Builder (UGC primero, ads después). Se reutiliza en cada tienda. Va con
`spec-base44`. (La referencia thefootballvibe.com usa exactamente este modelo:
páginas individuales por colaborador.)

## Cuándo se activa
- Montaje del programa de creadores de una tienda nueva.
- Ajustes del modelo de comisiones, atribución o páginas del creador.

## Modelo de datos (entidades Base44)
- **Creador:** nombre, handle, **código único** de descuento/atribución,
  % comisión (estándar 15-30%), estado (activo/pausado/baja), datos de pago.
- **Venta atribuida:** pedido ↔ creador, importe atribuido, comisión devengada.
- **Liquidación:** periodo, suma de comisiones, estado de pago (el pago real lo
  ejecuta el humano).

## Páginas
1. **Registro de creador** → genera código único automáticamente.
2. **Página pública del creador** → su escaparate + su código para sus fans
   (es su landing para convertir su audiencia).
3. **Dashboard del creador** → sus ventas, comisión devengada, pagos, materiales
   (creatividades de `crear-creatividades`).
4. **Admin de colaboradores** → alta/baja, % comisión, liquidaciones, exportación.

## Atribución (el núcleo)
- **Código de descuento único** + **UTM** del creador, registrados en el checkout
  en tiempo real → `pedido.creador_id`. El código manda sobre el UTM en conflicto.
- Se propaga a `ventas_atribuidas` y a la plataforma de métricas (ROI por creador).
- Coordina con `analitica-tracking` para el lado de medición.

## Proceso operativo
- **Acuerdo por escrito** con cada creador ANTES de activarlo (términos, comisión,
  uso de marca, exclusividad si aplica).
- Materiales listos en su dashboard.
- Liquidación periódica → el humano paga.

## Salida
- `specs/afiliados-<tienda>.md`: modelo de datos, páginas, mecánica de atribución,
  flujo de liquidación.
- Plantilla de acuerdo de creador → `templates/legal/acuerdo-creador.md`.

## Guardrails
- **Pagos reales = humano.** La plataforma calcula y liquida; no paga sola.
- Acuerdo firmado antes de activar a un creador.
- Atribución honesta y trazable; nada de inflar comisiones.

## Métrica de éxito
> Creadores con su página y código activos, ventas atribuidas en tiempo real y
> ROI por creador visible en la plataforma de métricas.
