import { useEffect, useRef } from "react";

/**
 * Bir öğeyi kaydırmaya göre yavaşça hareket ettirir.
 *
 * @param {object} opts
 * @param {(p:number)=>string} opts.transform  0–1 aralığındaki ilerlemeyi
 *        CSS transform değerine çeviren fonksiyon.
 * @param {"enter"|"top"} opts.range  "top": öğe ekranın üstünden çıkarken,
 *        "enter": öğe ekrana girip çıkarken ilerleme hesaplanır.
 */
export default function useParallax({ transform, range = "top" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;

      let p;
      if (range === "top") {
        // öğenin üstü ekranın üstünden çıkarken 0 -> 1
        const total = r.height || vh;
        p = Math.min(1, Math.max(0, -r.top / total));
      } else {
        // öğe ekrana girerken 0, tamamen çıkarken 1
        p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      }

      el.style.transform = transform(p);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [transform, range]);

  return ref;
}
