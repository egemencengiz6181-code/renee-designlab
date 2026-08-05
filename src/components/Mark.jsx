/* Renee marka işaretinin SVG karşılıkları — dört köşeli yıldız ve yay. */

export function Sparkle({
  size = 24,
  color = "currentColor",
  className = "",
  style,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        d="M50 0C50 27.6142 72.3858 50 100 50C72.3858 50 50 72.3858 50 100C50 72.3858 27.6142 50 0 50C27.6142 50 50 27.6142 50 0Z"
        fill={color}
      />
    </svg>
  );
}

export function Arc({
  size = 24,
  color = "currentColor",
  className = "",
  style,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        d="M100 0V26C100 66.8691 66.8691 100 26 100H0V74H26C52.5097 74 74 52.5097 74 26V0H100Z"
        fill={color}
      />
    </svg>
  );
}

/* Yıldız + yay bileşimi: markanın simgesi */
export function BrandMark({
  size = 56,
  color = "currentColor",
  className = "",
  style,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        d="M62 6C62 36.928 86.072 61 117 61C86.072 61 62 85.072 62 116C62 85.072 37.928 61 7 61C37.928 61 62 36.928 62 6Z"
        fill={color}
      />
      <path
        d="M194 62V96C194 150.124 150.124 194 96 194H62V160H96C131.346 160 160 131.346 160 96V62H194Z"
        fill={color}
      />
    </svg>
  );
}

export function ArrowUpRight({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRight({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.5 8H13.5M13.5 8L9 3.5M13.5 8L9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDown({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 2.5V13.5M8 13.5L3.5 9M8 13.5L12.5 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Plus({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 2v12M2 8h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
