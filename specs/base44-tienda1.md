# Spec de construcción — Tienda 1 (Base44)

> Salida de `spec-base44`. Plano para montar la primera tienda en Base44.
> Producto: **ropa de fútbol de diseño propio** (sin escudos/marcas — pasa por el
> check de IP). Mercado UE multi-idioma, EUR, ticket 40-70 €, dropshipping.
> Los pasos irreversibles (pasarela, dominio, publicar) los ejecuta Gonzalo.

## 1. Modelo de datos (entidades Base44)
- **Producto:** nombre, descripción (multi-idioma), precio, coste, **variantes**
  (talla S-XXL, color), stock por variante, imágenes, `tracking_proveedor`,
  estado (activo/agotado), `sku_proveedor`.
- **Pedido:** importe, `coste_total`, estado (pagado/pendiente/reembolsado/
  chargeback/cancelado), `tracking`, **`creador_id`**, `codigo_descuento`, `utm`,
  idioma, país, email cliente.
- **Cliente:** nombre, email, dirección, idioma, historial.
- **Creador / VentaAtribuida / Liquidación:** ver `specs/afiliados-tienda1.md`
  (plataforma de afiliados; se construye en paralelo).

## 2. Storefront (páginas)
- **Home:** hero con propuesta de valor, categorías, productos destacados, prueba
  social (UGC en vídeo), barra de envío gratis (#15).
- **Categoría:** grid filtrable por talla/color/precio.
- **Ficha de producto (#12 enfoque):** galería + **vídeo UGC arriba**, selector de
  variantes, **guía de tallas real del proveedor (#5)**, descripción, beneficios,
  **prueba social** (reseñas reales/UGC), **plazo de envío honesto**, trust badges (#17).
- **Búsqueda** y **carrito** con **upsells/bundles (#13)**.
- **Selector de idioma (#11)** visible + detección por IP; 3-4 idiomas UE.

## 3. Checkout
- **Una sola página (#14)** con **tarjeta (Stripe) + PayPal + Apple/Google Pay**.
- **Captura de atribución:** `codigo_descuento` + `utm` del creador → `pedido.creador_id`
  (el código prevalece). Núcleo del modelo de afiliados.
- **IVA/IOSS:** mostrar precio con IVA según país; recaudación IOSS (ver
  `setup-pagos-impuestos`; LLC US → IOSS vía intermediario).
- **Barra de envío gratis (#15)** y resumen claro de plazo de entrega real.

## 4. Admin operativo
Gestión de pedidos (estado + tracking), productos/variantes/stock, creadores y
liquidaciones, y exportación contable (#90 hacia el CRM).

## 5. Enganches con el resto del sistema (hooks)
- **`pedido.pagado` → webhook → `POST /api/ingest`** del CRM (token `x-ingest-token`).
- **dataLayer de eventos** (PageView, ViewContent, AddToCart, InitiateCheckout,
  Purchase) → `analitica-tracking` (Pixel+CAPI, GA4/GTM, consent mode #74).
- **Campo `tracking`** → `fulfillment` (email automático al cliente #52).
- **Campo `stock`** → `sync-stock` (alertas de agotado #85).

## 6. No funcional / QA (checklist pre-publicación)
- [ ] SSL activo · [ ] velocidad y test **móvil real (#16)** · [ ] idiomas correctos
- [ ] páginas legales enlazadas en footer (privacidad, cookies, términos, envíos,
      devoluciones, aviso legal #92) · [ ] banner de consentimiento (#93)
- [ ] **compra de prueba atribuida** a un creador ficticio (verifica atribución + pixel)
- [ ] plazos de envío honestos en ficha y checkout (#97)

## 7. Pasos humanos (irreversibles — los haces tú)
1. Crear cuenta Base44 (plan Builder) y dominio.
2. Conectar Stripe + PayPal (descripción honesta del negocio #96).
3. Resolver IVA/IOSS con el asesor (#95).
4. Publicar la tienda.

## 8. Guardrail
Solo diseños **originales legítimos** (sin escudos/logos/marcas). Cada diseño pasa el
**check de IP (#91)** antes de publicarse. Mismo nicho, versión legal.
