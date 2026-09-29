/**
 * Source reference: https://blueskycarpetcleaning.com.au/
 * Services and commercial detail checked on 29 September 2026.
 * The owner expressly requested adopting this service and offer scope.
 * Copy is original; imagery is editorial brand imagery, not customer-job proof.
 * The live main-domain offer is up to 30% off; no dollar prices were published.
 * Do not import competitor contact details, reviews, credentials or guarantees.
 */

export type Service = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  includes: string[];
  image: string;
  imageAlt: string;
  group: "fabrics" | "surfaces" | "spaces";
};

export type Offer = {
  id: string;
  title: string;
  service: string;
  description: string;
  includes: string[];
  terms: string;
};

export type Faq = {
  question: string;
  answer: string;
};

const images = {
  hero: "/homepage/renewal/hero.webp",
  detail: "/homepage/renewal/detail.webp",
  care: "/homepage/renewal/care.webp",
  stone: "/homepage/renewal/stone.webp",
  leather: "/homepage/renewal/leather.webp",
};

export const services: Service[] = [
  {
    id: "carpet-cleaning",
    name: "Carpet cleaning",
    shortName: "Carpets",
    description:
      "The comfort beneath your feet, brought back into focus. A considered deep clean for everyday rooms and well-loved floors.",
    includes: [
      "Fibre and condition assessment",
      "Targeted stain treatment",
      "Steam cleaning or a suitable alternative",
      "Deodorising",
    ],
    image: images.detail,
    imageAlt: "Close detail of woven upholstery beside a textured cream rug",
    group: "fabrics",
  },
  {
    id: "upholstery-cleaning",
    name: "Upholstery & curtain cleaning",
    shortName: "Upholstery",
    description:
      "A fresh chapter for your favourite furniture. Sofas, chairs and curtains receive care chosen around their fabric and finish.",
    includes: [
      "Fabric assessment",
      "Sofa, chair and curtain care",
      "Individual spot treatments",
      "Extraction and deodorising",
    ],
    image: images.detail,
    imageAlt:
      "Close detail of beige woven upholstery beside a textured cream rug",
    group: "fabrics",
  },
  {
    id: "rugs-cleaning",
    name: "Rug cleaning",
    shortName: "Rugs",
    description:
      "From the everyday rug to the piece you will always keep. We start with the fibres, then choose the treatment.",
    includes: [
      "Rug and fibre inspection",
      "Thorough pre-vacuuming",
      "Cleaning for wool and woven rugs",
      "Delicate-fibre treatment where suitable",
    ],
    image: images.detail,
    imageAlt: "The tactile pile of a cream rug alongside a softly curved sofa",
    group: "fabrics",
  },
  {
    id: "mattress-cleaning",
    name: "Mattress cleaning",
    shortName: "Mattresses",
    description:
      "Refresh the place you rest. Detailed cleaning for mattresses at home, in guest rooms and across accommodation spaces.",
    includes: [
      "Material and condition check",
      "Vacuum extraction",
      "Suitable steam treatment",
      "Residential and commercial mattress care",
    ],
    image: images.care,
    imageAlt:
      "An upholstery extraction tool carefully drawn across a beige sofa",
    group: "fabrics",
  },
  {
    id: "leather-cleaning",
    name: "Leather cleaning",
    shortName: "Leather",
    description:
      "Preserve the character of leather you love. Cleaning, conditioning and protection, considered together.",
    includes: [
      "Leather type and condition check",
      "Leather shampoo",
      "Conditioning",
      "Protective treatment",
    ],
    image: images.leather,
    imageAlt: "A cognac leather armchair beside a pale stone table",
    group: "fabrics",
  },
  {
    id: "commercial-cleaning",
    name: "Commercial cleaning",
    shortName: "Workspaces",
    description:
      "Make space for a better working day. A cleaning plan shaped around your premises, surfaces and working rhythm.",
    includes: [
      "A plan for your premises",
      "Commercial carpet and upholstery care",
      "Stain treatment and extraction",
      "Offices, retail and hospitality spaces",
    ],
    image: images.hero,
    imageAlt:
      "An inviting interior with natural materials and generous daylight",
    group: "spaces",
  },
  {
    id: "end-of-lease-cleaning",
    name: "End-of-lease cleaning",
    shortName: "Moving home",
    description:
      "Leave your next chapter feeling lighter. A detailed clean for move-outs, move-ins and property handovers.",
    includes: [
      "Property and scope assessment",
      "Checklist-led deep cleaning",
      "Carpet cleaning",
      "Stain treatment",
    ],
    image: images.hero,
    imageAlt: "A sunlit living space with a cream sofa and pale stone table",
    group: "spaces",
  },
  {
    id: "stain-and-odour-removal",
    name: "Stain & odour removal",
    shortName: "Stains & odours",
    description:
      "For the marks and smells that linger. A focused treatment, guided by the surface and the source.",
    includes: [
      "Stain and odour assessment",
      "Food, drink and pet-accident treatment",
      "Material-specific spot care",
      "Deeper odour investigation where needed",
    ],
    image: images.care,
    imageAlt:
      "An upholstery extraction tool carefully drawn across a beige sofa",
    group: "surfaces",
  },
  {
    id: "tile-cleaning",
    name: "Tile & grout cleaning",
    shortName: "Tiles & stone",
    description:
      "Rediscover the detail beneath everyday wear. Deep care for tiles, grout, stone and the surfaces beyond your door.",
    includes: [
      "Tile and grout cleaning",
      "Stripping, sealing and regrouting",
      "Tile repair and stone polishing",
      "Patio, path and driveway pressure cleaning",
    ],
    image: images.stone,
    imageAlt: "Sunlight across pale stone bathroom tiles and fine grout lines",
    group: "surfaces",
  },
  {
    id: "pest-control",
    name: "Pest control",
    shortName: "Pest care",
    description:
      "A considered response to unwelcome visitors. Inspection-led treatment for homes and business premises.",
    includes: [
      "Premises inspection",
      "Pest identification",
      "Treatment matched to the pest",
      "Domestic and commercial enquiries",
    ],
    image: images.hero,
    imageAlt: "A calm living room opening onto a leafy garden",
    group: "spaces",
  },
  {
    id: "car-seats-cleaning",
    name: "Car seat cleaning",
    shortName: "Car interiors",
    description:
      "A fresher feeling for every journey. Detailed care for fabric and leather seats, mats and interior upholstery.",
    includes: [
      "Fabric or leather assessment",
      "Thorough vacuuming",
      "Suitable upholstery cleaning",
      "Steam treatment and deodorising where appropriate",
    ],
    image: images.leather,
    imageAlt: "A cognac leather armchair beside a pale stone table",
    group: "spaces",
  },
];

