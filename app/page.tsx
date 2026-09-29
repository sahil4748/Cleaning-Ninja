import type { Metadata } from "next";
import { Outfit, Manrope } from "next/font/google";
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
const description =
  "Explore carpet, rug, upholstery and commercial cleaning. Choose a package and request a free quote. Cleaning Ninja frontend prototype.";
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
        alt: "Illustrative home interior",
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
    <div className={`${serif.variable} ${sans.variable}`}>
      <Homepage />
    </div>
  );
}
