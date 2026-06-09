# Specs — índice y orden de lanzamiento (Tienda 1)

Planos para montar la primera tienda (ropa de fútbol de diseño propio, UE
multi-idioma, dropshipping). Generados en la sesión nocturna a partir del
[discovery](discovery.md) y la [hoja de ruta aprobada](../docs/roadmap-aprobado.md).

## Base / contexto
- [discovery.md](discovery.md) — perfil y decisiones de Gonzalo (con ⚠️ y límites).
- [decode-thefootballvibe.md](decode-thefootballvibe.md) — decode de la referencia.

## Orden de lanzamiento sugerido
1. **Base legal/cobro** → [pagos-impuestos-tienda1.md](pagos-impuestos-tienda1.md)
   (LLC US→UE, IOSS, pasarela) + páginas legales (`templates/legal/`).
2. **Marca** → [marca-tienda1.md](marca-tienda1.md) (elegir nombre, verificar EUIPO/
   dominio) → genera identidad.
3. **Producto/proveedor** → research + check de IP; salud del proveedor en el CRM.
4. **Tienda** → [base44-tienda1.md](base44-tienda1.md) (storefront, checkout,
   conversión) con [tracking-tienda1.md](tracking-tienda1.md) (Pixel+CAPI, atribución).
5. **Afiliados** → [afiliados-tienda1.md](afiliados-tienda1.md) +
   [onboarding-creador-tienda1.md](onboarding-creador-tienda1.md).
6. **Contenido** → briefs UGC (`templates/creatividades/`), emails
   (`templates/emails/`), [SEO](seo-plan-tienda1.md), FAQ (`templates/soporte/`).
7. **Operativa** → [fulfillment-stock-tienda1.md](fulfillment-stock-tienda1.md) +
   [soporte-devoluciones-tienda1.md](soporte-devoluciones-tienda1.md).
8. **Datos** → [integraciones-base44-crm.md](integraciones-base44-crm.md) (puente al
   CRM) → KPIs y gate matar/escalar en el panel.

## Pasos humanos transversales (no los hace Claude)
Crear cuentas (Base44, Neon, Vercel), dominios, conectar pasarela, asesor fiscal,
firmar acuerdos, pagar comisiones, publicar. Claude prepara; tú confirmas.

## Guardrails recordatorio
Solo producto legítimo (check de IP, nada de réplicas) · reseñas reales · plazos
honestos · RGPD desde el inicio · fuentes oficiales (nada de scraping ToS).
