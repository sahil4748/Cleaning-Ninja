"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import {
  prototypeServices,
  additionalServices,
} from "@/content/homepage-prototype";
import type { QuoteSelection } from "./Offers";
export default function Services({
  onSelect,
}: {
  onSelect: (selection: QuoteSelection) => void;
}) {
  const [active, setActive] = useState(0);
  const service = prototypeServices[active];
  return (
    <section
      id="services"
      className="cn-section cn-services"
      aria-labelledby="services-title"
    >
      <div className="cn-section-heading">
        <div>
          <p className="cn-label">Everyday life. Expert attention.</p>
          <h2 id="services-title">
            Not just clean.
            <br />
            <em>Cared for.</em>
          </h2>
        </div>
        <p>
          Carpets first. And all the other
          <br />
          surfaces that make a space yours.
        </p>
      </div>
      <div className="cn-service-layout">
        <div className="cn-service-list">
          {prototypeServices.map((item, index) => (
            <div key={item.name}>
              <button
                aria-expanded={active === index}
                aria-controls={`service-detail-${index}`}
                onClick={() => setActive(index)}
              >
                <span>{item.name}</span>
                {active === index ? <Minus size={21} /> : <Plus size={21} />}
              </button>
              <div
                id={`service-detail-${index}`}
                className="cn-service-description"
                hidden={active !== index}
              >
                <p>{item.detail}</p>
                <button
                  className="cn-text-link"
                  onClick={() =>
                    onSelect({ service: item.name, packageName: "" })
                  }
                >
                  Get a Free Quote
                  <ArrowUpRight size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cn-service-visual">
          <Image
            key={service.image}
            src={service.image}
            alt={`${service.name} — illustrative interior`}
            fill
            sizes="(max-width:767px) 100vw, 46vw"
          />
          <div className="cn-service-tags">
            {service.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="cn-extra-services">
        <span>Something else in mind?</span>
        <div>
          {additionalServices.map((service) => (
            <button
              key={service}
              onClick={() => onSelect({ service, packageName: "" })}
            >
              {service}
              <ArrowUpRight size={14} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
