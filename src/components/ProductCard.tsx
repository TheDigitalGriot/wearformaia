import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import { asset } from "../lib/asset";

/**
 * Product turntable — the three-pose lookbook image split into front/side/back frames.
 * Desktop hover cycles the poses (the model "turns"); mobile press-and-hold does the same,
 * a quick tap still opens the product. Respects prefers-reduced-motion (steps, no auto-loop).
 */
export default function ProductCard({ p }: { p: Product }) {
  const frames = p.frames && p.frames.length ? p.frames : [p.hero];
  const [idx, setIdx] = useState(0);
  const timer = useRef<number>();
  const held = useRef(false);
  const downAt = useRef(0);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const stop = () => {
    if (timer.current) { clearInterval(timer.current); timer.current = undefined; }
    setIdx(0);
  };
  const turn = () => {
    if (frames.length < 2) return;
    if (reduced) { setIdx((i) => (i + 1) % frames.length); return; } // step, no loop
    if (timer.current) clearInterval(timer.current);
    timer.current = window.setInterval(() => setIdx((i) => (i + 1) % frames.length), 620);
  };

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  return (
    <Link
      to={`/product/${p.slug}`}
      className={`card card--${p.palette}`}
      onMouseEnter={turn}
      onMouseLeave={stop}
      onTouchStart={() => { held.current = true; downAt.current = Date.now(); turn(); }}
      onTouchEnd={() => { stop(); }}
      onClick={(e) => { if (held.current && Date.now() - downAt.current > 260) e.preventDefault(); held.current = false; }}
    >
      <div className="card__turn">
        {frames.map((f, i) => (
          <img key={i} src={asset(f)} alt={`${p.name} — view ${i + 1}`} className={i === idx ? "is-on" : ""} loading="lazy" />
        ))}
        {frames.length > 1 && (
          <span className="card__dots" aria-hidden>
            {frames.map((_, i) => <i key={i} className={i === idx ? "on" : ""} />)}
          </span>
        )}
      </div>
      <div className="card__row"><span>{p.name}</span><span>{p.price}</span></div>
    </Link>
  );
}
