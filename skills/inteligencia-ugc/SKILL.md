---
name: inteligencia-ugc
description: Inteligencia de UGC y competencia para Drop Builder — detecta ángulos creativos ganadores vía fuentes oficiales (Meta Ad Library, TikTok Creative Center) y los traduce en briefs para creadores. Úsala para investigar qué creatividades funcionan en un nicho o cuando Gonzalo diga "inteligencia de UGC", "qué ángulos funcionan", "espía la competencia", "tendencias de creativos" o similar.
---

# Skill: inteligencia-ugc

Detecta qué ángulos de contenido están funcionando en el nicho y los convierte en
materia prima para los creadores. Alimenta `crear-creatividades`. Es el bot de
inteligencia semanal de Cowork.

## Cuándo se activa
- Investigación inicial de ángulos UGC para una tienda.
- Bot recurrente semanal de inteligencia de competencia.
- Antes de un ciclo de creatividades nuevas.

## Entradas
- Nicho/producto y competidores conocidos.
- Mercado/idioma objetivo.

## Proceso (solo fuentes oficiales)
1. **Meta Ad Library** — anuncios activos de competidores: gancho, formato,
   duración de actividad (los longevos = ganadores), oferta.
2. **TikTok Creative Center** — vídeos/sonidos/tendencias top del nicho: hooks de
   los primeros 3 s, estructura, CTA.
3. **Patrones de UGC orgánico** — formatos que se repiten (unboxing, antes/después,
   "POV", reseña honesta, demostración del problema-solución).
4. **Destila ángulos.** Agrupa en ángulos reutilizables: problema/solución,
   transformación, prueba social, novedad, precio/valor, identidad/pertenencia.
5. **Ranking** por señal (longevidad del anuncio, tracción del formato) y encaje
   con el producto.

## Salida
- `specs/ugc-intel-<nicho>.md`: tabla de ángulos ganadores con ejemplo, gancho,
  formato y por qué funciona; recomendación de los 3-5 a probar.
- Handoff a `crear-creatividades` (que escribe los guiones/briefs).
- Si es bot recurrente: resumen semanal a ClickUp/Telegram.

## Guardrails
- **Solo fuentes oficiales** (Meta Ad Library, TikTok Creative Center) y
  herramientas legítimas. **Nada de scraping ni evasión de ToS** de Instagram/
  TikTok.
- Inspiración de ángulos, no copia de creatividades ajenas: se crea contenido
  propio y original.

## Métrica de éxito
> Una lista priorizada de ángulos con evidencia de que funcionan, lista para
> convertir en briefs de creador.
