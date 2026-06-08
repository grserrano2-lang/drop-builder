import { notFound } from "next/navigation";
import { getTienda, getProductos, getConsolidado } from "@/lib/queries";
import { margenContribucion, cumpleUmbralMargen } from "@/lib/metrics";
import { eur, Stat, Badge, MockBanner, estadoTone } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function TiendaDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tienda = await getTienda(id);
  if (!tienda) notFound();

  const [productos, { tiendas }] = await Promise.all([getProductos(id), getConsolidado()]);
  const resumen = tiendas.find((t) => t.tienda.id === id);

  return (
    <>
      <h1>{tienda.nombre}</h1>
      <p className="sub">
        Nicho {tienda.nicho ?? "—"} · <Badge tone={estadoTone(tienda.estado)}>{tienda.estado}</Badge>
        {tienda.base44_id ? ` · Base44: ${tienda.base44_id}` : ""}
      </p>
      <MockBanner />

      <div className="grid">
        <Stat label="Pedidos (pagados)" value={String(resumen?.pedidos ?? 0)} />
        <Stat label="Ingresos" value={eur(resumen?.ingresos ?? 0)} />
        <Stat label="Margen" value={eur(resumen?.margen ?? 0)} />
        <Stat label="Productos" value={String(productos.length)} />
      </div>

      <h2>Catálogo y margen unitario</h2>
      <table>
        <thead>
          <tr>
            <th>Producto</th><th className="num">Precio</th><th className="num">Coste</th>
            <th className="num">Stock</th><th className="num">Margen contrib.*</th><th>Regla 25€</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => {
            const params = { precioVenta: p.precio, coste: p.coste, envio: 5, pctComisionCreador: 0.2 };
            const m = margenContribucion(params);
            const ok = cumpleUmbralMargen(params, 25);
            return (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td className="num">{eur(p.precio)}</td>
                <td className="num">{eur(p.coste)}</td>
                <td className="num">{p.stock}</td>
                <td className="num">{eur(m)}</td>
                <td><Badge tone={ok ? "good" : "bad"}>{ok ? "cumple" : "no llega"}</Badge></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="sub" style={{ marginTop: 10 }}>
        *Estimación con envío 5 € y comisión de creador 20%. El modelo real lo
        afina la skill <code>research-producto</code>.
      </p>
    </>
  );
}
