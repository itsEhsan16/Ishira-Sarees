// Homepage copy and static data, taken verbatim from Figma frame 77:1611.
// Bestsellers will move to Supabase (`is_featured`) in Phase 3.

export const nav = {
  links: [
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/collections" },
    { label: "The Weave", href: "#the-weave" },
    { label: "Journal", href: "/journal" },
  ],
  actions: [
    { label: "Search", href: "/search" },
    { label: "Wishlist", href: "/account/wishlist" },
    { label: "Bag (0)", href: "/cart" },
  ],
  taglineLeft: "(Kanjivaram Silk Sarees)",
  taglineRight: "Woven in Kanchipuram — Worn in the Emirates",
};

export const hero = {
  label: "(01) The Kanjivaram Edit",
  title: ["Heritage,", "hand-woven."],
  body: "Pure mulberry silk and real zari, woven on wooden handlooms in Kanchipuram by master weavers — now arriving in the UAE.",
  cta: { label: "Shop the Collection", href: "/shop" },
  image: "/images/hero.jpg",
};

export const materials = ["Kanchipuram", "Mulberry Silk", "Silver Zari", "Korvai", "Handloom"];

export type Product = {
  slug: string;
  name: string;
  detail: string;
  priceAed: number;
  tag: string;
  /** Main photo (folded flat-lay) */
  image: string;
  /** Shown on hover (draped on the mannequin) */
  hoverImage?: string;
  /** object-position for the main photo when it is cropped into the card */
  imagePosition?: string;
};

// Product photos live in /public/sareess (client shoot, 2 per saree).
// TODO(client): detail lines and AED prices are placeholders until the
// client sends the real descriptions and prices.
const saree = (file: string) => `/sareess/${encodeURIComponent(file)}`;

export const bestsellers: Product[] = [
  { slug: "mayuri", name: "Mayuri", detail: "Peacock green · Purple zari border", priceAed: 4850, tag: "Bestseller", image: saree("Mayuri1.jpeg"), hoverImage: saree("Mayuri2.jpeg") },
  { slug: "indraneela", name: "Indraneela", detail: "Lavender · Indigo border", priceAed: 5600, tag: "Handloom", image: saree("Indraneela1.jpeg"), hoverImage: saree("Indraneela2.jpeg") },
  { slug: "kanakavalli", name: "Kanakavalli", detail: "Mustard · Navy zari border", priceAed: 4400, tag: "New Weave", image: saree("Kanakavalli1.jpeg"), hoverImage: saree("Kanakavalli2.jpeg"), imagePosition: "62% 50%" },
  { slug: "paavala-megam", name: "Paavala Megam", detail: "Coral · Blue zari border", priceAed: 5200, tag: "Handloom", image: saree("Paavala Megam1.jpeg"), hoverImage: saree("Paavala Megam2.jpeg") },
  { slug: "rudra-aazhi", name: "Rudra Aazhi", detail: "Teal · Red zari border", priceAed: 4950, tag: "Handloom", image: saree("Rudra Aazhi1.jpeg"), hoverImage: saree("Rudra Aazhi2.jpeg") },
  { slug: "shyama", name: "Shyama", detail: "Black · Purple zari border", priceAed: 4650, tag: "New Weave", image: saree("Shyama1.jpeg"), hoverImage: saree("Shyama2.jpeg") },
  { slug: "kanakambari", name: "Kanakambari", detail: "Rust orange · Black zari border", priceAed: 3950, tag: "Handloom", image: saree("Kanakambari1.jpeg"), hoverImage: saree("Kanakambari2.jpeg") },
  { slug: "chandhana", name: "Chandhana", detail: "Sandalwood · Checked brown border", priceAed: 5400, tag: "Bestseller", image: saree("Chandhana1.jpeg"), hoverImage: saree("Chandhana2.jpeg") },
];

export const intro = {
  lead: "Welcome to Ishira.",
  rest: " Every saree begins as a thread of mulberry silk and a spool of real zari — and ends as an heirloom, woven by hand over weeks, meant to be worn for a lifetime and passed on.",
};

export const collections = [
  { slug: "bridal", name: "Bridal", count: 24, image: "/images/collection-bridal.jpg" },
  { slug: "soft-silk", name: "Soft Silk", count: 18, image: "/images/collection-soft-silk.jpg" },
  { slug: "heritage-revival", name: "Heritage Revival", count: 12, image: "/images/collection-heritage.jpg" },
];

export const quote = {
  text: "“A Kanjivaram is never sewn. It is woven — thread by thread, for a lifetime.”",
  source: "— From the looms of Kanchipuram",
};

