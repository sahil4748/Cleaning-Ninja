"use client";
import { useEffect, useRef, useState } from "react";
import { Arrow, Mark } from "./Primitives";
const links = [
  ["The collection", "#services"],
  ["Our approach", "#experience"],
  ["Packages", "#packages"],
];
export default function Header({
  motion,
  onMotion,
}: {
  motion: boolean;
  onMotion: () => void;
}) {
  const menu = useRef<HTMLDialogElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const target = document.getElementById("top");
    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a href="#main-content" className="at-skip">
        Skip to content
      </a>
      <header className="at-header" data-scrolled={scrolled}>
        <a
          className="at-small-brand"
          href="#top"
          aria-label="Cleaning Ninja home"
        >
          <Mark />
          <span>cleaning ninja</span>
        </a>
        <nav aria-label="Main navigation">
          {links.map(([title, href]) => (
            <a key={href} href={href}>
              {title}
            </a>
          ))}
        </nav>
        <div className="at-header-actions">
          <button
            className="at-motion-toggle"
            aria-label={motion ? "Pause motion" : "Enable motion"}
            aria-pressed={!motion}
            onClick={onMotion}
          >
            <span aria-hidden="true">{motion ? "Ⅱ" : "▷"}</span>
          </button>
          <a className="at-button at-header-cta" href="#quote">
            Get a free quote{" "}
            <span>
              <Arrow />
            </span>
          </a>
          <button
            className="at-menu-toggle"
            aria-label="Open menu"
            aria-haspopup="dialog"
            onClick={() => menu.current?.showModal()}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <dialog
        ref={menu}
        className="at-menu"
        aria-labelledby="at-menu-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) menu.current?.close();
        }}
      >
        <div className="at-menu-head">
          <a
            href="#top"
            className="at-small-brand"
            onClick={() => menu.current?.close()}
          >
            <Mark />
            cleaning ninja
          </a>
          <button
            aria-label="Close menu"
            autoFocus
            onClick={() => menu.current?.close()}
          >
            ×
          </button>
        </div>
        <h2 id="at-menu-title">
          A fresh start
          <br />
          <em>is a good start.</em>
        </h2>
        <nav aria-label="Mobile navigation">
          {[
            ...links,
            ["Commercial", "#commercial"],
            ["A little clarity", "#faq"],
          ].map(([title, href], i) => (
            <a key={href} href={href} onClick={() => menu.current?.close()}>
              <small>0{i + 1}</small>
              {title}
              <Arrow />
            </a>
          ))}
        </nav>
        <a
          className="at-button"
          href="#quote"
          onClick={() => menu.current?.close()}
        >
          Get a free quote{" "}
          <span>
            <Arrow />
          </span>
        </a>
        <a className="at-menu-email" href="mailto:contact@cleaningninja.co">
          contact@cleaningninja.co
        </a>
      </dialog>
    </>
  );
}
