"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "./atelier/Header";
import Hero from "./atelier/Hero";
import Services from "./atelier/Services";
import Packages from "./atelier/Packages";
import Supporting from "./atelier/Supporting";
import Quote from "./atelier/Quote";
import Cinema from "./atelier/Cinema";
import { Arrow, Mark } from "./atelier/Primitives";
import { useAtelierMotion } from "./atelier/useAtelierMotion";
import type { QuoteSelection } from "./prototype/Offers";
import "./atelier/atelier.css";
import "./atelier/supporting.css";
export default function Homepage() {
  const root = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<QuoteSelection>({
    service: "",
    packageName: "",
  });
  const [motion, setMotion] = useState(true);
  const [sticky, setSticky] = useState(false);
  useAtelierMotion(root, motion);
  useEffect(() => {
    document.documentElement.dataset.atMotion = motion ? "on" : "off";
    return () => {
      delete document.documentElement.dataset.atMotion;
    };
  }, [motion]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotion(!media.matches);
    update();
    media.addEventListener("change", update);
    const hero = document.querySelector(".at-hero");
    const quote = document.getElementById("quote");
    const cinema = document.getElementById("experience");
    let heroVisible = true;
    let quoteVisible = false;
    let cinemaVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === hero) heroVisible = entry.isIntersecting;
          if (entry.target === quote) quoteVisible = entry.isIntersecting;
          if (entry.target === cinema)
            cinemaVisible = entry.intersectionRatio > 0.12;
        });
        setSticky(!heroVisible && !quoteVisible && !cinemaVisible);
      },
      { threshold: [0, 0.12] },
    );
    if (hero) observer.observe(hero);
    if (quote) observer.observe(quote);
    if (cinema) observer.observe(cinema);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);
  function select(value: QuoteSelection) {
    setSelection(value);
    document.getElementById("quote")?.scrollIntoView({ behavior: "instant" });
    requestAnimationFrame(() =>
      document.getElementById("at-service")?.focus({ preventScroll: true }),
    );
  }
  return (
    <div className="at-site" data-motion={motion ? "on" : "off"} ref={root}>
      <Header motion={motion} onMotion={() => setMotion(!motion)} />
      <main id="main-content" tabIndex={-1}>
        <Hero motion={motion} />
        <section className="at-intro" aria-labelledby="intro-title">
          <div className="at-intro-aside">
            <Mark />
            <span>
              A home is for living.
              <br />
              We take care of the reset.
            </span>
          </div>
          <h2
            id="intro-title"
            className="at-word-reveal"
            aria-label="The muddy paws. The slow Sundays. The beautifully busy everyday. Life leaves its mark. We help you start fresh."
          >
            {"The muddy paws. The slow Sundays. The beautifully busy everyday."
              .split(" ")
              .map((word, index) => (
                <span key={index}>{word} </span>
              ))}
            <span className="at-intro-last">
              Life leaves its mark.{" "}
              <i className="at-inline-photo" aria-hidden="true" />{" "}
              <em>We help you start fresh.</em>
            </span>
          </h2>
          <div className="at-intro-bottom">
            <span>Thoughtful cleaning for homes & workplaces.</span>
            <a href="#services" className="at-text-link">
              Find your clean <Arrow />
            </a>
          </div>
        </section>
        <Services onSelect={select} />
        <Cinema motion={motion} />
        <Packages onSelect={select} />
        <Supporting onSelect={select} />
        <Quote selection={selection} onSelection={setSelection} />
        <section className="at-finale" aria-labelledby="finale-title">
          <p>Less on your list. More life in your day.</p>
          <a href="#quote">
            <h2 id="finale-title">
              Leave the clean
              <br />
              <em>to us.</em>
            </h2>
            <span className="at-finale-arrow">
              <Arrow />
            </span>
          </a>
          <div className="at-finale-line">
            <span>Your space, beautifully considered.</span>
            <span>Cleaning Ninja · Australia</span>
          </div>
        </section>
      </main>
      <footer className="at-footer">
        <div className="at-footer-top">
          <Link href="/" className="at-small-brand">
            <Mark />
            cleaning ninja
          </Link>
          <a href="mailto:contact@cleaningninja.co">
            contact@cleaningninja.co <Arrow />
          </a>
        </div>
        <div className="at-footer-nav">
          <span>© {new Date().getFullYear()} Cleaning Ninja</span>
          <nav aria-label="Footer navigation">
            <a href="#services">Services</a>
            <a href="#coverage">Service areas</a>
            <a href="/legal/privacy">Privacy</a>
            <a href="/legal/terms">Terms</a>
          </nav>
          <a href="#top">Back to the top ↑</a>
        </div>
        <div className="at-footer-word" aria-hidden="true">
          a fresh feeling.
        </div>
      </footer>
      <a href="#quote" className="at-sticky-quote" hidden={!sticky}>
        Your fresh start{" "}
        <span>
          <Arrow />
        </span>
      </a>
    </div>
  );
}
