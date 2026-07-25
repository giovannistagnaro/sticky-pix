import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Fades a section up as its top crosses 92% of the viewport height.
 * One-shot: the observer disconnects after firing and never reverses.
 */
export default function Reveal({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Reduced motion skips the animation entirely: start revealed.
  const [shown, setShown] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.unobserve(entry.target);
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <div ref={ref} className={`rv ${shown ? "in" : ""} ${className}`.trim()}>
      {children}
    </div>
  );
}
