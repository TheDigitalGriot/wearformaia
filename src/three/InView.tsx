import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Gates its children until scrolled near the viewport, so the heavy R3F chunk
 * (three + fiber + drei ≈ 500 KB) never loads on first paint. Shows `poster`
 * (a still frame) underneath until the canvas mounts, and after.
 */
export default function InView({
  children,
  poster,
  height = "70vh",
  rootMargin = "300px",
  className,
}: {
  children: ReactNode;
  poster?: string;
  height?: string;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        height,
        background: poster
          ? `#16110d url(${poster}) center/cover no-repeat`
          : "#16110d",
      }}
    >
      {visible && children}
    </div>
  );
}
