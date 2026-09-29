"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import Film from "../prototype/Film";
export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const el = root.current!;
          el.dataset.motion = "true";
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              onUpdate: (self) => setRevealed(self.progress > 0.55),
            },
          });
          timeline.fromTo(
            el.querySelectorAll(".im-portal, .im-portal-contrast"),
            { clipPath: "inset(18% 32% round 48%)" },
            {
              clipPath: "inset(0% 0% round 0%)",
              duration: 0.65,
              ease: "power2.inOut",
            },
            0,
          );
          timeline.fromTo(
            el.querySelector(".im-portal-intro"),
            { opacity: 1 },
            { opacity: 0, duration: 0.35 },
            0,
          );
          timeline.fromTo(
            el.querySelector(".cn-film-copy"),
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.3 },
            0.55,
          );
          return () => {
            delete el.dataset.motion;
          };
        });
        dispose = () => mm.revert();
      },
    );
    return () => {
      cancelled = true;
      dispose();
    };
  }, []);
  return (
    <section
      id="experience"
      className="im-journey"
      ref={root}
      aria-label="From everyday living to a fresh start"
    >
      <div className="im-journey-stage">
        <div className="im-portal-intro">
          <p>Less to think about. More to come home to.</p>
          <div className="im-portal-title">
            <h2>
              Make room
              <br />
              for <span>living.</span>
            </h2>
          </div>
          <div className="im-portal-contrast" aria-hidden="true">
            <div className="im-portal-heading">
              Make room
              <br />
              for <span>living.</span>
            </div>
          </div>
          <ArrowDown size={28} />
        </div>
        <div className="im-portal">
          <Film autoplayAllowed={revealed} />
        </div>
      </div>
    </section>
  );
}
