import { Link } from "react-router-dom";
import { asset } from "../lib/asset";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr__grid">
        <div className="ftr__brand">
          <img src={asset("branding/formaia-wordmark.svg")} alt="formaia" />
          <p className="serif">Move in form. Designed in Toronto, shaped for practice.</p>
        </div>
        <nav className="ftr__col">
          <span className="eyebrow">Shop</span>
          <Link to="/product/mist-set">Mist Set</Link>
          <Link to="/product/wrapped-noir-set">Wrapped Noir Set</Link>
          <Link to="/shop">The sets</Link>
        </nav>
        <nav className="ftr__col">
          <span className="eyebrow">formaia</span>
          <Link to="/in-form">In form</Link>
          <Link to="/account">Account</Link>
          <a href="https://instagram.com/formaia" target="_blank" rel="noreferrer">@formaia</a>
        </nav>
      </div>
      <div className="wrap ftr__base"><span>© {new Date().getFullYear()} formaia</span><span>@wearformaia</span></div>
    </footer>
  );
}
