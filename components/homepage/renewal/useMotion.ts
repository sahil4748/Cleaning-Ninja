"use client";
import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export function useMotion(
  root: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!root.current || !enabled) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.to(".rn-hero-image", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: ".rn-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".rn-hero-copy", {
          y: 70,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: ".rn-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.utils.toArray<HTMLElement>(".rn-reveal").forEach((el) =>
          gsap.fromTo(
            el,
            { y: 34, opacity: 0.55 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 91%", once: true },
            },
          ),
        );
      }, root);
      return () => ctx.revert();
    });
    mm.add(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          gsap.set(".rn-story-first", { display: "flex", opacity: 1 });
          gsap.set(".rn-story-detail", { opacity: 1 });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".rn-story",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.7,
            },
          });
          tl.fromTo(
            ".rn-story-window",
            { clipPath: "inset(10% 21% 10% 21% round 230px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              duration: 1,
              ease: "none",
            },
            0,
          )
            .fromTo(
              ".rn-story-room",
              { scale: 1.15 },
              { scale: 1, duration: 1.2, ease: "none" },
              0,
            )
            .to(".rn-story-detail", { opacity: 0, duration: 0.6 }, 0.05)
            .to(".rn-story-first", { opacity: 0, y: -40, duration: 0.4 }, 0.1)
            .fromTo(
              ".rn-story-last",
              { autoAlpha: 0, y: 60 },
              { autoAlpha: 1, y: 0, duration: 0.5 },
              0.5,
            );
        }, root);
        return () => ctx.revert();
      },
    );
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    return () => mm.revert();
  }, [root, enabled]);
}
