import { MOCK } from "@/lib/db";

export function eur(n: number): string {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);
}
export function pct(n: number): string {
  return `${n.toFixed(1)}%`;
}

export function MockBanner() {
  if (!MOCK) return null;
  return (
    <div className="mock-banner">
      ⚠️ MODO MOCK — datos de ejemplo. Define <code>DATABASE_URL</code> (Neon) en{" "}
      <code>.env.local</code> para leer datos reales.
    </div>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card stat">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}

type Tone = "good" | "warn" | "bad" | "info";
export function Badge({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export function estadoTone(estado: string): Tone {
  if (estado === "escalar" || estado === "activa" || estado === "activo") return "good";
  if (estado === "matar" || estado === "baja") return "bad";
  if (estado === "evaluando" || estado === "pausada" || estado === "pausado") return "warn";
  return "info";
}
export function severidadTone(sev: string): Tone {
  if (sev === "critica") return "bad";
  if (sev === "aviso") return "warn";
  return "info";
}
export function decisionTone(d: string): Tone {
  if (d === "escalar") return "good";
  if (d === "matar") return "bad";
  return "warn";
}
