import type { Metadata } from "next";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import Homepage from "@/components/homepage/restore/Restore";

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
const description =
  "Order, restored. Carpet, upholstery, rug, leather, tile and commercial cleaning, with selected packages and a free personalised quote.";
export const metadata: Metadata = {
  title: { absolute: "Cleaning Ninja — Carpet & Upholstery Cleaning" },
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cleaning Ninja — Carpet & Upholstery Cleaning",
    description,
    url: "/",
    images: [
      {
        url: "/og-logo-card-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Cleaning Ninja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleaning Ninja — Carpet & Upholstery Cleaning",
    description,
    images: ["/og-logo-card-1200x630.png"],
  },
};
export default function HomePage() {
  return (
    <div className={`${sans.variable} ${serif.variable}`}>
      <Homepage />
    </div>
  );
}
