import { getImageProps } from "next/image";
import { ArrowDown, ArrowUpRight, Check, Phone } from "lucide-react";
import { MEDIA } from "@/content/media";
import { prototypeContact } from "@/content/homepage-prototype";
export default function Hero() {
  const { props: desktop } = getImageProps({
    src: MEDIA.hero.desktop.poster,
    width: 5504,
    height: 3072,
    alt: "",
    sizes: "(min-width: 1600px) 100vw, 1600px",
    loading: "eager",
    fetchPriority: "high",
  });
  const { props: mobile } = getImageProps({
    src: MEDIA.hero.mobile.poster,
    width: 3072,
    height: 5504,
    alt: "",
    sizes: "max(100vw, 56.25vh)",
    loading: "eager",
    fetchPriority: "high",
  });
  return (
    <section className="cn-hero" aria-labelledby="hero-title">
      <div className="cn-hero-media" aria-hidden="true">
        <picture>
          <source
            media="(min-width:768px)"
            srcSet={desktop.srcSet}
            sizes={desktop.sizes}
          />
          <img {...mobile} alt="" />
        </picture>
      </div>
      <div className="cn-hero-content">
        <p className="cn-hero-category">Carpet · upholstery · rug cleaning</p>
        <h1 id="hero-title">
          Cleaner carpets.
          <br />
          <em>A fresher home.</em>
        </h1>
        <p className="cn-hero-description">
          A deeper clean for the spaces you love.
          <br />
          From everyday carpets to your favourite seat.
        </p>
        <div className="cn-hero-actions">
          <a className="cn-button cn-button-lime" href="#quote">
            Get a Free Quote
            <ArrowUpRight size={19} />
          </a>
          <a className="cn-hero-phone" href={prototypeContact.href}>
            <Phone size={18} />
            {prototypeContact.phone}
          </a>
        </div>
        <p className="cn-hero-assurance">
          <Check size={15} />
          Free quote <span />
          No obligation <span />
          Your home. Your scope.
        </p>
      </div>
      <a className="cn-hero-offer" href="#packages">
        <div>
          <span>Fresh space. Better value.</span>
          <strong>
            Up to <b>30%</b> off
          </strong>
          <small>Selected cleaning packages*</small>
        </div>
        <ArrowUpRight size={27} />
      </a>
      <div className="cn-hero-bottom">
        <span>Thoughtful care. From the floor up.</span>
        <a href="#packages">
          Explore the offers
          <ArrowDown size={17} />
        </a>
      </div>
    </section>
  );
}
