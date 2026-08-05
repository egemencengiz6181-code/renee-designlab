/** Sonsuz kayan şerit. İçerik iki kez basılır, hover'da durur. */
export default function Marquee({
  children,
  speed = 34,
  reverse = false,
  className = "",
  ariaLabel,
}) {
  return (
    <div
      className={`marquee ${reverse ? "rev" : ""} ${className}`}
      style={{ "--speed": `${speed}s` }}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
    >
      <div className="marquee-track">{children}</div>
      <div className="marquee-track" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
