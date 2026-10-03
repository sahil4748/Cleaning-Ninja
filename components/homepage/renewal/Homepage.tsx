"use client";
import { useEffect, useRef, useState } from "react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Plus,
  Minus,
  Pause,
  Play,
  Check,
  ArrowDown,
  ChevronDown,
} from "lucide-react";
import { Arrow, Brand, Mark } from "./Primitives";
import { services, offers, faqs } from "./content";
import { useMotion } from "./useMotion";
import QuotePanel from "./QuotePanel";
import QuoteStarter from "./QuoteStarter";
import "./renewal.css";
import "./entry.css";

type Selection = { service: string; packageName: string; suburb?: string };
const asset = "/homepage/renewal/";
const heroCommon = {
  alt: "A carpet extraction wand in use in a sunlit olive and beige living room",
  sizes: "100vw",
};
const { props: desktopHero } = getImageProps({
  ...heroCommon,
  src: asset + "cleaning-hero.webp",
  width: 2400,
  height: 1357,
});
const { props: mobileHero } = getImageProps({
  ...heroCommon,
  sizes: "960px",
  src: asset + "cleaning-hero.webp",
  width: 2400,
  height: 1357,
});

const groups = [
  { id: "fabrics", label: "Soft furnishings" },
  { id: "surfaces", label: "Floors & more" },
  { id: "spaces", label: "Whole spaces" },
] as const;

