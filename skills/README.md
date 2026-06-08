# Skills — Drop Builder

Las 14 skills del prompt maestro, en formato Claude Code (`<nombre>/SKILL.md`).
Fuente de la verdad en este repo.

## Catálogo
**Flujo de lanzamiento de tienda (en orden):**
1. `analizar-competidor` — decodifica una tienda de referencia → brief de réplica.
2. `research-producto` — shortlist validada por margen (≥ 25-30 €).
3. `compliance-legal` — **gate de IP obligatorio** antes de construir.
4. `spec-base44` — plano de la tienda en Base44.
5. `plataforma-afiliados` — motor de creadores a comisión (va con la 4).
6. `crear-creatividades` — copy + guiones UGC + briefs.
7. `reportes-kpis` — KPIs y decisión matar/escalar.

**Bloques operativos:**
- `setup-pagos-impuestos` — entidad, pasarela, IVA/IOSS, páginas legales.
- `fulfillment` — ruta del pedido al proveedor + tracking + incidencias.
- `sync-stock` — sincronización de stock, agotados y alertas.
- `emails-flows` — transaccionales + ciclo de vida (abandono, reseña…).
- `soporte-devoluciones` — soporte, RMA, agente IA opcional.
- `analitica-tracking` — pixel/GTM/GA4/CAPI + atribución por creador.
- `inteligencia-ugc` — ángulos ganadores vía fuentes oficiales.

## Cómo activarlas (lo haces tú — requiere tu permiso)
Estas skills viven en el repo pero no están instaladas en mi set de skills
(la instalación automática toca mi config de arranque y requiere tu OK). Para
activarlas e invocarlas con `/<nombre>`, elige una opción:

- **Opción A (symlink, global):** enlazar cada carpeta en `~/.claude/skills/`.
  ```bash
  for d in ~/drop-builder/skills/*/; do
    ln -sfn "$d" "$HOME/.claude/skills/$(basename "$d")"
  done
  ```
- **Opción B (proyecto):** trabajar dentro de `~/drop-builder` y mover/enlazar las
  skills a `~/drop-builder/.claude/skills/` para que sean skills de proyecto.

Dime cuál prefieres y lo dejo hecho (con tu permiso).

## Convenciones
- Cada skill declara: cuándo se activa, entradas, proceso, salida, guardrails y
  métrica de éxito.
- Salidas estándar en `specs/<algo>-<tienda>.md` y `templates/...`.
- Guardrails del prompt maestro incrustados: compliance primero, solo fuentes
  oficiales (nada de scraping/ToS), pasos irreversibles → humano.
