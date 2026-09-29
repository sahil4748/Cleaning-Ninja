import type { ReactNode } from "react";
import Link from "next/link";
import { Outfit, Manrope } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import Brand from "./Brand";
import "./prototype.css";
import "../immersive/immersive.css";
const serif = Outfit({
  subsets: ["latin"],
  variable: "--home-serif",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--home-sans",
  display: "swap",
});
export default function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`${serif.variable} ${sans.variable} cn-site cn-immersive cn-legal-page`}
    >
      <header className="cn-header">
        <Brand />
        <Link className="cn-button" href="/#quote">
          Get a Free Quote
          <ArrowUpRight size={18} />
        </Link>
      </header>
      <main className="cn-legal">
        <Link href="/" className="cn-text-link">
          Back to Cleaning Ninja
        </Link>
        <p className="cn-label">Cleaning Ninja · 29 September 2026</p>
        <h1>{title}</h1>
        <p className="cn-legal-intro">{intro}</p>
        <article>{children}</article>
        <nav aria-label="Legal pages">
          <Link href="/legal/privacy">Privacy policy</Link>
          <Link href="/legal/terms">Terms & offer conditions</Link>
          <Link href="/">Home</Link>
        </nav>
      </main>
      <footer className="cn-footer">
        <Brand light />
        <p>Cleaning Ninja · contact@cleaningninja.co</p>
      </footer>
    </div>
  );
}
