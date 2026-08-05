import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import Cursor from "./Cursor";

/** Sayfa kaydırma ilerlemesini gösteren ince çizgi. */
function ScrollProgress() {
  const bar = useRef(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
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
  }, []);

  return <div className="scroll-progress" ref={bar} aria-hidden="true" />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function Layout({ children }) {
  return (
    <>
      <a href="#main" className="skip-link">
        İçeriğe geç
      </a>
      <ScrollToTop />
      <ScrollProgress />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
