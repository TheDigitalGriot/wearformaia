import { useEffect, RefObject } from "react";

/**
 * useScrollScrub — the scroll-world scrub mechanic.
 * Pins a section and maps its scroll progress to video.currentTime, so the
 * generated film (the frame-locked beats stitched into one MP4) is scrubbed
 * by the scroll. Swap this for the vendored scroll-world/scrub-engine.js when
 * you drop the real asset + config in.
 */
export function useScrollScrub(
  sectionRef: RefObject<HTMLElement>,
  videoRef: RefObject<HTMLVideoElement>
) {
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const total = section.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / (total || 1)));
        if (video.duration) video.currentTime = progress * video.duration;
      });
    };
    const prime = () => { video.pause(); onScroll(); };
    video.addEventListener("loadedmetadata", prime);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      video.removeEventListener("loadedmetadata", prime);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [sectionRef, videoRef]);
}
