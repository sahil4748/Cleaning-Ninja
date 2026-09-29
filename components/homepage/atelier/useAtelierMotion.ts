"use client";
import { useEffect, type RefObject } from "react";
export function useAtelierMotion(
  root: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let cleanup = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !root.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const ctx = gsap.context(() => {
            gsap.fromTo(
              ".at-hero-scene",
              { scale: 1.035 },
              {
                scale: 1.1,
                yPercent: 9,
                ease: "none",
                scrollTrigger: {
                  trigger: ".at-hero-composition",
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.8,
                },
              },
            );
            gsap.to(".at-hero-detail", {
              yPercent: -20,
              ease: "none",
              scrollTrigger: {
                trigger: ".at-hero",
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });
            gsap.from(".at-word-reveal > span", {
              opacity: 0.24,
              stagger: 0.12,
              ease: "none",
              scrollTrigger: {
                trigger: ".at-intro",
                start: "top 78%",
                end: "bottom 65%",
                scrub: 0.6,
              },
            });
            gsap.utils
              .toArray<HTMLElement>(".at-section-heading, .at-support-heading")
              .forEach((element) => {
                gsap.from(element, {
                  y: 32,
                  duration: 1.1,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    once: true,
                  },
                });
              });
          }, root);
          return () => ctx.revert();
        });
        cleanup = () => mm.revert();
      },
    );
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [enabled, root]);
}
