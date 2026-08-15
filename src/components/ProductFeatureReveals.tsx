import { useState } from "react";
import AvalPlayer from "./AvalPlayer";
import type { Feature } from "../data/products";
import { asset } from "../lib/asset";

/**
 * The interactive product moment: hover a feature hotspot -> Avel routes to
 * that state -> the frame-accurate zoom reveal plays. This is the "cool zoom
 * animated feature" — packed-alpha so the model floats on the warm ground.
 */
export default function ProductFeatureReveals({
  features, hero,
}: { features: Feature[]; hero: string }) {
  const [active, setActive] = useState<Feature | null>(null);
  const shown = active ?? features[0];

  return (
    <div className="reveals">
      <div className="reveals__stage">
        <AvalPlayer
          className="reveals__player"
          src={asset(shown?.avl)}
          state={active?.id ?? "idle"}
          poster={asset(shown?.poster ?? hero)}
        />
      </div>
      <div className="reveals__list">
        <span className="eyebrow">The details</span>
        <ul>
          {features.map((f) => (
            <li
              key={f.id}
              className={active?.id === f.id ? "is-active" : ""}
              onMouseEnter={() => setActive(f)}
              onFocus={() => setActive(f)}
              tabIndex={0}
            >
              <b>{f.label}</b>
              <span>{f.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
