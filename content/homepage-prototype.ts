import { MEDIA } from "./media";

/** Owner-authorised presentation examples; never feed these prices into booking or schema. */
export const prototypeContact = {
  phone: "123456789",
  href: "tel:123456789",
  email: "contact@cleaningninja.co",
};
export const prototypeOffers = [
  {
    id: "3-bedroom-carpet",
    name: "3 rooms. One fresh start.",
    label: "3-bedroom carpet clean",
    service: "Carpet cleaning",
    price: 149,
    image: MEDIA.images.package1,
    includes: [
      "Three carpeted bedrooms",
      "Pre-treatment & steam cleaning",
      "Spot treatment & deodorising",
    ],
    note: "Room sizes, access and carpet condition affect the final quote.",
  },
  {
    id: "5-bedroom-carpet",
    name: "A whole-home refresh.",
    label: "5-bedroom carpet clean",
    service: "Carpet cleaning",
    price: 229,
    image: MEDIA.images.package2,
    includes: [
      "Five carpeted bedrooms",
      "Pre-treatment & steam cleaning",
      "Spot treatment & deodorising",
    ],
    note: "Hallways, stairs and oversized rooms are quoted separately.",
  },
  {
    id: "3-rugs",
    name: "Bring your rugs back into focus.",
    label: "3-rug cleaning package",
    service: "Rug cleaning",
    price: 129,
    image: MEDIA.images.package3,
    includes: [
      "Three rugs",
      "Fibre & colourfastness check",
      "Cleaning suited to each rug",
    ],
    note: "Rug sizes, fibres and condition determine suitability and price.",
  },
  {
    id: "fabric-lounge",
    name: "Your favourite seat, refreshed.",
    label: "5-seat fabric lounge",
    service: "Upholstery cleaning",
    price: 189,
    image: MEDIA.images.package4,
    includes: [
      "Up to five fabric seats",
      "Fabric check & pre-treatment",
      "Upholstery extraction cleaning",
    ],
    note: "Delicate fabrics, cushions and modular sizes require assessment.",
  },
  {
    id: "leather-lounge",
    name: "Care for a classic.",
    label: "5-seat leather lounge",
    service: "Leather cleaning",
    price: 219,
    image: MEDIA.images.package5,
    includes: [
      "Up to five leather seats",
      "Leather-appropriate cleaning",
      "Conditioning after assessment",
    ],
    note: "Suede, nubuck and specialist finishes need individual advice.",
  },
] as const;
export const prototypeServices = [
  {
    name: "Carpet cleaning",
    detail:
      "Lift everyday dirt from the rooms you use most. Tell us about traffic areas, spills and the number of rooms.",
    image: MEDIA.images.package1,
    tags: ["Bedrooms", "Living areas", "Traffic lanes"],
  },
  {
    name: "Upholstery cleaning",
    detail:
      "A fresh start for sofas, armchairs and everyday seating, with the fabric and its condition guiding the clean.",
    image: MEDIA.images.package4,
    tags: ["Sofas", "Armchairs", "Dining chairs"],
  },
  {
    name: "Rug cleaning",
    detail:
      "From the living-room centrepiece to a well-used runner. Choose care that suits the fibre, size and finish.",
    image: MEDIA.images.package3,
    tags: ["Area rugs", "Runners", "Fibre-specific care"],
  },
  {
    name: "Tile & grout cleaning",
    detail:
      "Give tiled spaces a more considered clean, with attention to the grout lines and the surface around them.",
    image: MEDIA.images.tile,
    tags: ["Floors", "Kitchens", "Bathrooms"],
  },
  {
    name: "Leather cleaning",
    detail:
      "Thoughtful cleaning and conditioning for leather seating. We start with the leather type and its current condition.",
    image: MEDIA.images.package5,
    tags: ["Lounges", "Armchairs", "Conditioning"],
  },
  {
    name: "End-of-lease cleaning",
    detail:
      "Plan your move-out clean around the property and your agent’s checklist. Add carpets to keep the enquiry together.",
    image: MEDIA.images.package2,
    tags: ["Move-out cleans", "Property checklists", "Carpet add-ons"],
  },
  {
    name: "Commercial cleaning",
    detail:
      "Carpets, upholstery and shared spaces for workplaces. Build the scope around your premises and how you use them.",
    image: "/homepage/prototype/commercial.webp",
    tags: ["Offices", "Retail", "Shared spaces"],
  },
] as const;
export const additionalServices = [
  "Mattress cleaning",
  "Stain & odour treatment",
  "Window cleaning",
  "Oven cleaning",
  "Pressure washing",
  "Regular home cleaning",
  "Airbnb turnaround",
];
export const prototypeFaq = [
  [
    "What does the free quote include?",
    "Tell us your service, suburb and a few details about the space. The quote should set out the agreed work, price and any extras before you decide to book.",
  ],
  [
    "How do the package offers work?",
    "Choose a package as a starting point. Room dimensions, material, condition, access and additional areas can change the scope. Ask us to confirm the applicable offer and final price with your quote.",
  ],
  [
    "Can I combine carpets, rugs and upholstery?",
    "Yes—include all the items in one enquiry. That makes it easier to discuss a combined scope and a suitable visit.",
  ],
  [
    "Do you clean commercial properties?",
    "Use the commercial enquiry option for office, retail and shared-space cleaning. Tell us the size, surfaces and preferred working hours so the scope can be discussed.",
  ],
  [
    "How long will carpets take to dry?",
    "Drying varies with the carpet, cleaning method, ventilation and weather. Ask for advice specific to your space before the clean.",
  ],
  [
    "Can every stain be removed?",
    "Results depend on the stain, fibre, previous treatments and age. Describe problem areas when enquiring so expectations can be discussed before work starts.",
  ],
] as const;
