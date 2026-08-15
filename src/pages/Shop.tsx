import { asset } from "../lib/asset";
import { Link } from "react-router-dom";
import { products } from "../data/products";

export default function Shop() {
  return (
    <section className="wrap shop">
      <header className="shop__head"><span className="eyebrow">The edit</span><h1 className="display-lg">The sets</h1></header>
      <div className="sets__grid">
        {products.map((p) => (
          <Link key={p.slug} to={`/product/${p.slug}`} className={`card card--${p.palette}`}>
            <div className="card__media"><img src={asset(p.hero)} alt={p.name} /></div>
            <div className="card__row"><span>{p.name}</span><span>{p.price}</span></div>
            <p className="card__tag">{p.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
