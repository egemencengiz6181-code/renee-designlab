import { useEffect, useRef } from "react";

/**
 * Markanın yıldız işaretinden izler bırakan özel imleç.
 * Dokunmatik cihazlarda ve azaltılmış hareket tercihinde devre dışı kalır.
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const trailLayer = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;
    let lastTrail = 0;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }

      const hot = e.target.closest(
        'a, button, input, textarea, select, [data-cursor="hot"]',
      );
      ring.current?.classList.toggle("is-hot", Boolean(hot));

      if (!calm && trailLayer.current) {
        const now = performance.now();
        if (now - lastTrail > 110) {
          lastTrail = now;
          spawnTrail(mx, my);
        }
      }
    };

    const spawnTrail = (x, y) => {
      const s = document.createElement("span");
      const size = 6 + Math.random() * 7;
      s.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${size}px;height:${size}px;
        margin:${-size / 2}px 0 0 ${-size / 2}px;pointer-events:none;z-index:9996;
        background:${Math.random() > 0.5 ? "#8766e8" : "#c9fc4a"};
        clip-path:polygon(50% 0%,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0% 50%,40% 40%);
        opacity:.85;transition:transform .85s cubic-bezier(.16,1,.3,1),opacity .85s ease-out;`;
      trailLayer.current.appendChild(s);
      requestAnimationFrame(() => {
        s.style.transform = `translate(${(Math.random() - 0.5) * 42}px, ${
          22 + Math.random() * 26
        }px) rotate(${(Math.random() - 0.5) * 180}deg) scale(.2)`;
        s.style.opacity = "0";
      });
      setTimeout(() => s.remove(), 900);
    };

    const leave = () => ring.current?.classList.add("is-hidden");
    const enter = () => ring.current?.classList.remove("is-hidden");

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    loop();

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={trailLayer} aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
