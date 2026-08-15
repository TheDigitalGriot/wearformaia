import { Link } from "react-router-dom";
import { asset } from "../lib/asset";

export default function Footer() {
  return (
    <footer>
      <section className="about">
        <div className="wrap">
          <div className="about__head">
            <div>
              <p className="eyebrow">About formaia</p>
              <h2 className="display-lg">Designed in Toronto.<br /><span className="serif-italic">Shaped for practice.</span></h2>
            </div>
            <p className="about__note">Quiet luxury for pilates — soft structure, refined lines.</p>
          </div>
          <hr className="about__rule" />
          <div className="about__grid">
            <div className="about__body">
              <p><span className="serif">formaia</span> is a Toronto-based pilates house built on quiet luxury — garments that hold their form from reformer to the rest of the day.</p>
              <p>We design for the discipline of movement and the ease that follows it — compressive where you need support, fluid where you need breath, finished with a calm presence.</p>
            </div>
            <dl className="about__meta">
              <div><dt>Mission</dt><dd className="serif-italic">Elevate everyday pilates with pieces that honor control, grace, and moving well.</dd></div>
              <div><dt>Based in</dt><dd>Toronto</dd></div>
              <div><dt>Focus</dt><dd>Studio to street</dd></div>
              <div><dt>Ethos</dt><dd className="serif-italic">move in form</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <div className="ftr__bar">
        <div className="wrap ftr__bar-inner">
          <div className="ftr__brandline">
            <img src={asset("branding/formaia-wordmark.svg")} alt="formaia" />
            <span className="serif-italic">move in form</span>
            <span>Toronto</span>
          </div>
          <nav className="ftr__nav">
            <Link to="/shop">Shop</Link>
            <Link to="/product/mist-set">Mist</Link>
            <Link to="/product/wrapped-noir-set">Noir</Link>
            <Link to="/account">Account</Link>
            <Link to="/bag">Bag</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
