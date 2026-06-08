# Plantillas de páginas legales — Drop Builder

> Borradores parametrizados. Sustituye los `{{PLACEHOLDERS}}`.
> **No son asesoría legal.** Revisión profesional obligatoria antes de publicar.
> Salida de la skill `setup-pagos-impuestos`.

Placeholders comunes:
`{{NOMBRE_TIENDA}}` `{{RAZON_SOCIAL}}` `{{ID_FISCAL}}` `{{DIRECCION}}`
`{{EMAIL_CONTACTO}}` `{{DOMINIO}}` `{{PAIS}}` `{{PLAZO_DEVOLUCION}}`
`{{PLAZO_ENVIO}}` `{{TRANSPORTISTA}}`

---

## 1. Aviso legal
Titular: {{RAZON_SOCIAL}}, ID fiscal {{ID_FISCAL}}, domicilio {{DIRECCION}}.
Contacto: {{EMAIL_CONTACTO}}. Sitio: {{DOMINIO}}.
Objeto, condiciones de uso del sitio, propiedad intelectual del contenido propio,
y ley aplicable ({{PAIS}}).

## 2. Términos y condiciones de venta
- Proceso de compra y formación del contrato.
- Precios (impuestos incluidos/excluidos), moneda y formas de pago.
- Plazos de entrega: {{PLAZO_ENVIO}} (tiempo real puerta a puerta — coherente con
  `fulfillment`, nunca optimista).
- Derecho de desistimiento ({{PLAZO_DEVOLUCION}}) y excepciones.
- Garantía legal de conformidad.
- Responsabilidad y resolución de disputas.

## 3. Política de privacidad (RGPD)
- Responsable del tratamiento: {{RAZON_SOCIAL}}.
- Datos que se recogen (pedido, contacto, navegación) y finalidad.
- Base jurídica (ejecución del contrato, consentimiento para marketing).
- Destinatarios: proveedor de envío {{TRANSPORTISTA}}, pasarela de pago, email.
- Plazos de conservación.
- Derechos ARCO-POL y cómo ejercerlos ({{EMAIL_CONTACTO}}).
- Transferencias internacionales si las hay.

## 4. Política de cookies
- Tipos de cookies (técnicas, analíticas, marketing).
- Consentimiento previo para analíticas/marketing (consent mode — coherente con
  `analitica-tracking`).
- Cómo gestionarlas/retirar el consentimiento.

## 5. Política de envíos
- Zonas de envío y {{TRANSPORTISTA}}.
- Plazos REALES {{PLAZO_ENVIO}} y costes.
- Seguimiento (tracking) y qué hacer ante incidencias.

## 6. Política de devoluciones y reembolsos
- Plazo {{PLAZO_DEVOLUCION}} y condiciones del producto.
- Quién asume el envío de vuelta.
- Proceso RMA (coherente con `soporte-devoluciones`).
- Plazo de reembolso y método.

---
> Tras rellenar, valida con asesor y publica enlazadas en el footer del storefront.
