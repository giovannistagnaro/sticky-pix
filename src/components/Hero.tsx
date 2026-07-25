import { useEffect, useRef } from "react";

const STARS = [
  { left: "9%", top: "13%", background: "#fff", duration: "3.4s", delay: "0s" },
  { left: "23%", top: "7%", background: "#9be7ff", duration: "4.2s", delay: ".6s" },
  { left: "41%", top: "17%", background: "#fff", duration: "2.8s", delay: ".3s" },
  { left: "66%", top: "9%", background: "#ffb3e6", duration: "3.9s", delay: ".9s" },
  { left: "79%", top: "19%", background: "#fff", duration: "3.1s", delay: ".2s" },
  { left: "54%", top: "5%", background: "#9be7ff", duration: "4.6s", delay: "1.1s" },
  { left: "88%", top: "11%", background: "#fff", duration: "3.7s", delay: ".5s" },
  { left: "33%", top: "22%", background: "#ffb3e6", duration: "4.4s", delay: ".8s" },
];

const RIDGE =
  "M0 250 L120 168 L200 205 L300 118 L390 176 L470 96 L560 150 L640 82 L740 158 L830 120 L920 186 L1040 140";

type Props = {
  orderLabel: string;
};

export default function Hero({ orderLabel }: Props) {
  const starsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ridgeRef = useRef<HTMLDivElement>(null);

  // Parallax: read scroll inside rAF rather than in the scroll handler.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const layers: [HTMLDivElement | null, number][] = [
      [starsRef.current, 0.22],
      [glowRef.current, 0.12],
      [ridgeRef.current, 0.08],
    ];

    const apply = () => {
      frame = 0;
      const y = window.scrollY;
      for (const [node, factor] of layers) {
        if (node) node.style.transform = `translateY(${y * factor}px)`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-stars" ref={starsRef} aria-hidden="true">
        {STARS.map((star, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              background: star.background,
              animationDuration: star.duration,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="hero-horizon" ref={glowRef} aria-hidden="true" />

      <div className="hero-mountains" ref={ridgeRef} aria-hidden="true">
        <svg viewBox="0 0 1040 250" preserveAspectRatio="none">
          {/* Magenta copy sits behind, offset, for chromatic separation. */}
          <g fill="none" stroke="#ff2a8d" strokeWidth="1" opacity=".4">
            <path d={RIDGE} transform="translate(0,6)" />
          </g>
          <g fill="none" stroke="#2de2e6" strokeWidth="1.1" opacity=".85">
            <path d={`${RIDGE} L1040 250 Z`} />
            <path
              d="M120 168 L140 250 M200 205 L206 250 M300 118 L318 250 M390 176 L392 250 M470 96 L492 250 M560 150 L556 250 M640 82 L662 250 M740 158 L736 250 M830 120 L846 250 M920 186 L918 250"
              opacity=".55"
            />
            <path d="M0 218 L1040 218 M40 196 L1000 196" opacity=".22" />
          </g>
        </svg>
      </div>

      {/* Perspective floor: container owns the perspective and masks the
          horizon, plane tilts away, texture translates exactly one tile. */}
      <div className="hero-floor" aria-hidden="true">
        <div className="hero-floor-plane">
          <div className="hero-floor-texture" />
        </div>
      </div>

      <div className="hero-fade" aria-hidden="true" />

      <div className="hero-copy">
        <div className="hero-eyebrow">PART-TIME LABS PRESENTS</div>
        <div className="hero-sticky">STICKY</div>
        <div className="hero-pix">PIX</div>
        <p className="hero-sub">
          A four-inch e-ink photo tile. Send a picture from the app once and it stays on the screen
          forever — power off, no glow, nothing to scroll past.
        </p>
        <div className="hero-ctas">
          <a className="btn-primary" href="#order">
            {orderLabel}
          </a>
          <a className="btn-ghost" href="#how">
            WATCH IT WORK
          </a>
        </div>
      </div>

      <div className="hero-corner-left">© 2026 PART-TIME LABS</div>
      <div className="hero-corner-right" aria-hidden="true">
        <span className="key key-blink">ENTER</span>
        <span className="key key-dim">PAUSE</span>
      </div>
    </section>
  );
}
