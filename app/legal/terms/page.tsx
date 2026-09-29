import type { Metadata } from "next";
import LegalPage from "@/components/homepage/prototype/LegalPage";
export const metadata: Metadata = {
  title: "Terms & Offer Conditions — Prototype Draft",
  description:
    "Draft terms and demonstration offer conditions for the Cleaning Ninja frontend prototype.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/legal/terms" },
};
export default function TermsPage() {
  return (
    <LegalPage
      title="Clear from the start."
      intro="These are prototype terms for design review. Live prices, offer rules and service terms need Cleaning Ninja’s approval before customers can rely on them."
    >
      <h2>Using this prototype</h2>
      <p>
        This website demonstrates a proposed Cleaning Ninja experience. The
        phone number 123456789 is a placeholder. The quote form does not send an
        enquiry, accept a payment or confirm a booking. Photographs and
        generated films are illustrative; they are not evidence of completed
        customer work.
      </p>
      <h2>Prices and special offers</h2>
      <p>
        The package prices, inclusions and “up to 30%” promotion are examples,
        not current offers. No comparison price or guaranteed saving is
        asserted. A live promotion must have approved reference prices,
        eligibility, validity dates and exclusions before publication.
      </p>
      <h2>Agreeing the scope</h2>
      <p>
        A service quote should identify the work, relevant dimensions or item
        quantities, material and condition, access requirements, additional
        charges and tax treatment. Extra rooms, stairs, oversized items or
        specialist treatments may require a separate assessment. Confirm the
        full scope before accepting a quote.
      </p>
      <h2>Quotes and bookings</h2>
      <p>
        A request for a free quote is not a booking. A requested date is not
        confirmed availability. Service arrangements, the final price and
        payment terms should be agreed separately with Cleaning Ninja before
        work begins.
      </p>
      <h2>Cleaning outcomes</h2>
      <p>
        Results and drying times vary with the material, condition, previous
        treatments, ventilation and weather. This prototype does not guarantee
        complete stain removal, a fixed drying time or a bond refund. Raise
        delicate materials and problem areas when discussing the quote.
      </p>
      <h2>Changes or cancellations</h2>
      <p>
        Contact Cleaning Ninja to discuss changes to an agreed service. Any
        cancellation, rescheduling, access or payment conditions should be
        supplied before the booking is confirmed. This draft does not introduce
        a cancellation fee.
      </p>
      <h2>Consumer rights and questions</h2>
      <p>
        Nothing in this draft is intended to exclude rights that cannot lawfully
        be excluded under Australian consumer law. Questions about a quote or
        proposed service can be sent to{" "}
        <a href="mailto:contact@cleaningninja.co">contact@cleaningninja.co</a>.
      </p>
    </LegalPage>
  );
}
