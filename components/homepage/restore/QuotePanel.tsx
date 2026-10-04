"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Image from "next/image";
import { Check, ChevronDown, Mail } from "lucide-react";
import { services } from "../renewal/content";
import { Arrow } from "./Mark";
import "./quote.css";

export type QuoteSelection = {
  service: string;
  packageName: string;
  suburb?: string;
};
type Fields = {
  name: string;
  phone: string;
  suburb: string;
  email: string;
  details: string;
};
type FieldName = keyof Fields | "service";
type Errors = Partial<Record<FieldName, string>>;
type Review = Fields & QuoteSelection;

const contactEmail = "contact@cleaningninja.co";
const emptyFields: Fields = {
  name: "",
  phone: "",
  suburb: "",
  email: "",
  details: "",
};


const serviceGroups = [
  { id: "fabrics", label: "Soft furnishings" },
  { id: "surfaces", label: "Floors & marks" },
  { id: "spaces", label: "Whole spaces" },
] as const;

/** Select-only combobox: a styled, keyboard-complete listbox that behaves the same everywhere. */
function ServiceSelect({
  value,
  onChange,
  invalid,
  describedBy,
}: {
  value: string;
  onChange: (id: string) => void;
  invalid: boolean;
  describedBy?: string;
}) {
  const uid = useId();
  const listId = `${uid}-list`;
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const [active, setActive] = useState(0);
  const typed = useRef({ text: "", t: 0 });
  const current = services.find((s) => s.id === value);

  function show(index?: number) {
    const i = index ?? Math.max(0, services.findIndex((s) => s.id === value));
    const rect = button.current?.getBoundingClientRect();
    if (rect) setUp(window.innerHeight - rect.bottom < 360 && rect.top > window.innerHeight - rect.bottom);
    setActive(i);
    setOpen(true);
  }
  function choose(i: number) {
    onChange(services[i].id);
    setOpen(false);
    button.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);
  useEffect(() => {
    if (open) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, listId]);

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    const last = services.length - 1;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return show();
      setActive((a) => Math.min(last, Math.max(0, a + (e.key === "ArrowDown" ? 1 : -1))));
    } else if (e.key === "Home" || e.key === "End") {
      if (open) {
        e.preventDefault();
        setActive(e.key === "Home" ? 0 : last);
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) choose(active);
      else show();
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "Tab") {
      setOpen(false);
    } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
      const now = Date.now();
      typed.current.text = now - typed.current.t > 700 ? e.key.toLowerCase() : typed.current.text + e.key.toLowerCase();
      typed.current.t = now;
      const hit = services.findIndex((s) => s.name.toLowerCase().startsWith(typed.current.text));
      if (hit >= 0) {
        if (!open) show(hit);
        else setActive(hit);
      }
    }
  }

  return (
    <div className="rq-select" ref={root}>
      <button
        ref={button}
        type="button"
        id="rn-service"
        name="service"
        data-value={value}
        className={`rq-control rq-select-btn${current ? " has-value" : ""}`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-labelledby="rq-service-label rn-service"
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
      >
        <span>{current ? current.name : "Choose a service"}</span>
        <ChevronDown size={18} aria-hidden className="rq-chevron" />
      </button>
      <ul id={listId} role="listbox" aria-label="Services" className={`rq-list${open ? " is-open" : ""}${up ? " is-up" : ""}`} hidden={!open}>
        {serviceGroups.map((g) => (
          <li key={g.id} role="presentation" className="rq-group">
            <span aria-hidden="true">{g.label}</span>
            <ul role="presentation">
              {services.map((s, i) =>
                s.group === g.id ? (
                  <li
                    key={s.id}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={s.id === value}
                    className={`rq-option${i === active ? " is-active" : ""}${s.id === value ? " is-selected" : ""}`}
                    onPointerMove={() => setActive(i)}
                    onClick={() => choose(i)}
                  >
                    <span>{s.name}</span>
                    {s.id === value && <Check size={16} aria-hidden />}
                  </li>
                ) : null,
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function QuotePanel({
  selection,
  onSelection,
}: {
  selection: QuoteSelection;
  onSelection: (value: QuoteSelection) => void;
}) {
  const [interactive, setInteractive] = useState(false);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Errors>({});
  const [review, setReview] = useState<Review | null>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const selectedService = services.find(
    (service) =>
      service.id === selection.service || service.name === selection.service,
  );
  const reviewedServiceName =
    services.find(
      (service) =>
        service.id === review?.service || service.name === review?.service,
    )?.name ?? review?.service;
  const reviewing =
    review !== null &&
    review.service === selection.service &&
    review.packageName === selection.packageName;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setInteractive(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (reviewing) reviewRef.current?.focus();
  }, [reviewing]);

  useEffect(() => {
    if (selection.suburb === undefined) return;
    const suburb = selection.suburb;
    const frame = requestAnimationFrame(() => {
      setFields((current) => ({ ...current, suburb }));
      setReview(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [selection.suburb]);

  function updateField(name: keyof Fields, value: string) {
    setReview(null);
    setFields((current) => ({ ...current, [name]: value }));
    if (errors[name])
      setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function editEnquiry() {
    setReview(null);
    requestAnimationFrame(() =>
      formRef.current
        ?.querySelector<HTMLElement>('[name="service"]')
        ?.focus({ preventScroll: true }),
    );
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!interactive) return;
    const nextErrors: Errors = {};
    const normalisedPhone = fields.phone.replace(/[\s().-]/g, "");
    if (!selectedService) nextErrors.service = "Choose the service you need.";
    if (!fields.name.trim())
      nextErrors.name = "Add your name so we know who to contact.";
    if (!/^(?:0[23478]\d{8}|\+?61[23478]\d{8})$/.test(normalisedPhone)) {
      nextErrors.phone = "Enter an Australian number, such as 0412 345 678.";
    }
    if (fields.suburb.trim().length < 2) {
      nextErrors.suburb = "Add your suburb or a four-digit postcode.";
    } else if (
      /^\d+$/.test(fields.suburb.trim()) &&
      !/^\d{4}$/.test(fields.suburb.trim())
    ) {
      nextErrors.suburb = "Australian postcodes have four digits.";
    }
    const emailInput = event.currentTarget.elements.namedItem(
      "email",
    ) as HTMLInputElement | null;
    if (fields.email.trim() && emailInput?.validity.typeMismatch) {
      nextErrors.email = "Enter a complete email address, or leave this blank.";
    }
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0] as FieldName | undefined;
    if (firstError) {
      const form = event.currentTarget;
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus(),
      );
      return;
    }
    setReview({
      ...selection,
      name: fields.name.trim(),
      phone: fields.phone.trim(),
      suburb: fields.suburb.trim(),
      email: fields.email.trim(),
      details: fields.details.trim(),
    });
  }

  const emailBody = review
    ? [
        "Hello Cleaning Ninja, I would like a quote.",
        "",
        `Service: ${reviewedServiceName}`,
        review.packageName ? `Selected package: ${review.packageName}` : "",
        `Name: ${review.name}`,
        `Phone: ${review.phone}`,
        `Suburb or postcode: ${review.suburb}`,
        review.email ? `Email: ${review.email}` : "",
        review.details ? `Details: ${review.details}` : "",
      ]
        .filter((line, index) => line || index === 1)
        .join("\n")
    : "";
  const emailHref = `mailto:${contactEmail}?subject=${encodeURIComponent(`Cleaning enquiry — ${reviewedServiceName ?? "Your space"}`)}&body=${encodeURIComponent(emailBody)}`;

  function errorMessage(name: FieldName) {
    return errors[name] ? (
      <span className="rq-error" id={`rn-${name}-error`}>
        {errors[name]}
      </span>
    ) : null;
  }

  return (
    <section id="quote" className="rq" aria-labelledby="rn-quote-title">
      <div className="rq-shell">
        <aside className="rq-visual">
          <Image unoptimized src="/homepage/restore/quote-room.webp" alt="" fill sizes="(min-width: 900px) 40vw, 100vw" className="rq-photo" loading="lazy" />
          <div className="rq-visual-shade" aria-hidden="true" />
          <div className="rq-visual-copy">
            <p className="rs-eyebrow">Free quote</p>
            <h2 id="rn-quote-title">
              Get a <em>free quote.</em>
            </h2>
            <p className="rq-lede">Tell us what needs a clean. We prepare a personalised quote, and nothing is booked until we confirm with you.</p>
            <a className="rq-mail" href={`mailto:${contactEmail}`}>
              <span className="rq-mail-icon"><Mail size={18} strokeWidth={1.6} aria-hidden /></span>
              {contactEmail}
            </a>
          </div>
        </aside>

        <div className="rq-card">
          {reviewing && review && (
            <div className="rq-review" ref={reviewRef} tabIndex={-1} aria-labelledby="rn-review-title">
              <p className="rq-state" role="status">Ready for your review · Not sent yet</p>
              <h3 id="rn-review-title">One last look.</h3>
              <p className="rq-sub">Here’s your enquiry, {review.name}. Open your email app when you’re ready, then send it to us from there.</p>
              <dl className="rq-details">
                <div><dt>Service</dt><dd>{reviewedServiceName}</dd></div>
                {review.packageName && <div><dt>Package</dt><dd>{review.packageName}</dd></div>}
                <div><dt>Name</dt><dd>{review.name}</dd></div>
                <div><dt>Phone</dt><dd>{review.phone}</dd></div>
                <div><dt>Suburb / postcode</dt><dd>{review.suburb}</dd></div>
                {review.email && <div><dt>Email</dt><dd>{review.email}</dd></div>}
                {review.details && <div><dt>Details</dt><dd className="rq-msg">{review.details}</dd></div>}
              </dl>
              <a className="rq-submit" href={emailHref}>Send by email <Arrow /></a>
              <button type="button" className="rq-edit" onClick={editEnquiry}>Edit my enquiry</button>
              <p className="rq-fine">Nothing has been sent and no booking is confirmed. Your email app will open a draft addressed to {contactEmail}.</p>
            </div>
          )}

          <form ref={formRef} hidden={reviewing} onSubmit={submit} noValidate aria-label="Prepare a cleaning quote enquiry">
            <div className="rq-head">
              <h3>Your clean starts here.</h3>
              <p className="rq-sub">Quick details only. Email and notes are optional.</p>
            </div>
            <noscript>
              <p className="rq-fine">
                This form needs JavaScript. You can also email your enquiry to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
              </p>
            </noscript>
            {selection.packageName && (
              <div className="rq-package">
                <span>Selected package<strong>{selection.packageName}</strong></span>
                <button
                  type="button"
                  aria-label="Remove selected package"
                  onClick={() => {
                    setReview(null);
                    onSelection({ ...selection, packageName: "" });
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
                </button>
              </div>
            )}
            <div className="rq-fields">
              <div className="rq-field rq-full">
                <span className="rq-label" id="rq-service-label">What needs a clean?</span>
                <ServiceSelect
                  value={selectedService?.id ?? ""}
                  invalid={Boolean(errors.service)}
                  describedBy={errors.service ? "rn-service-error" : undefined}
                  onChange={(id) => {
                    setReview(null);
                    onSelection({ service: id, packageName: "" });
                    setErrors((current) => ({ ...current, service: undefined }));
                  }}
                />
                {errorMessage("service")}
              </div>
              <div className="rq-field">
                <label className="rq-label" htmlFor="rn-name">Your name</label>
                <input id="rn-name" name="name" className="rq-control" value={fields.name} onChange={(e) => updateField("name", e.target.value)} autoComplete="name" placeholder="Full name" maxLength={120} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "rn-name-error" : undefined} />
                {errorMessage("name")}
              </div>
              <div className="rq-field">
                <label className="rq-label" htmlFor="rn-phone">Phone number</label>
                <input id="rn-phone" name="phone" type="tel" className="rq-control" value={fields.phone} onChange={(e) => updateField("phone", e.target.value)} autoComplete="tel" placeholder="0412 345 678" maxLength={25} required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "rn-phone-error" : undefined} />
                {errorMessage("phone")}
              </div>
              <div className="rq-field">
                <label className="rq-label" htmlFor="rn-suburb">Suburb or postcode</label>
                <input id="rn-suburb" name="suburb" className="rq-control" value={fields.suburb} onChange={(e) => updateField("suburb", e.target.value)} autoComplete="address-level2" placeholder="e.g. New Farm, 4005" maxLength={120} required aria-invalid={Boolean(errors.suburb)} aria-describedby={errors.suburb ? "rn-suburb-error" : undefined} />
                {errorMessage("suburb")}
              </div>
              <div className="rq-field">
                <label className="rq-label" htmlFor="rn-email">Email <span className="rq-optional">(optional)</span></label>
                <input id="rn-email" name="email" type="email" className="rq-control" value={fields.email} onChange={(e) => updateField("email", e.target.value)} autoComplete="email" placeholder="you@example.com" maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "rn-email-error" : undefined} />
                {errorMessage("email")}
              </div>
              <div className="rq-field rq-full">
                <label className="rq-label" htmlFor="rn-details">A few details <span className="rq-optional">(optional)</span></label>
                <textarea id="rn-details" name="details" className="rq-control rq-area" value={fields.details} onChange={(e) => updateField("details", e.target.value)} rows={2} maxLength={3000} placeholder="Rooms, fabrics, problem spots or anything you’d like us to know…" />
              </div>
            </div>
            <button className="rq-submit" type="submit" disabled={!interactive}>Get a free quote <Arrow /></button>
          </form>
        </div>
      </div>
    </section>
  );
}
