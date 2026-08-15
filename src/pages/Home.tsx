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
      <section className="closing">
        <div className="wrap"><h2 className="display-xl serif-italic">Designed in Toronto.<br />Shaped for practice.</h2></div>
      </section>
    </>
  );
}
