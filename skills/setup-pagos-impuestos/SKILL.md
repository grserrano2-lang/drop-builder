---
name: setup-pagos-impuestos
description: Prepara la base legal y de cobro de una tienda Drop Builder — entidad, cuenta de negocio, pasarela aprobada, IVA/IOSS y páginas legales (términos, privacidad/RGPD, cookies, envíos, devoluciones, aviso legal). Úsala al arrancar una tienda nueva o cuando Gonzalo diga "monta los pagos", "páginas legales", "IVA/IOSS", "configurar la pasarela" o similar.
---

# Skill: setup-pagos-impuestos

Deja lista la base legal/fiscal y de cobro para que la tienda pueda vender en
regla. Cubre el bloque 1. **Crítico:** los pasos irreversibles los ejecuta el
humano; yo preparo todo y dejo el checklist.

## Cuándo se activa
- Arranque de una tienda nueva (en paralelo a producto y tienda técnica).
- Preparación de las páginas legales.
- Dudas de IVA/IOSS antes de escalar.

## Entradas que necesito
- País de la entidad y mercados a los que se vende (define IVA/IOSS).
- Datos de la entidad/autónomo (razón social, dirección, ID fiscal) — para las
  páginas legales.
- Pasarela elegida y su política de productos.
- Política comercial (plazos de envío, devoluciones) de las otras skills.

## Proceso
1. **Checklist legal/cobro** (qué hace el humano, qué preparo yo):
   - Entidad/alta fiscal ......... humano (con asesor)
   - Cuenta de negocio .......... humano
   - Pasarela aprobada .......... humano (yo preparo la descripción del negocio)
   - IVA/IOSS ................... humano + asesor (yo dejo el análisis)
   - Páginas legales ............ **las redacto yo** (borrador)
2. **Análisis IVA/IOSS** (informativo, NO asesoría fiscal):
   - Ventas B2C intra-UE → régimen OSS/IOSS según umbral e importación.
   - Importación de bajo valor → IOSS para recaudar IVA en el checkout.
   - Deja un resumen claro de qué preguntar al asesor. **Recordar: validar con un
     asesor antes de escalar** (guardrail del prompt maestro).
3. **Páginas legales** (borradores en `templates/legal/`, parametrizados):
   - Términos y condiciones · Política de privacidad (RGPD) · Política de cookies ·
     Política de envíos · Política de devoluciones · Aviso legal.
   Coherentes con `fulfillment`, `soporte-devoluciones` y `emails-flows`.
4. **Descripción del negocio para la pasarela.** Texto honesto de qué se vende
   (producto legítimo) para la aprobación. **Nunca engañar a la pasarela sobre la
   naturaleza del producto** (guardrail).
5. **Checkout fiscal.** Define si el precio incluye IVA, cómo se muestra y cómo se
   recauda en destino (IOSS).

## Salida
- `templates/legal/` con los 6 borradores parametrizados por tienda.
- `specs/pagos-impuestos-<tienda>.md`: checklist humano/IA, análisis IVA/IOSS,
  descripción para la pasarela.
- Lista de preguntas para el asesor fiscal.

## Guardrails
- **No soy asesor legal ni fiscal.** Los borradores son punto de partida; revisión
  profesional obligatoria antes de publicar/escalar.
- Pasarela, entidad, cuenta y altas fiscales = humano.
- Honestidad absoluta con la pasarela sobre el producto.
- RGPD real en privacidad/cookies, no copia-pega genérico.

## Métrica de éxito
> Tienda con pasarela aprobada, IVA/IOSS resuelto con el asesor y las 6 páginas
> legales publicadas y coherentes con la operación real.
