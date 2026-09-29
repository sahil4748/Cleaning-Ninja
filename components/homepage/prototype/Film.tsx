"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, ArrowUpRight } from "lucide-react";
const sources = {
  desktop: "/homepage/prototype/carpet-film-desktop.mp4",
  mobile: "/homepage/prototype/carpet-film-mobile.mp4",
};
export default function Film() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const element = video.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = matchMedia("(max-width:767px)");
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    let visible = false;
    let attempted = false;
    let disposed = false;
    const sync = () => {
      if (reduced.matches || document.hidden || !visible) {
        element.pause();
        return;
      }
      if (
        attempted ||
        connection?.saveData ||
        /2g/.test(connection?.effectiveType ?? "")
      )
        return;
      attempted = true;
      element.src = mobile.matches ? sources.mobile : sources.desktop;
      void element.play().catch(() => {
        if (!disposed) {
          setPlaying(false);
          setFailed(true);
        }
      });
    };
    const resize = () => {
      element.pause();
      element.removeAttribute("src");
      element.load();
      setReady(false);
      attempted = false;
      sync();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    observer.observe(root.current!);
    reduced.addEventListener("change", sync);
    mobile.addEventListener("change", resize);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      mobile.removeEventListener("change", resize);
      document.removeEventListener("visibilitychange", sync);
      element.pause();
      element.removeAttribute("src");
      element.load();
    };
  }, []);
  function toggle() {
    const element = video.current!;
    if (!element.paused) {
      element.pause();
      return;
    }
    if (!element.getAttribute("src"))
      element.src = matchMedia("(max-width:767px)").matches
        ? sources.mobile
        : sources.desktop;
    if (element.ended || element.currentTime >= 4.9) element.currentTime = 0;
    setFailed(false);
    void element.play().catch(() => setFailed(true));
  }
  return (
    <section ref={root} className="cn-film" aria-labelledby="film-title">
      <picture>
        <source
          media="(max-width:767px)"
          srcSet="/homepage/prototype/carpet-film-mobile.jpg"
        />
        <img
          src="/homepage/prototype/carpet-film-desktop.jpg"
          alt="Illustrative carpet cleaning in a warm living room"
          loading="lazy"
          width={1920}
          height={1080}
        />
      </picture>
      <video
        ref={video}
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        className={ready ? "is-ready" : ""}
        onPlaying={() => {
          setPlaying(true);
          setReady(true);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => {
          setFailed(true);
          setReady(false);
          setPlaying(false);
        }}
      />
      <div className="cn-film-copy">
        <p className="cn-label">Small details. A different feeling.</p>
        <h2 id="film-title">
          Feel the difference.
          <br />
          <em>From the floor up.</em>
        </h2>
        <a href="#quote" className="cn-text-link">
          Make room for a fresh start
          <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="cn-film-controls">
        <span>Illustrative brand film · 5 seconds</span>
        <button
          aria-label={playing ? "Pause cleaning film" : "Play cleaning film"}
          onClick={toggle}
        >
          {playing ? <Pause size={17} /> : <Play size={17} />}
          {playing ? "Pause" : "Play film"}
        </button>
      </div>
      {failed && (
        <span role="status" className="cn-film-status">
          Film unavailable. You can still explore and request a quote.
        </span>
      )}
    </section>
  );
}