export const weave = {
  label: "(04) The Weave",
  title: ["The Story of", "a Kanjivaram"],
  body: "A Kanjivaram is known by its weight, its sheen and its border. Here is what goes into one — and why it outlives the person who first wears it.",
  chapters: [
    {
      numeral: "[ I ]",
      title: "The Silk",
      body: "Pure mulberry silk, twisted into three-ply yarn and dyed in small batches. The heavier thread gives a Kanjivaram its weight, its drape and the depth of its colour.",
      meta: "Mulberry silk · 3-ply yarn",
      image: "/images/story-silk.jpg",
    },
    {
      numeral: "[ II ]",
      title: "The Zari",
      body: "Silk thread wrapped in fine silver, then gilded with gold. Real zari ages gracefully and keeps its quiet glow — the clearest mark of an authentic Kanjivaram.",
      meta: "Silver core · Gold gilt",
      image: "/images/story-zari.jpg",
    },
    {
      numeral: "[ III ]",
      title: "The Korvai",
      body: "Body and border are woven separately and interlocked by hand, three shuttles at a time. The join is so strong that the border will never come loose.",
      meta: "Three-shuttle interlock",
      image: "/images/story-korvai.jpg",
    },
    {
      numeral: "[ IV ]",
      title: "The Loom",
      body: "On a wooden pit loom, a master weaver and an assistant work together for two to four weeks. Every motif — peacock, swan, mango, checks — is counted by hand, never printed.",
      meta: "14–28 days on the loom",
      image: "/images/story-loom.jpg",
    },
  ],
};

export const heritageLine = {
  lead: "From the looms of Kanchipuram to homes across the Emirates, ",
  rest: "Ishira brings the Kanjivaram as it was meant to be — hand-woven, certified pure, and made to be passed down.",
};

export const banner = {
  title: "Heritage you can hold.",
  label: "(05) The zari, up close",
  image: "/images/banner.jpg",
};

export const emirates = {
  label: "(06) Made for the Emirates",
  title: ["Rooted in Kanchipuram.", "At home in Dubai."],
  body: "Visit our studio for a private viewing and a draping session — we will help you choose, pleat and pin your first Kanjivaram.",
  cta: { label: "Book a Draping Session", href: "/draping-studio" },
  image: "/images/mural.jpg",
  care: [
    { n: "01", title: "Silk Mark Certified", body: "Every saree carries the Silk Mark tag — a guarantee of pure silk." },
    { n: "02", title: "Handloom Woven", body: "Traceable to the weaving cluster in Kanchipuram where it was made." },
    { n: "03", title: "Free UAE Delivery", body: "Complimentary, insured delivery across all seven Emirates." },
    { n: "04", title: "Draping in Dubai", body: "Book a private draping and fitting session at our studio." },
  ],
};

export const instagram = {
  label: "(07) Follow @ishira.ae",
  href: "https://instagram.com/ishira.ae",
  tiles: [
    { src: "/images/ig-1.jpg" },
    { src: "/images/story-zari.jpg" },
    { src: "/images/ig-2.jpg" },
    { src: "/images/product-2.jpg" },
    { src: "/images/ig-3.jpg" },
  ],
  line: "We weave heritage you can wear.",
};

export const newsletter = {
  label: "(08) The Loom Letter",
  title: "Be first to the loom",
  body: "New weaves, private previews and stories from Kanchipuram — once a month.",
  placeholder: "Your email address",
  image: "/images/newsletter.jpg",
};

export const footer = {
  label: "(Ishira)",
  line: "Each saree is a heritage, woven to be passed on.",
  columns: [
    {
      title: "Shop",
      links: [
        { label: "All Sarees", href: "/shop" },
        { label: "Bridal", href: "/collections/bridal" },
        { label: "Soft Silk", href: "/collections/soft-silk" },
        { label: "Heritage Revival", href: "/collections/heritage-revival" },
        { label: "Gift Cards", href: "/gift-cards" },
      ],
    },
    {
      title: "Ishira",
      links: [
        { label: "Our Story", href: "/about" },
        { label: "The Weave", href: "#the-weave" },
        { label: "Journal", href: "/journal" },
        { label: "Draping Studio", href: "/draping-studio" },
      ],
    },
    {
      title: "Care",
      links: [
        { label: "Shipping in the UAE", href: "/policies/shipping" },
        { label: "Returns & Exchanges", href: "/policies/returns" },
        { label: "Silk Care Guide", href: "/silk-care" },
        { label: "Authenticity", href: "/authenticity" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Dubai Design District", href: "/contact" },
        { label: "hello@ishira.ae", href: "mailto:hello@ishira.ae" },
        { label: "+971 4 000 0000", href: "tel:+97140000000" },
        { label: "Instagram · Pinterest", href: "https://instagram.com/ishira.ae" },
      ],
    },
  ],
  bottom: ["© 2026 Ishira. All rights reserved.", "Prices in AED · VAT included", "Privacy · Terms"],
};
