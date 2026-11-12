// Central brand configuration and project image dataset for Bertha's Graphic Designer Portfolio
// Each image belongs to its verified brand and carries a distinct brand accent color indicator

export const BRAND_CONFIG = {
  "Kofi & Co": {
    name: "Kofi & Co",
    color: "#8C4F2D", // Warm Coffee Sienna Roast
    bgTint: "rgba(140, 79, 45, 0.08)",
    borderTint: "rgba(140, 79, 45, 0.35)",
    tagBg: "rgba(140, 79, 45, 0.12)",
    description: "Artisanal Coffee Roasters"
  },
  "Naya Cosmetics": {
    name: "Naya Cosmetics",
    color: "#4A6B53", // Botanical Sage & Olive Green
    bgTint: "rgba(74, 107, 83, 0.08)",
    borderTint: "rgba(74, 107, 83, 0.35)",
    tagBg: "rgba(74, 107, 83, 0.12)",
    description: "Organic Botanical Skincare"
  },
  "Nunya Cookies": {
    name: "Nunya Cookies",
    color: "#D93850", // Vibrant Berry Coral
    bgTint: "rgba(217, 56, 80, 0.08)",
    borderTint: "rgba(217, 56, 80, 0.35)",
    tagBg: "rgba(217, 56, 80, 0.12)",
    description: "Boutique Artisanal Confectionery"
  },
  "Aura": {
    name: "Aura",
    color: "#7C5C8A", // Iris Violet & Amethyst
    bgTint: "rgba(124, 92, 138, 0.08)",
    borderTint: "rgba(124, 92, 138, 0.35)",
    tagBg: "rgba(124, 92, 138, 0.12)",
    description: "Aura Brand Identity & Editorial"
  }
};

