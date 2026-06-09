# Spec de pagos e impuestos — Tienda 1 (LLC US → UE)

> Salida de `setup-pagos-impuestos`. **No es asesoría legal/fiscal**; es el análisis
> para llevar al asesor. Caso: **LLC estadounidense vendiendo B2C a consumidores de
> la UE**, EUR, Stripe + PayPal. Los pasos irreversibles los ejecuta Gonzalo.

## 1. El punto clave: una LLC US NO te exime del IVA de la UE
Vender a consumidores finales de la UE obliga a **cobrar IVA del país del cliente**,
aunque la empresa sea estadounidense. Vías habituales:
- **IOSS (Import One-Stop-Shop)** para envíos importados de valor ≤ 150 €: recaudas
  el IVA en el checkout y lo declaras en un único registro. Una empresa de fuera de
  la UE normalmente necesita un **intermediario IOSS** establecido en la UE.
- Envíos > 150 € o stock en la UE → otras reglas (IVA a la importación / registro
  local / OSS). Confirmar con el asesor según el flujo real.

## 2. Checklist (humano vs IA)
| Tarea | Quién |
|---|---|
| Constitución/registro de la LLC | humano |
| Cuenta de negocio (USD/EUR) | humano |
| Stripe + PayPal aprobados | humano (yo preparo la descripción) |
| **Intermediario IOSS + número** | humano + asesor |
| Configurar IVA por país en el checkout | humano (yo dejo la spec) |
| Páginas legales | **hechas** (plantillas en `templates/legal/`) |

## 3. Pasarela (Stripe + PayPal)
- **Descripción honesta del negocio** para la aprobación (#96): "venta de ropa de
  fútbol de diseño propio"; **nunca** declarar algo distinto de lo que se vende.
- Verificar que la LLC US puede operar Stripe en EUR para clientes UE (Stripe
  soporta multi-divisa; confirmar payout y conversión con el asesor/Stripe).
- Riesgo de **chargebacks** vigilado en el CRM (umbral 1%).

## 4. IVA en el checkout
- Mostrar precio **con IVA incluido** según país del cliente.
- Recaudar vía **IOSS** en envíos ≤ 150 €; nº IOSS en la documentación de aduanas
  del transportista (coordinar con `fulfillment-stock-tienda1.md`).
- Factura/recibo con desglose de IVA.

## 5. Preguntas para el asesor (lleva esto)
1. ¿Mejor estructura: LLC US directa o entidad/representante en la UE?
2. ¿Qué intermediario IOSS recomiendas y qué obligaciones declarativas implica?
3. ¿Umbral y tratamiento para envíos > 150 €?
4. ¿Implicaciones de impuestos en EEUU por vender a la UE (income, sales tax nexus)?
5. ¿Tratamiento de devoluciones/reembolsos en el IVA recaudado?
6. ¿Facturación y conservación de registros exigida?

## 6. Guardrails
- **No soy asesor fiscal:** revisión profesional obligatoria antes de cobrar/escalar
  (#100). Honestidad total con la pasarela (#96). RGPD en datos de pago/cliente.
- Recordatorio del discovery: validar IVA/IOSS y estructura **antes de escalar** a
  varias tiendas.
