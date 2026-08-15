export type Feature = {
  id: string; label: string; note: string; avl?: string; poster?: string;
};
export type Product = {
  slug: string; name: string; tagline: string; price: string;
  palette: "mist" | "noir"; hero: string; frames?: string[]; gallery: string[]; features: Feature[];
};

export const products: Product[] = [
  {
    slug: "mist-set",
    name: "Mist Set",
    tagline: "Second-skin support in a soft warm grey.",
    price: "$168",
    palette: "mist",
    hero: "/media/img/mist-set-cut.webp",
    frames: ["/media/img/frames/mist-set-1.webp", "/media/img/frames/mist-set-2.webp", "/media/img/frames/mist-set-3.webp"],
    gallery: ["/media/img/in-form-2.webp", "/media/img/studio-banner.webp", "/media/img/hero-master.webp"],
    features: [
      { id: "waistband", label: "Crossover waistband", note: "High-rise V-front that holds through every movement.", avl: "/media/avl/mist-waistband.avl", poster: "/media/img/mist-set-cut.webp" },
      { id: "back", label: "Strappy scoop back", note: "Delicate straps, an open scoop — support without weight.", avl: "/media/avl/mist-back.avl", poster: "/media/img/mist-set-cut.webp" },
      { id: "fabric", label: "Second-skin fabric", note: "Buttery, opaque, sculpting — moves and returns.", avl: "/media/avl/mist-fabric.avl", poster: "/media/img/mist-set-cut.webp" }
    ]
  },
  {
    slug: "wrapped-noir-set",
    name: "Wrapped Noir Set",
    tagline: "Tie-front wrap and second-skin legging in deep black.",
    price: "$184",
    palette: "noir",
    hero: "/media/img/noir-set-cut.webp",
    frames: ["/media/img/frames/noir-set-1.webp", "/media/img/frames/noir-set-2.webp", "/media/img/frames/noir-set-3.webp"],
    gallery: ["/media/img/studio-banner.webp", "/media/img/in-form-2.webp", "/media/img/hero-master.webp"],
    features: [
      { id: "tie", label: "Tie-front wrap", note: "A soft knot that frames — adjust to your line.", avl: "/media/avl/noir-tie.avl", poster: "/media/img/noir-set-cut.webp" },
      { id: "openback", label: "Open-back tie", note: "An open back with a single tie — quiet drama.", avl: "/media/avl/noir-openback.avl", poster: "/media/img/noir-set-cut.webp" },
      { id: "cuff", label: "Lettuce-edge cuff", note: "A delicate lettuce hem at the wrist.", avl: "/media/avl/noir-cuff.avl", poster: "/media/img/noir-set-cut.webp" }
    ]
  }
];
export const getProduct = (slug?: string) => products.find(p => p.slug === slug);
