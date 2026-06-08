// Tipos del dominio Drop Builder (espejo del esquema db/schema.sql).

export type EstadoTienda = "activa" | "pausada" | "escalar" | "matar" | "evaluando";
export type EstadoPedido =
  | "pagado"
  | "pendiente"
  | "reembolsado"
  | "chargeback"
  | "cancelado";

export interface Tienda {
  id: string;
  nombre: string;
  nicho: string | null;
  estado: EstadoTienda;
  base44_id: string | null;
  creada_en: string;
}

export interface Producto {
  id: string;
  tienda_id: string;
  nombre: string;
  precio: number;
  coste: number;
  stock: number;
}

export interface Pedido {
  id: string;
  tienda_id: string;
  importe: number;
  coste_total: number;
  fecha: string;
  estado: EstadoPedido;
}

export interface Creador {
  id: string;
  nombre: string;
  handle: string | null;
  codigo: string;
  pct_comision: number; // 0.20 = 20%
  estado: "activo" | "pausado" | "baja";
}

export interface VentaAtribuida {
  id: string;
  pedido_id: string;
  creador_id: string;
  importe: number;
  comision: number;
}

export type TipoEvento = "vista" | "clic" | "atc" | "venta";
export interface EventoEmbudo {
  id: number;
  tienda_id: string;
  creador_id: string | null;
  tipo: TipoEvento;
  fecha: string;
}

export interface Alerta {
  id: number;
  tienda_id: string | null;
  tipo: string;
  severidad: "info" | "aviso" | "critica";
  mensaje: string;
  resuelta: boolean;
  creada_en: string;
}
