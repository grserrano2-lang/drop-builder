# Registro nocturno — sesión autónoma Drop Builder

## Resumen ejecutivo (lo leerás por la mañana)
- **Estado global:** 🟢 verde (build OK, 18/18 tests).
- **Rama:** `feat/nightly` (solo commits locales, sin push).
- **Completado esta noche:** #81 **Kanban CRM**; #87 **resumen diario**;
  **specs Base44 + afiliados + tracking** de la Tienda 1; auditoría + limpieza.
- **En curso / siguiente:** copy de emails #52-60, briefs UGC #31-33, integraciones
  mock #82/#84, generador SEO #41-42. **Marca Tienda 1: candidatos listos para que
  elijas y verifiques (EUIPO/dominio).**
- **Bloqueos (pendiente humano):** nada que me frene; lo irreversible (cuentas,
  pagos, dominios, Neon, webhook Telegram) queda anotado para ti.
- **Ideas creativas top (para que decidas):**
  1. **Drops conmemorativos** (camisetas de efemérides/partidos, sin marcas):
     urgencia + estacionalidad, 100% legal.
  2. **"Diseña tu camiseta"** con la comunidad: co-creación → UGC orgánico, sentido
     de pertenencia y valida demanda ANTES de producir.
  3. **Panel de salud del proveedor** en el CRM (plazo real medio, % incidencias):
     con dropshipping China el proveedor es el mayor riesgo; alertar si el plazo real
     se desvía del prometido protege contra chargebacks.

---

## Detalle por ciclo

### Ciclo 1 — #81 Tareas Kanban del CRM · 🟢 verde
- **Qué hice:** tabla `tareas` en `db/schema.sql`; tipo `Tarea` en `lib/types.ts`;
  lógica pura `lib/tasks.ts` (agrupar/contar por estado, orden por prioridad) con
  `lib/tasks.test.ts`; datos mock; `getTareas()` en `lib/queries.ts`; página Kanban
  `app/tareas/page.tsx` (3 columnas) + enlace en la navegación.
- **Verificación:** `npm test` 13/13 · `npm run build` ✓ (ruta `/tareas` generada).
- **Commit:** checkpoint en `feat/nightly`.
- **Notas:** reutilicé los componentes y estilos existentes; cero dependencias nuevas.

### Ciclo 2 — #87 Resumen diario · 🟢 verde
- **Qué hice:** generador puro `lib/summary.ts` (KPIs del holding, decisión por
  tienda, alertas críticas, conteo de tareas → texto para Telegram) con
  `lib/summary.test.ts`; endpoint `app/api/cron/daily-summary/route.ts` (protegido
  por CRON_SECRET, envío opcional a `ALERT_WEBHOOK_URL`); cron 07:00 en `vercel.json`.
- **Verificación:** `npm test` 18/18 · `npm run build` ✓ · smoke real del endpoint:
  genera el resumen correctamente (holding, 3 tiendas con gate, 2 alertas críticas).
- **Commit:** checkpoint en `feat/nightly`.
- **Notas:** la lógica de envío queda lista; solo falta que pegues el webhook de
  Telegram en `.env.local` (paso humano, anotado).

### Ciclo 3 — spec-base44 Tienda 1 · 🟢 verde (docs)
- **Qué hice:** `specs/base44-tienda1.md` — plano completo de la 1ª tienda (modelo de
  datos, storefront, checkout con atribución, admin, hooks al CRM/tracking/
  fulfillment/stock, QA y pasos humanos) integrando las mejoras aprobadas
  (#5, #11, #12, #13, #14, #15, #16, #17) y los guardrails (#91 check de IP).
- **Verificación:** docs-only, sin cambios de código → build no afectado (último
  build verde, 18/18 tests).
- **Commit:** checkpoint en `feat/nightly`.
- **Notas:** prepara el camino para las specs de afiliados y tracking (próximos ciclos).

### Ciclo 4 — plataforma-afiliados Tienda 1 · 🟢 verde (docs)
- **Qué hice:** `specs/afiliados-tienda1.md` — modelo de datos (Creador/Venta/
  Liquidación), páginas (registro, dashboard #24, admin, página pública #23
  recomendada), atribución código+UTM (#73), bot de captación legítimo (#22),
  acuerdo firmado (#21), liquidación semiauto (#29), kit de bienvenida (#26).
- **Verificación:** docs-only → build no afectado (18/18 tests en el último verde).
- **Commit:** checkpoint en `feat/nightly`.
- **Notas:** dejé marcadas como activables las mejoras no aprobadas (#25 tiers,
  #27 leaderboard) por si Gonzalo las quiere; y recomiendo reconsiderar #23.

### Ciclo 5 — Auditoría + spec de tracking · 🟢 verde
- **Auditoría:** eliminado código muerto en `lib/mock.ts` (el array `eventos_embudo`
  se generaba con un bloque enrevesado y no lo usaba nadie: las queries mock leen de
  `embudoCounts` y `seed.ts` usa generate_series). Quitado también su import. Build y
  tests siguen verdes (18/18) tras la limpieza.
- **Entregable:** `specs/tracking-tienda1.md` — dataLayer, GTM+GA4, Pixel+CAPI con
  dedup, atribución código+UTM, consent mode, hash de PII, verificación (#71-77,79).
- **Ideas creativas:** 3, anotadas en el resumen ejecutivo (drops conmemorativos,
  "diseña tu camiseta", panel de salud del proveedor).
- **Commit:** checkpoint en `feat/nightly`.

### Ciclo 6 — Marca e identidad Tienda 1 · 🟢 verde (docs)
- **Qué hice:** `specs/marca-tienda1.md` — posicionamiento, tono, dirección visual y
  paleta, **7 candidatos de nombre** con tagline (ONZE, Hincha&Co., Caño/Nutmeg,
  Tiempo Extra, Grada Norte, Golazo Club, Dorsal 12), brief de logo para IA y
  criterios de elección. Todos originales, sin clubes/marcas.
- **Verificación:** docs-only → build no afectado (18/18 en el último verde).
- **Commit:** checkpoint en `feat/nightly`.
- **Pendiente humano:** elegir 2-3 favoritos y verificar EUIPO + dominio + handles.

### Ciclo 7 — Briefs y guiones UGC Tienda 1 · 🟢 verde (docs)
- **Qué hice:** `templates/creatividades/tienda1/briefs-ugc.md` — banco de 8 hooks de
  3 s, los **5 ángulos con guion** (problema/solución, transformación, prueba social,
  identidad, precio/regalo), plantilla de brief para creador (formato, do's & don'ts,
  disclosure #ad, entregables) y guardrails. Parametrizado con {{CODIGO}}/{{PRODUCTO}}.
- **Verificación:** docs-only → build no afectado (18/18 en el último verde).
- **Commit:** checkpoint en `feat/nightly`.
- **Notas:** listo para activar creadores en cuanto haya marca + producto definidos.
