import type { ReactNode } from "react";
import Link from "next/link";
import { Geist, Instrument_Serif } from "next/font/google";
import { Arrow, Mark } from "../atelier/Primitives";
import "../atelier/atelier.css";
import "../atelier/legal.css";

const editorial = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--home-editorial",
  display: "swap",
});
const sans = Geist({
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
      className={`${editorial.variable} ${sans.variable} at-site at-legal-page`}
    >
      <a className="at-skip" href="#at-legal-content">
        Skip to content
      </a>
      <header className="at-legal-header">
        <Link
          className="at-legal-brand"
          href="/"
          aria-label="Cleaning Ninja home"
        >
          <Mark />
          <span>cleaning ninja</span>
        </Link>
        <Link className="at-legal-back" href="/">
          Back to home <Arrow />
        </Link>
        <Link className="at-button at-legal-quote" href="/#quote">
          Get a free quote
          <span>
            <Arrow />
          </span>
        </Link>
      </header>
      <main id="at-legal-content" className="at-legal-main">
        <div className="at-legal-intro">
          <p className="at-legal-eyebrow">Cleaning Ninja · 29 September 2026</p>
          <h1>{title}</h1>
          <p className="at-legal-description">{intro}</p>
        </div>
        <article className="at-legal-article">{children}</article>
        <nav className="at-legal-navigation" aria-label="Legal pages">
          <Link href="/legal/privacy">
            Privacy policy <Arrow />
          </Link>
          <Link href="/legal/terms">
            Terms &amp; offer conditions <Arrow />
          </Link>
        </nav>
      </main>
      <footer className="at-legal-footer">
        <Link
          className="at-legal-brand"
          href="/"
          aria-label="Cleaning Ninja home"
        >
          <Mark />
          <span>cleaning ninja</span>
        </Link>
        <a href="mailto:contact@cleaningninja.co">contact@cleaningninja.co</a>
        <Link href="/">
          Back to home <Arrow />
        </Link>
      </footer>
    </div>
  );
}
