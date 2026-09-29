"use client";
import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Phone,
  Layers3,
  BadgePercent,
  Building2,
  MessageSquareText,
} from "lucide-react";
import Header from "./prototype/Header";
import Hero from "./prototype/Hero";
import Footer from "./prototype/Footer";
import SupportingSections from "./prototype/SupportingSections";
import Offers, { type QuoteSelection } from "./prototype/Offers";
import Services from "./prototype/Services";
import Film from "./prototype/Film";
import Quote from "./prototype/Quote";
import { prototypeContact } from "@/content/homepage-prototype";
import "./prototype/prototype.css";

export default function Homepage() {
  const [selection, setSelection] = useState<QuoteSelection>({
    service: "",
    packageName: "",
  });
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const root = document.querySelector(".cn-site")!;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    root
      .querySelectorAll(".cn-reveal")
      .forEach((element) => observer.observe(element));
    const update = () => {
      const quote = document.getElementById("quote")!.getBoundingClientRect();
      setShowSticky(
        window.scrollY > 650 &&
          (quote.top > window.innerHeight || quote.bottom < 0),
      );
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);
  function select(next: QuoteSelection) {
    setSelection(next);
    document.getElementById("quote")?.scrollIntoView({ behavior: "instant" });
    requestAnimationFrame(() =>
      document.getElementById("cn-service")?.focus({ preventScroll: true }),
    );
  }
  return (
    <div className="cn-site">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <div className="cn-value-strip">
          {[
            [Layers3, "Care for every material"],
            [BadgePercent, "Clear package inclusions"],
            [MessageSquareText, "Free, no-obligation quotes"],
            [Building2, "Homes & workplaces"],
          ].map(([Icon, text]) => {
            const Mark = Icon as typeof Layers3;
            return (
              <span key={String(text)}>
                <Mark size={21} strokeWidth={1.5} />
                {String(text)}
              </span>
            );
          })}
        </div>
        <Offers onSelect={select} />
        <Film />
        <Services onSelect={select} />
        <SupportingSections onSelect={select} />
        <Quote selection={selection} onSelection={setSelection} />
        <section className="cn-final-line">
          <p>
            A fresh start feels <em>good.</em>
          </p>
          <a href="#quote" aria-label="Get a Free Quote">
            <ArrowUpRight size={40} />
          </a>
        </section>
      </main>
      <Footer />
      <div className="cn-sticky" hidden={!showSticky}>
        <a
          href={prototypeContact.href}
          aria-label="Call 123456789, prototype number"
        >
          <Phone size={19} />
          Call us
        </a>
        <a href="#quote">
          Get a Free Quote
          <ArrowUpRight size={18} />
        </a>
      </div>
    </div>
  );
}