// All individual project images displayed in the masonry gallery
export const allProjectImages = [
  // --- Kofi & Co (5 images) ---
  {
    id: "kofi-brand-kit",
    title: "Master Brand Kit & Visual Architecture",
    brand: "Kofi & Co",
    category: "Brand Guidelines",
    image: "/images/projects/Kofi & Co/Kofi & Co Coffee Brand Kit.png",
    aspectRatio: "16/11",
    description: "Primary and secondary logo suite, grid structure, custom font hierarchy, and comprehensive brand guidelines."
  },
  {
    id: "kofi-specialty-bag",
    title: "Specialty Roast Packaging & Bean Bags",
    brand: "Kofi & Co",
    category: "Packaging Architecture",
    image: "/images/projects/Kofi & Co/Kofi & Co Coffee.png",
    aspectRatio: "4/3",
    description: "Direct-trade single-origin coffee packaging with warm parchment textures, origin badge stamps, and roast indicators."
  },
  {
    id: "kofi-merch-cups",
    title: "Retail Merchandise & Café Collateral",
    brand: "Kofi & Co",
    category: "Merchandise & Stationery",
    image: "/images/projects/Kofi & Co/Kofi & Co Coffee Brand Kit 7.png",
    aspectRatio: "3/4",
    description: "Extension of the brand identity across barista aprons, takeaway cup sleeves, organic cotton tote bags, and café menus."
  },
  {
    id: "kofi-bag-variant",
    title: "Single-Origin Bag Packaging Variant",
    brand: "Kofi & Co",
    category: "Packaging Variant",
    image: "/images/projects/Kofi & Co/Kofi & Co Coffee (1).png",
    aspectRatio: "1/1",
    description: "Clean studio packaging mockup highlighting the refined brand logotype, origin badge, and bean roast profile."
  },
  {
    id: "kofi-cafe-poster",
    title: "Editorial Café Poster & Specialty Menu",
    brand: "Kofi & Co",
    category: "Promotional Print",
    image: "/images/projects/Kofi & Co/Kofi & Co Coffee .png",
    aspectRatio: "14/20",
    description: "Warm, textured editorial coffee poster celebrating direct-trade roasters with handcrafted typographic layout."
  },

  // --- Naya Cosmetics (7 images) ---
  {
    id: "naya-campaign-spread",
    title: "Botanical Rituals Editorial Campaign",
    brand: "Naya Cosmetics",
    category: "Campaign & Editorial",
    image: "/images/projects/Naya Cosmetics/Naya Skincare2.png",
    aspectRatio: "3/4",
    description: "High-impact visual campaign and editorial creative direction spotlighting natural ingredients and tactile skincare textures."
  },
  {
    id: "naya-amber-suite",
    title: "Minimalist Amber Glass Product Suite",
    brand: "Naya Cosmetics",
    category: "Product Packaging",
    image: "/images/projects/Naya Cosmetics/Naya SkincareB.png",
    aspectRatio: "3/4",
    description: "Custom label design for apothecary amber dropper bottles and cosmetic jars, emphasizing ingredient clarity and typographic purity."
  },
  {
    id: "naya-launch-posters",
    title: "Flagship Launch Poster Collection",
    brand: "Naya Cosmetics",
    category: "Poster Series",
    image: "/images/projects/Naya Cosmetics/Naya SkincareC.png",
    aspectRatio: "3/4",
    description: "Promotional poster series designed for boutique window displays and editorial beauty spreads, combining bold layout with quiet serenity."
  },
  {
    id: "naya-ritual-collection",
    title: "Full Skincare Ritual Collection Suite",
    brand: "Naya Cosmetics",
    category: "Complete Packaging Line",
    image: "/images/projects/Naya Cosmetics/Naya Cosmetics(1).png",
    aspectRatio: "1/1",
    description: "Comprehensive product line display featuring amber glass dropper bottles, cream jars, and signature botanical ingredient layout."
  },
  {
    id: "naya-botanical-identity",
    title: "Botanical Essence & Ingredient Identity",
    brand: "Naya Cosmetics",
    category: "Brand Collateral",
    image: "/images/projects/Naya Cosmetics/Naya Cosmetics(2).png",
    aspectRatio: "1/1",
    description: "Minimalist brand collateral spotlighting active organic botanicals, serene sage green accents, and Swiss-inspired typesetting."
  },
  {
    id: "naya-retail-box",
    title: "Luxury Skincare Retail Display & Box Mockup",
    brand: "Naya Cosmetics",
    category: "Secondary Packaging",
    image: "/images/projects/Naya Cosmetics/Naya Cosmetics(3).png",
    aspectRatio: "1/1",
    description: "Warm neutral retail packaging presentation with foil-stamped logotype, tactile carton finish, and minimalist brand badges."
  },
  {
    id: "naya-billboard-spread",
    title: "Flagship Editorial Campaign & Billboard Spread",
    brand: "Naya Cosmetics",
    category: "Large Format Print",
    image: "/images/projects/Naya Cosmetics/Naya Cosmetics(4).png",
    aspectRatio: "14/20",
    description: "Dramatic high-contrast campaign poster highlighting earthy terracotta tones, elegant beauty photography, and bold editorial headers."
  },

  // --- Nunya Cookies (3 images) ---
  {
    id: "nunya-signature-box",
    title: "Signature Gourmet Cookie Retail Packaging",
    brand: "Nunya Cookies",
    category: "Packaging & Lettering",
    image: "/images/projects/Nunya Cookies/Nu.png",
    aspectRatio: "1/1",
    description: "Custom box packaging featuring vibrant color blocking, tactile varnishes, and bespoke lettering tailored for boutique retail shelves."
  },
  {
    id: "nunya-flavor-exploration",
    title: "Flavor Exploration & Brand Asset System",
    brand: "Nunya Cookies",
    category: "Brand Identifiers",
    image: "/images/projects/Nunya Cookies/nun5.png",
    aspectRatio: "4/3",
    description: "Dynamic flavor badge system, bespoke illustrations, and merchandise collateral designed for seasonal cookie assortments."
  },
  {
    id: "nunya-social-campaign",
    title: "Omnichannel Brand Campaign & Social Kit",
    brand: "Nunya Cookies",
    category: "Digital Campaign",
    image: "/images/projects/Nunya Cookies/nunyA.png",
    aspectRatio: "4/3",
    description: "Energetic digital promotional banners, social media ad templates, and engaging brand identity rollout for omnichannel launch."
  },

  // --- Aura (1 image) ---
  {
    id: "aura-editorial-poster",
    title: "Aura Visual Identity & Editorial Poster",
    brand: "Aura",
    category: "Editorial & Poster",
    image: "/images/projects/Aura/AURA 2.png",
    aspectRatio: "14/20",
    description: "Aura visual identity and editorial campaign showcasing warm atmospheric tones, structured composition, and refined minimalist typography."
  }
];
