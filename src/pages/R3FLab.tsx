import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import InView from "../three/InView";

// Each experience is a separate lazy chunk — three/fiber/drei only load when scrolled to.
const GarmentViewer = lazy(() => import("../three/experiences/GarmentViewer"));
const StudioScene = lazy(() => import("../three/experiences/StudioScene"));
const AvatarHero = lazy(() => import("../three/experiences/AvatarHero"));
const FloatingAccents = lazy(() => import("../three/experiences/FloatingAccents"));

const bays = [
  {
    tag: "A",
    title: "3D garment viewer",
    dest: "Product cards + product pages",
    note: "Live: grey cross-arm activewear (Mist palette), optimized 13→1.3 MB. Drag to orbit · idle spin · hover lifts. Swap URL for the Noir set on the PDP.",
    Comp: GarmentViewer,
    height: "78vh",
  },
  {
    tag: "B",
    title: "3D studio scene",
    dest: "Beat-5 payoff — “into her own world”",
    note: "Live: yoga room set, optimized 35→4.8 MB. Mouse parallax now — wire to scroll (drei ScrollControls) or bake a Theatre.js fly-through.",
    Comp: StudioScene,
    height: "86vh",
  },
  {
    tag: "C",
    title: "Avatar in the set",
    dest: "The hero, as living 3D",
    note: "Live: mid-stride grey activewear, optimized 17→1.8 MB. Breathes + turns to face you. Swap for a rigged CC5 avatar for real animation.",
    Comp: AvatarHero,
    height: "82vh",
  },
  {
    tag: "D",
    title: "Floating object accents",
    dest: "Parallax layer between sections",
    note: "Placeholder props (folded set · band · bottle) drifting with the cursor — this batch had no small props to swap in. Grab a folded-set / bottle GLB and it drops in here.",
    Comp: FloatingAccents,
    height: "70vh",
  },
];

export default function R3FLab() {
  return (
    <div className="r3flab">
      <header className="r3flab__head wrap">
        <p className="eyebrow">formaia · R3F lab</p>
        <h1 className="display-lg">
          Four experiences,<br />
          <span className="serif-italic">placeholders live.</span>
        </h1>
        <p className="r3flab__sub">
          Every scene renders now with stand-in geometry and its real motion. Drop a GLB per bay and it
          swaps in — see <code>public/media/models/README.md</code>. Nothing here touches the homepage yet.
        </p>
        <Link to="/" className="btn">← Back to site</Link>
      </header>

      {bays.map(({ tag, title, dest, note, Comp, height }) => (
        <section className="r3flab__bay" key={tag}>
          <div className="r3flab__meta wrap">
            <span className="r3flab__tag">{tag}</span>
            <div>
              <h2 className="r3flab__title">{title}</h2>
              <p className="r3flab__dest">{dest}</p>
              <p className="r3flab__note">{note}</p>
            </div>
          </div>
          <InView height={height} rootMargin="400px">
            <Suspense fallback={<div className="r3flab__loading">loading scene…</div>}>
              <Comp />
            </Suspense>
          </InView>
        </section>
      ))}
    </div>
  );
}
