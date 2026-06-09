import { getAlertas, getConsolidado } from "@/lib/queries";
import { Badge, MockBanner, severidadTone } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function AlertasPage({
  searchParams,
}: {
  searchParams: Promise<{ tienda?: string }>;
}) {
  const sel = (await searchParams).tienda;
  const [todas, { tiendas }] = await Promise.all([getAlertas(), getConsolidado()]);
  const alertas = sel ? todas.filter((a) => a.tienda_id === sel) : todas;
  const abiertas = alertas.filter((a) => !a.resuelta).length;

  const chip = (label: string, href: string, activo: boolean) => (
    <a
      href={href}
      className={`badge ${activo ? "info" : ""}`}
      style={{ border: "1px solid var(--border)", marginRight: 6 }}
    >
      {label}
    </a>
  );

  return (
    <>
      <h1>Alertas</h1>
      <p className="sub">
        {abiertas} abiertas{sel ? " (filtradas)" : ""}. Generadas por el cron{" "}
        <code>/api/cron/check-alerts</code> (cada 2h).
      </p>

      <div style={{ marginBottom: 14 }}>
        {chip("Todas", "/alertas", !sel)}
        {tiendas.map((t) => chip(t.tienda.nombre, `/alertas?tienda=${t.tienda.id}`, sel === t.tienda.id))}
      </div>

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
          {alertas.length === 0 && (
            <tr><td colSpan={5} style={{ color: "var(--muted)" }}>Sin alertas para este filtro.</td></tr>
          )}
        </tbody>
      </table>
    </>
  );
}
