import { getAlertas } from "@/lib/queries";
import { Badge, MockBanner, severidadTone } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function AlertasPage() {
  const alertas = await getAlertas();
  const abiertas = alertas.filter((a) => !a.resuelta).length;
  return (
    <>
      <h1>Alertas</h1>
      <p className="sub">{abiertas} abiertas. Generadas por el cron <code>/api/cron/check-alerts</code> (cada 2h).</p>
      <MockBanner />
      <table>
        <thead>
          <tr><th>Severidad</th><th>Tipo</th><th>Mensaje</th><th>Estado</th><th>Fecha</th></tr>
        </thead>
        <tbody>
          {alertas.map((a) => (
            <tr key={a.id}>
              <td><Badge tone={severidadTone(a.severidad)}>{a.severidad}</Badge></td>
              <td><code>{a.tipo}</code></td>
              <td>{a.mensaje}</td>
              <td>{a.resuelta ? <Badge tone="good">resuelta</Badge> : <Badge tone="warn">abierta</Badge>}</td>
              <td>{a.creada_en?.slice?.(0, 10) ?? a.creada_en}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
