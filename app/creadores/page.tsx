import { getCreadores } from "@/lib/queries";
import { eur, pct, Badge, MockBanner, estadoTone } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function CreadoresPage() {
  const creadores = await getCreadores();
  return (
    <>
      <h1>Creadores</h1>
      <p className="sub">ROI por creador = margen generado ÷ comisión pagada.</p>
      <MockBanner />
      <table>
        <thead>
          <tr>
            <th>Creador</th><th>Código</th><th>Estado</th>
            <th className="num">Comisión</th><th className="num">Ventas</th>
            <th className="num">% Comisión</th><th className="num">ROI</th>
          </tr>
        </thead>
        <tbody>
          {creadores.map((c) => (
            <tr key={c.id}>
              <td><a href={`/creadores/${c.id}`}>{c.nombre}</a> <span style={{ color: "var(--muted)" }}>{c.handle}</span></td>
              <td><code>{c.codigo}</code></td>
              <td><Badge tone={estadoTone(c.estado)}>{c.estado}</Badge></td>
              <td className="num">{eur(c.comision)}</td>
              <td className="num">{c.ventas}</td>
              <td className="num">{pct(c.pct_comision * 100)}</td>
              <td className="num">{c.roi.toFixed(2)}×</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="sub" style={{ marginTop: 12 }}>
        Atribución por código + UTM registrada en el checkout (skill{" "}
        <code>plataforma-afiliados</code>). Los pagos los ejecuta el humano.
      </p>
    </>
  );
}
