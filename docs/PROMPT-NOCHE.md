# Prompt para sesión nocturna autónoma — Drop Builder

> Pégalo en una sesión de Claude Code (idealmente con `/loop` en modo dinámico, o
> como tarea programada). Está pensado para ~8 h sin supervisión.

---

## PROMPT

Eres Claude Code trabajando de forma **autónoma durante ~8 horas** mientras Gonzalo
duerme. Objetivo: **avanzar al máximo la hoja de ruta aprobada de Drop Builder**
construyendo, verificando y mejorando de forma continua, eficiente y segura.

### Contexto (léelo una vez al arrancar)
- Repo: `~/drop-builder`. Lee `docs/roadmap-aprobado.md` (qué construir),
  `specs/discovery.md` (decisiones y avisos) y `docs/100-mejoras.md` (detalle).
- Idioma de trabajo y de los entregables: **español**.
- La app de métricas/CRM (Next.js + Neon + Vercel) ya arranca en **modo mock**:
  `npm run build`, `npm test`, `npm start` funcionan sin base de datos.

### Ritmo y duración
- Trabaja en **ciclos cortos y continuos**: un objetivo verificable por ciclo.
- No te detengas más de **3 minutos** entre unidades de trabajo; encadena tareas.
- Mantén la sesión activa **hasta ~8 h** o hasta agotar el trabajo construible.
- Prioriza por la **secuencia recomendada** del roadmap; dentro de cada bloque,
  primero lo de mayor impacto y menor riesgo.

### Alcance: SOLO lo construible sin intervención humana
Construye lo que no requiere credenciales ni pasos irreversibles. Ejemplos válidos:
módulo de tareas Kanban del CRM (#81), lógica de alertas (#85) y resumen diario
(#87), plantilla clonable de tienda (#88), export contable (#90), scaffolding de
integraciones en mock (#82/#84), copy de los flujos de email (#52-60), borradores de
páginas legales (#92-96), specs (Base44, afiliados, tracking), briefs de UGC y los 5
ángulos + hooks (#31-33), generador de artículos SEO y primer lote (#41-42),
propuestas de marca/nombre/identidad, FAQ (#68), specs de conversión (#13-17).

### NO toques nunca (déjalo preparado y anótalo como "pendiente humano")
Pagos, pasarela, credenciales, dominios, publicar tiendas/contenido, alta real de
creadores, envío real de mensajes/emails, crear cuentas (Base44, Neon, Vercel),
mover dinero. No inventes credenciales ni hagas push a remoto.

### Guardrails (no negociables)
- **Nada que infrinja marcas** (cero diseños réplica con escudos/logos), **nada de
  reseñas falsas**, **plazos de envío honestos**, nada que engañe a la pasarela,
  nada de scraping que viole ToS. Mismo nicho, versión legítima siempre.
- RGPD/legal básico se trata como obligatorio.

### Método por ciclo
1. Elige el siguiente objetivo del roadmap (el de mayor impacto disponible).
2. Constrúyelo con **ediciones quirúrgicas**, reutilizando el código existente.
3. **Verifica**: typecheck/tests de lo afectado; build completo solo en checkpoints.
   Si algo queda en rojo, **arréglalo antes de continuar** (autocorrección).
4. Registra una entrada breve en `docs/NIGHTLY-LOG.md` (ver formato abajo).
5. Haz **commit local** como checkpoint (`feat/nightly` o similar). **No hagas push.**

### Autocorrección y verificación
- Trata "verde" (build/tests OK) como condición para dar algo por hecho.
- Si te bloqueas en una tarea (>2 intentos sin verde), déjala documentada y pasa a
  la siguiente construible; no te quedes en bucle.

### Auditorías y feedback creativo (periódico)
- Cada ~5 unidades o ~45-60 min, haz una **auditoría puntual**: relee con ojo
  crítico lo construido, comprueba que cumple la spec, **simplifica**, elimina código
  muerto y corrige inconsistencias.
- En cada auditoría aporta **1-3 ideas de feedback creativo** (UX, copy, conversión,
  arquitectura, nuevas mejoras al catálogo). Si son baratas y seguras, **aplícalas**;
  si no, anótalas en el log para que Gonzalo decida.

### Eficiencia de tokens
- Un objetivo por ciclo; no releas archivos que ya conoces; confía en el estado.
- Búsquedas dirigidas en vez de volcar directorios; logs concisos, sin narrar de más.
- Usa subagentes solo para exploración amplia, no para tareas pequeñas.
- No reconstruyas todo el proyecto en cada cambio; build completo solo en checkpoints.

### Registro (para que Gonzalo lo revise por la mañana)
Mantén `docs/NIGHTLY-LOG.md` con, al principio, un **resumen ejecutivo** (qué se
logró, estado verde/rojo global, bloqueos, ideas top) y debajo el detalle por ciclo:
`[hora] objetivo → qué hice → verificación (verde/rojo) → commit → notas/ideas`.

### Al terminar
Deja el resumen ejecutivo actualizado arriba del log, con: lo completado, lo que
quedó pendiente y por qué, los pasos humanos pendientes, y tus mejores 3 propuestas
creativas de la noche.
