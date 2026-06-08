-- =========================================================================
-- Drop Builder — esquema de base de datos (Postgres / Neon)
-- Modelo "holding": consolida datos de todas las tiendas que viven en Base44.
-- Idempotente: se puede ejecutar varias veces sin romper nada.
-- =========================================================================

-- --- TIENDAS -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tiendas (
  id           TEXT PRIMARY KEY,
  nombre       TEXT NOT NULL,
  nicho        TEXT,
  estado       TEXT NOT NULL DEFAULT 'activa'
               CHECK (estado IN ('activa', 'pausada', 'escalar', 'matar', 'evaluando')),
  base44_id    TEXT,                       -- id de la tienda en Base44
  creada_en    TIMESTAMPTZ NOT NULL DEFAULT now(),
  actualizada_en TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --- PRODUCTOS -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS productos (
  id           TEXT PRIMARY KEY,
  tienda_id    TEXT NOT NULL REFERENCES tiendas(id) ON DELETE CASCADE,
  nombre       TEXT NOT NULL,
  precio       NUMERIC(12,2) NOT NULL DEFAULT 0,   -- precio de venta
  coste        NUMERIC(12,2) NOT NULL DEFAULT 0,   -- coste de producto (COGS)
  -- margen unitario calculado; columna generada para no desincronizar
  margen       NUMERIC(12,2) GENERATED ALWAYS AS (precio - coste) STORED,
  stock        INTEGER NOT NULL DEFAULT 0,
  creado_en    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_productos_tienda ON productos(tienda_id);

-- --- PEDIDOS -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pedidos (
  id           TEXT PRIMARY KEY,
  tienda_id    TEXT NOT NULL REFERENCES tiendas(id) ON DELETE CASCADE,
  importe      NUMERIC(12,2) NOT NULL DEFAULT 0,   -- importe total del pedido
  coste_total  NUMERIC(12,2) NOT NULL DEFAULT 0,   -- COGS del pedido (para margen real)
  fecha        TIMESTAMPTZ NOT NULL DEFAULT now(),
  estado       TEXT NOT NULL DEFAULT 'pagado'
               CHECK (estado IN ('pagado', 'pendiente', 'reembolsado', 'chargeback', 'cancelado')),
  creado_en    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_pedidos_tienda ON pedidos(tienda_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_fecha ON pedidos(fecha);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON pedidos(estado);

-- --- CREADORES (UGC, marketing por comisión) -----------------------------
CREATE TABLE IF NOT EXISTS creadores (
  id              TEXT PRIMARY KEY,
  nombre          TEXT NOT NULL,
  handle          TEXT,
  codigo          TEXT UNIQUE NOT NULL,            -- código de descuento/atribución
  pct_comision    NUMERIC(5,4) NOT NULL DEFAULT 0.10,  -- 0.10 = 10%
  estado          TEXT NOT NULL DEFAULT 'activo'
                  CHECK (estado IN ('activo', 'pausado', 'baja')),
  creado_en       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --- VENTAS ATRIBUIDAS (pedido <-> creador) ------------------------------
CREATE TABLE IF NOT EXISTS ventas_atribuidas (
  id           TEXT PRIMARY KEY,
  pedido_id    TEXT NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  creador_id   TEXT NOT NULL REFERENCES creadores(id) ON DELETE CASCADE,
  importe      NUMERIC(12,2) NOT NULL DEFAULT 0,   -- importe atribuido al creador
  comision     NUMERIC(12,2) NOT NULL DEFAULT 0,   -- comisión devengada
  creado_en    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (pedido_id, creador_id)
);
CREATE INDEX IF NOT EXISTS idx_ventas_creador ON ventas_atribuidas(creador_id);
CREATE INDEX IF NOT EXISTS idx_ventas_pedido ON ventas_atribuidas(pedido_id);

-- --- EVENTOS DE EMBUDO (vista -> clic -> atc -> venta) -------------------
CREATE TABLE IF NOT EXISTS eventos_embudo (
  id           BIGSERIAL PRIMARY KEY,
  tienda_id    TEXT NOT NULL REFERENCES tiendas(id) ON DELETE CASCADE,
  creador_id   TEXT REFERENCES creadores(id) ON DELETE SET NULL,
  tipo         TEXT NOT NULL CHECK (tipo IN ('vista', 'clic', 'atc', 'venta')),
  fecha        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_embudo_tienda ON eventos_embudo(tienda_id);
CREATE INDEX IF NOT EXISTS idx_embudo_creador ON eventos_embudo(creador_id);
CREATE INDEX IF NOT EXISTS idx_embudo_tipo ON eventos_embudo(tipo);
CREATE INDEX IF NOT EXISTS idx_embudo_fecha ON eventos_embudo(fecha);

-- --- ALERTAS (generadas por la plataforma) -------------------------------
CREATE TABLE IF NOT EXISTS alertas (
  id           BIGSERIAL PRIMARY KEY,
  tienda_id    TEXT REFERENCES tiendas(id) ON DELETE CASCADE,
  tipo         TEXT NOT NULL,   -- 'caida_conversion' | 'stock_bajo' | 'pico_chargebacks' | ...
  severidad    TEXT NOT NULL DEFAULT 'info'
               CHECK (severidad IN ('info', 'aviso', 'critica')),
  mensaje      TEXT NOT NULL,
  resuelta     BOOLEAN NOT NULL DEFAULT false,
  creada_en    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_alertas_tienda ON alertas(tienda_id);
CREATE INDEX IF NOT EXISTS idx_alertas_resuelta ON alertas(resuelta);

-- --- LOG DE INGESTIÓN (auditoría del puente Base44 -> Drop Builder) ------
CREATE TABLE IF NOT EXISTS ingest_log (
  id           BIGSERIAL PRIMARY KEY,
  fuente       TEXT NOT NULL DEFAULT 'base44',
  tipo_evento  TEXT NOT NULL,
  payload      JSONB,
  recibido_en  TIMESTAMPTZ NOT NULL DEFAULT now()
);
