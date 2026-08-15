import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollScrub — GSAP ScrollTrigger scrub of the film's currentTime.
 * `scrub` adds a smoothing lag so the video eases toward the scroll position
 * instead of snapping to every scroll event — fluid on a long, all-intra film.
 */
export function useScrollScrub(
  sectionRef: RefObject<HTMLElement>,
  videoRef: RefObject<HTMLVideoElement>
) {
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let ctx: ReturnType<typeof gsap.context> | null = null;

    const setup = () => {
      const state = { t: 0 };
      ctx = gsap.context(() => {
        gsap.to(state, {
          t: () => video.duration || 0,
          ease: "none",
          onUpdate: () => { if (video.duration) video.currentTime = state.t; },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,          // smoothing lag (seconds)
            invalidateOnRefresh: true,
          },
        });
      }, section);
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) setup();
    else video.addEventListener("loadedmetadata", setup, { once: true });

    return () => { ctx?.revert(); };
  }, [sectionRef, videoRef]);
}
