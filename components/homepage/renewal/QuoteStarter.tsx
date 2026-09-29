"use client";

import { useEffect, useState, type FormEvent } from "react";
import { services } from "./content";
import { Arrow } from "./Primitives";

export default function QuoteStarter({
  onStart,
}: {
  onStart: (service: string, suburb: string) => void;
}) {
  const [service, setService] = useState("");
  const [suburb, setSuburb] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (ready) onStart(service, suburb.trim());
  }

  return (
    <aside
      className="rn-quote-starter"
      id="quote-start"
      aria-labelledby="quote-start-title"
    >
      <div className="rn-starter-top">
        <span>YOUR SPACE. OUR CARE.</span>
        <span>01 / 02</span>
      </div>
      <h2 id="quote-start-title">
        Get a <em>Free Quote.</em>
      </h2>
      <p>
        Fresh carpets, softer sofas, a cleaner home. Tell us where to start.
      </p>
      <form onSubmit={submit} aria-label="Start your free quote">
        <label htmlFor="rn-start-service">What would you like cleaned?</label>
        <select
          id="rn-start-service"
          name="start-service"
          value={service}
          onChange={(event) => setService(event.target.value)}
          required
        >
          <option value="">Choose your service</option>
          {services.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <label htmlFor="rn-start-suburb">Your suburb or postcode</label>
        <input
          id="rn-start-suburb"
          name="start-suburb"
          value={suburb}
          onChange={(event) => setSuburb(event.target.value)}
          autoComplete="address-level2"
          placeholder="Where is your space?"
          minLength={2}
          maxLength={120}
          required
        />
        <button type="submit" disabled={!ready}>
          Get a Free Quote <Arrow />
        </button>
        <p className="rn-starter-next">Next: add your contact details.</p>
        <noscript>
          <a href="mailto:contact@cleaningninja.co">
            Email us for a free quote <Arrow />
          </a>
        </noscript>
      </form>
      <a className="rn-starter-offer" href="#packages">
        <span>
          Make the most of your clean.
          <strong>Up to 30% off selected packages</strong>
        </span>
        <Arrow />
      </a>
    </aside>
  );
}
