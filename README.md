# Drop Builder

Sistema operativo para crear, lanzar y escalar tiendas de e-commerce reutilizando
un motor validado. Este repo contiene **el motor**, no una tienda concreta.

> Arquitectura (del prompt maestro): la **tienda y la plataforma de afiliados** viven
> en Base44; la **plataforma de métricas tipo holding** vive aquí (Next.js + Neon +
> Vercel) e ingiere datos de Base44; **Cowork** opera y corre bots; **ClickUp** es el
> backlog único.

## Qué hay en el repo
```
skills/        14 skills del catálogo (SKILL.md). Ver skills/README.md.
specs/         Salidas de análisis. Incluye decode-thefootballvibe.md.
templates/     Plantillas legales, de email y de soporte (parametrizadas).
docs/          PROGRESS.md — estado y siguientes pasos.
app/           Plataforma de métricas (Next.js App Router).
lib/           Datos (db, queries, mock), métricas puras y tipos.
scripts/       migrate.ts / seed.ts (Neon).
db/schema.sql  Esquema Postgres del holding.
```

## Plataforma de métricas — cómo correrla
Arranca **sin base de datos** en MODO MOCK (datos de ejemplo en memoria):

```bash
npm install --legacy-peer-deps     # React 19 / Next 15
npm run dev                        # http://localhost:3000
npm test                           # métricas puras (9 tests, sin DB)
npm run build                      # build de producción
```

Páginas: `/` consolidado del holding · `/tiendas` y `/tiendas/[id]` ·
`/creadores` y `/creadores/[id]` (ROI) · `/embudo` · `/alertas` ·
`/proveedores` (salud del proveedor) · `/tareas` (Kanban).
Endpoints: `/api/health` · `/api/ingest` (puente Base44, exige `x-ingest-token`) ·
`/api/cron/evaluate-gates` (gate matar/escalar) · `/api/cron/check-alerts`.

### Conectar datos reales (Neon)
1. Crea un proyecto en Neon y copia la connection string.
2. `cp .env.example .env.local` y rellena `DATABASE_URL` (+ `INGEST_TOKEN`, `CRON_SECRET`).
3. `npm run db:migrate` (aplica el esquema) y opcionalmente `npm run db:seed`.
4. Al haber `DATABASE_URL`, la app deja el modo mock automáticamente.

### Deploy (Vercel) — lo hace el humano
Conecta el repo en Vercel y define las env vars. `vercel.json` ya programa los crons
(`evaluate-gates` diario 06:00, `check-alerts` cada 2h).

## Principios y guardrails (no negociables)
- El sistema escala, no la tienda. Margen ≥ 25-30 €/venta o no se lanza.
- UGC (creadores a comisión) primero, ads después.
- **Compliance primero:** solo producto legítimo sin infracción de IP; el gate
  `compliance-legal` es obligatorio antes de construir.
- Pasos irreversibles (pagos, credenciales, publicar, dominios) = **humano**.
- Inteligencia de competencia solo con fuentes oficiales; nada de scraping/ToS.

Ver `docs/PROGRESS.md` para el estado y los siguientes pasos.
