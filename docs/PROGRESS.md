# Drop Builder — Progreso de construcción autónoma

> Sesión autónoma del 2026-06-08 (Gonzalo en el gimnasio, ~2h).
> Decisiones: repo nuevo `~/drop-builder` · motor genérico · referencia
> `thefootballvibe.com` · **prioridad SKILLS primero**.

## TL;DR para cuando vuelvas
Hecho y **verificado**:
1. **14 skills** del catálogo del prompt maestro, en `skills/<nombre>/SKILL.md`
   (las 6 que faltaban + las 8 "existentes" convertidas en skills reales).
2. **Decode de la tienda de referencia** → `specs/decode-thefootballvibe.md`.
   Hallazgo clave: **thefootballvibe.com está sobre Base44** y usa exactamente el
   modelo del playbook → stack validado por una tienda real.
3. **Plataforma de métricas** (Next.js + Neon + Vercel) **construida y funcionando**
   en modo mock: 6 páginas de dashboard + 4 endpoints + crons + tests.
4. **Plantillas** legales, de email y de soporte que las skills referencian.

Verificación: `npm run build` ✅ verde · `npm test` ✅ 9/9 · server arranca,
`/api/health` OK, `/api/ingest` exige token (401 sin él), dashboard renderiza.
**Next.js subido a 15.5.19** (el 15.1.6 inicial tenía un CVE).

## Estado por bloque
| Bloque | Estado |
|---|---|
| Estructura repo + git | ✅ |
| Decode tienda referencia | ✅ `specs/decode-thefootballvibe.md` |
| **Skills (14)** | ✅ en `skills/` (ver checklist) |
| App de métricas (código real) | ✅ build verde + tests + smoke OK |
| Plantillas (legal, email, soporte) | ✅ en `templates/` |
| Specs Base44 + afiliados (por tienda) | ⬜ se generan al lanzar una tienda concreta |

## Skills — checklist (todas ✅)
Flujo de lanzamiento: `analizar-competidor` · `research-producto` ·
`compliance-legal` · `spec-base44` · `plataforma-afiliados` ·
`crear-creatividades` · `reportes-kpis`.
Bloques operativos: `setup-pagos-impuestos` · `fulfillment` · `sync-stock` ·
`emails-flows` · `soporte-devoluciones` · `analitica-tracking` · `inteligencia-ugc`.

## Decisiones tuyas pendientes (no me bloquearon, lo dejo listo)
1. **Activar las skills** — viven en el repo pero NO las he instalado en mi set de
   skills (eso toca mi config de arranque y el clasificador me pidió tu permiso).
   Dime y las enlazo, o ver `skills/README.md` (opción symlink / proyecto).
2. **Neon:** crear proyecto y pegar `DATABASE_URL` en `.env.local` → la app deja el
   modo mock y lee datos reales (`npm run db:migrate && npm run db:seed`).
3. **Vercel:** conectar el repo (deploy = humano). `vercel.json` ya define los crons.
4. **Base44:** credenciales/API para cablear el puente real de `/api/ingest`.
5. **ClickUp:** confirmar workspace/lista del backlog único.
6. Pasarela, dominio, alta de creadores, pagos: **siempre humano** (guardrail).

## Nota de seguridad
- `next` actualizado a 15.5.19 por CVE-2025-66478 (el scaffold previo traía 15.1.6).
- `.env.local`, `node_modules/` y `.npmcache/` están en `.gitignore`.
- **No he hecho commit** (no me lo pediste). El repo está listo para que commitees.
