import type { Metadata } from "next";
import LegalPage from "@/components/homepage/renewal/LegalPage";
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
      <h2>Packages and personal quotes</h2>
      <p>
        Your quote is tailored to your space. The final price depends on room or
        item sizes, material, condition, access and the work required. Ask
        Cleaning Ninja to confirm the applicable package offer, inclusions, any
        extras and the total price before proceeding.
      </p>
      <h2>Selected package offers</h2>
      <p>
        Selected packages offer up to 30% off: three or five bedrooms of carpet,
        three rugs, a five-seat fabric lounge or a five-seat leather lounge.
        Offers cannot be combined with other offers or discounts and do not
        apply to minimum charges. Ask us to confirm the applicable saving and
        final price in your quote.
      </p>
      <p>
        Carpet, rug and fabric-lounge packages include shampoo pre-treatment,
        stain treatment, heavy-duty steam cleaning and deodorising. The leather
        package includes shampoo, conditioning and protective treatment, subject
        to the type and condition of the leather.
      </p>
      <h2>Room and item sizes</h2>
      <p>
        Package quoting assumes average bedrooms of 12–14 m², living rooms of
        16–18 m², hallways of 4 m² and rugs up to 12 m². Larger areas, unusual
        materials or a change in condition or scope may require a revised quote.
        Share approximate sizes and any problem areas when enquiring.
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
