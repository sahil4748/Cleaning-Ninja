"use client";
import { useState } from "react";
import Image from "next/image";
import {
  prototypeServices,
  additionalServices,
} from "@/content/homepage-prototype";
import type { QuoteSelection } from "../prototype/Offers";
import { Arrow } from "./Primitives";
const collection = [
  {
    ...prototypeServices[0],
    title: "Carpets",
    image: "/homepage/atelier/service-carpet.webp",
    phrase: "A softer landing.",
  },
  {
    ...prototypeServices[1],
    title: "Upholstery",
    image: "/homepage/atelier/service-upholstery.webp",
    phrase: "Your favourite seat.",
  },
  { ...prototypeServices[2], title: "Rugs", phrase: "The heart of the room." },
  {
    ...prototypeServices[3],
    title: "Tile & grout",
    image: "/homepage/atelier/service-tile.webp",
    phrase: "Every line considered.",
  },
];
export default function Services({
  onSelect,
}: {
  onSelect: (value: QuoteSelection) => void;
}) {
  const [active, setActive] = useState(0);
  return (
    <section
      id="services"
      className="at-services"
      aria-labelledby="services-title"
    >
      <div className="at-section-heading">
        <div>
          <p className="at-eyebrow">THE CLEANING COLLECTION</p>
          <h2 id="services-title">
            Good spaces.
            <br />
            <em>Beautifully cared for.</em>
          </h2>
        </div>
        <p>
          From the carpet beneath your feet
          <br />
          to the seat you always come back to.
          <br />
          <span>Find the care your space needs.</span>
        </p>
      </div>
      <div className="at-service-accordion">
        {collection.map((item, index) => (
          <article
            key={item.name}
            className="at-service-panel"
            data-active={active === index}
          >
            <Image
              src={item.image}
              alt={
                item.title === "Rugs"
                  ? "Natural woven rug in a warm living space"
                  : `${item.title} in a thoughtfully furnished space`
              }
              fill
              sizes="(max-width:767px) 100vw, 45vw"
            />
            <div className="at-service-shade" />
            <button
              className="at-service-select"
              aria-expanded={active === index}
              aria-controls={`at-service-content-${index}`}
              onClick={() => setActive(index)}
            >
              <span className="at-service-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <span className="at-service-plus">
                {active === index ? "−" : "+"}
              </span>
            </button>
            <div
              className="at-service-content"
              id={`at-service-content-${index}`}
              hidden={active !== index}
            >
              <p className="at-service-phrase">{item.phrase}</p>
              <p>{item.detail}</p>
              <button
                className="at-service-quote"
                onClick={() =>
                  onSelect({ service: item.name, packageName: "" })
                }
              >
                Enquire about {item.title.toLowerCase()}{" "}
                <span>
                  <Arrow />
                </span>
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="at-more-services">
        <p>
          A little more
          <br />
          <em>off your list.</em>
        </p>
        <div>
          {[
            "Leather cleaning",
            "End-of-lease cleaning",
            ...additionalServices,
          ].map((service) => (
            <button
              key={service}
              onClick={() => onSelect({ service, packageName: "" })}
            >
              {service}
              <Arrow />
            </button>
          ))}
        </div>
      </div>
      <div className="at-ribbon" aria-hidden="true">
        <div>
          {[0, 1].map((i) => (
            <span key={i}>
              A fresh start <i>·</i> A clearer head <i>·</i> A softer landing{" "}
              <i>·</i>{" "}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
