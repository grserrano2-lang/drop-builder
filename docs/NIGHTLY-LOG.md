# Registro nocturno — sesión autónoma Drop Builder

## Resumen ejecutivo (lo leerás por la mañana)
- **Estado global:** 🟢 verde (build OK, 29/29 tests).
- **Rama:** `feat/nightly` (solo commits locales, sin push).
- **Completado esta noche:** #81 **Kanban CRM**; #87 **resumen diario**; **specs
  Base44 + afiliados + tracking** Tienda 1; **marca** (7 nombres); **briefs UGC**;
  **copy de emails**; **plan SEO** (30 títulos); **FAQ**; 2 auditorías + limpieza.
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
  4. **Bundle "equipación completa"** (camiseta+pantalón+medias de diseño propio)
     como upsell de mayor AOV.
  5. **Programa de referidos cliente→cliente** ("trae a un colega, ambos ganáis"):
     crecimiento orgánico barato además de los creadores.
  6. **Alerta de margen por SKU**: si un producto baja del umbral de 25 € por cambio
     de coste/envío del proveedor, avisar (protege la regla de oro automáticamente).

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

### Ciclo 8 — Copy final de emails Tienda 1 · 🟢 verde (docs)
- **Qué hice:** `templates/emails/tienda1/emails-copy.md` — copy completo (asunto +
  cuerpo) de los flujos aprobados #52-60: confirmación, envío+tracking, incidencia,
  carrito abandonado (3 toques), post-compra/cuidado, reseña incentivada REAL,
  win-back, aviso de drop y bienvenida. Tono de aficionado, un CTA por email.
