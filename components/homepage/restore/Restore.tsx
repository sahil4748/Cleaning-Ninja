"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Check, Mail } from "lucide-react";
import { Arrow, Wordmark } from "./Mark";
import RoomStage from "./RoomStage";
import { services, offers, faqs } from "../renewal/content";
import QuotePanel from "./QuotePanel";
import "./restore.css";

type Selection = { service: string; packageName: string; suburb?: string };

const R = "/homepage/restore/";
const V = "?v=7";
const stageSources = {
  wide: [R + "before-wide.webp" + V, R + "after-wide.webp" + V] as [string, string],
  tall: [R + "before-tall.webp" + V, R + "after-tall.webp" + V] as [string, string],
};
const films: [string, string] = [R + "before.mp4", R + "after.mp4"];
/** Crops of the resolved room stand in for the whole-space services. */
const V_ = "/homepage/restore/services/";
const picture: Record<string, { src: string; pos: string; alt: string; scale?: number }> = {
  "carpet-cleaning": { src: V_ + "carpet.webp", pos: "50% 50%", alt: "A stainless-steel extraction head leaving a clean lane on a grey wool carpet" },
  "upholstery-cleaning": { src: V_ + "upholstery-curtain.webp", pos: "50% 50%", alt: "A technician cleaning sheer linen curtains beside a fabric sofa" },
  "rugs-cleaning": { src: V_ + "rugs.webp", pos: "50% 50%", alt: "An extraction head drawn across a woven wool rug in a bright living room" },
  "mattress-cleaning": { src: V_ + "mattress.webp", pos: "50% 50%", alt: "A mattress being cleaned with a clear extraction head in a calm bedroom" },
  "leather-cleaning": { src: V_ + "leather.webp", pos: "50% 50%", alt: "A tan leather sofa being conditioned with a buffing pad" },
  "commercial-cleaning": { src: V_ + "commercial.webp", pos: "50% 50%", alt: "A bright open-plan office with clean carpet and glass meeting rooms" },
  "end-of-lease-cleaning": { src: V_ + "end-of-lease.webp", pos: "50% 50%", alt: "A cleaner working through a checklist in a bright apartment kitchen" },
  "stain-and-odour-removal": { src: V_ + "stain-odour.webp", pos: "45% 57%", scale: 2.3, alt: "A close view of a stain on fabric being treated with an extraction tool" },
  "tile-cleaning": { src: V_ + "tile-grout.webp", pos: "50% 50%", alt: "A grout brush working along a stone tile floor in a bathroom" },
  "pest-control": { src: V_ + "pest-control.webp", pos: "50% 50%", alt: "A technician treating a door threshold beside a sunlit garden" },
  "car-seats-cleaning": { src: V_ + "car-seats.webp", pos: "50% 50%", alt: "A gloved hand wiping a tan leather car seat" },
};
const groups = [
  { id: "fabrics", label: "Soft furnishings" },
  { id: "surfaces", label: "Floors & marks" },
  { id: "spaces", label: "Whole spaces" },
] as const;

const steps = [
  ["Tell us", "Say what needs attention, where you are, and anything useful about its condition."],
  ["We assess", "Fibre, finish and condition are checked first, then your personalised quote is prepared."],
  ["We restore", "The right method for the material, finished without fuss. Your date is confirmed with you."],
];

