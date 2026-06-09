import { notFound } from "next/navigation";
import { getCreador, getVentasCreador } from "@/lib/queries";
import { eur, pct, Stat, Badge, MockBanner, estadoTone } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function CreadorDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const creador = await getCreador(id);
  if (!creador) notFound();
  const ventas = await getVentasCreador(id);

  return (
    <>
      <p className="sub" style={{ marginBottom: 4 }}><a href="/creadores">← Creadores</a></p>
      <h1>{creador.nombre} <span style={{ color: "var(--muted)", fontSize: 16 }}>{creador.handle}</span></h1>
      <p className="sub">
        Código <code>{creador.codigo}</code> ·{" "}
        <Badge tone={estadoTone(creador.estado)}>{creador.estado}</Badge>
      </p>
      <MockBanner />

      <div className="grid">
        <Stat label="Comisión devengada" value={eur(creador.comision)} />
        <Stat label="Ventas atribuidas" value={String(creador.ventas)} />
        <Stat label="% Comisión" value={pct(creador.pct_comision * 100)} />
        <Stat label="ROI" value={`${creador.roi.toFixed(2)}×`} />
      </div>

      <h2>Ventas atribuidas</h2>
      {ventas.length === 0 ? (
        <p className="sub">Sin ventas atribuidas todavía.</p>
      ) : (
        <table>
          <thead>
            <tr><th>Pedido</th><th className="num">Importe</th><th className="num">Comisión</th></tr>
          </thead>
          <tbody>
            {ventas.map((v) => (
              <tr key={v.pedido_id}>
                <td><code>{v.pedido_id}</code></td>
                <td className="num">{eur(v.importe)}</td>
                <td className="num">{eur(v.comision)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="sub" style={{ marginTop: 12 }}>
        Los pagos de comisión los ejecuta el humano (liquidación semiautomática).
      </p>
    </>
  );
}
