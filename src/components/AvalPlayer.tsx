import { useEffect, useRef, createElement } from "react";

/**
 * AvalPlayer — thin React wrapper for the Avel <aval-player> web component.
 * Registers the element if the package is installed, drives states via
 * setState(), and falls back to a poster image until the .avl + element land.
 *
 * INSTALL when ready:  npm i @pixel-point/aval-element
 * DROP-IN: compiled .avl assets at /public/media/avl/*.avl
 */
let registered = false;
async function ensureElement() {
  if (registered || typeof window === "undefined") return;
  if (customElements.get("aval-player")) { registered = true; return; }
  const pkg = "@pixel-point/aval-element"; // variable => optional, unresolved at build
  try {
    await import(/* @vite-ignore */ pkg);
    registered = true;
  } catch {
    /* not installed yet — poster fallback is used */
  }
}

type Props = { src?: string; state?: string; poster?: string; className?: string };

export default function AvalPlayer({ src, state, poster, className }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  useEffect(() => { ensureElement(); }, []);
  useEffect(() => {
    const el = ref.current;
    if (el && typeof el.setState === "function" && state) el.setState(state);
  }, [state]);

  const hasElement = typeof window !== "undefined" && !!customElements.get("aval-player");
  if (!hasElement || !src) {
    return <img className={className} src={poster} alt="" data-aval-fallback />;
  }
  return createElement(
    "aval-player",
    { ref, class: className, src },
    poster ? createElement("img", { slot: "fallback", src: poster, alt: "" }) : null
  );
}