- **Verificación:** docs-only → build no afectado (18/18 en el último verde).
- **Commit:** checkpoint en `feat/nightly`.
- **Recordatorio:** sin SPF/DKIM (#51) estos emails caen en spam; lo repito en el pie.

### Ciclo 9 — Plan del motor SEO Tienda 1 · 🟢 verde (docs)
- **Qué hice:** `specs/seo-plan-tienda1.md` — 5 clusters por intención con **30
  títulos long-tail listos** (genéricos, sin clubes/marcas), plantilla de artículo
  (con enlazado interno y schema), reglas operativas (cadencia 1/día, multi-idioma,
  pilar, refresh, estacional) y guardrails.
- **Verificación:** docs-only → build no afectado (18/18 en el último verde).
- **Commit:** checkpoint en `feat/nightly`.
- **Notas:** el bot SEO ya tiene cola de 30 artículos para arrancar al lanzar.

### Ciclo 10 — Auditoría + FAQ · 🟢 verde
- **Auditoría:** (1) resuelto el TODO de `semanas=5` hardcodeado en
  evaluate-gates, daily-summary y la home: nuevo helper puro `semanasActiva()` en
  `lib/metrics.ts` con test (ahora 19/19), usado en los 3 sitios; (2) eliminado el
  directorio vacío `app/consolidado/` (sobrante del scaffold; el consolidado vive en
  `page.tsx`). Build verde tras los cambios.
- **Entregable:** `templates/soporte/tienda1/faq.md` — FAQ pública + base del agente
  IA (envíos, tallas, pagos, devoluciones 14 días, contacto), con nota de que el
  agente escala a humano cualquier acción con dinero (#68, #61).
- **Ideas creativas:** 3 nuevas (bundle equipación, referidos cliente→cliente,
  alerta de margen por SKU), en el resumen ejecutivo.
- **Commit:** checkpoint en `feat/nightly`.
  7. **Cruzar salud de proveedor con el resumen diario** (avisar si un proveedor
     está en crítico).
  8. **Export CSV para el asesor** (#90): endpoint con ventas/comisiones/IVA.
  9. **En el detalle de tienda, mostrar su proveedor y su salud** (cruce útil).

### Ciclo 11 — Spec de fulfillment + sync-stock Tienda 1 · 🟢 verde (docs)
- **Qué hice:** `specs/fulfillment-stock-tienda1.md` — ruta del pedido, enrutado al
  proveedor, tracking automático (SLA <48 h), incidencias (estricto al validar /
  rápido al resolver con aviso anti-chargeback), devolución 14 días; y sync de stock
  para dropshipping (mapeo por variante, regla de agotado, alertas). Enganches al CRM.
- **Verificación:** docs-only → build no afectado (19/19 en el último verde).
- **Commit:** checkpoint en `feat/nightly`.
- **Notas:** completa los specs operativos de la Tienda 1 (Base44, afiliados,
  tracking, fulfillment+stock).

### Ciclo 12 — Página detalle de creador `/creadores/[id]` · 🟢 verde
- **Qué hice:** `getCreador(id)` y `getVentasCreador(id)` en `lib/queries.ts`;
  página `app/creadores/[id]/page.tsx` (stats de ROI/comisión/ventas + desglose de
  ventas atribuidas, con notFound); enlace desde la lista de creadores.
- **Verificación:** `npm test` 19/19 · `npm run build` ✓ · smoke real: `/creadores/c1`
  → 200 con ROI, `/creadores/zzz` → 404.
- **Commit:** checkpoint en `feat/nightly`.
- **Notas:** reutilicé getCreadores() para no duplicar el cálculo de ROI.

### Ciclo 13 — Panel de salud del proveedor `/proveedores` · 🟢 verde
- **Qué hice:** tablas `proveedores` y `envios` en el schema; tipos `Proveedor`/
  `Envio`; lógica pura `lib/supplier.ts` (`saludProveedor`: plazo real medio,
  desviación, % incidencias, estado bueno/riesgo/crítico) con `lib/supplier.test.ts`;
  datos mock; `getProveedoresSalud()` (mock+neon); página `/proveedores` + nav.
  Implementa la **idea creativa #3** (riesgo clave del dropshipping).
- **Verificación:** `npm test` 24/24 · `npm run build` ✓ · smoke real: `/proveedores`
  → 200 (EU FastKit→bueno, GuangzhouTex→crítico).
- **Commit:** checkpoint en `feat/nightly`.

### Ciclo 14 — seed.ts al día + nota de cobertura · 🟢 verde
- **Hallazgo:** las tests de integración sobre `lib/queries` NO son viables con
  `node --test` porque queries importa por VALOR con alias `@/` (db, mock, metrics,
  supplier) y el runtime de strip-types no resuelve el alias (las pure sí, porque sus
  imports de tipos se borran). Lo dejo documentado en vez de fingir cobertura;
  alternativa futura: un loader/alias o mover a relativo.
- **Qué hice:** actualizado `scripts/seed.ts` para sembrar también `tareas`,
  `proveedores` y `envios` (estaba desfasado respecto al schema y al mock).
- **Verificación:** `npm run build` ✓ (type-chequea seed.ts) · `npm test` 24/24.
- **Commit:** checkpoint en `feat/nightly`.

### Ciclo 15 — Auditoría general + spec de pagos/IOSS · 🟢 verde
- **Auditoría:** verde (24/24, build OK); schema↔mock↔seed **consistentes**
  (eventos_embudo se siembra por generate_series y se lee en neon; ingest_log es
  auditoría); rutas↔nav **completas**. Única inconsistencia: **README desactualizado**
  (faltaban `/tareas` y `/proveedores`) → corregido.
- **Entregable:** `specs/pagos-impuestos-tienda1.md` — caso **LLC US → UE**: por qué
  el IVA UE aplica igual, IOSS vía intermediario, checklist humano/IA, IVA en
  checkout y **preguntas para el asesor**. Punto débil cubierto.
- **Ideas creativas:** 3 nuevas (#7-9 en el resumen ejecutivo).
- **Commit:** checkpoint en `feat/nightly`.

### Ciclo 16 — Export CSV para el asesor `/api/export` · 🟢 verde
- **Qué hice:** lógica pura `lib/export.ts` (`toCsv` con escapado RFC-4180) +
  `lib/export.test.ts`; queries `getPedidosExport`/`getComisionesExport` (mock+neon);
  endpoint `/api/export?tipo=pedidos|comisiones` (CSV descargable, auth CRON_SECRET).
  Implementa la **idea #8** (#90 export contable). Pulido: redondeo a 2 decimales.
- **Verificación:** `npm test` 28/28 · `npm run build` ✓ · smoke real: pedidos.csv y
  comisiones.csv correctos, tipo inválido → 400, coste sin ruido de float.
- **Commit:** checkpoint en `feat/nightly`.

### Ciclo 17 — Proveedores en alerta en el resumen diario · 🟢 verde
- **Qué hice:** campo opcional `proveedoresCriticos` en `construirResumenDiario`
  (+ test) y la ruta `daily-summary` ahora cruza `getProveedoresSalud()` y añade los
  proveedores en estado crítico/riesgo al mensaje de Telegram. Implementa la **idea #7**.
- **Verificación:** `npm test` 29/29 · `npm run build` ✓ · smoke real: el resumen
  muestra "🏭 Proveedores en alerta: GuangzhouTex (critico)".
- **Commit:** checkpoint en `feat/nightly`.
