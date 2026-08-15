export type Feature = {
  id: string;          // Aval state name (hover -> setState)
  label: string;       // shown on the hotspot
  note: string;        // the feature copy revealed
  avl?: string;        // /media/... .avl asset (drop-in)
  poster?: string;     // fallback still
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  palette: "mist" | "noir";
  hero: string;        // hero still / clip poster (drop-in)
  gallery: string[];
  features: Feature[];
};

export const products: Product[] = [
  {
    slug: "mist-set",
    name: "Mist Set",
    tagline: "Second-skin support in a soft warm grey.",
    price: "$168",
    palette: "mist",
    hero: "/media/products/mist-hero.jpg",
    gallery: ["/media/products/mist-1.jpg", "/media/products/mist-2.jpg", "/media/products/mist-3.jpg"],
    features: [
      { id: "waistband", label: "Crossover waistband", note: "High-rise V-front that holds through every movement.", avl: "/media/avl/mist-waistband.avl", poster: "/media/products/mist-hero.jpg" },
      { id: "back", label: "Strappy scoop back", note: "Delicate straps, an open scoop — support without weight.", avl: "/media/avl/mist-back.avl", poster: "/media/products/mist-hero.jpg" },
      { id: "fabric", label: "Second-skin fabric", note: "Buttery, opaque, sculpting — moves and returns.", avl: "/media/avl/mist-fabric.avl", poster: "/media/products/mist-hero.jpg" }
    ]
  },
  {
    slug: "wrapped-noir-set",
    name: "Wrapped Noir Set",
    tagline: "Tie-front wrap and second-skin legging in deep black.",
    price: "$184",
    palette: "noir",
    hero: "/media/products/noir-hero.jpg",
    gallery: ["/media/products/noir-1.jpg", "/media/products/noir-2.jpg", "/media/products/noir-3.jpg"],
    features: [
      { id: "tie", label: "Tie-front wrap", note: "A soft knot that frames — adjust to your line.", avl: "/media/avl/noir-tie.avl", poster: "/media/products/noir-hero.jpg" },
      { id: "openback", label: "Open-back tie", note: "An open back with a single tie — quiet drama.", avl: "/media/avl/noir-openback.avl", poster: "/media/products/noir-hero.jpg" },
      { id: "cuff", label: "Lettuce-edge cuff", note: "A delicate lettuce hem at the wrist.", avl: "/media/avl/noir-cuff.avl", poster: "/media/products/noir-hero.jpg" }
    ]
  }
];

export const getProduct = (slug?: string) => products.find(p => p.slug === slug);
