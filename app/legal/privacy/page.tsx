import type { Metadata } from "next";
import LegalPage from "@/components/homepage/prototype/LegalPage";
export const metadata: Metadata = {
  title: "Privacy Policy — Prototype Draft",
  description:
    "Information about the Cleaning Ninja frontend prototype and its draft privacy approach.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/legal/privacy" },
};
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Your privacy matters."
      intro="This original draft explains the current prototype and the information a Cleaning Ninja enquiry may involve. It needs a business-practices review before the live website launches."
    >
      <h2>This prototype</h2>
      <p>
        The quote form on this homepage is a demonstration. It validates your
        entries and shows an on-screen summary. It does not send those entries
        to Cleaning Ninja, create a booking or store them in a customer
        database. Use example details while reviewing it. Refreshing or leaving
        the page clears its in-page form state.
      </p>
      <h2>Information in an enquiry</h2>
      <p>
        A working enquiry service may need your name, phone number, email
        address, suburb or property address, the cleaning service requested and
        details about the space. Please avoid entering sensitive personal
        information that is not needed to discuss the clean.
      </p>
      <h2>Contacting us directly</h2>
      <p>
        If you choose to email{" "}
        <a href="mailto:contact@cleaningninja.co">contact@cleaningninja.co</a>,
        your email is handled outside this demonstration form. It may include
        the information you choose to provide so Cleaning Ninja can respond to
        your enquiry.
      </p>
      <h2>Before the live service launches</h2>
      <p>
        The final policy must identify how enquiries are collected and used, the
        providers that receive them, storage locations and any overseas
        handling, retention periods, security practices and relevant analytics
        or cookies. Those operational details are not represented as verified in
        this draft.
      </p>
      <h2>Questions, access and corrections</h2>
      <p>
        Contact{" "}
        <a href="mailto:contact@cleaningninja.co">contact@cleaningninja.co</a>{" "}
        to ask about information you have sent directly, request a correction or
        raise a privacy concern. Explain your concern and a suitable way to
        reply. Do not send identity documents unless they are specifically
        needed and a safe process has been agreed.
      </p>
      <h2>More information</h2>
      <p>
        The{" "}
        <a href="https://www.oaic.gov.au/privacy/your-privacy-rights/your-personal-information/what-is-a-privacy-policy">
          Office of the Australian Information Commissioner
        </a>{" "}
        explains privacy policies and privacy rights in Australia. This draft
        does not claim that every operational or legal requirement has been
        verified.
      </p>
    </LegalPage>
  );
}
