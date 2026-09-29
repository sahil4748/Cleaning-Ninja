"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { prototypeFaq } from "@/content/homepage-prototype";

type Selection = { service: string; packageName: string };

const steps = [
  {
    title: "Tell us about your space.",
    text: "A favourite sofa. The whole home. A fresh start between guests. Choose what needs attention and share a few details.",
    note: "Your space, in your words",
  },
  {
    title: "A little clarity, up front.",
    text: "Discuss the surfaces, scope and price before you decide. Include any access needs, problem areas or extras in your enquiry.",
    note: "A quote shaped around you",
  },
  {
    title: "Make room for the good stuff.",
    text: "Request a preferred date and arrange the details of your clean. Timing and availability are confirmed with your enquiry.",
    note: "A fresh start to look forward to",
  },
];

export default function Supporting({
  onSelect,
}: {
  onSelect: (value: Selection) => void;
}) {
  const [area, setArea] = useState("");
  const [areaError, setAreaError] = useState("");
  const [areaStatus, setAreaStatus] = useState("");
  const areaInput = useRef<HTMLInputElement>(null);

  function enquireAboutArea(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const suburb = area.trim();
    if (!suburb) {
      setAreaError("Enter your suburb or postcode to continue.");
      setAreaStatus("");
      areaInput.current?.focus();
      return;
    }
    setAreaError("");
    setAreaStatus(
      `Add your cleaning details below. Coverage for ${suburb} will be checked with your enquiry.`,
    );
    window.dispatchEvent(
      new CustomEvent("at:coverage", { detail: { suburb } }),
    );
    onSelect({ service: "", packageName: "" });
  }

  return (
    <>
      <section
        id="commercial"
        className="at-support-commercial"
        aria-labelledby="at-commercial-title"
      >
        <div className="at-support-commercial-image">
          <Image
            src="/homepage/atelier/service-commercial.webp"
            alt="A sunlit reception space with warm timber, soft carpet and olive seating"
            fill
            sizes="(max-width: 760px) 100vw, 55vw"
            className="at-support-commercial-photo"
          />
          <span className="at-support-image-caption">
            Good spaces make a difference.
          </span>
        </div>
        <div className="at-support-commercial-copy">
          <p className="at-support-eyebrow">For the working day</p>
          <h2 id="at-commercial-title">
            A space that
            <br />
            means <em>business.</em>
          </h2>
          <p className="at-support-intro">
            From the first hello to the last meeting. Bring your commercial
            cleaning needs into one considered conversation.
          </p>
          <ul className="at-support-commercial-list">
            <li>
              <span>01</span> Offices &amp; shared spaces
            </li>
            <li>
              <span>02</span> Retail &amp; reception areas
            </li>
            <li>
              <span>03</span> Carpets &amp; upholstered seating
            </li>
          </ul>
          <button
            type="button"
            className="at-support-link"
            onClick={() =>
              onSelect({ service: "Commercial cleaning", packageName: "" })
            }
          >
            Let’s talk about your workspace{" "}
            <ArrowUpRight aria-hidden="true" size={21} strokeWidth={1.5} />
          </button>
        </div>
      </section>

      <section
        id="how-it-works"
        className="at-support-process"
        aria-labelledby="at-process-title"
      >
        <div className="at-support-process-heading">
          <div>
            <p className="at-support-eyebrow">A simple way to start</p>
            <h2 id="at-process-title">
              Less organising.
              <br />
              <em>More living.</em>
            </h2>
          </div>
          <button
            className="at-support-link"
            type="button"
            onClick={() => onSelect({ service: "", packageName: "" })}
          >
            Start your enquiry{" "}
            <ArrowUpRight aria-hidden="true" size={21} strokeWidth={1.5} />
          </button>
        </div>
        <ol className="at-support-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="at-support-step-number" aria-hidden="true">
                0{index + 1}
              </span>
              <div className="at-support-step-copy">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className="at-support-step-note">{step.note}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="coverage"
        className="at-support-coverage"
        aria-labelledby="at-coverage-title"
      >
        <div className="at-support-coverage-copy">
          <p className="at-support-eyebrow">Brisbane &amp; beyond</p>
          <h2 id="at-coverage-title">
            Closer to
            <br />
            <em>your kind of clean.</em>
          </h2>
          <p>
            Enquiries across major Australian cities. Share your suburb and
            let’s see how we can help.
          </p>
        </div>
        <form
          className="at-support-area-form"
          onSubmit={enquireAboutArea}
          noValidate
          aria-label="Enquire about service coverage"
        >
          <label htmlFor="at-coverage-area">Where can we help?</label>
          <div className="at-support-area-field">
            <input
              id="at-coverage-area"
              name="area"
              ref={areaInput}
              value={area}
              onChange={(event) => {
                setArea(event.target.value);
                setAreaError("");
                setAreaStatus("");
              }}
              placeholder="Your suburb or postcode"
              autoComplete="address-level2"
              maxLength={120}
              required
              aria-invalid={Boolean(areaError)}
              aria-describedby={
                areaError ? "at-coverage-error" : "at-coverage-help"
              }
            />
            <button
              type="submit"
              aria-label="Enquire about cleaning in my area"
            >
              <ArrowRight aria-hidden="true" size={24} strokeWidth={1.5} />
            </button>
          </div>
          <p id="at-coverage-help">
            We’ll check your location when we discuss your enquiry.
          </p>
          {areaError && (
            <p
              id="at-coverage-error"
              className="at-support-area-error"
              role="alert"
            >
              {areaError}
            </p>
          )}
          <p className="at-support-area-status" role="status">
            {areaStatus}
          </p>
        </form>
      </section>

      <section
        id="faq"
        className="at-support-faq"
        aria-labelledby="at-faq-title"
      >
        <div className="at-support-faq-intro">
          <p className="at-support-eyebrow">Before we get started</p>
          <h2 id="at-faq-title">
            The finer
            <br />
            <em>details.</em>
          </h2>
          <p>Something else on your mind?</p>
          <a href="mailto:contact@cleaningninja.co" className="at-support-link">
            Ask us a question{" "}
            <ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.5} />
          </a>
        </div>
        <div className="at-support-faq-list">
          {prototypeFaq.map(([question, answer], index) => (
            <details key={question}>
              <summary>
                <span className="at-support-faq-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <span>{question}</span>
                <span className="at-support-faq-toggle" aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
