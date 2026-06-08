import { getEmbudo } from "@/lib/queries";
import { pct, MockBanner } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function EmbudoPage() {
  const filas = await getEmbudo();
  return (
    <>
      <h1>Embudo</h1>
      <p className="sub">Vista → clic → añadir al carrito → venta, por tienda.</p>
      <MockBanner />
      <table>
        <thead>
          <tr>
            <th>Tienda</th>
            <th className="num">Vistas</th><th className="num">Clics</th>
            <th className="num">ATC</th><th className="num">Ventas</th>
            <th className="num">Clic/Vista</th><th className="num">Conv. global</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f.tienda}>
              <td>{f.tienda}</td>
              <td className="num">{f.vistas.toLocaleString("es-ES")}</td>
              <td className="num">{f.clics.toLocaleString("es-ES")}</td>
              <td className="num">{f.atc.toLocaleString("es-ES")}</td>
              <td className="num">{f.ventas.toLocaleString("es-ES")}</td>
              <td className="num">{pct(f.tasas.clic_vista)}</td>
              <td className="num">{pct(f.tasas.venta_vista)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="sub" style={{ marginTop: 12 }}>
        Eventos enviados desde el checkout de Base44 vía <code>/api/ingest</code> y
        el dataLayer (skill <code>analitica-tracking</code>).
      </p>
    </>
  );
}
