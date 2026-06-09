# Spec del puente Base44 ↔ CRM (plataforma de métricas)

> Cómo fluye el dato de cada tienda Base44 a la plataforma de métricas/CRM
> (Next.js + Neon). Implementa #82/#84. El endpoint `/api/ingest` ya existe; aquí se
> define el contrato completo y lo que el humano debe configurar.

## 1. Dirección y mecanismo
- **Base44 → CRM (push):** cada evento relevante dispara un **webhook** (POST) al
  CRM. Es la vía principal (tiempo real).
- **CRM → Base44 (pull, opcional):** para reconciliación periódica, el CRM puede
  leer la API de Base44 (requiere `BASE44_API_BASE` + `BASE44_API_KEY`).

## 2. Contrato del webhook `POST /api/ingest`
- **Cabecera:** `x-ingest-token: <INGEST_TOKEN>` (rechazo 401 si no coincide).
- **Body:** `{ "tipo": "<evento>", "data": { ... } }`.
- **Respuesta:** `200 {ok:true}`. En modo mock confirma sin persistir.
- **Auditoría:** todo evento se guarda crudo en `ingest_log` (idempotencia/trazas).

## 3. Eventos (tipos) y efecto en el CRM
| tipo | data mínima | efecto |
|---|---|---|
| `pedido.pagado` | id, tienda_id, importe, coste_total, estado | upsert en `pedidos` |
| `pedido.enviado` | id, tracking | actualiza tracking/estado |
| `pedido.reembolsado` / `pedido.chargeback` | id, estado | actualiza estado (afecta margen y alertas) |
| `venta.atribuida` | pedido_id, creador_id, importe, comision | inserta en `ventas_atribuidas` |
| `stock.actualizado` | producto_id, stock | actualiza `productos.stock` (dispara alertas) |
| `envio.entregado` | pedido_id, proveedor_id, dias_reales, incidencia | inserta en `envios` (salud del proveedor) |

> Hoy `/api/ingest` cubre `pedido.*`; los demás tipos se añaden con el mismo patrón
> (validar → ingest_log → upsert en su tabla). Cada nuevo tipo, un test de la
> transformación pura cuando aplique.

## 4. Idempotencia y orden
- Upserts por **clave natural** (`pedidos.id`, `ventas_atribuidas (pedido_id,
  creador_id)`) → reenvíos no duplican.
- Si llega `pedido.enviado` antes que `pedido.pagado` (raro), el upsert crea/whatever;
  reconciliación pull corrige huecos.

## 5. Seguridad
- `INGEST_TOKEN` largo y secreto; rotar si se filtra.
- Solo HTTPS. Validar `tipo` contra lista blanca.
- No registrar PII innecesaria en `ingest_log` (minimización RGPD).

## 6. Configuración (pasos humanos)
1. En Base44: crear los webhooks a `https://<CRM>/api/ingest` con la cabecera
   `x-ingest-token`.
2. En el CRM (`.env.local` / Vercel): `INGEST_TOKEN`, y si se usa pull,
   `BASE44_API_BASE` + `BASE44_API_KEY`.
3. Probar con un `pedido.pagado` real y comprobar que aparece en el consolidado.

## 7. Métrica de éxito
Cada venta en Base44 aparece en el CRM en < 1 min, sin duplicados, y el consolidado
del holding cuadra con Base44.
