import { Fragment } from "react";

/**
 * Kesintisiz kayan şerit.
 *
 * İki özdeş şerit yan yana durur ve ikisi de kendi genişliği kadar sola
 * kayar; birincisi tam çıktığında ikincisi onun yerini almış olur, böylece
 * döngü hiç kopmaz. Her şeridin ekrandan geniş olması gerekir — bunun için
 * içerik `repeat` kadar tekrarlanır.
 */
export default function Marquee({
  children,
  speed = 34,
  reverse = false,
  repeat = 2,
  className = "",
  ariaLabel,
}) {
  const track = (
    <>
      {Array.from({ length: repeat }).map((_, i) => (
        <Fragment key={i}>{children}</Fragment>
      ))}
    </>
  );

  return (
    <div
      className={`marquee ${reverse ? "rev" : ""} ${className}`}
      style={{ "--speed": `${speed}s` }}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
    >
      <div className="marquee-track">{track}</div>
      <div className="marquee-track" aria-hidden="true" inert>
        {track}
      </div>
    </div>
  );
}
