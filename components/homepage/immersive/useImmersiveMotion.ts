"use client";
import { useEffect } from "react";
export function useImmersiveMotion() {
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const ctx = gsap.context(() => {
            gsap.to(".cn-photo-media", {
              yPercent: 16,
              scale: 1.06,
              ease: "none",
              scrollTrigger: {
                trigger: ".cn-photo-hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
            gsap.to(".cn-commercial-image img", {
              yPercent: 12,
              scale: 1.15,
              ease: "none",
              scrollTrigger: {
                trigger: ".cn-commercial",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
            gsap.utils.toArray<HTMLElement>(".cn-steps li").forEach((e, i) =>
              gsap.from(e, {
                y: 50,
                rotate: i % 2 ? 2 : -2,
                duration: 0.8,
                scrollTrigger: { trigger: e, start: "top 90%", once: true },
                clearProps: "transform",
              }),
            );
            gsap.to(".im-ending-word", {
              xPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: ".im-ending",
                start: "top bottom",
                end: "bottom bottom",
                scrub: 1,
              },
            });
          }, ".cn-immersive");
          return () => ctx.revert();
        });
        cleanup = () => mm.revert();
      },
    );
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);
}
