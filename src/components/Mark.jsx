/**
 * Marka işaretleri.
 *
 * Yıldız ve simge biçimleri çizilmez; kurumsal kimlikle birlikte teslim edilen
 * görselden gelir (WebP kopyaları: npm run images). Renk varyantları da aynı dosyadan üretilmiştir.
 */

const ICON = {
  purple: "/media/brand/renee-icon.webp",
  lime: "/media/brand/renee-icon-lime.webp",
  white: "/media/brand/renee-icon-white.webp",
};

const STAR = {
  purple: "/media/brand/renee-star-sm.webp",
  lime: "/media/brand/renee-star-lime-sm.webp",
  white: "/media/brand/renee-star-white-sm.webp",
};

/** Küçük yıldız aksanı (marka simgesinden alınmıştır). */
export function Sparkle({ size = 12, variant = "purple", className = "", style }) {
  return (
    <img
      src={STAR[variant] || STAR.purple}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      decoding="async"
      className={className}
      style={{ width: size, height: size, flexShrink: 0, ...style }}
    />
  );
}

/** Marka simgesinin tamamı: yıldız + yay. */
export function BrandMark({ size = 56, variant = "purple", className = "", style }) {
  return (
    <img
      src={ICON[variant] || ICON.purple}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      decoding="async"
      className={className}
      style={{ width: size, height: size, ...style }}
    />
  );
}

/* --------------------------------------------------------- arayüz okları */

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
