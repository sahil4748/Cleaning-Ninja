"use client";

import { useEffect, useState } from "react";
import styles from "./CNHeader.module.css";

export default function CNHeader() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={styles.header} role="banner">
      <a href="#main" className={styles.skip}>Skip to content</a>

      <div className={styles.container}>
        {/* Brand (emoji badge preserved) */}
        <a href="/" className={styles.brand} aria-label="Cleaning Ninja home">
          <span className={styles.badge} aria-hidden="true">🥷</span>
          <span className={styles.wordmark}>
            <strong>Cleaning Ninja</strong>
            <span className={styles.tagline}>Your mess, our mission.</span>
          </span>
        </a>

        {/* Center navigation */}
        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            <li><a className={styles.link} href="/">Home</a></li>
            <li><a className={styles.link} href="/about">About Us</a></li>
            <li><a className={styles.link} href="/services">Services</a></li>
            <li><a className={styles.link} href="/gallery">Gallery</a></li>
            <li><a className={styles.link} href="/special-offers">Special Offers</a></li>
            <li><a className={styles.link} href="/become-a-cleaner">Become a Cleaner</a></li>
          </ul>
        </nav>

        {/* Right actions (aligned) */}
        <div className={styles.actions}>
          <a className={styles.phone} href="tel:1300000123" aria-label="Call 1300 000 123">
            <span aria-hidden>📞</span>&nbsp;1300 000 123
          </a>
          <a className={styles.cta} href="/quote" aria-label="Get your free quote">Get your free quote</a>
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
      <div
        id="mobile-nav"
        className={`${styles.mobile} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
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
  );
}
