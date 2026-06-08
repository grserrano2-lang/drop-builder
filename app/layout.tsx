import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drop Builder — Métricas",
  description: "Plataforma de métricas tipo holding para tiendas Drop Builder.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <nav className="topbar">
          <span className="brand">📊 Drop Builder</span>
          <a href="/">Consolidado</a>
          <a href="/tiendas">Tiendas</a>
          <a href="/creadores">Creadores</a>
          <a href="/embudo">Embudo</a>
          <a href="/alertas">Alertas</a>
        </nav>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
