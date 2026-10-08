"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

type DataConnection = EventTarget & { saveData?: boolean; effectiveType?: string };
type MotionControls = { mode: "none" | "scroll" | "play"; active: boolean; ended: boolean };
const stillControls: MotionControls = { mode: "none", active: false, ended: false };

/** Native scrolling owns the page. The film is an optional, independently pausable layer. */
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
    const desktop = window.matchMedia("(min-width: 900px) and (min-height: 650px) and (hover: hover) and (pointer: fine)");
    const portrait = window.matchMedia("(max-width: 700px)");
    const connection = (navigator as Navigator & { connection?: DataConnection }).connection;
    const eligible = () => !motion.matches && !connection?.saveData
      && !/^(slow-2g|2g)$/.test(connection?.effectiveType ?? "");
    const frameDuration = 1 / 30;
    let mode: MotionControls["mode"] = "none";
    let frame = 0;
    let distance = 0;
    let documentTop = 0;
    let stickyTop = 0;
    let previousProgress = "";
    let footageReady = false;
    let visible = true;
    let paused = false;
    let failed = false;
    let seekTarget = 0;
    let disposed = false;

    const cancelFrame = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const publishControls = () => setControls({ mode, active: mode === "scroll" ? !paused : !video.paused, ended: video.ended });

    const flushSeek = () => {
      if (mode !== "scroll" || paused || !footageReady || !visible || document.hidden || video.seeking) return;
      if (Math.abs(video.currentTime - seekTarget) < frameDuration) return;
      try {
        // Coalesce to the latest scroll position; never queue a second animation clock.
        video.currentTime = seekTarget;
      } catch {
        fail();
      }
    };

    const update = () => {
      frame = 0;
      if (mode !== "scroll" || paused || !footageReady || !visible || document.hidden) return;
      const progress = distance > 0 ? Math.min(1, Math.max(0, (window.scrollY + stickyTop - documentTop) / distance)) : 0;
      const value = progress.toFixed(4);
      if (value !== previousProgress) {
        wrapper.style.setProperty("--cp-progress", value);
        previousProgress = value;
      }
      seekTarget = Math.round(progress * Math.max(0, video.duration - frameDuration) / frameDuration) * frameDuration;
      flushSeek();
    };

    const schedule = () => {
      if (!frame && mode === "scroll" && !paused && footageReady && visible && !document.hidden) {
        frame = window.requestAnimationFrame(update);
      }
    };

    const measure = () => {
      documentTop = wrapper.getBoundingClientRect().top + window.scrollY;
      distance = Math.max(0, wrapper.offsetHeight - hero.offsetHeight);
      stickyTop = Number.parseFloat(window.getComputedStyle(hero).top) || 0;
      schedule();
    };

    const loadFilm = () => {
      if (video.getAttribute("src")) return;
      const source = portrait.matches ? video.dataset.srcMobile : video.dataset.srcDesktop;
      if (!source) return;
      video.preload = "auto";
      video.src = source;
      video.load();
    };

    const ready = () => {
      if (footageReady || mode === "none" || video.readyState < 2 || !Number.isFinite(video.duration) || video.duration <= 0) return;
      footageReady = true;
      film.classList.add("is-ready");
      wrapper.setAttribute("data-motion-ready", "true");
      // The layout was established before loading, so a late frame cannot move a quote target.
      measure();
      publishControls();
    };

    const clearFilm = () => {
      cancelFrame();
      footageReady = false;
      previousProgress = "";
      seekTarget = 0;
      video.pause();
      film.classList.remove("is-ready");
      wrapper.removeAttribute("data-motion-ready");
      wrapper.style.removeProperty("--cp-progress");
      video.removeAttribute("src");
      video.load();
    };

    function fail() {
      failed = true;
      mode = "none";
      clearFilm();
      // A failure at the opening needs no empty runway. Preserve geometry after scrolling.
      if (window.scrollY <= documentTop - stickyTop + 1) {
        wrapper?.setAttribute("data-motion-layout", "flow");
        measure();
      }
      setControls(stillControls);
    }

    const applyPreference = () => {
      const nextMode = !eligible() || failed ? "none" : desktop.matches ? "scroll" : "play";
      if (nextMode === mode) return;
      mode = nextMode;
      clearFilm();
      paused = false;
      // Do not insert a scroll interval above someone who followed an anchor before hydration.
      const nearOpening = window.scrollY < wrapper.offsetTop + hero.offsetHeight;
      if (mode === "scroll" && !nearOpening) mode = "play";
      wrapper.setAttribute("data-motion-layout", mode === "scroll" ? "scroll" : "flow");
      measure();
      if (mode === "scroll") loadFilm();
      publishControls();
    };

    const handleVisibility = () => {
      if (document.hidden || !visible) {
        cancelFrame();
        video.pause();
      } else measure();
    };

    const sourceChanged = () => {
      if (mode === "none") return;
      // A rotated phone gets the matching composition on its next explicit play.
      clearFilm();
      applyPreference();
      if (mode === "scroll") loadFilm();
      publishControls();
    };

    const playbackChanged = () => {
      if (mode === "play") publishControls();
    };

    toggleRef.current = () => {
      if (mode === "none") return;
      if (mode === "scroll") {
        paused = !paused;
        if (paused) cancelFrame();
        else schedule();
        publishControls();
        return;
      }
      if (!video.paused) video.pause();
      else {
        loadFilm();
        if (video.ended) video.currentTime = 0;
        void video.play().catch((error: unknown) => {
          if (disposed) return;
          if (error instanceof DOMException && (error.name === "AbortError" || error.name === "NotAllowedError")) publishControls();
          else fail();
        });
      }
    };

    video.addEventListener("loadeddata", ready);
    video.addEventListener("canplay", ready);
    video.addEventListener("seeked", flushSeek);
    video.addEventListener("play", playbackChanged);
    video.addEventListener("pause", playbackChanged);
    video.addEventListener("ended", playbackChanged);
    video.addEventListener("error", fail);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    motion.addEventListener("change", applyPreference);
    desktop.addEventListener("change", applyPreference);
    portrait.addEventListener("change", sourceChanged);
    connection?.addEventListener?.("change", applyPreference);
    const sizes = new ResizeObserver(measure);
    sizes.observe(wrapper);
    sizes.observe(hero);
    const viewport = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      handleVisibility();
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
      document.removeEventListener("visibilitychange", handleVisibility);
      motion.removeEventListener("change", applyPreference);
      desktop.removeEventListener("change", applyPreference);
      portrait.removeEventListener("change", sourceChanged);
      connection?.removeEventListener?.("change", applyPreference);
      video.removeEventListener("loadeddata", ready);
      video.removeEventListener("canplay", ready);
      video.removeEventListener("seeked", flushSeek);
      video.removeEventListener("play", playbackChanged);
      video.removeEventListener("pause", playbackChanged);
      video.removeEventListener("ended", playbackChanged);
      video.removeEventListener("error", fail);
      clearFilm();
      wrapper.removeAttribute("data-motion-layout");
    };
  }, [opening]);

  return { ...controls, toggle };
}
