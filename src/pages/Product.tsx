import { asset } from "../lib/asset";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../data/products";
import ProductFeatureReveals from "../components/ProductFeatureReveals";

export default function Product() {
  const { slug } = useParams();
  const p = getProduct(slug);
  if (!p) return <section className="wrap"><p>Not found. <Link to="/shop">Back to shop</Link></p></section>;

  return (
    <article className="pdp">
      <div className="wrap pdp__top">
        <div className="pdp__media"><img src={asset(p.hero)} alt={p.name} /></div>
        <div className="pdp__info">
          <span className="eyebrow">{p.palette === "mist" ? "Mist" : "Noir"}</span>
          <h1 className="display-lg">{p.name}</h1>
          <p className="pdp__tag">{p.tagline}</p>
          <p className="pdp__price">{p.price}</p>
          <button className="btn">Add to bag</button>
          <Link to="/shop" className="pdp__back">← Back to shop</Link>
        </div>
      </div>

      {/* the interactive Avel feature reveals */}
      <section className="wrap"><ProductFeatureReveals features={p.features} hero={p.hero} /></section>
    </article>
  );
}
