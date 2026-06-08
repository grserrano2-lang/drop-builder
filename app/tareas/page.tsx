import { getTareas } from "@/lib/queries";
import { agruparPorEstado, contarPorEstado, COLUMNAS } from "@/lib/tasks";
import { Badge, MockBanner } from "@/components/ui";
import type { PrioridadTarea } from "@/lib/types";

export const dynamic = "force-dynamic";

const prioridadTone = (p: PrioridadTarea) => (p === "alta" ? "bad" : p === "media" ? "warn" : "info");

export default async function TareasPage() {
  const tareas = await getTareas();
  const grupos = agruparPorEstado(tareas);
  const conteos = contarPorEstado(tareas);

  return (
    <>
      <h1>Tareas</h1>
      <p className="sub">Backlog Kanban del CRM. Tareas de bots y tuyas en un solo sitio.</p>
      <MockBanner />

      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(3, 1fr)", alignItems: "start" }}>
        {COLUMNAS.map((col) => (
          <div key={col.estado}>
            <h2 style={{ margin: "0 0 10px" }}>
              {col.titulo} <span style={{ color: "var(--muted)" }}>· {conteos[col.estado]}</span>
            </h2>
            <div style={{ display: "grid", gap: 10 }}>
              {grupos[col.estado].map((t) => (
                <div key={t.id} className="card" style={{ padding: 12 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                    <Badge tone={prioridadTone(t.prioridad)}>{t.prioridad}</Badge>
                    <Badge tone={t.origen === "bot" ? "info" : "good"}>{t.origen}</Badge>
                  </div>
                  <div style={{ fontWeight: 600 }}>{t.titulo}</div>
                  {t.descripcion && (
                    <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>{t.descripcion}</div>
                  )}
                </div>
              ))}
              {grupos[col.estado].length === 0 && (
                <div className="card" style={{ padding: 12, color: "var(--muted)", fontSize: 13 }}>—</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
