"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

type DataConnection = EventTarget & { saveData?: boolean; effectiveType?: string };
type MotionControls = { mode: "none" | "play"; active: boolean };
const stillControls: MotionControls = { mode: "none", active: false };

/** Playback follows visibility; a separate, bounded scroll effect frames the next section. */
export function useCarpetMotion(opening: RefObject<HTMLElement | null>) {
  const [controls, setControls] = useState<MotionControls>(stillControls);
  const toggleRef = useRef<() => void>(() => {});
  const toggle = useCallback(() => toggleRef.current(), []);

  useEffect(() => {
    const wrapper = opening.current;
    const hero = wrapper?.querySelector<HTMLElement>(".cp-hero");
    const film = wrapper?.querySelector<HTMLElement>(".cp-film");
    const video = film?.querySelector<HTMLVideoElement>("video");
    if (!wrapper || !hero || !film || !video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const portrait = window.matchMedia("(max-width: 700px)");
    const connection = (navigator as Navigator & { connection?: DataConnection }).connection;
    const eligible = () => !motion.matches && !connection?.saveData
      && !/^(slow-2g|2g)$/.test(connection?.effectiveType ?? "");
    let enabled = false;
    let visible = false;
    let userPaused = false;
    let autoplayBlocked = false;
    let failed = false;
    let disposed = false;
    let playGeneration = 0;
    let pendingPlay = false;
    let frame = 0;
    let documentTop = 0;
    let exitDistance = 1;

    const publish = () => {
      if (!disposed) setControls({ mode: enabled ? "play" : "none", active: enabled && !video.paused });
    };
    const pause = () => {
      playGeneration += 1;
      pendingPlay = false;
      video.pause();
    };
    const cancelFrame = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const update = () => {
      frame = 0;
      if (!enabled || !visible || document.hidden) return;
      const position = Math.min(1, Math.max(0, (window.scrollY - documentTop) / exitDistance));
      // Ease the visual handoff, never the visitor's scroll position or the movie timeline.
      wrapper.style.setProperty("--cp-exit", (position * position * (3 - 2 * position)).toFixed(4));
    };
    const schedule = () => {
      if (!frame && enabled && visible && !document.hidden) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      documentTop = hero.getBoundingClientRect().top + window.scrollY;
      exitDistance = Math.max(1, hero.offsetHeight - 88);
      schedule();
    };
    const clearFilm = () => {
      pause();
      film.classList.remove("is-ready");
      wrapper.removeAttribute("data-motion-ready");
      video.removeAttribute("src");
      video.load();
    };
    const fail = () => {
      failed = true;
      enabled = false;
      clearFilm();
      cancelFrame();
      wrapper.style.removeProperty("--cp-exit");
      publish();
    };
    const loadFilm = () => {
      if (video.getAttribute("src")) return;
      const source = portrait.matches ? video.dataset.srcMobile : video.dataset.srcDesktop;
      if (!source) return;
      video.muted = true;
      video.defaultMuted = true;
      video.preload = "auto";
      video.src = source;
      video.load();
    };
    const play = () => {
      if (!enabled || !visible || document.hidden || userPaused || autoplayBlocked || pendingPlay || !video.paused) return;
      loadFilm();
      const generation = ++playGeneration;
      pendingPlay = true;
      void video.play().then(() => {
        if (disposed || generation !== playGeneration) return;
        pendingPlay = false;
        publish();
      }).catch((error: unknown) => {
        if (disposed || generation !== playGeneration) return;
        pendingPlay = false;
        if (error instanceof DOMException && error.name === "NotAllowedError") autoplayBlocked = true;
        else if (!(error instanceof DOMException && error.name === "AbortError")) fail();
        publish();
      });
    };
    const ready = () => {
      if (!enabled || video.readyState < 2) return;
      film.classList.add("is-ready");
      wrapper.setAttribute("data-motion-ready", "true");
    };
    const applyPreference = () => {
      enabled = eligible() && !failed;
      if (!enabled) {
        clearFilm();
        cancelFrame();
        wrapper.style.removeProperty("--cp-exit");
      } else {
        measure();
        play();
      }
      publish();
    };
    const visibilityChanged = () => {
      if (document.hidden || !visible) {
        pause();
        cancelFrame();
      } else {
        measure();
        play();
      }
    };
    const sourceChanged = () => {
      clearFilm();
      // Rotation preserves a deliberate pause, while eligible autoplay can resume.
      if (enabled) play();
      publish();
    };
    toggleRef.current = () => {
      if (!enabled) return;
      userPaused = !video.paused || pendingPlay;
      if (userPaused) pause();
      else {
        autoplayBlocked = false;
        play();
      }
      publish();
    };

    video.addEventListener("loadeddata", ready);
    video.addEventListener("canplay", ready);
    video.addEventListener("play", publish);
    video.addEventListener("pause", publish);
    video.addEventListener("error", fail);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    document.addEventListener("visibilitychange", visibilityChanged);
    motion.addEventListener("change", applyPreference);
    portrait.addEventListener("change", sourceChanged);
    connection?.addEventListener?.("change", applyPreference);
    const sizes = new ResizeObserver(measure);
    sizes.observe(hero);
    const viewport = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visibilityChanged();
    }, { threshold: 0.05 });
    viewport.observe(hero);
    applyPreference();

    return () => {
      disposed = true;
      toggleRef.current = () => {};
      sizes.disconnect();
      viewport.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", visibilityChanged);
      motion.removeEventListener("change", applyPreference);
      portrait.removeEventListener("change", sourceChanged);
      connection?.removeEventListener?.("change", applyPreference);
      video.removeEventListener("loadeddata", ready);
      video.removeEventListener("canplay", ready);
      video.removeEventListener("play", publish);
      video.removeEventListener("pause", publish);
      video.removeEventListener("error", fail);
      cancelFrame();
      clearFilm();
      wrapper.style.removeProperty("--cp-exit");
    };
  }, [opening]);

  return { ...controls, toggle };
}
