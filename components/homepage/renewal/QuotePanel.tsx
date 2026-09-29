"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { services } from "./content";
import { Arrow } from "./Primitives";
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
        ?.querySelector<HTMLSelectElement>("select")
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
      <span className="rn-field-error" id={`rn-${name}-error`}>
        {errors[name]}
      </span>
    ) : null;
  }

  return (
    <section id="quote" className="rn-quote" aria-labelledby="rn-quote-title">
      <div className="rn-quote-intro">
        <h2 id="rn-quote-title">
          Get a
          <br />
          <em>Free Quote.</em>
        </h2>
        <p>
          Tell us about your cleaning needs. Share your details below to prepare
          a free quote enquiry.
        </p>
        <a className="rn-quote-contact" href={`mailto:${contactEmail}`}>
          {contactEmail} <Arrow />
        </a>
        <p className="rn-quote-aside">
          Your space. Your questions. Let’s talk.
        </p>
      </div>

      <div className="rn-quote-form-area">
        {reviewing && review && (
          <div
            className="rn-enquiry-review"
            ref={reviewRef}
            tabIndex={-1}
            aria-labelledby="rn-review-title"
          >
            <p className="rn-review-state" role="status">
              Ready for your review · Not sent yet
            </p>
            <h3 id="rn-review-title">One last look.</h3>
            <p>
              Here’s your enquiry, {review.name}. Open your email app when
              you’re ready, then send it to us from there.
            </p>
            <dl className="rn-review-details">
              <div>
                <dt>Service</dt>
                <dd>{reviewedServiceName}</dd>
              </div>
              {review.packageName && (
                <div>
                  <dt>Package</dt>
                  <dd>{review.packageName}</dd>
                </div>
              )}
              <div>
                <dt>Your name</dt>
                <dd>{review.name}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{review.phone}</dd>
              </div>
              <div>
                <dt>Suburb / postcode</dt>
                <dd>{review.suburb}</dd>
              </div>
              {review.email && (
                <div>
                  <dt>Email</dt>
                  <dd>{review.email}</dd>
                </div>
              )}
              {review.details && (
                <div>
                  <dt>A few details</dt>
                  <dd className="rn-review-message">{review.details}</dd>
                </div>
              )}
            </dl>
            <a className="rn-quote-submit" href={emailHref}>
              Send by email <Arrow />
            </a>
            <button
              type="button"
              className="rn-quote-edit"
              onClick={editEnquiry}
            >
              Edit my enquiry
            </button>
            <p className="rn-quote-fineprint">
              Nothing has been sent and no booking is confirmed. Your email app
              will open a draft addressed to {contactEmail}.
            </p>
          </div>
        )}

        <form
          ref={formRef}
          hidden={reviewing}
          onSubmit={submit}
          noValidate
          aria-label="Prepare a cleaning quote enquiry"
        >
          <div className="rn-form-heading">
            <h3>Your clean starts here.</h3>
            <p>All fields required unless marked optional.</p>
          </div>
          <noscript>
            <p className="rn-quote-fineprint">
              This form needs JavaScript. You can also email your enquiry to{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </noscript>
          {selection.packageName && (
            <div className="rn-selected-package">
              <span>
                Selected package<strong>{selection.packageName}</strong>
              </span>
              <button
                type="button"
                aria-label="Remove selected package"
                onClick={() => {
                  setReview(null);
                  onSelection({ ...selection, packageName: "" });
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
          )}
          <div className="rn-form-fields">
            <label className="rn-field rn-field-full" htmlFor="rn-service">
              What needs a clean?
              <select
                id="rn-service"
                name="service"
                value={selectedService?.id ?? ""}
                required
                aria-invalid={Boolean(errors.service)}
                aria-describedby={
                  errors.service ? "rn-service-error" : undefined
                }
                onChange={(event) => {
                  setReview(null);
                  onSelection({ service: event.target.value, packageName: "" });
                  setErrors((current) => ({ ...current, service: undefined }));
                }}
              >
                <option value="">Choose a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errorMessage("service")}
            </label>
            <label className="rn-field" htmlFor="rn-name">
              Your name
              <input
                id="rn-name"
                name="name"
                value={fields.name}
                onChange={(event) => updateField("name", event.target.value)}
                autoComplete="name"
                placeholder="Full name"
                maxLength={120}
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "rn-name-error" : undefined}
              />
              {errorMessage("name")}
            </label>
            <label className="rn-field" htmlFor="rn-phone">
              Phone number
              <input
                id="rn-phone"
                name="phone"
                type="tel"
                value={fields.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                autoComplete="tel"
                placeholder="0412 345 678"
                maxLength={25}
                required
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "rn-phone-error" : undefined}
              />
              {errorMessage("phone")}
            </label>
            <label className="rn-field" htmlFor="rn-suburb">
              Suburb or postcode
              <input
                id="rn-suburb"
                name="suburb"
                value={fields.suburb}
                onChange={(event) => updateField("suburb", event.target.value)}
                autoComplete="address-level2"
                placeholder="e.g. New Farm, 4005"
                maxLength={120}
                required
                aria-invalid={Boolean(errors.suburb)}
                aria-describedby={errors.suburb ? "rn-suburb-error" : undefined}
              />
              {errorMessage("suburb")}
            </label>
            <label className="rn-field" htmlFor="rn-email">
              <span>
                Email <span className="rn-optional">(optional)</span>
              </span>
              <input
                id="rn-email"
                name="email"
                type="email"
                value={fields.email}
                onChange={(event) => updateField("email", event.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "rn-email-error" : undefined}
              />
              {errorMessage("email")}
            </label>
            <label className="rn-field rn-field-full" htmlFor="rn-details">
              <span>
                A few details <span className="rn-optional">(optional)</span>
              </span>
              <textarea
                id="rn-details"
                name="details"
                value={fields.details}
                onChange={(event) => updateField("details", event.target.value)}
                rows={3}
                maxLength={3000}
                placeholder="Rooms, fabrics, problem spots or anything you’d like us to know…"
              />
            </label>
          </div>
          <button
            className="rn-quote-submit"
            type="submit"
            disabled={!interactive}
          >
            Review my enquiry <Arrow />
          </button>
          <p className="rn-quote-fineprint">
            Next, review your details and send them using your email app.{" "}
            <a href="/legal/privacy">Privacy policy</a>.
          </p>
        </form>
      </div>
    </section>
  );
}
