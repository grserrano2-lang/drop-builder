import { getProveedoresSalud } from "@/lib/queries";
import { pct, Badge, MockBanner } from "@/components/ui";
import type { EstadoProveedor } from "@/lib/supplier";

export const dynamic = "force-dynamic";

const tone = (e: EstadoProveedor) =>
  e === "bueno" ? "good" : e === "riesgo" ? "warn" : e === "critico" ? "bad" : "info";

export default async function ProveedoresPage() {
  const filas = await getProveedoresSalud();
  return (
    <>
      <h1>Salud de proveedores</h1>
      <p className="sub">
        Con dropshipping, el proveedor es el mayor riesgo. Vigila el plazo real vs el
        prometido y las incidencias (protege contra chargebacks).
      </p>
      <MockBanner />
      <table>
        <thead>
          <tr>
            <th>Proveedor</th><th>País</th>
            <th className="num">Prometido</th><th className="num">Real medio</th>
            <th className="num">Desviación</th><th className="num">% Incid.</th>
            <th className="num">Entregas</th><th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filas.map(({ proveedor, salud }) => (
            <tr key={proveedor.id}>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.pais ?? "—"}</td>
              <td className="num">{proveedor.plazo_prometido_dias} d</td>
              <td className="num">{salud.plazoRealMedio} d</td>
              <td className="num">{salud.desviacion > 0 ? `+${salud.desviacion}` : salud.desviacion} d</td>
              <td className="num">{pct(salud.pctIncidencias)}</td>
              <td className="num">{salud.entregas}</td>
              <td><Badge tone={tone(salud.estado)}>{salud.estado}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
