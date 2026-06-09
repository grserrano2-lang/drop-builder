import { getConsolidado } from "@/lib/queries";
import { eur, pct, Badge, MockBanner, estadoTone } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function TiendasPage() {
  const { tiendas } = await getConsolidado();
  return (
    <>
      <h1>Tiendas</h1>
      <p className="sub">
        Una fila por tienda. Clica para ver el detalle. ·{" "}
        <a href="/api/export?tipo=pedidos">⬇ Descargar pedidos (CSV)</a>
      </p>
      <MockBanner />
      <table>
        <thead>
          <tr>
            <th>Tienda</th><th>Nicho</th><th>Estado</th>
            <th className="num">Pedidos</th><th className="num">Ingresos</th><th className="num">Margen</th>
          </tr>
        </thead>
        <tbody>
          {tiendas.map((t) => (
            <tr key={t.tienda.id}>
              <td><a href={`/tiendas/${t.tienda.id}`}>{t.tienda.nombre}</a></td>
              <td>{t.tienda.nicho ?? "—"}</td>
              <td><Badge tone={estadoTone(t.tienda.estado)}>{t.tienda.estado}</Badge></td>
              <td className="num">{t.pedidos}</td>
              <td className="num">{eur(t.ingresos)}</td>
              <td className="num">{eur(t.margen)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="sub" style={{ marginTop: 16 }}>
        Total chargebacks vigilados por el cron <code>/api/cron/check-alerts</code>.
      </p>
    </>
  );
}
