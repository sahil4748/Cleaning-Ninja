"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesBtnRef = useRef<HTMLButtonElement | null>(null);
  const servicesMenuRef = useRef<HTMLUListElement | null>(null);

  // Close services menu on outside click / Escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!servicesOpen) return;
      const t = e.target as Node;
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(t) &&
        servicesBtnRef.current &&
        !servicesBtnRef.current.contains(t)
      ) {
        setServicesOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setServicesOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={styles.header} role="banner">
        <a href="#main" className={styles.skip}>Skip to content</a>
        <div className={styles.wrap}>
          {/* Brand */}
          <a href="/" className={styles.brand} aria-label="Cleaning Ninja home">
            <span className={styles.logo} aria-hidden="true">
              {/* Olive–Gold medallion, CSS animated (3D-ish) */}
              <svg
                className={styles.logoSvg}
                viewBox="0 0 120 120"
                width="40"
                height="40"
                role="img"
                aria-labelledby="logoTitle logoDesc"
              >
                <title id="logoTitle">Cleaning Ninja Medallion</title>
                <desc id="logoDesc">
                  Gold ring with olive disc and minimalist ninja mask.
                </desc>
                <defs>
                  <linearGradient id="ringGold" x1="0" x2="1">
                    <stop offset="0%" stopColor="#E1C065" />
                    <stop offset="60%" stopColor="#D9B24C" />
                    <stop offset="100%" stopColor="#C9A138" />
                  </linearGradient>
                  <radialGradient id="discOlive" cx="40%" cy="35%" r="70%">
                    <stop offset="0%" stopColor="#2B3A30" />
                    <stop offset="100%" stopColor="#1E2A22" />
                  </radialGradient>
                  <radialGradient id="sheen" cx="30%" cy="25%" r="75%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".35" />
                    <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* outer coin ring */}
                <circle cx="60" cy="60" r="56" fill="url(#ringGold)" className={styles.logoRing}/>
                {/* inner disc */}
                <circle cx="60" cy="60" r="46" fill="url(#discOlive)" className={styles.logoDisc}/>
                {/* ninja face */}
                <g className={styles.logoFace} transform="translate(0,2)">
                  <circle cx="60" cy="58" r="34" fill="#1A241E" />
                  <rect x="30" y="50" width="60" height="18" rx="9" fill="#0F1512" />
                  <circle cx="48" cy="59" r="4.4" fill="#F4EBDD" />
                  <circle cx="72" cy="59" r="4.4" fill="#F4EBDD" />
                  <rect x="34" y="38" width="52" height="10" rx="5" fill="#D9B24C" />
                  <path d="M86 41c8 3 12 6 14 9-7-2-12-2-17 1 1-3 1-6 3-10z" fill="#C9A138"/>
                </g>
                {/* specular highlight */}
                <circle cx="60" cy="60" r="44" fill="url(#sheen)"/>
              </svg>
            </span>
            <span className={styles.wordmark}>
              <strong>Cleaning Ninja</strong>
              <span className={styles.tagline}>Premium Australian Service</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.navList}>
              <li><a className={styles.link} href="/">Home</a></li>
              <li><a className={styles.link} href="/about">About Us</a></li>
              <li className={styles.hasDropdown}>
                <button
                  className={styles.dropdownBtn}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  onClick={() => setServicesOpen(v => !v)}
                  ref={servicesBtnRef}
                >
                  Services
                  <span className={styles.caret} aria-hidden>▾</span>
                </button>
                <ul
                  id="services-menu"
                  className={`${styles.dropdown} ${servicesOpen ? styles.open : ""}`}
                  ref={servicesMenuRef}
                  role="menu"
                >
                  <li role="none"><a role="menuitem" href="/services#residential">Residential Cleaning</a></li>
                  <li role="none"><a role="menuitem" href="/services#carpet">Carpet &amp; Rug</a></li>
                  <li role="none"><a role="menuitem" href="/services#upholstery">Upholstery</a></li>
                  <li role="none"><a role="menuitem" href="/services#tile">Tile &amp; Grout</a></li>
                  <li role="none"><a role="menuitem" href="/services#commercial">Commercial &amp; Office</a></li>
                  <li role="none"><a role="menuitem" href="/services#end-of-lease">End of Lease</a></li>
                </ul>
              </li>
              <li><a className={styles.link} href="/gallery">Gallery</a></li>
              <li><a className={styles.link} href="/special-offers">Special Offers</a></li>
            </ul>
          </nav>

          {/* Right actions */}
          <div className={styles.actions}>
            <a className={styles.phone} href="tel:1300000123" aria-label="Call Cleaning Ninja at 1300 000 123">
              <span aria-hidden>📞</span>&nbsp;1300 000 123
            </a>
            <button
              className={styles.hamburger}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(v => !v)}
            >
              <span className={styles.bars} />
            </button>
          </div>
        </div>

        {/* Mobile sheet */}
        <div id="mobile-menu" className={`${styles.mobile} ${menuOpen ? styles.show : ""}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <ul className={styles.mobileList}>
            <li><a onClick={() => setMenuOpen(false)} href="/">Home</a></li>
            <li><a onClick={() => setMenuOpen(false)} href="/about">About Us</a></li>
            <li className={styles.mobileGroup}>
              <details>
                <summary>Services</summary>
                <ul>
                  <li><a onClick={() => setMenuOpen(false)} href="/services#residential">Residential Cleaning</a></li>
                  <li><a onClick={() => setMenuOpen(false)} href="/services#carpet">Carpet &amp; Rug</a></li>
                  <li><a onClick={() => setMenuOpen(false)} href="/services#upholstery">Upholstery</a></li>
                  <li><a onClick={() => setMenuOpen(false)} href="/services#tile">Tile &amp; Grout</a></li>
                  <li><a onClick={() => setMenuOpen(false)} href="/services#commercial">Commercial &amp; Office</a></li>
                  <li><a onClick={() => setMenuOpen(false)} href="/services#end-of-lease">End of Lease</a></li>
                </ul>
              </details>
            </li>
            <li><a onClick={() => setMenuOpen(false)} href="/gallery">Gallery</a></li>
            <li><a onClick={() => setMenuOpen(false)} href="/special-offers">Special Offers</a></li>
            <li><a onClick={() => setMenuOpen(false)} className={styles.mobilePhone} href="tel:1300000123">📞 1300 000 123</a></li>
            <li><a onClick={() => setMenuOpen(false)} className={styles.mobileCta} href="/quote">Get a Quote</a></li>
          </ul>
        </div>
      </header>

      {/* Floating CTA */}
      <a href="/quote" className={styles.fab} aria-label="Get a Quote">
        Get a Quote
      </a>
    </>
  );
}

