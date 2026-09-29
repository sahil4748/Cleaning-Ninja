"use client";
import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Primitives";
const { props: desktopPoster } = getImageProps({
  src: "/homepage/atelier/hero-room.webp",
  width: 2560,
  height: 1448,
  alt: "",
  sizes: "65vw",
  loading: "eager",
  fetchPriority: "high",
});
const { props: mobilePoster } = getImageProps({
  src: "/homepage/atelier/hero-room-mobile.webp",
  width: 960,
  height: 1276,
  alt: "Soft sunlight falls across an olive sofa and textured wool rug, framed by a warm plaster arch",
  sizes: "100vw",
  loading: "eager",
  fetchPriority: "high",
});
export default function Hero({ motion }: { motion: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = video.current!;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (
      !motion ||
      matchMedia("(max-width: 767px)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      connection?.saveData ||
      /2g/.test(connection?.effectiveType ?? "")
    ) {
      element.pause();
      return;
    }
    let visible = false;
    let cancelled = false;
    const sync = () => {
      if (
        !visible ||
        document.hidden ||
        matchMedia("(max-width: 767px)").matches
      ) {
        element.pause();
        return;
      }
      if (element.ended) return;
      if (!element.src) element.src = "/homepage/atelier/hero-room.mp4";
      void element.play().catch(() => {
        if (!cancelled) setReady(false);
      });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      element.pause();
    };
  }, [motion]);
  return (
    <section className="at-hero" aria-labelledby="hero-title">
      <div id="top" className="at-top-marker" />
      <div className="at-masthead" aria-hidden="true">
        cleaning ninja
      </div>
      <div className="at-hero-composition">
        <div className="at-hero-copy">
          <p className="at-eyebrow">
            <span /> CARPET, UPHOLSTERY & HOME CLEANING
          </p>
          <h1 id="hero-title">
            A lighter
            <br />
            <em>kind of living.</em>
          </h1>
          <p className="at-hero-description">
            Fresh carpets. Favourite spaces.
            <br />
            That wonderful feeling of coming home.
          </p>
          <a className="at-button" href="#quote">
            Find your fresh start{" "}
            <span>
              <Arrow />
            </span>
          </a>
          <span className="at-hero-note">
            Your space. Your needs. A free quote.
          </span>
        </div>
        <div className="at-hero-image">
          <div className="at-hero-scene">
            <picture>
              <source
                media="(min-width:768px)"
                srcSet={desktopPoster.srcSet}
                sizes={desktopPoster.sizes}
              />
              <img {...mobilePoster} alt={mobilePoster.alt} />
            </picture>
            <video
              ref={video}
              className={ready ? "is-ready" : ""}
              muted
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
              onPlaying={() => setReady(true)}
              onError={() => setReady(false)}
            />
          </div>
          <div className="at-scene-caption">
            <span>ROOM FOR REAL LIFE.</span>
            <span>01 — The feeling of home</span>
          </div>
        </div>
        <figure className="at-hero-detail">
          <div>
            <Image
              src="/homepage/atelier/detail-fabric.webp"
              alt="A close view of soft olive upholstery and natural fabric"
              fill
              sizes="(max-width: 767px) 30vw, 16vw"
            />
          </div>
          <figcaption>Care in every fibre.</figcaption>
        </figure>
      </div>
      <div className="at-hero-bottom">
        <a href="#services">
          Explore the collection <Arrow down />
        </a>
        <p>
          For the way you live.
          <br />
          <span>Enquiries across Australia.</span>
        </p>
        <span className="at-hero-index">A fresh perspective on clean.</span>
      </div>
    </section>
  );
}
