import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import ScrollFilmHero from "../components/ScrollFilmHero";
import ProductCard from "../components/ProductCard";
import InView from "../three/InView";
import { products } from "../data/products";
import { asset } from "../lib/asset";

// R3F moments — separate chunks, only load when scrolled into view (video hero stays first paint).
const GarmentViewer = lazy(() => import("../three/experiences/GarmentViewer"));
const StudioScene = lazy(() => import("../three/experiences/StudioScene"));

export default function Home() {
  return (
    <>
      <ScrollFilmHero />
      <section className="statement" style={{ backgroundImage: `url(${asset("media/img/hero-master.webp")})` }}>
        <div className="wrap statement__inner">
          <p className="eyebrow">formaia — activewear</p>
          <h2 className="display-lg">Lived lightly.<br /><span className="serif-italic">Worn with presence.</span></h2>
        </div>
      </section>
      <section className="sets wrap">
        <div className="sets__head">
          <h2 className="display-lg">Shop sets</h2>
          <Link to="/shop" className="btn">Shop the edit</Link>
        </div>
        <div className="sets__grid">
          {products.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>
      <section className="r3d wrap">
        <div className="r3d__copy">
          <p className="eyebrow">See it in the round</p>
          <h2 className="display-lg">The Mist set,<br /><span className="serif-italic">in three dimensions.</span></h2>
          <p>Drag to turn it. Every seam and sculpt line, the way it actually moves on the body — not a flat photo.</p>
          <Link to="/shop" className="btn">Shop the set</Link>
        </div>
        <div className="r3d__stage">
          <InView height="100%" rootMargin="400px">
            <Suspense fallback={null}><GarmentViewer /></Suspense>
          </InView>
        </div>
      </section>
      <section className="split">
        <div className="split__media"><img src={asset("media/img/in-form-2.webp")} alt="" /></div>
        <div className="split__copy">
          <h2 className="display-lg">Pilates form.<br /><span className="serif-italic">Everyday ease.</span></h2>
          <p>Second-skin fabric that moves and returns. Worn from the reformer to the rest of the day.</p>
          <Link to="/in-form" className="btn">In form</Link>
        </div>
      </section>
      <section className="studio3d">
        <InView height="100%" rootMargin="500px">
          <Suspense fallback={null}><StudioScene /></Suspense>
        </InView>
        <div className="studio3d__copy">
          <p className="eyebrow">Her own world</p>
          <h2 className="display-lg">Step inside<br /><span className="serif-italic">the practice.</span></h2>
        </div>
      </section>
      <section className="studioband">
        <img className="studioband__img" src={asset("media/img/studio-banner.webp")} alt="formaia — studio to street" />
        <div className="studioband__copy">
          <p className="eyebrow">Studio to street</p>
          <h2 className="display-lg">In the studio.<br /><span className="serif-italic">Into the light.</span></h2>
          <p>Soft rib, clean seams, quiet branding. Pieces cut for alignment and worn with intention — in the studio, on the court, into the light.</p>
        </div>
      </section>
    </>
  );
}
