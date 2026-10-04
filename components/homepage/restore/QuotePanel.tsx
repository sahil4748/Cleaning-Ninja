"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Image from "next/image";
import { Check, ChevronDown, Mail } from "lucide-react";
import { services } from "../renewal/content";
import { submitLead } from "@/lib/platform/lead-client";
import { getService } from "@/content/service-catalogue";
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
type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; name: string }
  | { state: "error"; message: string };

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

const SUCCESS_VISIBLE_MS = 4000;
const FADE_MS = 450;

export default function QuotePanel({
  selection,
  onSelection,
  quoteRequest = 0,
}: {
  selection: QuoteSelection;
  onSelection: (value: QuoteSelection) => void;
  /** Incremented whenever a CTA asks for the quote form, so a finished enquiry can give way to a fresh one. */
  quoteRequest?: number;
}) {
  const [interactive, setInteractive] = useState(false);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const sending = useRef(false);
  // One key per distinct enquiry: a retry after a failure re-uses it, so the server can deduplicate.
  const attempt = useRef<{ signature: string; key: string } | null>(null);
  const sentRef = useRef<HTMLDivElement>(null);
  const [leaving, setLeaving] = useState(false);
  const [fresh, setFresh] = useState(false);
  const statusRef = useRef(status);
  useEffect(() => {
    statusRef.current = status;
  }, [status]);
  const handledRequest = useRef(quoteRequest);
  const formRef = useRef<HTMLFormElement>(null);
  const selectedService = services.find(
    (service) =>
      service.id === selection.service || service.name === selection.service,
  );
  useEffect(() => {
    const frame = requestAnimationFrame(() => setInteractive(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const sent = status.state === "sent";
  useEffect(() => {
    if (sent) sentRef.current?.focus();
  }, [sent]);

  useEffect(() => {
    if (selection.suburb === undefined) return;
    const suburb = selection.suburb;
    const frame = requestAnimationFrame(() => {
      setFields((current) => ({ ...current, suburb }));
    });
    return () => cancelAnimationFrame(frame);
  }, [selection.suburb]);

  function updateField(name: keyof Fields, value: string) {
    if (status.state === "error") setStatus({ state: "idle" });
    setFields((current) => ({ ...current, [name]: value }));
    if (errors[name])
      setErrors((current) => ({ ...current, [name]: undefined }));
  }

  /** Local reset only: never touches the network, so it cannot create another lead or email. */
  function resetForm() {
    attempt.current = null;
    setFields(emptyFields);
    setErrors({});
    setLeaving(false);
    setFresh(true);
    setStatus({ state: "idle" });
  }

  // Thank-you stays readable, fades, then the section returns to an empty form (no scrolling, no focus move).
  useEffect(() => {
    if (!sent) return;
    let fade = 0;
    const hold = window.setTimeout(() => {
      setLeaving(true);
      fade = window.setTimeout(() => {
        resetForm();
        onSelection({ service: "", packageName: "" });
      }, FADE_MS);
    }, SUCCESS_VISIBLE_MS);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(fade);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sent]);

  // A CTA pressed while the thank-you is showing opens a fresh form straight away, keeping the CTA's selection.
  useEffect(() => {
    if (quoteRequest === handledRequest.current) return;
    handledRequest.current = quoteRequest;
    if (statusRef.current.state === "sent") resetForm();
  }, [quoteRequest]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!interactive || sending.current) return;
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
    const name = fields.name.trim();
    const email = fields.email.trim();
    const details = fields.details.trim();
    const description = [
      `Service: ${selectedService?.name}`,
      selection.packageName ? `Selected package: ${selection.packageName}` : "",
      details ? `Details: ${details}` : "",
    ]
      .filter(Boolean)
      .join("\n")
      .slice(0, 3000);
    const lead = {
      schemaVersion: 1 as const,
      leadSource: "quote-form" as const,
      channel: "website" as const,
      intent: "quote" as const,
      name,
      phone: fields.phone.trim(),
      suburbOrAddress: fields.suburb.trim(),
      ...(email ? { email } : {}),
      description,
      ...(selectedService && getService(selectedService.id)?.quoteEnabled ? { service: selectedService.id } : {}),
      sourcePage: "/",
    };
    const signature = JSON.stringify(lead);
    if (attempt.current?.signature !== signature) attempt.current = { signature, key: crypto.randomUUID() };
    sending.current = true;
    setFresh(false);
    setStatus({ state: "sending" });
    try {
      const result = await submitLead(lead, attempt.current.key);
      if (result.status === "accepted") {
        setStatus({ state: "sent", name });
      } else {
        setStatus({ state: "error", message: result.message });
      }
    } catch {
      setStatus({ state: "error", message: "We couldn't send your enquiry. Please try again, or email contact@cleaningninja.co." });
    } finally {
      sending.current = false;
    }
  }

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
          {status.state === "sent" && (
            <div className={`rq-review${leaving ? " is-leaving" : ""}`} ref={sentRef} tabIndex={-1} aria-labelledby="rn-sent-title">
              <p className="rq-state" role="status">Enquiry received</p>
              <h3 id="rn-sent-title">Thank you, {status.name}.</h3>
              <p className="rq-sub">
                We’ve received your enquiry and a member of our team will review the details and get back to you shortly.
              </p>
              <button type="button" className="rq-edit" onClick={resetForm}>Send another enquiry</button>
              <p className="rq-fine">This is an enquiry only. No booking is confirmed until we speak with you.</p>
            </div>
          )}

          <form ref={formRef} className={fresh ? "is-fresh" : undefined} hidden={sent} onSubmit={submit} noValidate aria-busy={status.state === "sending"} aria-label="Cleaning quote enquiry">
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
            {status.state === "error" && (
              <p className="rq-error rq-submit-error" role="alert">{status.message}</p>
            )}
            <button className="rq-submit" type="submit" disabled={!interactive || status.state === "sending"}>
              {status.state === "sending" ? "Sending…" : "Get a free quote"} {status.state !== "sending" && <Arrow />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
