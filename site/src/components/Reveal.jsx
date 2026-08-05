import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Görünüme girişi izleyen kanca.
 *
 * - İlk ekranda olan içerik, boyama öncesinde (useLayoutEffect) açılır;
 *   böylece hiçbir koşulda gizli kalmaz.
 * - Alt kısımdaki içerik IntersectionObserver ile açılır; gözlemci
 *   çalışmazsa kaydırma dinleyicisi yedek olarak devreye girer.
 */
export function useReveal({ rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === "undefined") {
      setShown(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.02) setShown(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    let io;
    let ticking = false;

    function cleanup() {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }

    const reveal = () => {
      setShown(true);
      cleanup();
    };

    const check = () => {
      const b = el.getBoundingClientRect();
      if (b.top < window.innerHeight * 0.92 && b.bottom > 0) reveal();
    };

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        check();
      });
    }

    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => entries[0].isIntersecting && reveal(),
        { threshold: 0, rootMargin },
      );
      io.observe(el);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return cleanup;
  }, [shown, rootMargin]);

  return [ref, shown];
}

/** Görünüme girince aşağıdan yükselen blok. */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  duration = 0.85,
  className = "",
  style,
  as: Tag = "div",
}) {
  const [ref, shown] = useReveal();

  return (
    <Tag
      ref={ref}
      className={`rv ${shown ? "rv-in" : ""} ${className}`.trim()}
      style={{
        ...style,
        "--rv-y": `${y}px`,
        "--rv-dur": `${duration}s`,
        "--rv-delay": `${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}

/** Satır satır maskeden çıkan başlık. */
export function RevealLines({
  lines,
  className = "",
  delay = 0,
  stagger = 0.08,
}) {
  const [ref, shown] = useReveal();

  return (
    <span className={className} ref={ref}>
      {lines.map((line, i) => (
        <span className="reveal-mask" key={i}>
          <span
            className={`rv-line ${shown ? "rv-in" : ""}`}
            style={{ "--rv-delay": `${delay + i * stagger}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Kelime kelime beliren paragraf. */
export function RevealWords({ text, className = "", delay = 0 }) {
  const [ref, shown] = useReveal();
  const words = text.split(" ");

  return (
    <span className={className} ref={ref}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="rv-word-mask">
            <span
              className={`rv-word ${shown ? "rv-in" : ""}`}
              style={{ "--rv-delay": `${delay + i * 0.018}s` }}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
