"use client";
import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { prototypeOffers } from "@/content/homepage-prototype";
export type QuoteSelection = { service: string; packageName: string };
export default function Offers({
  onSelect,
}: {
  onSelect: (selection: QuoteSelection) => void;
}) {
  const [active, setActive] = useState(0);
  const [details, setDetails] = useState(false);
  const offer = prototypeOffers[active];
  function choose(index: number) {
    setActive(index);
    setDetails(false);
  }
  return (
    <section
      id="packages"
      className="cn-section cn-offers"
      aria-labelledby="offers-title"
    >
      <div className="cn-section-heading">
        <div>
          <p className="cn-label">A fresh start, for less</p>
          <h2 id="offers-title">
            Big on care.
            <br />
            <em>Better in a package.</em>
          </h2>
        </div>
        <p>
          Choose the clean that fits your home.
          <br />
          See what’s included, then get your free quote.
        </p>
      </div>
      <div
        className="cn-offer-tabs"
        role="group"
        aria-label="Choose a cleaning package"
      >
        {prototypeOffers.map((item, index) => (
          <button
            key={item.id}
            aria-pressed={active === index}
            onClick={() => choose(index)}
          >
            {
              [
                "3 rooms",
                "5 rooms",
                "3 rugs",
                "Fabric lounge",
                "Leather lounge",
              ][index]
            }
          </button>
        ))}
      </div>
      <article
        className="cn-offer-feature"
        aria-labelledby="active-offer-title"
      >
        <div className="cn-offer-photo">
          <Image
            key={offer.image}
            src={offer.image}
            alt={offer.label + " — illustrative interior"}
            fill
            sizes="(max-width:767px) 100vw, 50vw"
          />
          <span className="cn-discount">
            UP TO <strong>30%</strong> OFF*
          </span>
          <span className="cn-image-caption">Room to feel good again.</span>
        </div>
        <div className="cn-offer-copy">
          <span className="cn-label">{offer.label}</span>
          <h3 id="active-offer-title">{offer.name}</h3>
          <p className="cn-price">
            <span>From</span>
            <strong>${offer.price}</strong>
            <small>Example price · prototype</small>
          </p>
          <ul className="cn-inclusions">
            {offer.includes.map((item) => (
              <li key={item}>
                <Check size={18} />
                {item}
              </li>
            ))}
          </ul>
          <button
            className="cn-button"
            onClick={() =>
              onSelect({ service: offer.service, packageName: offer.label })
            }
          >
            Get my Free Quote
            <ArrowUpRight size={18} />
          </button>
          <button
            className="cn-offer-details"
            aria-expanded={details}
            aria-controls="offer-detail"
            onClick={() => setDetails(!details)}
          >
            Package details & conditions
            {details ? <Minus size={17} /> : <Plus size={17} />}
          </button>
          <div id="offer-detail" hidden={!details}>
            <p>
              {offer.note} Stain removal and results cannot be guaranteed. All
              displayed prices, inclusions and discounts are illustrative and
              need business approval before launch.
            </p>
          </div>
          <div className="cn-offer-controls">
            <span>
              {String(active + 1).padStart(2, "0")} <span>/ 05 packages</span>
            </span>
            <div>
              <button
                aria-label="Previous package"
                onClick={() => choose((active + 4) % 5)}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                aria-label="Next package"
                onClick={() => choose((active + 1) % 5)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </article>
      <p className="cn-offer-footnote">
        *Prototype promotion. Example AUD prices and inclusions shown for design
        review; final rates, eligibility and savings must be confirmed before
        launch.
      </p>
    </section>
  );
}
