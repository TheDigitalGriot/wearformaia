import "./ScrollFilmHero.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useScrollScrub } from "../hooks/useScrollScrub";
import { asset } from "../lib/asset";

/**
 * ScrollFilmHero — the scroll story.
 * Pinned 16:9, center-safe, object-fit: cover. Scroll progress scrubs the
 * stitched 7-beat film. DROP-IN: /public/media/scroll-film.mp4 (+ poster).
 */
export default function ScrollFilmHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useScrollScrub(sectionRef, videoRef);

  return (
    <section ref={sectionRef} className="film" aria-label="formaia — the film">
      <div className="film__stick">
        <video
          ref={videoRef}
          className="film__video"
          src={asset("media/scroll-film.mp4")}
          muted
          playsInline
          preload="auto"
          poster={asset("media/scroll-film-poster.jpg")}
        />
        <div className="film__grade" />
        <div className="film__caption wrap"><span className="eyebrow">move in form</span></div>
        <div className="film__end wrap">
          <img className="film__mark" src={asset("branding/formaia-wordmark.svg")} alt="formaia" />
          <Link to="/shop" className="btn btn-light">Enter the edit</Link>
        </div>
      </div>
    </section>
  );
}
