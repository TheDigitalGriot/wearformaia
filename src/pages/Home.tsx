import { Link } from "react-router-dom";
import ScrollFilmHero from "../components/ScrollFilmHero";
import { products } from "../data/products";
import { asset } from "../lib/asset";

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
          {products.map((p) => (
            <Link key={p.slug} to={`/product/${p.slug}`} className={`card card--${p.palette}`}>
              <div className="card__media"><img src={asset(p.hero)} alt={p.name} /></div>
              <div className="card__row"><span>{p.name}</span><span>{p.price}</span></div>
            </Link>
          ))}
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
