import type { Metadata } from "next";
import { Outfit, Manrope, Instrument_Serif } from "next/font/google";
import Homepage from "@/components/homepage/Homepage";

const serif = Outfit({
  subsets: ["latin"],
  variable: "--home-serif",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--home-sans",
  display: "swap",
});
const editorial = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--home-editorial",
  display: "swap",
});
const description =
  "Carpet, rug, upholstery and commercial cleaning. Find your cleaning package and get a free, no-obligation quote from Cleaning Ninja.";
export const metadata: Metadata = {
  title: { absolute: "Cleaning Ninja — Carpet Cleaning & Free Quotes" },
  icons: { icon: "/homepage/prototype/ninja-mark.svg" },
  robots: { index: false, follow: false },
  description,
  keywords: ["Cleaning Ninja", "cleaning services Australia"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cleaning Ninja — Carpet Cleaning & Free Quotes",
    description,
    url: "/",
    images: [
      {
        url: "/homepage/hero-desktop.jpg",
        width: 1920,
        height: 1264,
        alt: "A warm, sunlit living room",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleaning Ninja",
    description,
    images: ["/homepage/hero-desktop.jpg"],
  },
};
export default function HomePage() {
  return (
    <div className={`${serif.variable} ${sans.variable} ${editorial.variable}`}>
      <Homepage />
    </div>
  );
}
