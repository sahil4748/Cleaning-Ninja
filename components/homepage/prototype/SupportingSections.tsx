import Image from "next/image";
import { ArrowUpRight, ArrowRight, Check, MapPin } from "lucide-react";
import { prototypeContact, prototypeFaq } from "@/content/homepage-prototype";
import type { QuoteSelection } from "./Offers";
export default function SupportingSections({
  onSelect,
}: {
  onSelect: (value: QuoteSelection) => void;
}) {
  return (
    <>
      <section
        id="commercial"
        className="cn-commercial"
        aria-labelledby="commercial-title"
      >
        <div className="cn-commercial-image">
          <Image
            src="/homepage/prototype/commercial.webp"
            alt="A light-filled commercial workspace"
            fill
            sizes="(max-width:767px) 100vw, 50vw"
          />
        </div>
        <div className="cn-commercial-copy">
          <p className="cn-label">For the spaces you work in</p>
          <h2 id="commercial-title">
            A better first
            <br />
            <em>impression.</em>
          </h2>
          <p>
            Clean carpets. Welcoming reception areas. Workspaces ready for the
            day. Bring your commercial cleaning needs into one conversation.
          </p>
          <div className="cn-commercial-types">
            <span>
              <Check size={16} />
              Offices & shared spaces
            </span>
            <span>
              <Check size={16} />
              Retail & reception areas
            </span>
            <span>
              <Check size={16} />
              Carpets & upholstered seating
            </span>
          </div>
          <button
            className="cn-button cn-button-lime"
            onClick={() =>
              onSelect({ service: "Commercial cleaning", packageName: "" })
            }
          >
            Get a commercial quote
            <ArrowUpRight size={18} />
          </button>
          <span className="cn-commercial-note">
            Tell us your premises, floor area and preferred timing.
          </span>
        </div>
      </section>
      <section id="how-it-works" className="cn-section cn-approach">
        <div className="cn-section-heading cn-reveal">
          <div>
            <p className="cn-label">Less organising. More living.</p>
            <h2>
              A clean home.
              <br />
              <em>A simple process.</em>
            </h2>
          </div>
          <a className="cn-text-link" href="#quote">
            Let’s get started
            <ArrowUpRight size={18} />
          </a>
        </div>
        <ol className="cn-steps">
          {[
            [
              "Tell us what needs a clean",
              "Choose a service or package and share a few details about your space.",
            ],
            [
              "Get your free quote",
              "Discuss the scope, price and any extras before you decide to go ahead.",
            ],
            [
              "Make room for the good stuff",
              "Agree a suitable time and prepare for your clean. We’ll talk through the details.",
            ],
          ].map(([title, text], index) => (
            <li key={title} className="cn-reveal">
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section id="coverage" className="cn-coverage">
        <MapPin size={25} strokeWidth={1.5} />
        <div>
          <h2>Your suburb. Your fresh start.</h2>
          <p>
            Brisbane and enquiries across major Australian cities. Share your
            postcode to check coverage.
          </p>
        </div>
        <a href="#quote">
          Check my area
          <ArrowRight size={18} />
        </a>
      </section>
      <section id="faq" className="cn-section cn-faq">
        <div>
          <p className="cn-label">Before we get started</p>
          <h2>
            A little
            <br />
            <em>clarity.</em>
          </h2>
          <p>
            Something else on your mind?
            <br />
            <a href={prototypeContact.href}>
              Call {prototypeContact.phone}
              <ArrowUpRight size={15} />
            </a>
          </p>
        </div>
        <div className="cn-faq-list">
          {prototypeFaq.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