const customOffer = {
  id: "custom",
  title: "Something else",
  kind: "Custom quote",
  chips: ["Any service", "Any size", "Homes & workplaces"],
  terms: "Savings of up to 30% apply to the five listed packages. Anything else is quoted individually, based on size, material and the work required.",
};
const D_ = "/homepage/restore/deals/";
const dealArt: Record<string, { src: string; pos: string; alt: string }> = {
  "three-bedroom-carpet": { src: D_ + "bedrooms-3.webp", pos: "60% 55%", alt: "An extraction head leaving a clean lane on bedroom carpet" },
  "five-bedroom-carpet": { src: D_ + "bedrooms-5.webp", pos: "55% 55%", alt: "A hallway of freshly cleaned carpet leading to five bedrooms" },
  "three-rugs": { src: D_ + "rugs-3.webp", pos: "60% 55%", alt: "Three woven rugs, one being cleaned" },
  "five-seat-fabric-lounge": { src: D_ + "lounge-fabric.webp", pos: "60% 55%", alt: "A five-seat fabric lounge with an upholstery tool on the cushion" },
  "five-seat-leather-lounge": { src: D_ + "lounge-leather.webp", pos: "60% 55%", alt: "A five-seat tan leather lounge with a buffing pad on the seat" },
  custom: { src: D_ + "custom.webp", pos: "72% 75%", alt: "A professional cleaning kit laid out in a bright home" },
};
const shortInclude: Record<string, string> = {
  "Shampoo pre-treatment": "Pre-treatment",
  "Stain treatment": "Stain care",
  "Heavy-duty steam cleaning": "Steam clean",
  Deodorising: "Deodorise",
  "Leather shampoo": "Shampoo",
  Conditioning: "Condition",
  "Protective treatment": "Protect",
};

