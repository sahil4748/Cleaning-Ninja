"use client";

import { useEffect, useState } from "react";
import styles from "./CNHeader.module.css";

export default function CNHeader() {
  const [open, setOpen] = useState(false);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={styles.header} role="banner">
        <a href="#main" className={styles.skip}>Skip to content</a>
        <div className={styles.inner}>
          {/* Brand */}
          <a href="/" className={styles.brand} aria-label="Cleaning Ninja home">
            <span className={styles.logo} aria-hidden="true">
              {/* Flat inline SVG, no animation */}
              <svg viewBox="0 0 120 120" width="40" height="40" aria-hidden="true">
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
                </defs>
                <circle cx="60" cy="60" r="56" fill="url(#ringGold)"/>
                <circle cx="60" cy="60" r="46" fill="url(#discOlive)"/>
                <g transform="translate(0,2)">
                  <circle cx="60" cy="58" r="34" fill="#1A241E" />
                  <rect x="30" y="50" width="60" height="18" rx="9" fill="#0F1512" />
                  <circle cx="48" cy="59" r="4.4" fill="#F4EBDD" />
                  <circle cx="72" cy="59" r="4.4" fill="#F4EBDD" />
                  <rect x="34" y="38" width="52" height="10" rx="5" fill="#D9B24C" />
                </g>
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
              <li><a className={styles.link} href="/services">Services</a></li>
              <li><a className={styles.link} href="/gallery">Gallery</a></li>
              <li><a className={styles.link} href="/special-offers">Special Offers</a></li>
            </ul>
          </nav>

          {/* Right side */}
          <div className={styles.actions}>
            <a className={styles.phone} href="tel:1300000123" aria-label="Call 1300 000 123">
              <span aria-hidden>📞</span>&nbsp;1300 000 123
            </a>
            <a className={styles.cta} href="/quote">Get a Quote</a>
            <button
              className={styles.menuBtn}
              aria-label="Toggle navigation"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(v => !v)}
            >
              <span className={styles.menuIcon} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div id="mobile-nav" className={`${styles.mobile} ${open ? styles.open : ""}`} role="dialog" aria-modal="true">
          <ul className={styles.mobileList}>
            <li><a onClick={() => setOpen(false)} href="/">Home</a></li>
            <li><a onClick={() => setOpen(false)} href="/about">About Us</a></li>
            <li><a onClick={() => setOpen(false)} href="/services">Services</a></li>
            <li><a onClick={() => setOpen(false)} href="/gallery">Gallery</a></li>
            <li><a onClick={() => setOpen(false)} href="/special-offers">Special Offers</a></li>
            <li><a onClick={() => setOpen(false)} className={styles.mobilePhone} href="tel:1300000123">📞 1300 000 123</a></li>
            <li><a onClick={() => setOpen(false)} className={styles.mobileCta} href="/quote">Get a Quote</a></li>
          </ul>
        </div>
      </header>
    </>
  );
}

