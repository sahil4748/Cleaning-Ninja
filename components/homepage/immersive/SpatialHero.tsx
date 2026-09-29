"use client";
import { useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Layers3,
  RotateCcw,
  Plus,
  Pause,
  Play,
} from "lucide-react";
import { MEDIA } from "@/content/media";
import type { RoomController } from "./room-scene";
import type { QuoteSelection } from "../prototype/Offers";
const parts = [
  {
    name: "Carpets",
    service: "Carpet cleaning",
    text: "A fresh start, from the floor up.",
  },
  {
    name: "Upholstery",
    service: "Upholstery cleaning",
    text: "A little care for your favourite seat.",
  },
  {
    name: "Rugs & more",
    service: "Rug cleaning",
    text: "Every texture has a story.",
  },
];
export default function SpatialHero({
  onSelect,
}: {
  onSelect: (v: QuoteSelection) => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null),
    controller = useRef<RoomController | null>(null);
  const [paused, setPaused] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const { props: desktop } = getImageProps({
    src: MEDIA.hero.desktop.poster,
    width: 5504,
    height: 3072,
    alt: "",
    sizes: "70vw",
    loading: "eager",
    fetchPriority: "high",
  });
  const { props: mobile } = getImageProps({
    src: MEDIA.hero.mobile.poster,
    width: 3072,
    height: 5504,
    alt: "A calm living room, illustrating carpet and upholstery care",
    sizes: "100vw",
    loading: "eager",
    fetchPriority: "high",
  });
  const [ready, setReady] = useState(false),
    [active, setActive] = useState(0),
    [exploded, setExploded] = useState(false),
    [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const save = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (!media.matches && !save) {
      const id = requestAnimationFrame(() => setEnabled(true));
      return () => cancelAnimationFrame(id);
    }
  }, []);
  useEffect(() => {
    if (!enabled) return;
    let disposed = false;
    let room: RoomController | undefined;
    void import("./room-scene")
      .then(({ createRoom }) => {
        if (disposed) return;
        try {
          room = createRoom(
            canvas.current!,
            () => setReady(true),
            () => {
              setReady(false);
              setUnavailable(true);
            },
          );
          controller.current = room;
        } catch {
          setReady(false);
          setUnavailable(true);
        }
      })
      .catch(() => {
        if (!disposed) {
          setReady(false);
          setUnavailable(true);
        }
      });
    return () => {
      disposed = true;
      room?.dispose();
      controller.current = null;
    };
  }, [enabled]);
  function choose(i: number) {
    setActive(i);
    controller.current?.setLayer(i);
  }
  return (
    <section className="im-hero" aria-labelledby="hero-title">
      <div className="im-hero-eyebrow">
        <span className="im-live-dot" /> A fresh perspective on clean{" "}
        <span>Brisbane & beyond</span>
      </div>
      <div className="im-hero-heading">
        <h1 id="hero-title">
          Life happens.
          <br />
          <span>We reset.</span>
        </h1>
        <div className="im-hero-intro">
          <p>
            Carpet, upholstery & home cleaning.
            <br />
            For all the living you do.
          </p>
          <a href="#quote" className="cn-button">
            Get a Free Quote <ArrowUpRight size={19} />
          </a>
          <a className="im-text-action" href="#packages">
            Explore packages <ArrowDown size={16} />
          </a>
        </div>
      </div>
      <div className="im-world" data-ready={ready}>
        <div className="im-world-word" aria-hidden="true">
          fresh.
        </div>
        <div className="im-room-fallback">
          <picture>
            <source
              media="(min-width:768px)"
              srcSet={desktop.srcSet}
              sizes={desktop.sizes}
            />
            <img {...mobile} alt={mobile.alt} />
          </picture>
        </div>
        <canvas ref={canvas} aria-hidden="true" className="im-room-canvas" />
        <div className="im-world-caption">
          <span>
            Small details.
            <br />A whole new feeling.
          </span>
          <span className="im-room-hint">
            {ready
              ? "Move around. Find your fresh."
              : "Your space. A fresh start."}
          </span>
        </div>
        <div className="im-room-tools" hidden={unavailable}>
          <button
            onClick={() => {
              if (!enabled) {
                setEnabled(true);
                return;
              }
              setExploded(!exploded);
              controller.current?.setExploded(!exploded);
            }}
            aria-pressed={exploded}
          >
            {exploded ? <RotateCcw size={16} /> : <Layers3 size={16} />}{" "}
            {!ready
              ? "Explore in 3D"
              : exploded
                ? "Bring it together"
                : "See the layers"}
          </button>
          {ready && (
            <button
              className="im-pause-scene"
              aria-label={paused ? "Resume room motion" : "Pause room motion"}
              onClick={() => {
                setPaused(!paused);
                controller.current?.setPaused(!paused);
              }}
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
            </button>
          )}
        </div>
        <a className="im-round-offer" href="#packages">
          <span>
            Good clean.
            <br />
            Better value.
          </span>
          <strong>
            30<span>%</span>
          </strong>
          <small>UP TO · OFF*</small>
          <ArrowUpRight size={20} />
        </a>
      </div>
      <div className="im-room-selector">
        <div
          className="im-room-tabs"
          role="group"
          aria-label="Explore the room"
        >
          {parts.map((p, i) => (
            <button
              key={p.name}
              aria-pressed={active === i}
              onClick={() => choose(i)}
            >
              <span>0{i + 1}</span>
              {p.name}
              <Plus size={16} />
            </button>
          ))}
        </div>
        <div className="im-room-detail" aria-live="polite">
          <p>{parts[active].text}</p>
          <button
            onClick={() =>
              onSelect({ service: parts[active].service, packageName: "" })
            }
          >
            Get a quote <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
      <div className="im-hero-foot">
        <span>Free quotes. No obligation.</span>
        <a href="#experience">
          Scroll into a fresher world <ArrowDown size={16} />
        </a>
        <span>*Prototype offers & phone</span>
      </div>
    </section>
  );
}
