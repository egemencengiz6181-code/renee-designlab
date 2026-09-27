import dims from "../data/media-dims.json";
import { toLang } from "../i18n";

/* ==========================================================================
   Sayfa başı (head) etiketleri
   Aynı veri hem tarayıcıda DOM'a (applyHead) hem de derleme sırasında
   ön-çizilen HTML'e (headToHtml) yazılır; böylece arama motorları her
   adreste doğru başlığı, açıklamayı ve yapılandırılmış veriyi görür.
   ========================================================================== */

export const SITE = "https://reneedesignlab.com";
export const BRAND = "Renee Design Lab";
export const ORG_ID = `${SITE}/#organization`;
export const DEFAULT_IMAGE = "/media/general/renee-2.jpg";

/**
 * Sosyal ağlar WebP önizlemeyi her zaman göstermediği için og:image
 * için aynı görselin JPG/PNG aslı tercih edilir.
 */
function shareImage(src) {
  if (!src?.endsWith(".webp")) return src;
  const base = src.slice(0, -5);
  return [".jpg", ".png"].map((e) => base + e).find((p) => dims[p]) ?? src;
}

export function buildHead({
  title,
  fullTitle,
  description = "",
  path = "/",
  image,
  lang = "tr",
  jsonLd = [],
  noindex = false,
}) {
  const img = shareImage(image || DEFAULT_IMAGE);
  const [w, h] = dims[img] ?? [];
  return {
    lang,
    title: fullTitle || (title ? `${title} | ${BRAND}` : BRAND),
    description,
    url: `${SITE}${toLang(path, lang)}`,
    alternates: {
      tr: `${SITE}${path}`,
      en: `${SITE}${toLang(path, "en")}`,
    },
    image: `${SITE}${img}`,
    imageSize: w ? [w, h] : null,
    locale: lang === "en" ? "en_US" : "tr_TR",
    localeAlt: lang === "en" ? "tr_TR" : "en_US",
    robots: noindex
      ? "noindex, follow"
      : "index, follow, max-image-preview:large, max-snippet:-1",
    jsonLd,
  };
}

/** Başlıktaki / açıklamadaki özel karakterleri HTML için kaçışlar. */
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function tags(head) {
  const t = [
    ["meta", { name: "description", content: head.description }],
    ["meta", { name: "robots", content: head.robots }],
    ["link", { rel: "canonical", href: head.url }],
    ["link", { rel: "alternate", hreflang: "tr", href: head.alternates.tr }],
    ["link", { rel: "alternate", hreflang: "en", href: head.alternates.en }],
    [
      "link",
      { rel: "alternate", hreflang: "x-default", href: head.alternates.tr },
    ],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: BRAND }],
    ["meta", { property: "og:locale", content: head.locale }],
    ["meta", { property: "og:locale:alternate", content: head.localeAlt }],
    ["meta", { property: "og:title", content: head.title }],
    ["meta", { property: "og:description", content: head.description }],
    ["meta", { property: "og:url", content: head.url }],
    ["meta", { property: "og:image", content: head.image }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: head.title }],
    ["meta", { name: "twitter:description", content: head.description }],
    ["meta", { name: "twitter:image", content: head.image }],
  ];
  if (head.imageSize) {
    t.push(["meta", { property: "og:image:width", content: head.imageSize[0] }]);
    t.push(["meta", { property: "og:image:height", content: head.imageSize[1] }]);
  }
  return t;
}

/** Ön-çizim için: head bloğunu HTML dizesi olarak döndürür. */
export function headToHtml(head) {
  const lines = [`<title>${esc(head.title)}</title>`];
  for (const [tag, attrs] of tags(head)) {
    const a = Object.entries(attrs)
      .map(([k, v]) => `${k}="${esc(v)}"`)
      .join(" ");
    lines.push(`<${tag} ${a} data-seo />`);
  }
  for (const data of head.jsonLd) {
    // "</" dizisi script etiketini erken kapatmasın.
    const json = JSON.stringify(data).replace(/<\//g, "<\\/");
    lines.push(`<script type="application/ld+json" data-seo>${json}</script>`);
  }
  return lines.map((l) => `    ${l}`).join("\n");
}

/** Tarayıcı için: sayfa değiştikçe head etiketlerini yeniden yazar. */
export function applyHead(head) {
  document.title = head.title;
  document.documentElement.lang = head.lang;
  document.head.querySelectorAll("[data-seo]").forEach((el) => el.remove());

  const frag = document.createDocumentFragment();
  for (const [tag, attrs] of tags(head)) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    el.setAttribute("data-seo", "");
    frag.appendChild(el);
  }
  for (const data of head.jsonLd) {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(data);
    el.setAttribute("data-seo", "");
    frag.appendChild(el);
  }
  document.head.appendChild(frag);
}

/* ------------------------------------------------------ ön-çizim kanalı */

let sink = null;
/** Ön-çizim betiği, render öncesi bir toplayıcı nesne verir. */
export function collectHead(target) {
  sink = target;
}
export function emitHead(head) {
  if (sink) sink.head = head;
}

/* -------------------------------------------------- yapılandırılmış veri */

export function breadcrumbLd(lang, items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${toLang(it.path, lang)}`,
    })),
  };
}

export function faqLd(faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceLd(lang, s) {
  const url = `${SITE}${toLang(`/hizmetler/${s.slug}`, lang)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.title,
    serviceType: s.title,
    description: s.seoDesc || s.short,
    url,
    image: `${SITE}${shareImage(s.image)}`,
    inLanguage: lang,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "City", name: "Ankara" },
      { "@type": "Country", name: "Türkiye" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s.title,
      itemListElement: s.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d.split(" — ")[0] },
      })),
    },
  };
}