const orderedServices = groups.flatMap((g) => services.filter((s) => s.group === g.id));
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export default function Restore() {
  const scene = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [menu, setMenu] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  const [inMid, setInMid] = useState(false);
  const [bright, setBright] = useState(false);
  const [pastScene, setPastScene] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [selection, setSelection] = useState<Selection>({ service: "", packageName: "" });
  const [serviceId, setServiceId] = useState(services[0].id);
  const [offerId, setOfferId] = useState(offers[0].id);
  const deals = [
    ...offers.map((o) => ({
      id: o.id,
      title: o.title,
      kind: services.find((x) => x.id === o.service)?.name ?? "",
      chips: o.includes.map((i) => shortInclude[i] ?? i),
      terms: o.terms,
      quote: { service: o.service, packageName: `${o.title} (${services.find((x) => x.id === o.service)?.shortName})` },
      cta: "Get a free quote",
      custom: false,
    })),
    { ...customOffer, quote: { service: "", packageName: "Custom quote" }, cta: "Get a free quote", custom: true },
  ];
  const dealIndex = Math.max(0, deals.findIndex((d) => d.id === offerId));
  const deal = deals[dealIndex];
  const stage = useRef<HTMLDivElement>(null);
  const swipe = useRef<number | null>(null);
  const stepDeal = (n: number) => setOfferId(deals[(dealIndex + n + deals.length) % deals.length].id);

  /* Scroll → progress. One eased value drives both the shader and the typography. */
  useEffect(() => {
    const sec = scene.current;
    if (!sec) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let target = 0;
    let cur = 0;
    let raf = 0;
    let active = true;
    let beat = "";
    const setBeat = (p: number) => {
      const b = p < 0.26 ? "hero" : p < 0.84 ? "mid" : "calm";
      if (b !== beat) {
        beat = b;
        sec.dataset.beat = b;
        setInMid(b === "mid");
        setBright(!reduce.matches && b === "calm");
      }
    };
    const read = () => {
      if (reduce.matches) {
        target = 1;
        return;
      }
      const r = sec.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      target = clamp(-r.top / (span * 0.92));
    };
    const loop = () => {
      cur += (target - cur) * 0.14;
      if (Math.abs(target - cur) < 0.0006) cur = target;
      progress.current = cur;
      sec.style.setProperty("--p", reduce.matches ? "0" : cur.toFixed(4));
      setBeat(reduce.matches ? 0 : cur);
      if (active || cur !== target) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      active = e.isIntersecting;
      cancelAnimationFrame(raf);
      read();
      raf = requestAnimationFrame(loop);
    }, { rootMargin: "100px" });
    io.observe(sec);
    const onScroll = () => {
      read();
      setNavSolid(window.scrollY > sec.offsetHeight - window.innerHeight * 0.9);
      setPastScene(window.scrollY > sec.offsetHeight - window.innerHeight * 0.4);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };
    read();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduce.addEventListener("change", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduce.removeEventListener("change", onScroll);
    };
  }, []);

  /* Deals: a very light parallax drift, transform only. */
  useEffect(() => {
    const el = stage.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const upd = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const t = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      el.style.setProperty("--dp", Math.max(-1, Math.min(1, t)).toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(upd);
    };
    upd();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Persistent quote action: while the room resolves and after it, until the form is on screen. */
  useEffect(() => {
    const quote = document.getElementById("quote");
    if (!quote) return;
    const io = new IntersectionObserver(([e]) => setQuoteVisible(e.isIntersecting));
    io.observe(quote);
    return () => io.disconnect();
  }, []);
  const stickyCta = (inMid || pastScene) && !quoteVisible;

  useEffect(() => {
    if (!menu) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [menu]);

  const toQuote = useCallback((value: Selection) => {
    setSelection(value);
    setMenu(false);
    const instant = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("quote")?.scrollIntoView({ behavior: instant ? "instant" : "smooth" });
    window.setTimeout(() => document.getElementById("rn-service")?.focus({ preventScroll: true }), instant ? 0 : 700);
  }, []);
  const go = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return (
    <div className="rs">
      <a className="rs-skip" href="#main">Skip to content</a>
      <header className={`rs-nav${navSolid ? " is-solid" : ""}${bright ? " is-bright" : ""}`}>
        <Link href="/" aria-label="Cleaning Ninja home" className="rs-nav-home"><Wordmark /></Link>
        <nav className="rs-nav-links" aria-label="Primary">
          <a href="#services" onClick={(e) => { e.preventDefault(); go("services"); }}>Services</a>
          <a href="#offers" onClick={(e) => { e.preventDefault(); go("offers"); }}>Offers</a>
          <a href="#process" onClick={(e) => { e.preventDefault(); go("process"); }}>Process</a>
          <a href="#questions" onClick={(e) => { e.preventDefault(); go("questions"); }}>Questions</a>
        </nav>
        <button className="rs-btn rs-btn--small rs-nav-cta" onClick={() => toQuote(selection)}>Get a free quote</button>
        <button className="rs-menu-btn" aria-expanded={menu} aria-controls="rs-menu" onClick={() => setMenu(!menu)}>
          {menu ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          <span className="rs-sr">{menu ? "Close menu" : "Open menu"}</span>
        </button>
      </header>
      <div id="rs-menu" className="rs-menu" hidden={!menu}>
        {[["services", "Services"], ["offers", "Offers"], ["process", "Process"], ["questions", "Questions"]].map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}>{label}</a>
        ))}
        <button className="rs-btn" onClick={() => toQuote(selection)}>Get a free quote <Arrow /></button>
      </div>

      <main id="main">
        {/* ARRIVAL → TENSION → TRANSFORMATION → CALM */}
        <section className="rs-scene" ref={scene} data-beat="hero" id="home" aria-label="Cleaning Ninja">
          <div className="rs-stage">
            <picture className="rs-still">
              <source media="(max-aspect-ratio: 1/1)" srcSet={stageSources.tall[0]} />
              <img src={stageSources.wide[0]} alt="" width={2688} height={1520} fetchPriority="high" decoding="async" />
            </picture>
            <RoomStage progressRef={progress} sources={stageSources} videos={films} />
            <div className="rs-scrim" aria-hidden="true" />

            <div className="rs-beat rs-beat--hero">
              <p className="rs-eyebrow">Professional cleaning</p>
              <h1>Order, <br /><em>restored.</em></h1>
              <div className="rs-hero-foot">
                <p>Carpet, upholstery, rug, leather and tile cleaning, with a free personalised quote.</p>
                <div className="rs-actions">
                  <button className="rs-btn" onClick={() => toQuote(selection)}>Get a free quote <Arrow /></button>
                  <a className="rs-link" href="#services" onClick={(e) => { e.preventDefault(); go("services"); }}>What we clean</a>
                </div>
              </div>
              <span className="rs-cue" aria-hidden="true"><i /> Scroll</span>
            </div>

            <div className="rs-state" aria-hidden="true">
              <span className="rs-state-a">As we find it</span>
              <span className="rs-state-b">As we leave it</span>
            </div>

            <div className="rs-beat rs-beat--calm">
              <h2>Quiet. Clean. <br /><em>Finished.</em></h2>
              <p>Every job starts with the material. We assess it, choose the method, and leave the room the way it should feel.</p>
              <div className="rs-actions">
                <button className="rs-btn" onClick={() => toQuote(selection)}>Get a free quote <Arrow /></button>
                <a className="rs-link" href="#services" onClick={(e) => { e.preventDefault(); go("services"); }}>See services</a>
              </div>
            </div>
          </div>
        </section>

        {/* DISCOVERY */}
        <section className="rs-section rs-services" id="services" aria-labelledby="services-title">
          <div className="rs-head">
            <p className="rs-eyebrow rs-eyebrow--ink">What we clean</p>
            <h2 id="services-title">Eleven ways to <em>put it right.</em></h2>
            <p>Choose a service to see what is included, then ask for a quote for exactly that.</p>
          </div>
          <div className="rs-svc">
            <div className="rs-svc-figure" aria-hidden="true">
              {services.map((s) => {
                const p = picture[s.id];
                return (
                  <div key={s.id} className={`rs-fig${s.id === serviceId ? " is-on" : ""}`}>
                    <Image unoptimized src={p.src} alt="" fill sizes="(min-width: 900px) 40vw, 0px" style={{ objectPosition: p.pos, transform: p.scale ? `scale(${p.scale})` : undefined, transformOrigin: p.pos }} loading="lazy" />
                  </div>
                );
              })}
            </div>
            <div className="rs-svc-list">
              {groups.map((g) => (
                <div key={g.id} className="rs-group">
                  <h3>{g.label}</h3>
                  <ul>
                    {services.filter((s) => s.group === g.id).map((s) => {
                      const open = s.id === serviceId;
                      const n = String(orderedServices.indexOf(s) + 1).padStart(2, "0");
                      const p = picture[s.id];
                      return (
                        <li key={s.id} className={open ? "is-open" : ""}>
                          <button aria-expanded={open} aria-controls={`svc-${s.id}`} onClick={() => setServiceId(s.id)}>
                            <span className="rs-num">{n}</span>
                            <span className="rs-name">{s.name}</span>
                            <span className="rs-plus" aria-hidden="true" />
                          </button>
                          <div className="rs-panel" id={`svc-${s.id}`} inert={!open}>
                            <div className="rs-panel-in">
                              <div className="rs-mimg">
                                <Image unoptimized src={p.src} alt={p.alt} fill sizes="(max-width: 899px) 90vw, 0px" style={{ objectPosition: p.pos, transform: p.scale ? `scale(${p.scale})` : undefined, transformOrigin: p.pos }} loading="lazy" />
                              </div>
                              <p>{s.description}</p>
                              <ul className="rs-includes">
                                {s.includes.map((i) => <li key={i}><Check size={15} aria-hidden /> {i}</li>)}
                              </ul>
                              <button className="rs-btn rs-btn--ink rs-btn--small" aria-label={`Get a free quote for ${s.name}`} onClick={() => toQuote({ service: s.id, packageName: "" })}>
                                Get a free quote <Arrow />
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VALUE */}
        <section className="rs-section rs-deals" id="offers" aria-labelledby="offers-title">
          <div className="rs-deals-head">
            <div>
              <p className="rs-eyebrow">Selected packages</p>
              <h2 id="offers-title"><span>Up to</span> 30% <em>off.</em></h2>
            </div>
            <p className="rs-deals-note">Quote-priced. Pick one, or tell us what you need.</p>
          </div>

          <div
            className="rs-deal-stage"
            ref={stage}
            role="group"
            aria-roledescription="carousel"
            aria-label="Selected packages"
            onPointerDown={(e) => { if (e.pointerType === "touch") swipe.current = e.clientX; }}
            onPointerUp={(e) => {
              if (swipe.current === null) return;
              const dx = e.clientX - swipe.current;
              swipe.current = null;
              if (Math.abs(dx) > 50) stepDeal(dx < 0 ? 1 : -1);
            }}
          >
            {deals.map((d, i) => {
              const art = dealArt[d.id];
              return (
                <div key={d.id} className={`rs-slide${i === dealIndex ? " is-on" : ""}`} aria-hidden={i !== dealIndex}>
                  <div className="rs-slide-par">
                    <Image unoptimized src={art.src} alt={i === dealIndex ? art.alt : ""} fill sizes="(min-width: 900px) 94vw, 100vw" style={{ objectPosition: art.pos }} loading="lazy" />
                  </div>
                </div>
              );
            })}
            <div className="rs-deal-shade" aria-hidden="true" />
            <div className="rs-deal-top">
              <span className="rs-deal-count" aria-live="polite">{String(dealIndex + 1).padStart(2, "0")} <i>/ {String(deals.length).padStart(2, "0")}</i></span>
              <span className="rs-deal-arrows">
                <button onClick={() => stepDeal(-1)} aria-label="Previous package"><Arrow style={{ transform: "scaleX(-1)" }} /></button>
                <button onClick={() => stepDeal(1)} aria-label="Next package"><Arrow /></button>
              </span>
            </div>
            <div className="rs-deal-copy" key={deal.id}>
              <p className="rs-deal-kind">{deal.kind}</p>
              <h3><span>{deal.title}</span></h3>
              <ul className="rs-deal-chips">
                {deal.chips.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <div className="rs-deal-cta">
                <button className="rs-btn" aria-label={deal.custom ? "Get a free quote for something else" : `Get a free quote for ${deal.title}`} onClick={() => toQuote(deal.quote)}>{deal.cta} <Arrow /></button>
                {!deal.custom && <span className="rs-deal-badge">Up to 30% off</span>}
              </div>
            </div>
          </div>

          <ul className="rs-deal-rail" role="list" aria-label="Choose a package">
            {deals.map((d, i) => (
              <li key={d.id}>
                <button
                  aria-pressed={i === dealIndex}
                  aria-label={d.title}
                  onClick={() => setOfferId(d.id)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") { e.preventDefault(); stepDeal(1); }
                    if (e.key === "ArrowLeft") { e.preventDefault(); stepDeal(-1); }
                  }}
                >
                  <span className="rs-thumb">
                    <Image unoptimized src={dealArt[d.id].src} alt="" fill sizes="180px" style={{ objectPosition: dealArt[d.id].pos }} loading="lazy" />
                  </span>
                  <span className="rs-thumb-label">{d.title}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="rs-deal-terms">
            <p>Up to 30% off selected packages. Offers cannot be combined and do not apply to minimum charges.</p>
            <details>
              <summary>Package terms</summary>
              <p>{deal.terms} <Link href="/legal/terms">Offer conditions</Link></p>
            </details>
          </div>
        </section>

        {/* TRUST */}
        <section className="rs-section rs-process" id="process" aria-labelledby="process-title">
          <div className="rs-head">
            <p className="rs-eyebrow rs-eyebrow--ink">How it works</p>
            <h2 id="process-title">Three quiet steps. <em>No guesswork.</em></h2>
          </div>
          <ol className="rs-steps">
            {steps.map(([t, d], i) => (
              <li key={t}><span className="rs-step-n">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
        </section>

        <section className="rs-section rs-faq" id="questions" aria-labelledby="faq-title">
          <div className="rs-head">
            <p className="rs-eyebrow rs-eyebrow--ink">Questions</p>
            <h2 id="faq-title">A little clarity <em>before we clean.</em></h2>
          </div>
          <div className="rs-faq-list">
            {faqs.map((f) => (
              <details key={f.question}>
                <summary><span>{f.question}</span><i aria-hidden="true" /></summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CONVERSION */}
        <div className="rs-quote-wrap">
          <QuotePanel selection={selection} onSelection={setSelection} />
        </div>
      </main>

      <footer className="rs-footer">
        <div className="rs-footer-top">
          <Wordmark tone="dark" />
          <a className="rs-footer-mail" href="mailto:contact@cleaningninja.co"><span className="rs-mail-icon"><Mail size={20} strokeWidth={1.6} aria-hidden /></span>contact@cleaningninja.co</a>
        </div>
        <div className="rs-footer-bottom">
          <p>© Cleaning Ninja</p>
          <nav aria-label="Legal">
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Offer conditions</Link>
          </nav>
        </div>
      </footer>

      <button className={`rs-sticky${stickyCta ? " is-on" : ""}`} onClick={() => toQuote(selection)} tabIndex={stickyCta ? 0 : -1} aria-hidden={!stickyCta}>
        Get a free quote <Arrow />
      </button>
    </div>
  );
}
