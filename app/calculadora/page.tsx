"use client";

import { useState } from "react";
import { margenContribucion, margenPct, cumpleUmbralMargen } from "@/lib/metrics";

const eur = (n: number) => `${n.toFixed(2)} €`;

export default function CalculadoraPage() {
  const [precio, setPrecio] = useState(59.9);
  const [coste, setCoste] = useState(14);
  const [envio, setEnvio] = useState(5);
  const [pctComision, setPctComision] = useState(15); // %
  const [pctPasarela, setPctPasarela] = useState(2.5); // %

  const params = {
    precioVenta: precio,
    coste,
    envio,
    pctComisionCreador: pctComision / 100,
    pctPasarela: pctPasarela / 100,
  };
  const margen = margenContribucion(params);
  const pct = margenPct(params);
  const cumple = cumpleUmbralMargen(params, 25);

  const campo = (label: string, value: number, set: (n: number) => void, step = 0.1) => (
    <label style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
      <span style={{ color: "var(--muted)" }}>{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => set(parseFloat(e.target.value) || 0)}
        style={{ width: 120, background: "var(--panel-2)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 8px", textAlign: "right" }}
      />
    </label>
  );

  return (
    <>
      <h1>Calculadora de margen</h1>
      <p className="sub">
        Evalúa un producto al vuelo con la regla de oro (margen de contribución ≥ 25 €).
        Usa la misma lógica que el resto del CRM.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
        <div className="card">
          {campo("Precio de venta (€)", precio, setPrecio)}
          {campo("Coste producto (€)", coste, setCoste)}
          {campo("Envío (€)", envio, setEnvio)}
          {campo("Comisión creador (%)", pctComision, setPctComision)}
          {campo("Comisión pasarela (%)", pctPasarela, setPctPasarela)}
        </div>
        <div className="card">
          <div className="stat" style={{ marginBottom: 14 }}>
            <div className="label">Margen de contribución</div>
            <div className="value" style={{ color: cumple ? "var(--good)" : "var(--bad)" }}>{eur(margen)}</div>
          </div>
          <div className="stat" style={{ marginBottom: 14 }}>
            <div className="label">Margen %</div>
            <div className="value">{pct.toFixed(1)}%</div>
          </div>
          <div className={`badge ${cumple ? "good" : "bad"}`}>
            {cumple ? "✅ Cumple la regla (≥ 25 €)" : "⛔ No llega al umbral de 25 €"}
          </div>
        </div>
      </div>
      <p className="sub" style={{ marginTop: 14 }}>
        Margen = precio − coste − envío − comisión creador − comisión pasarela (incluye
        fija de 0,25 €). Ajusta los valores y se recalcula al instante.
      </p>
    </>
  );
}
