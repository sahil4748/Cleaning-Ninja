import type { Metadata } from "next";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import CarpetPage from "@/components/services/carpet/CarpetPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_CONFIG, SITE_URL } from "@/lib/site-config";

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--renewal-sans",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--renewal-serif",
  display: "swap",
});

const path = "/services/carpet-cleaning";
const title = "Carpet Cleaning | Cleaning Ninja";
const description =
  "Explore professional carpet cleaning, our cleaning process and the benefits of fresh carpets. Request a free personalised quote from Cleaning Ninja.";
const image = {
  url: "/media/carpet-cleaning/poster.webp",
  width: 1920,
  height: 1080,
  alt: "Professional carpet cleaning in progress",
};

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  robots: { index: SITE_CONFIG.indexable, follow: SITE_CONFIG.indexable },
  openGraph: {
    title,
    description,
    url: path,
    type: "website",
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image.url],
  },
};

export default function CarpetCleaningPage() {
  return (
    <div className={`${sans.variable} ${serif.variable}`}>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Carpet Cleaning",
            description,
            url: `${SITE_URL}${path}`,
            provider: { "@id": `${SITE_URL}#organization` },
          },
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Carpet Cleaning", href: path },
          ]),
        ]}
      />
      <CarpetPage />
    </div>
  );
}
