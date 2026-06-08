import { getConsolidado } from "@/lib/queries";
import { decisionGate } from "@/lib/metrics";
import { eur, pct, Stat, Badge, MockBanner, estadoTone, decisionTone } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function ConsolidadoPage() {
  const { tiendas, holding } = await getConsolidado();
  const margenPct = holding.ingresos > 0 ? (holding.margen / holding.ingresos) * 100 : 0;

  return (
    <>
      <h1>Consolidado del holding</h1>
      <p className="sub">Vista agregada de todas las tiendas Drop Builder.</p>
      <MockBanner />

      <div className="grid">
        <Stat label="Ingresos (pagados)" value={eur(holding.ingresos)} />
        <Stat label="Margen de contribución" value={eur(holding.margen)} />
        <Stat label="Margen %" value={pct(margenPct)} />
        <Stat label="Pedidos" value={String(holding.pedidos)} />
        <Stat label="Tiendas" value={String(tiendas.length)} />
      </div>

      <h2>Tiendas</h2>
      <table>
        <thead>
          <tr>
            <th>Tienda</th><th>Nicho</th><th>Estado</th>
            <th className="num">Pedidos</th><th className="num">Ingresos</th>
            <th className="num">Margen</th><th className="num">Chargebacks</th>
            <th>Gate</th>
          </tr>
        </thead>
        <tbody>
          {tiendas.map((t) => {
            const g = decisionGate({
              margenContribucionAcumulado: t.margen,
              semanasActiva: 5,
              ratioChargebacks: t.ratioChargebacks,
              conversionGlobalPct: t.pedidos > 0 ? 1 : 0,
            });
            return (
              <tr key={t.tienda.id}>
                <td><a href={`/tiendas/${t.tienda.id}`}>{t.tienda.nombre}</a></td>
                <td>{t.tienda.nicho ?? "—"}</td>
                <td><Badge tone={estadoTone(t.tienda.estado)}>{t.tienda.estado}</Badge></td>
                <td className="num">{t.pedidos}</td>
                <td className="num">{eur(t.ingresos)}</td>
                <td className="num">{eur(t.margen)}</td>
                <td className="num">{pct(t.ratioChargebacks * 100)}</td>
                <td><Badge tone={decisionTone(g.decision)}>{g.decision}</Badge></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
