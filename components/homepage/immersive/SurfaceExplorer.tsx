"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import {
  prototypeServices,
  additionalServices,
} from "@/content/homepage-prototype";
import type { QuoteSelection } from "../prototype/Offers";
export default function SurfaceExplorer({
  onSelect,
}: {
  onSelect: (v: QuoteSelection) => void;
}) {
  const [active, setActive] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  const service = prototypeServices[active];
  function select(i: number) {
    setActive(i);
    const card = rail.current?.children[i] as HTMLElement | undefined;
    if (card && rail.current) {
      rail.current.scrollTo({
        left: card.offsetLeft - rail.current.offsetLeft,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  }
  return (
    <section
      id="services"
      className="im-services"
      aria-labelledby="services-title"
    >
      <div className="im-section-top">
        <p>Care for every corner</p>
        <span>Homes / workspaces / everything in between</span>
      </div>
      <div className="im-service-title">
        <h2 id="services-title">
          Find your
          <br />
          <span>fresh.</span>
        </h2>
        <div>
          <p>
            Big family moments. Small everyday spills.
            <br />
            There’s a clean for the way you live.
          </p>
          <div className="im-rail-controls">
            <button
              aria-label="Previous service"
              onClick={() => select((active + 6) % 7)}
            >
              <ArrowLeft />
            </button>
            <button
              aria-label="Next service"
              onClick={() => select((active + 1) % 7)}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="im-service-rail" ref={rail}>
        {prototypeServices.map((s, i) => (
          <button
            key={s.name}
            className="im-surface-card"
            aria-label={s.name}
            aria-pressed={active === i}
            onClick={() => select(i)}
          >
            <Image
              src={s.image}
              alt={s.name}
              fill
              sizes="(max-width:767px) 82vw, 36vw"
            />
            <span className="im-surface-number">0{i + 1}</span>
            <span className="im-surface-name">
              {s.name}
              <span>
                <Plus size={24} />
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="im-service-detail" aria-live="polite">
        <div>
          <span className="im-detail-count">0{active + 1} / 07</span>
          <h3>{service.name}</h3>
          <p>{service.detail}</p>
        </div>
        <div>
          <div className="im-tags">
            {service.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <button
            className="cn-button"
            onClick={() => onSelect({ service: service.name, packageName: "" })}
          >
            Get a Free Quote <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
      <div className="im-more-services">
        <p>And a little more.</p>
        <div>
          {additionalServices.map((s) => (
            <button
              key={s}
              onClick={() => onSelect({ service: s, packageName: "" })}
            >
              {s}
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
