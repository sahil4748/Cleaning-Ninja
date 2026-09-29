"use client";
import Image from "next/image";
import { useState } from "react";
import { prototypeOffers } from "@/content/homepage-prototype";
import type { QuoteSelection } from "../prototype/Offers";
import { Arrow } from "./Primitives";
export default function Packages({
  onSelect,
}: {
  onSelect: (value: QuoteSelection) => void;
}) {
  const [active, setActive] = useState(0);
  const item = prototypeOffers[active];
  return (
    <section
      id="packages"
      className="at-packages"
      aria-labelledby="packages-title"
    >
      <div className="at-section-heading">
        <div>
          <p className="at-eyebrow">THE EVERYDAY RESET, TOGETHER</p>
          <h2 id="packages-title">
            A little more clean.
            <br />
            <em>A little less organising.</em>
          </h2>
        </div>
        <p>
          Bring your spaces into one simple enquiry.
          <br />
          Choose a starting point.
          <br />
          We’ll shape the quote around your home.
        </p>
      </div>
      <div className="at-package-layout">
        <div className="at-package-image">
          <Image
            key={item.id}
            src={item.image}
            alt={item.label}
            fill
            sizes="(max-width:767px) 100vw, 48vw"
          />
          <div>
            <span>YOUR HOME. YOUR KIND OF CLEAN.</span>
            <p>{item.name}</p>
          </div>
          <span className="at-package-counter">0{active + 1} / 05</span>
        </div>
        <div className="at-package-list">
          {prototypeOffers.map((offer, i) => (
            <article key={offer.id} data-active={active === i}>
              <button
                className="at-package-toggle"
                aria-expanded={active === i}
                aria-controls={`at-package-${i}`}
                onClick={() => setActive(i)}
              >
                <span>0{i + 1}</span>
                <h3>{offer.label}</h3>
                <span>{active === i ? "−" : "+"}</span>
              </button>
              <div
                id={`at-package-${i}`}
                className="at-package-details"
                hidden={active !== i}
              >
                <p>{offer.note}</p>
                <p className="at-package-quote-note">
                  A personal quote. Clear scope before you book.
                </p>
                <button
                  className="at-text-link"
                  onClick={() =>
                    onSelect({
                      service: offer.service,
                      packageName: offer.label,
                    })
                  }
                >
                  Enquire about this package <Arrow />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
