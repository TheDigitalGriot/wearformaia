import { Link, NavLink } from "react-router-dom";
import { asset } from "../lib/asset";

export default function Header() {
  return (
    <header className="hdr">
      <nav className="hdr__nav wrap">
        <ul className="hdr__left">
          <li><NavLink to="/shop">Shop</NavLink></li>
          <li><NavLink to="/shop">Sets</NavLink></li>
          <li><NavLink to="/in-form">In form</NavLink></li>
        </ul>
        <Link to="/" className="hdr__mark" aria-label="formaia — home">
          <img src={asset("branding/formaia-wordmark.svg")} alt="formaia" />
        </Link>
        <ul className="hdr__right">
          <li><NavLink to="/account">Account</NavLink></li>
          <li><NavLink to="/bag">Bag</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
