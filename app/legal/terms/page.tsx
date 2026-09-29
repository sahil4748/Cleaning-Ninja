import type { Metadata } from "next";
import LegalPage from "@/components/homepage/prototype/LegalPage";
export const metadata: Metadata = {
  title: "Quotes & Offer Conditions — Cleaning Ninja",
  description:
    "What to consider when choosing a cleaning package and requesting a quote.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/legal/terms" },
};
export default function TermsPage() {
  return (
    <LegalPage
      title="Clear from the start."
      intro="Choose your clean, confirm the details, then decide what works for you."
    >
      <h2>Prices and package offers</h2>
      <p>
        Displayed prices are starting prices in Australian dollars. The final
        quote depends on room or item sizes, material, condition, access and the
        work required. Ask Cleaning Ninja to confirm the applicable package
        offer, inclusions, any extras and the total price before proceeding.
      </p>
      <h2>Agreeing the scope</h2>
      <p>
        Tell us the number of rooms or items, their approximate sizes, the
        surfaces to be cleaned and any problem areas. Hallways, stairs,
        oversized items and specialist treatments may need a separate
        assessment. Confirm the full scope in your quote.
      </p>
      <h2>Enquiries and bookings</h2>
      <p>
        Preparing or sending an enquiry does not confirm a booking. A requested
        date is not confirmed availability. Agree the service arrangements,
        final price and payment terms with Cleaning Ninja before work begins.
      </p>
      <h2>Cleaning outcomes</h2>
      <p>
        Results and drying times vary with material, condition, previous
        treatments, ventilation and weather. Ask about delicate fabrics,
        existing damage and stains so expectations can be discussed before the
        clean.
      </p>
      <h2>Changes to your plans</h2>
      <p>
        Contact Cleaning Ninja to discuss changes to an agreed service. Ask for
        the cancellation, rescheduling, access and payment conditions that apply
        before confirming a booking.
      </p>
      <h2>Questions</h2>
      <p>
        For questions about a package, quote or service, email{" "}
        <a href="mailto:contact@cleaningninja.co">contact@cleaningninja.co</a>.
        Nothing on this page limits rights that cannot lawfully be excluded.
      </p>
    </LegalPage>
  );
}