// Source: https://blueskycarpetcleaning.com.au/specials/
// Terms: https://blueskycarpetcleaning.com.au/terms-and-conditions/
// No baseline price, offer expiry or minimum-charge amount is published.
const offerExclusions =
  "Up to 30% off. Offers cannot be combined with other offers or discounts and do not apply to minimum charges. Final pricing depends on the size, condition and agreed scope.";

const carpetInclusions = [
  "Shampoo pre-treatment",
  "Stain treatment",
  "Heavy-duty steam cleaning",
  "Deodorising",
];

export const offers: Offer[] = [
  {
    id: "three-bedroom-carpet",
    title: "3 bedrooms",
    service: "carpet-cleaning",
    description: "A fresh start underfoot, room by room.",
    includes: [...carpetInclusions],
    terms: `${offerExclusions} Bedroom quotes assume average sizes of 12–14 m²; larger rooms may require a revised quote.`,
  },
  {
    id: "five-bedroom-carpet",
    title: "5 bedrooms",
    service: "carpet-cleaning",
    description: "Bring a little more lightness to every bedroom.",
    includes: [...carpetInclusions],
    terms: `${offerExclusions} Bedroom quotes assume average sizes of 12–14 m²; larger rooms may require a revised quote.`,
  },
  {
    id: "three-rugs",
    title: "3 rugs",
    service: "rugs-cleaning",
    description: "Considered care for the pieces that bring a room together.",
    includes: [...carpetInclusions],
    terms: `${offerExclusions} Rugs larger than 12 m² may require a revised quote. Treatment is assessed for the rug material.`,
  },
  {
    id: "five-seat-fabric-lounge",
    title: "5-seat fabric lounge",
    service: "upholstery-cleaning",
    description: "Your favourite place to land, ready for its next chapter.",
    includes: [...carpetInclusions],
    terms: `${offerExclusions} The fabric and lounge condition are assessed before the treatment is agreed.`,
  },
  {
    id: "five-seat-leather-lounge",
    title: "5-seat leather lounge",
    service: "leather-cleaning",
    description: "Three layers of care for leather worth keeping.",
    includes: ["Leather shampoo", "Conditioning", "Protective treatment"],
    terms: `${offerExclusions} Treatment depends on the type and condition of the leather.`,
  },
];

export const faqs: Faq[] = [
  {
    question: "How is my clean priced?",
    answer:
      "Tell us what needs attention, where you are and anything useful about its condition. Your quote is based on size, material and the work required. Larger areas or a change in the described condition or scope may mean a revised quote.",
  },
  {
    question: "What does the package offer include?",
    answer:
      "Selected carpet, rug and fabric-lounge packages include shampoo pre-treatment, stain treatment, heavy-duty steam cleaning and deodorising. Leather-lounge care includes shampoo, conditioner and protection. Savings are up to 30%; offers cannot be combined and do not apply to minimum charges.",
  },
  {
    question: "Do room and rug sizes affect the quote?",
    answer:
      "Yes. The package reference uses average bedrooms of 12–14 m², living rooms of 16–18 m², hallways of 4 m² and rugs up to 12 m². Larger areas, or kitchens and bathrooms above average size, may need a revised quote. Include approximate dimensions in your enquiry if you have them.",
  },
  {
    question: "How long will carpets and upholstery take to dry?",
    answer:
      "Drying varies with the material, cleaning method, airflow and conditions in the room. Ask for an estimate when your treatment is assessed, and follow the care advice for your particular surface before using it again.",
  },
  {
    question: "Can every stain or odour be removed?",
    answer:
      "Results depend on the material, the cause and how deeply a stain or odour has settled. Share what happened, when it happened and any products already used. That helps us assess the right approach and explain what may be achievable.",
  },
  {
    question: "Does requesting a quote confirm my booking?",
    answer:
      "A quote enquiry starts the conversation. Your requested date is a preference; the service, final price and appointment still need to be confirmed with you. You can include several services or a selected package in the same enquiry.",
  },
];
