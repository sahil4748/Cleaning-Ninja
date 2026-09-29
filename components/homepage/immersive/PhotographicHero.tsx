import { getImageProps } from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MEDIA } from "@/content/media";
import type { QuoteSelection } from "../prototype/Offers";

export default function PhotographicHero({
  onSelect,
}: {
  onSelect: (value: QuoteSelection) => void;
}) {
  const { props: desktop } = getImageProps({
    src: MEDIA.hero.desktop.poster,
    width: 5504,
    height: 3072,
    alt: "",
    sizes: "max(100vw, 179vh)",
    loading: "eager",
    fetchPriority: "high",
  });
  const { props: mobile } = getImageProps({
    src: MEDIA.hero.mobile.poster,
    width: 3072,
    height: 5504,
    alt: "Sunlight falling across a softly furnished living room",
    sizes: "max(100vw, 56vh)",
    loading: "eager",
    fetchPriority: "high",
  });
  return (
    <section className="cn-photo-hero" aria-labelledby="hero-title">
      <div className="cn-photo-media">
        <picture>
          <source
            media="(min-width:768px)"
            srcSet={desktop.srcSet}
            sizes={desktop.sizes}
          />
          <img {...mobile} alt={mobile.alt} />
        </picture>
      </div>
      <div className="cn-photo-shade" />
      <div className="cn-photo-copy">
        <p className="cn-photo-kicker">
          <span /> Carpet, upholstery & home cleaning
        </p>
        <h1 id="hero-title">
          That fresh
          <br />
          <em>home feeling.</em>
        </h1>
        <p className="cn-photo-description">
          The carpets. The couch. The little things.
          <br />
          We take care of the clean. You get back to living.
        </p>
        <div className="cn-photo-actions">
          <a className="cn-button" href="#quote">
            Get a Free Quote <ArrowUpRight size={19} />
          </a>
          <a className="cn-photo-discover" href="#experience">
            <span>
              <ArrowDown size={18} />
            </span>{" "}
            A little less to do.
            <br />A lot more to enjoy.
          </a>
        </div>
        <p className="cn-photo-assurance">Free quote. No obligation.</p>
      </div>
      <a className="cn-photo-offer" href="#packages">
        <span>Better together.</span>
        <strong>
          <small>Up to</small>30<span>%</span>
          <small>off*</small>
        </strong>
        <span>
          Find your cleaning package <ArrowUpRight size={18} />
        </span>
      </a>
      <div className="cn-photo-bottom">
        <div
          className="cn-photo-services"
          aria-label="Choose a cleaning service"
        >
          {[
            ["Carpets", "Carpet cleaning"],
            ["Upholstery", "Upholstery cleaning"],
            ["Rugs", "Rug cleaning"],
          ].map(([name, service], i) => (
            <button
              key={service}
              onClick={() => onSelect({ service, packageName: "" })}
            >
              <span>0{i + 1}</span>
              {name}
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
        <a href="#experience" className="cn-photo-scroll">
          Make room for living <ArrowDown size={17} />
        </a>
      </div>
    </section>
  );
}
