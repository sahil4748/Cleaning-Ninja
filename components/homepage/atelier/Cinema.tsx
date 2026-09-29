"use client";
import { useEffect, useRef, useState } from "react";
import Film from "./CleaningFilm";
import { Arrow } from "./Primitives";
export default function Cinema({ motion }: { motion: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!motion) return;
    let cancelled = false;
    let cleanup = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !root.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const el = root.current;
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          el.dataset.enhanced = "true";
          setEnhanced(true);
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              pin: el.querySelector(".at-cinema-stage"),
              start: "top top",
              end: () => `+=${innerHeight * 1.45}`,
              scrub: 0.65,
              invalidateOnRefresh: true,
              onUpdate: (self) => setRevealed(self.progress > 0.53),
            },
          });
          tl.fromTo(
            el.querySelector(".at-cinema-portal"),
            { clipPath: "inset(27% 38% round 48% 48% 2% 2%)" },
            {
              clipPath: "inset(0% 0% round 0% 0% 0% 0%)",
              duration: 0.7,
              ease: "power2.inOut",
            },
            0,
          )
            .to(
              el.querySelectorAll(".at-cinema-intro"),
              { opacity: 0, y: -55, duration: 0.3 },
              0.05,
            )
            .fromTo(
              el.querySelector(".at-film-copy"),
              { opacity: 0, y: 45 },
              { opacity: 1, y: 0, duration: 0.3 },
              0.55,
            );
          return () => {
            delete el.dataset.enhanced;
            setEnhanced(false);
          };
        });
        cleanup = () => mm.revert();
      },
    );
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [motion]);
  return (
    <section
      id="experience"
      className="at-cinema"
      ref={root}
      aria-label="Make room for living"
    >
      <div className="at-cinema-stage">
        <div className="at-cinema-intro">
          <p>LESS ON YOUR LIST. MORE LIFE IN YOUR DAY.</p>
          <h2>
            Make room
            <br />
            for <em>living.</em>
          </h2>
          <span>
            SCROLL INTO A FRESH START <Arrow down />
          </span>
        </div>
        <div className="at-cinema-portal" inert={enhanced && !revealed}>
          <Film autoplayAllowed={motion && revealed} />
          <div
            className="at-cinema-intro at-cinema-contrast"
            aria-hidden="true"
          >
            <p>LESS ON YOUR LIST. MORE LIFE IN YOUR DAY.</p>
            <h2>
              Make room
              <br />
              for <em>living.</em>
            </h2>
            <span>
              SCROLL INTO A FRESH START <Arrow down />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
