# Hoja de ruta aprobada — Drop Builder

> Resultado de aprobar las 100 mejoras una a una (2026-06-09). Lista completa con
> detalle en `docs/100-mejoras.md`. Aquí solo lo aprobado + secuencia + avisos.

## Aprobadas por área (72 + baseline)

**A · Producto y sourcing:** 5 (guía de tallas real), 7 (branding del paquete).
Modelo: **dropshipping puro, "como la referencia"**.

**B · Tienda y conversión:** 11 (selector idioma), 13 (upsells/bundles),
14 (checkout 1 página), 15 (barra envío gratis), 16 (velocidad/móvil),
17 (trust badges).

**C · Creadores y afiliados:** 21 (acuerdo firmado), 22 (bot de creadores),
24 (dashboard creador), 26 (kit de bienvenida), 29 (liquidación semiauto).

**D · UGC y contenido:** 31 (5 ángulos), 32 (hooks 3s), 33 (brief ejecutable),
34 (IA de apoyo), 35 (biblioteca UGC), 36 (repurpose a ads), 37 (cuentas propias),
38 (calendario editorial), 39 (tendencias TikTok), 40 (test de ángulos).

**E · SEO:** 41 (clusters), 42 (bot 1/día), 43 (enlazado interno),
44 (datos estructurados), 45 (blog multi-idioma), 46 (páginas pilar),
47 (refresh), 49 (long-tail estacional).

**F · Email y retención:** 52 (transaccionales), 53 (carrito abandonado),
54 (post-compra+reseña), 55 (captura email), 56 (segmentación), 57 (win-back),
58 (fidelización), 59 (avisos de drops), 60 (ventas recuperadas).

**G · Soporte:** 61 (agente IA 24/7), 62 (escalado a humano), 63 (macros),
64 (seguimiento pedido), 66 (anti-chargeback), 68 (FAQ pública),
69 (clientes problemáticos), 70 (SLA visible).

**H · Tracking:** 71 (pixel+CAPI), 72 (GTM+GA4), 73 (atribución checkout),
74 (consent mode), 75 (hashear PII), 76 (verificación), 77 (UTM canónicos),
79 (cohortes/LTV). [78 multi-touch y 80 ROAS por creativo → cuando entres en ads.]

**I · CRM y automatización:** 81 (stack actual + Kanban), 82 (puente Base44→CRM),
83 (panel holding), 84 (integraciones), 85 (alertas), 86 (gate matar/escalar),
87 (resumen diario Telegram), 88 (plantilla clonable), 89 (trabajo nocturno),
90 (export contable). **Trabajo nocturno ampliado: Claude mejora todo lo que pueda,
no solo el CRM.**

**J · Legal y fiscal:** 92 (páginas legales), 93 (consentimiento RGPD),
94 (devolución 14 días), 95 (IOSS intermediario), 96 (pasarela honesta),
100 (revisión profesional antes de escalar). "Todo como la referencia."

## Baseline no negociable (van sí o sí aunque no se marcaran)
- **91 · Check de IP por producto** (aviso, no bloqueo): con dropshipping puro de
  artículos de fútbol, el riesgo de camisetas réplica es real. No publico productos
  que infrinjan marca; mismo nicho, versión legítima.
- **97 · Plazos de envío honestos** y **98 · solo reseñas reales**: son requisitos
  legales en la UE, no opcionales. Ya acordamos incentivar reseñas reales.

## No aprobadas (quedan aparcadas; se pueden retomar)
1, 2, 3, 4, 6, 8, 9, 10, 12, 18, 19, 20, 23, 25, 27, 28, 30, 48, 50, 51, 65, 67, 99.

## Avisos importantes (dependencias)
- **51 (SPF/DKIM/DMARC) NO aprobada pero es cimiento de F:** sin autenticar el
  dominio, los emails 52-60 caen en spam. Recomiendo encarecidamente activarla.
- **23 (página pública por creador) NO aprobada** pero es como los creadores venden
  a sus fans (la referencia la usa). Recomiendo reconsiderarla.
- **3 (muestra) y 1 (POD) descartadas → dropshipping China sin muestra:** vigilar
  calidad/tallaje/plazos porque impactan devoluciones y chargebacks (umbral 1%).

## Secuencia recomendada (primeros pasos)
1. **Base legal mínima** (92, 93, 94, 96) — desbloquea pixel/ads y la pasarela.
2. **Producto + proveedor** dropshipping con ~7 días (research-producto), check IP (91).
3. **Tienda Base44** (11, 13-17) + tracking (71-77).
4. **Creadores** (21, 22, 24, 26, 29) + UGC (31-40).
5. **Email** (51→52-60) + **soporte IA** (61-64, 66, 68-70).
6. **CRM/automatización** (81-90) corriendo en paralelo, mejora nocturna.
7. **SEO** (41-49) desde el día uno, 1 artículo/día.
