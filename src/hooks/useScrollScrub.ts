import { useEffect, RefObject } from "react";

/**
 * useScrollScrub — smooth scroll-world scrub.
 * Scroll sets a target time; a rAF loop eases video.currentTime toward it,
 * so motion stays fluid between scroll events. Pair with an all-keyframe
 * (all-intra) encode so seeks are frame-accurate and non-choppy.
 */
export function useScrollScrub(
  sectionRef: RefObject<HTMLElement>,
  videoRef: RefObject<HTMLVideoElement>
) {
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let target = 0;
    let raf = 0;
    let running = false;

    const computeTarget = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / (total || 1)));
      target = progress * (video.duration || 0);
    };
    const tick = () => {
      const diff = target - video.currentTime;
      if (Math.abs(diff) < 0.006) { running = false; return; }
      video.currentTime += diff * 0.18;            // ease toward target
      raf = requestAnimationFrame(tick);
    };
    const kick = () => { computeTarget(); if (!running) { running = true; raf = requestAnimationFrame(tick); } };

    const prime = () => { video.pause(); computeTarget(); video.currentTime = target; };
    video.addEventListener("loadedmetadata", prime);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      video.removeEventListener("loadedmetadata", prime);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      cancelAnimationFrame(raf);
    };
  }, [sectionRef, videoRef]);
}
