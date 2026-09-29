"use client";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { ArrowUpRight, Check, Phone, X } from "lucide-react";
import {
  prototypeServices,
  additionalServices,
  prototypeContact,
} from "@/content/homepage-prototype";
import type { QuoteSelection } from "./Offers";
export default function Quote({
  selection,
  onSelection,
}: {
  selection: QuoteSelection;
  onSelection: (value: QuoteSelection) => void;
}) {
  const [interactive, setInteractive] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setInteractive(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setDone(false));
    return () => cancelAnimationFrame(frame);
  }, [selection]);
  const [phoneError, setPhoneError] = useState("");
  const [summary, setSummary] = useState({
    name: "",
    suburb: "",
    phone: "",
    email: "",
    details: "",
  });
  const emailBody = [
    "Hello Cleaning Ninja, I'd like a free quote.",
    `Service: ${selection.service}`,
    selection.packageName ? `Package: ${selection.packageName}` : "",
    `Name: ${summary.name}`,
    `Suburb or postcode: ${summary.suburb}`,
    `Phone: ${summary.phone}`,
    summary.email ? `Email: ${summary.email}` : "",
    summary.details ? `Details: ${summary.details}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const enquiryHref = `mailto:${prototypeContact.email}?subject=${encodeURIComponent(`Cleaning quote — ${selection.service}`)}&body=${encodeURIComponent(emailBody)}`;
  const status = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (done) status.current?.focus();
  }, [done]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phone = String(data.get("phone")).replace(/[\s()-]/g, "");
    if (!/^(?:0[2378]\d{8}|04\d{8}|\+61[23478]\d{8})$/.test(phone)) {
      setPhoneError(
        "Enter a valid Australian phone number, e.g. 0412 345 678.",
      );
      event.currentTarget
        .querySelector<HTMLInputElement>('[name="phone"]')
        ?.focus();
      return;
    }
    setPhoneError("");
    setSummary({
      name: String(data.get("name")),
      suburb: String(data.get("suburb")),
      phone: String(data.get("phone")),
      email: String(data.get("email") ?? ""),
      details: String(data.get("details") ?? ""),
    });
    setDone(true);
  }
  return (
    <section
      id="quote"
      className="cn-section cn-quote"
      aria-labelledby="quote-title"
    >
      <div className="cn-quote-intro">
        <p className="cn-label">Your fresh start begins here</p>
        <h2 id="quote-title">
          Tell us the space.
          <br />
          <em>We’ll talk clean.</em>
        </h2>
        <p>
          Choose your service, share a few details and get a free, no-obligation
          quote.
        </p>
        <a className="cn-quote-phone" href={prototypeContact.href}>
          <Phone size={22} />
          <span>
            <small>Prefer to talk?</small>
            {prototypeContact.phone}
          </span>
          <ArrowUpRight size={22} />
        </a>
        <a className="cn-email" href={`mailto:${prototypeContact.email}`}>
          {prototypeContact.email}
        </a>
      </div>
      <div className="cn-form-panel">
        {done && (
          <div
            className="cn-quote-success cn-enquiry-review"
            role="status"
            ref={status}
            tabIndex={-1}
          >
            <Check size={32} />
            <h3>Your enquiry, ready to send.</h3>
            <p>
              Thanks, {summary.name}. Your {selection.service.toLowerCase()}{" "}
              enquiry for {summary.suburb} is ready.
            </p>
            {selection.packageName && <p>Package: {selection.packageName}</p>}
            <div className="cn-enquiry-summary">
              <p>
                {summary.name} · {summary.phone}
              </p>
              {summary.email && <p>{summary.email}</p>}
              {summary.details && <p>{summary.details}</p>}
            </div>
            <p className="cn-enquiry-instruction">
              Open your email app to send these details to Cleaning Ninja. Your
              enquiry has not been sent yet.
            </p>
            <a className="cn-button" href={enquiryHref}>
              Send by email <ArrowUpRight size={18} />
            </a>
            <button className="cn-button" onClick={() => setDone(false)}>
              Edit my enquiry
              <ArrowUpRight size={18} />
            </button>
          </div>
        )}
        <form hidden={done} onSubmit={submit} aria-label="Get a Free Quote">
          <noscript>
            <p>
              Enable JavaScript to use the quote form, or use the email link.
            </p>
          </noscript>
          <div className="cn-form-heading">
            <h3>Get a Free Quote</h3>
            <span>No obligation.</span>
          </div>
          {selection.packageName && (
            <div className="cn-selected-offer">
              <span>
                Selected: <strong>{selection.packageName}</strong>
              </span>
              <button
                type="button"
                aria-label="Remove selected package"
                onClick={() => onSelection({ ...selection, packageName: "" })}
              >
                <X size={17} />
              </button>
            </div>
          )}
          <div className="cn-form-grid">
            <label htmlFor="cn-service">
              What needs a clean?
              <select
                id="cn-service"
                name="service"
                required
                value={selection.service}
                onChange={(event) =>
                  onSelection({ service: event.target.value, packageName: "" })
                }
              >
                <option value="">Select a service</option>
                {[
                  ...prototypeServices.map((item) => item.name),
                  ...additionalServices,
                ].map((service) => (
                  <option key={service}>{service}</option>
                ))}
              </select>
            </label>
            <label htmlFor="cn-suburb">
              Suburb or postcode
              <input
                id="cn-suburb"
                name="suburb"
                placeholder="e.g. New Farm, 4005"
                autoComplete="address-level2"
                minLength={2}
                maxLength={120}
                required
              />
            </label>
            <label htmlFor="cn-name">
              Your name
              <input
                id="cn-name"
                name="name"
                autoComplete="name"
                placeholder="Full name"
                minLength={2}
                maxLength={120}
                required
              />
            </label>
            <label htmlFor="cn-phone">
              Phone number
              <input
                id="cn-phone"
                name="phone"
                aria-label="Phone number"
                type="tel"
                autoComplete="tel"
                placeholder="0412 345 678"
                required
                aria-invalid={!!phoneError}
                aria-describedby={phoneError ? "cn-phone-error" : undefined}
              />
              {phoneError && (
                <span id="cn-phone-error" className="cn-field-error">
                  {phoneError}
                </span>
              )}
            </label>
            <label className="cn-field-wide" htmlFor="cn-email">
              Email <span>(optional)</span>
              <input
                id="cn-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
            <label className="cn-field-wide" htmlFor="cn-details">
              A few details <span>(optional)</span>
              <textarea
                id="cn-details"
                name="details"
                rows={3}
                maxLength={3000}
                placeholder="Number of rooms, lounge size, stains or preferred timing…"
              />
            </label>
          </div>
          <button className="cn-button" type="submit" disabled={!interactive}>
            Get my Free Quote
            <ArrowUpRight size={18} />
          </button>
          <p className="cn-form-privacy">
            Next, review your enquiry and send it by email.{" "}
            <a href="/legal/privacy">Privacy policy</a>.
          </p>
        </form>
      </div>
    </section>
  );
}
