import type { ReactNode } from "react";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Arrow, Brand } from "./Primitives";
import "./legal.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--renewal-serif",
  display: "swap",
});
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--renewal-sans",
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
    <div className={`${serif.variable} ${sans.variable} rn-legal-page`}>
      <a className="rn-legal-skip" href="#rn-legal-content">
        Skip to content
      </a>
      <header className="rn-legal-header">
        <Link
          className="rn-legal-brand"
          href="/"
          aria-label="Cleaning Ninja home"
        >
          <Brand />
        </Link>
        <Link className="rn-legal-back" href="/">
          Back to home <Arrow />
        </Link>
        <Link className="rn-legal-quote" href="/#quote">
          Get a quote <Arrow />
        </Link>
      </header>
      <main id="rn-legal-content" className="rn-legal-main">
        <div className="rn-legal-intro">
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        <article className="rn-legal-article">{children}</article>
        <nav className="rn-legal-navigation" aria-label="Legal pages">
          <Link href="/legal/privacy">
            Privacy policy <Arrow />
          </Link>
          <Link href="/legal/terms">
            Terms &amp; offer conditions <Arrow />
          </Link>
        </nav>
      </main>
      <footer className="rn-legal-footer">
        <Link
          className="rn-legal-brand"
          href="/"
          aria-label="Cleaning Ninja home"
        >
          <Brand />
        </Link>
        <a href="mailto:contact@cleaningninja.co">contact@cleaningninja.co</a>
        <span>Room to breathe.</span>
      </footer>
    </div>
  );
}