export default function RenewalHomepage() {
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const serviceMenu = useRef<HTMLDetailsElement>(null);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [motion, setMotion] = useState(true);
  const [mediaAllowed, setMediaAllowed] = useState(false);
  const [filmLoaded, setFilmLoaded] = useState(false);
  const [filmPaused, setFilmPaused] = useState(false);
  const [filmVisible, setFilmVisible] = useState(false);
  const [selection, setSelection] = useState<Selection>({
    service: "",
    packageName: "",
  });
  const [group, setGroup] = useState<(typeof groups)[number]["id"]>("fabrics");
  const [serviceId, setServiceId] = useState(services[0].id);
  const [offerId, setOfferId] = useState(offers[0].id);
  const [sticky, setSticky] = useState(false);
  const activeService = services.find((s) => s.id === serviceId) ?? services[0];
  const activeOffer = offers.find((o) => o.id === offerId) ?? offers[0];
  useMotion(root, motion);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const update = () => {
      setMotion(!reduce.matches);
      setMediaAllowed(
        !reduce.matches &&
          !connection?.saveData &&
          !/2g/.test(connection?.effectiveType ?? ""),
      );
    };
    update();
    reduce.addEventListener("change", update);
    const scroll = () => setScrolled(window.scrollY > 60);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.target.id === "care-story") {
            setFilmVisible(entry.isIntersecting);
            if (entry.isIntersecting) setFilmLoaded(true);
          }
        }),
      { rootMargin: "150px" },
    );
    const story = document.getElementById("care-story");
    if (story) observer.observe(story);
    let heroVisible = true,
      quoteVisible = false;
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.id === "home") heroVisible = entry.isIntersecting;
        if (entry.target.id === "quote") quoteVisible = entry.isIntersecting;
      });
      setSticky(!heroVisible && !quoteVisible);
    });
    const hero = document.getElementById("home");
    const quote = document.getElementById("quote");
    if (hero) ctaObserver.observe(hero);
    if (quote) ctaObserver.observe(quote);
    return () => {
      reduce.removeEventListener("change", update);
      window.removeEventListener("scroll", scroll);
      observer.disconnect();
      ctaObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    const film = video.current;
    if (!film) return;
    const sync = () => {
      if (
        motion &&
        !filmPaused &&
        mediaAllowed &&
        filmVisible &&
        !document.hidden
      )
        void film.play().catch(() => {});
      else film.pause();
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [motion, filmPaused, mediaAllowed, filmVisible, filmLoaded]);
  useEffect(() => {
    if (!menu) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const links = menuPanel.current?.querySelectorAll<HTMLElement>("a,button");
    links?.[0]?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab" && links?.length) {
        const first = links[0];
        const last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener("keydown", key);
    };
  }, [menu]);
  function select(value: Selection) {
    setSelection(value);
    setMenu(false);
    document.getElementById("quote")?.scrollIntoView({ behavior: "instant" });
    requestAnimationFrame(() =>
      document.getElementById("rn-service")?.focus({ preventScroll: true }),
    );
  }
  function chooseGroup(id: (typeof groups)[number]["id"]) {
    setGroup(id);
    setServiceId(services.find((s) => s.group === id)!.id);
  }
  function browseService(id: string) {
    const service = services.find((item) => item.id === id);
    if (!service) return;
    setGroup(service.group);
    setServiceId(service.id);
    setMenu(false);
    if (serviceMenu.current) serviceMenu.current.open = false;
    requestAnimationFrame(() => {
      document
        .getElementById("services")
        ?.scrollIntoView({ behavior: "instant" });
      document
        .querySelector<HTMLButtonElement>(
          `[aria-controls="service-${service.id}"]`,
        )
        ?.focus({ preventScroll: true });
    });
  }
  function closeMenu() {
    setMenu(false);
  }
  return (
    <div className="rn-site" ref={root} data-motion={motion ? "on" : "off"}>
      <a href="#main-content" className="rn-skip">
        Skip to content
      </a>
      <header className={`rn-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="rn-announcement" href="#packages">
          <span>SPECIAL OFFERS</span>
          <strong>Up to 30% off selected cleaning packages</strong>
          <span>
            Explore offers <Arrow />
          </span>
        </a>
        <div className="rn-navigation">
          <Link href="/" aria-label="Cleaning Ninja home">
            <Brand />
          </Link>
          <nav className="rn-desktop-nav" aria-label="Main navigation">
            <details
              ref={serviceMenu}
              className="rn-services-menu"
              onKeyDown={(event) => {
                if (event.key === "Escape" && serviceMenu.current) {
                  serviceMenu.current.open = false;
                  serviceMenu.current.querySelector("summary")?.focus();
                }
              }}
              onBlur={(event) => {
                if (
                  !event.currentTarget.contains(
                    event.relatedTarget as Node | null,
                  ) &&
                  serviceMenu.current
                )
                  serviceMenu.current.open = false;
              }}
            >
              <summary>
                Our services <ChevronDown size={14} />
              </summary>
              <div className="rn-services-dropdown">
                <div>
                  <span>CARE FOR EVERY CORNER</span>
                  <h2>
                    Find your
                    <br />
                    <em>kind of clean.</em>
                  </h2>
                  <a
                    href="#services"
                    onClick={() => {
                      if (serviceMenu.current) serviceMenu.current.open = false;
                    }}
                  >
                    Explore all services <Arrow />
                  </a>
                </div>
                <div className="rn-dropdown-list">
                  {services.map((service) => (
                    <a
                      href="#services"
                      key={service.id}
                      onClick={() => browseService(service.id)}
                    >
                      {service.name}
                      <Arrow />
                    </a>
                  ))}
                </div>
              </div>
            </details>
            <a href="#packages">
              Special offers{" "}
              <span className="rn-nav-discount">UP TO 30% OFF</span>
            </a>
            <a href="#care-story">Our approach</a>
            <a href="#quote">Contact</a>
          </nav>
          <div className="rn-header-actions">
            <a href="#quote" className="rn-header-quote">
              Get a Free Quote <Arrow />
            </a>
            <button
              ref={menuButton}
              className="rn-menu-toggle"
              aria-label="Open menu"
              aria-expanded={menu}
              aria-controls="rn-menu"
              onClick={() => setMenu(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      {menu && (
        <nav
          ref={menuPanel}
          id="rn-menu"
          className="rn-menu"
          aria-label="Mobile navigation"
          role="dialog"
          aria-modal="true"
        >
          <div className="rn-menu-top">
            <Brand />
            <button
              onClick={() => {
                setMenu(false);
                menuButton.current?.focus();
              }}
              aria-label="Close menu"
            >
              <X />
            </button>
          </div>
          <div className="rn-menu-links">
            <a href="#services" onClick={closeMenu}>
              Our services <Arrow />
            </a>
            <a href="#care-story" onClick={closeMenu}>
              Our approach <Arrow />
            </a>
            <a href="#packages" onClick={closeMenu}>
              Special offers <Arrow />
            </a>
            <a href="#quote" onClick={closeMenu}>
              Get a Free Quote <Arrow />
            </a>
          </div>
          <div
            className="rn-mobile-service-list"
            aria-label="All cleaning services"
          >
            {services.map((service) => (
              <a
                key={service.id}
                href="#services"
                onClick={() => browseService(service.id)}
              >
                {service.name}
              </a>
            ))}
          </div>
          <a className="rn-menu-email" href="mailto:contact@cleaningninja.co">
            contact@cleaningninja.co
          </a>
        </nav>
      )}
      <main id="main-content" tabIndex={-1}>
        <section
          className="rn-hero rn-entry-hero"
          id="home"
          aria-labelledby="hero-title"
        >
          <div className="rn-hero-image">
            <picture>
              <source
                media="(max-width: 600px)"
                srcSet={mobileHero.srcSet}
                sizes="960px"
              />
              {/* Responsive art direction uses Next-optimised image sources. */}
              <img
                {...desktopHero}
                alt={heroCommon.alt}
                loading="eager"
                fetchPriority="high"
              />
            </picture>
          </div>
          <div className="rn-hero-shade" />
          <div className="rn-entry-layout">
            <div className="rn-hero-copy rn-entry-copy">
              <p className="rn-hero-eyebrow">
                CARPET · UPHOLSTERY · RUGS · TILE &amp; GROUT
              </p>
              <h1 id="hero-title">
                Carpet &amp;
                <br />
                upholstery.
                <br />
                <em>Beautifully clean.</em>
              </h1>
              <p className="rn-entry-description">
                Professional carpet, upholstery and surface cleaning for homes
                and businesses. From everyday marks to a whole-space refresh.
              </p>
              <div className="rn-entry-actions">
                <a href="#services" className="rn-entry-service-link">
                  Discover our services <Arrow />
                </a>
                <a href="#quote-start" className="rn-entry-mobile-quote">
                  Get a Free Quote <Arrow />
                </a>
              </div>
              <div className="rn-entry-caption">
                <span>Deep cleaning. Considered care.</span>
                <span>Room to breathe.</span>
              </div>
            </div>
            <QuoteStarter
              onStart={(service, suburb) => {
                select({ service, packageName: "", suburb });
                requestAnimationFrame(() =>
                  document
                    .getElementById("rn-name")
                    ?.focus({ preventScroll: true }),
                );
              }}
            />
          </div>
        </section>
        <nav
          className="rn-offer-preview"
          aria-label="Quick access to special offers"
        >
          <a className="rn-offer-preview-heading" href="#packages">
            <span>SPECIAL OFFERS</span>
            <strong>
              <small>UP TO</small> 30<sup>%</sup> <span>OFF</span>
            </strong>
          </a>
          <div className="rn-offer-preview-links">
            {offers.map((offer) => (
              <a
                key={offer.id}
                href="#packages"
                onClick={() => setOfferId(offer.id)}
              >
                <span>{offer.title}</span>
                <small>
                  {offer.service === "carpet-cleaning"
                    ? "Carpet cleaning"
                    : offer.service === "rugs-cleaning"
                      ? "Rug cleaning"
                      : offer.service === "leather-cleaning"
                        ? "Leather cleaning"
                        : "Upholstery cleaning"}
                </small>
                <Arrow />
              </a>
            ))}
          </div>
          <span className="rn-offer-preview-note">
            Selected packages.
            <br />
            Terms apply.
          </span>
        </nav>
        <section
          className="rn-services rn-section"
          id="services"
          aria-labelledby="services-title"
        >
          <div className="rn-section-heading">
            <h2 id="services-title">
              Our cleaning services.
              <br />
              <em>Care in every detail.</em>
            </h2>
            <p>
              Carpet, upholstery, rugs and more.
              <br />
              Complete care for homes and businesses.
            </p>
          </div>
          <div className="rn-services-layout">
            <div className="rn-service-browser">
              <div
                className="rn-tabs"
                role="tablist"
                aria-label="Service categories"
              >
                {groups.map((g) => (
                  <button
                    key={g.id}
                    id={"tab-" + g.id}
                    role="tab"
                    aria-selected={group === g.id}
                    aria-controls={"panel-" + g.id}
                    tabIndex={group === g.id ? 0 : -1}
                    onClick={() => chooseGroup(g.id)}
                    onKeyDown={(e) => {
                      if (
                        ["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                          e.key,
                        )
                      ) {
                        e.preventDefault();
                        const idx = groups.findIndex((x) => x.id === g.id);
                        const next =
                          e.key === "Home"
                            ? 0
                            : e.key === "End"
                              ? groups.length - 1
                              : (idx +
                                  (e.key === "ArrowRight" ? 1 : -1) +
                                  groups.length) %
                                groups.length;
                        chooseGroup(groups[next].id);
                        document
                          .getElementById("tab-" + groups[next].id)
                          ?.focus();
                      }
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
              <div
                role="tabpanel"
                id={"panel-" + group}
                aria-labelledby={"tab-" + group}
                className="rn-service-list"
              >
                {services
                  .filter((s) => s.group === group)
                  .map((s) => (
                    <div
                      key={s.id}
                      className={`rn-service-row ${s.id === serviceId ? "is-active" : ""}`}
                    >
                      <button
                        className="rn-service-name"
                        aria-expanded={s.id === serviceId}
                        aria-controls={"service-" + s.id}
                        onClick={() => setServiceId(s.id)}
                      >
                        <span>{s.shortName}</span>
                        {s.id === serviceId ? (
                          <Minus size={19} />
                        ) : (
                          <Plus size={19} />
                        )}
                      </button>
                      <div
                        id={"service-" + s.id}
                        hidden={s.id !== serviceId}
                        className="rn-service-detail"
                      >
                        <p>{s.description}</p>
                        <ul>
                          {s.includes.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <button
                          className="rn-text-link"
                          onClick={() =>
                            select({ service: s.id, packageName: "" })
                          }
                        >
                          Enquire about {s.shortName.toLowerCase()} <Arrow />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="rn-service-help">
                <span>Not sure what your space needs?</span>
                <a href="#quote">
                  We’ll help you find the right clean <Arrow />
                </a>
              </div>
            </div>
            <figure className="rn-service-photo">
              <div className="rn-service-photo-inner">
                <Image
                  key={activeService.image}
                  src={activeService.image}
                  alt={activeService.imageAlt}
                  fill
                  sizes="(max-width: 800px) 100vw, 48vw"
                />
              </div>
              <div className="rn-photo-caption">
                <span>Care, down to the detail.</span>
                <span>{activeService.shortName}</span>
              </div>
              <span className="rn-photo-tag">
                <Mark />A considered clean
              </span>
            </figure>
          </div>
        </section>
        <section
          className="rn-packages rn-section"
          id="packages"
          aria-labelledby="packages-title"
        >
          <div className="rn-offer-heading">
            <div>
              <h2 id="packages-title">
                Special offers.
                <br />
                <em>More clean. Less spend.</em>
              </h2>
              <p>
                Bring a few favourites together with our selected cleaning
                packages.
              </p>
            </div>
            <div className="rn-discount">
              <span>Selected packages</span>
              <strong>
                <small>up to</small>30<sup>%</sup>
              </strong>
              <span>off your clean</span>
            </div>
          </div>
          <div className="rn-offer-folio">
            <div className="rn-offer-index" aria-label="Cleaning packages">
              {offers.map((o) => (
                <button
                  key={o.id}
                  aria-pressed={offerId === o.id}
                  onClick={() => setOfferId(o.id)}
                >
                  <span>{o.title}</span>
                  <Arrow />
                </button>
              ))}
            </div>
            <div className="rn-offer-details" aria-live="polite">
              <div className="rn-offer-title">
                <h3>{activeOffer.title}</h3>
                <span>Tailored quote</span>
              </div>
              <p>{activeOffer.description}</p>
              <ul>
                {activeOffer.includes.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="rn-offer-bottom">
                <p>{activeOffer.terms}</p>
                <button
                  className="rn-button rn-button-dark"
                  onClick={() =>
                    select({
                      service: activeOffer.service,
                      packageName: activeOffer.title,
                    })
                  }
                >
                  Get this offer{" "}
                  <span>
                    <Arrow />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <p className="rn-offer-terms">
            Up to 30% off selected packages. Final quote depends on size,
            material and condition. Minimum charges apply. Offers cannot be
            combined.{" "}
            <Link href="/legal/terms">
              View offer conditions <Arrow />
            </Link>
          </p>
        </section>
        <section
          className="rn-story"
          id="care-story"
          aria-labelledby="story-title"
        >
          <div className="rn-story-stage">
            <div className="rn-story-window">
              <div className="rn-story-room">
                <Image
                  src={asset + "hero.webp"}
                  alt="A fresh and restful living space"
                  fill
                  sizes="100vw"
                />
                {filmLoaded && mediaAllowed && (
                  <video
                    ref={video}
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={asset + "hero.webp"}
                    aria-hidden="true"
                  >
                    <source src={asset + "atmosphere.mp4"} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="rn-story-detail">
                <Image
                  src={asset + "detail.webp"}
                  alt="Close-up of warm woven upholstery and wool fibres"
                  fill
                  sizes="100vw"
                />
              </div>
              <div className="rn-story-shade" />
            </div>
            <div className="rn-story-first" aria-hidden="true">
              <span>The difference</span>
              <em>is in the detail.</em>
            </div>
            <div className="rn-story-last">
              <h2 id="story-title">
                A deeper clean.
                <br />
                <em>A lighter feeling.</em>
              </h2>
              <p>
                Care for the fibres. Respect for the materials.
                <br />A fresh perspective on the everyday.
              </p>
              <a href="#quote" className="rn-button rn-button-light">
                Make room for a fresh start{" "}
                <span>
                  <Arrow />
                </span>
              </a>
            </div>
            <div className="rn-story-caption">
              <span>From a single fibre to the feeling of home.</span>
              {mediaAllowed && motion ? (
                <button
                  onClick={() => setFilmPaused(!filmPaused)}
                  aria-label={filmPaused ? "Play film" : "Pause film"}
                  aria-pressed={filmPaused}
                >
                  {filmPaused ? <Play size={16} /> : <Pause size={16} />}
                  <span>{filmPaused ? "Play film" : "Pause film"}</span>
                </button>
              ) : (
                <span>Still view</span>
              )}
            </div>
          </div>
        </section>
        <section
          className="rn-intro rn-section"
          id="introduction"
          aria-labelledby="intro-title"
        >
          <div className="rn-intro-side">
            <Mark />
            <p>
              For the homes we live in.
              <br />
              And the life that happens in them.
            </p>
          </div>
          <div className="rn-intro-main">
            <h2 id="intro-title" className="rn-reveal">
              Life leaves its mark.
              <br />
              We bring back
              <br />
              <em>the lovely.</em>
            </h2>
            <div className="rn-intro-bottom">
              <p>
                The well-loved sofa. Bare feet on the carpet. The little corners
                that make a house a home. We take care of the clean, so you can
                get back to enjoying your space.
              </p>
              <a
                href="#services"
                className="rn-circle-link"
                aria-label="Discover our cleaning services"
              >
                <Arrow />
              </a>
            </div>
          </div>
          <span className="rn-intro-thread" aria-hidden="true">
            a little care changes everything
          </span>
        </section>
        <section
          className="rn-process rn-section"
          aria-labelledby="process-title"
        >
          <div className="rn-process-heading">
            <h2 id="process-title">
              Good care.
              <br />
              <em>No complications.</em>
            </h2>
            <p>
              A few simple steps between you
              <br />
              and a space that feels like new.
            </p>
            <a href="#quote" className="rn-text-link">
              Start with a free quote <Arrow />
            </a>
          </div>
          <ol className="rn-process-steps">
            <li>
              <span>01</span>
              <div>
                <h3>Tell us about your space.</h3>
                <p>
                  Choose a service and share the rooms, surfaces or items that
                  need a little attention.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Find your kind of clean.</h3>
                <p>
                  We’ll discuss the details, the right treatment and a quote for
                  your space. Clear before we begin.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Leave room for living.</h3>
                <p>
                  Agree the clean and a time that suits, then look forward to
                  that freshly cared-for feeling.
                </p>
              </div>
            </li>
          </ol>
        </section>
        <section className="rn-calm" aria-labelledby="calm-title">
          <Image
            src={asset + "calm-wide.webp"}
            alt="An empty, quiet room with timber panelling and sheer curtains in soft light"
            fill
            sizes="100vw"
            className="rn-calm-img"
          />
          <div className="rn-calm-copy">
            <p>QUIET PRECISION</p>
            <h2 id="calm-title">
              Bring your space
              <br />
              <em>back to calm.</em>
            </h2>
            <a href="#quote-start">
              Get a Quote <Arrow />
            </a>
          </div>
        </section>
        <section className="rn-commercial" aria-labelledby="commercial-title">
          <div className="rn-commercial-photo">
            <Image
              src={asset + "stone.webp"}
              alt="Natural stone and thoughtful details in a calm contemporary space"
              fill
              sizes="(max-width: 800px) 100vw, 55vw"
            />
          </div>
          <div className="rn-commercial-copy">
            <span className="rn-open-mark" aria-hidden="true">
              <Mark />
            </span>
            <h2 id="commercial-title">
              A fresh welcome.
              <br />
              <em>Every day.</em>
            </h2>
            <p>
              Workspaces, shared spaces, and the places where first impressions
              matter. Thoughtful cleaning for the way you do business.
            </p>
            <button
              className="rn-text-link"
              onClick={() =>
                select({ service: "commercial-cleaning", packageName: "" })
              }
            >
              Explore commercial cleaning <Arrow />
            </button>
          </div>
        </section>
        <QuotePanel selection={selection} onSelection={setSelection} />
        <section className="rn-faq rn-section" aria-labelledby="faq-title">
          <div>
            <h2 id="faq-title">
              A little clarity.
              <br />
              <em>Before we clean.</em>
            </h2>
            <p>
              Still have something on your mind?
              <br />
              <a href="mailto:contact@cleaningninja.co">
                Let’s talk about it <Arrow />
              </a>
            </p>
          </div>
          <div className="rn-faq-list">
            {faqs.map((f) => (
              <details key={f.question}>
                <summary>
                  {f.question}
                  <Plus className="rn-faq-plus" size={19} />
                  <Minus className="rn-faq-minus" size={19} />
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="rn-finale" aria-labelledby="finale-title">
          <Image
            src={asset + "dusk.webp"}
            alt=""
            fill
            sizes="100vw"
            className="rn-finale-img"
          />
          <div className="rn-finale-top">
            <span>Less on your list. More life in your day.</span>
            <Mark />
          </div>
          <a href="#quote">
            <h2 id="finale-title">
              Let life in.
              <br />
              <em>We’ll take care of the clean.</em>
            </h2>
            <span className="rn-finale-arrow">
              <Arrow />
            </span>
          </a>
        </section>
      </main>
      <footer className="rn-footer">
        <div className="rn-footer-top">
          <Link href="/" aria-label="Cleaning Ninja home">
            <Brand />
          </Link>
          <a className="rn-footer-email" href="mailto:contact@cleaningninja.co">
            contact@cleaningninja.co <Arrow />
          </a>
          <div className="rn-footer-social">
            <span>
              Thoughtful cleaning.
              <br />
              For homes and workplaces.
            </span>
            <a href="#quote">
              Ask about your area <Arrow />
            </a>
          </div>
        </div>
        <div className="rn-footer-bottom">
          <span>© {new Date().getFullYear()} Cleaning Ninja</span>
          <nav aria-label="Footer navigation">
            <a href="#services">Services</a>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Offer conditions</Link>
            <button onClick={() => setMotion(!motion)}>
              {motion ? "Reduce motion" : "Enable motion"}
            </button>
          </nav>
          <a href="#home">
            Back to the top <ArrowDown size={16} />
          </a>
        </div>
        <div className="rn-footer-word" aria-hidden="true">
          a fresh feeling.
        </div>
      </footer>
      <a href="#quote" className="rn-floating-quote" hidden={!sticky || menu}>
        Get a Free Quote <Arrow />
      </a>
    </div>
  );
}
