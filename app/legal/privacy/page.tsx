import type { Metadata } from "next";
import LegalPage from "@/components/homepage/renewal/LegalPage";
export const metadata: Metadata = {
  title: "Privacy — Cleaning Ninja",
  description: "Information about preparing and sending a cleaning enquiry.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/legal/privacy" },
};
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Your privacy matters."
      intro="A clear explanation of the information you share when you ask Cleaning Ninja for a quote."
    >
      <h2>Preparing your enquiry</h2>
      <p>
        The form helps you prepare an email with your service, name, phone
        number and suburb or postcode. You can also include your email address
        and details about the clean. These details stay in the page while you
        review them; completing the form does not send them to Cleaning Ninja.
      </p>
      <h2>Sending by email</h2>
      <p>
        Choosing “Send by email” opens your email app with your enquiry filled
        in. You can review or change it before sending. Your email provider
        handles that message under its own privacy practices. Cleaning Ninja
        receives the details when you send the email to{" "}
        <a href="mailto:contact@cleaningninja.co">contact@cleaningninja.co</a>.
      </p>
      <h2>Share what is needed</h2>
      <p>
        Describe the surfaces, rooms and access details relevant to the quote.
        Please leave out identity documents, financial information, health
        information or other sensitive details that are not needed to discuss
        the clean.
      </p>
      <h2>Questions about your information</h2>
      <p>
        To ask how information you have sent is handled, request access or a
        correction, or raise a privacy concern, email{" "}
        <a href="mailto:contact@cleaningninja.co">contact@cleaningninja.co</a>.
        Include a suitable way for us to reply.
      </p>
      <h2>More information</h2>
      <p>
        For information about privacy rights in Australia, visit the{" "}
        <a href="https://www.oaic.gov.au/privacy/your-privacy-rights/your-personal-information/what-is-a-privacy-policy">
          Office of the Australian Information Commissioner
        </a>
        .
      </p>
    </LegalPage>
  );
}
