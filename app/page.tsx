import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import Homepage from "@/components/homepage/renewal/Homepage";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--renewal-sans",
  display: "swap",
});
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--renewal-serif",
  display: "swap",
});
const description =
  "A fresh feeling for your home. Carpet, upholstery, rug, leather, tile and commercial cleaning, with selected packages and a free personalised quote.";
export const metadata: Metadata = {
  title: { absolute: "Cleaning Ninja — Carpet & Upholstery Cleaning" },
  description,
  icons: { icon: "/homepage/renewal/ninja-mark.svg" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cleaning Ninja — Carpet & Upholstery Cleaning",
    description,
    url: "/",
    images: [
      {
        url: "/homepage/renewal/cleaning-hero.webp",
        width: 2400,
        height: 1357,
        alt: "Carpet extraction in a sunlit olive and beige living room",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleaning Ninja — Carpet & Upholstery Cleaning",
    description,
    images: ["/homepage/renewal/cleaning-hero.webp"],
  },
};
export default function HomePage() {
  return (
    <div className={`${sans.variable} ${serif.variable}`}>
      <Homepage />
    </div>
  );
}
