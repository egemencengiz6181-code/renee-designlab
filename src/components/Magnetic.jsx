import { useRef } from "react";

/** İmleci yakınlaştıkça hafifçe kendine çeken sarmalayıcı. */
export default function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={{
        display: "inline-flex",
        transition: "transform .6s cubic-bezier(.16,1,.3,1)",
        willChange: "transform",
      }}
    >
      {children}
    </span>
  );
}
