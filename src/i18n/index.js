import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import * as trData from "../data/site";
import * as enData from "../data/site.en";
import { posts } from "../data/blog";
import strings from "./strings";

/* ==========================================================================
   Dil altyapısı
   Dil adresten okunur: Türkçe kök adreslerde, İngilizce /en altında yaşar.
   Kod içinde bağlantılar her zaman Türkçe yolla yazılır ve lp() ile
   geçerli dile çevrilir.
   ========================================================================== */

export const LANGS = ["tr", "en"];

/** Türkçe üst seviye yol → İngilizce karşılığı */
const PAGES = {
  hakkimizda: "about",
  hizmetler: "services",
  calismalar: "work",
  referanslar: "references",
  "kurumsal-kimlik": "brand-identity",
  iletisim: "contact",
};
const PAGES_REV = Object.fromEntries(
  Object.entries(PAGES).map(([tr, en]) => [en, tr]),
);

export function getLang(pathname) {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "tr";
}

/** Türkçe bir yolu (sorgu dizesiyle birlikte) istenen dile çevirir. */
export function toLang(trPath, lang) {
  if (lang !== "en") return trPath;
  const [path, query] = trPath.split("?");
  const [first, second, ...rest] = path.split("/").filter(Boolean);
  if (!first) return `/en${query ? `?${query}` : ""}`;

  let slug = second;
  if (first === "hizmetler" && second) {
    slug = trData.services.find((s) => s.slug === second)?.slugEn ?? second;
  }
  if (first === "blog" && second) {
    slug = posts.find((p) => p.slug === second)?.slugEn ?? second;
  }
  const parts = [PAGES[first] ?? first, slug, ...rest].filter(Boolean);
  let q = query;
  if (first === "iletisim" && q) {
    const p = new URLSearchParams(q);
    const svc = trData.services.find((s) => s.slug === p.get("hizmet"));
    q = svc ? `service=${svc.slugEn}` : "";
  }
  return `/en/${parts.join("/")}${q ? `?${q}` : ""}`;
}

/** Herhangi bir dildeki yolu Türkçe karşılığına çevirir. */
export function toTr(pathname) {
  if (getLang(pathname) !== "en") return pathname;
  const [first, second, ...rest] = pathname
    .replace(/^\/en/, "")
    .split("/")
    .filter(Boolean);
  if (!first) return "/";

  let slug = second;
  if (first === "services" && second) {
    slug = trData.services.find((s) => s.slugEn === second)?.slug ?? second;
  }
  if (first === "blog" && second) {
    slug = posts.find((p) => p.slugEn === second)?.slug ?? second;
  }
  return `/${[PAGES_REV[first] ?? first, slug, ...rest].filter(Boolean).join("/")}`;
}

/* ------------------------------------------------------------- içerik */

/** Çeviriyi temel verinin üzerine yazar; diziler sıra ile eşlenir. */
function merge(base, over) {
  if (over === undefined) return base;
  if (Array.isArray(base) && Array.isArray(over)) {
    return base.map((b, i) => merge(b, over[i]));
  }
  if (base && typeof base === "object" && over && typeof over === "object") {
    const out = { ...base };
    for (const k of Object.keys(over)) out[k] = merge(base[k], over[k]);
    return out;
  }
  return over;
}

function buildContent(lang) {
  const base = {
    company: trData.company,
    nav: trData.nav,
    about: trData.about,
    services: trData.services,
    cases: trData.cases,
    references: trData.references,
    brandGuide: trData.brandGuide,
    stats: trData.stats,
    budgets: trData.budgets,
  };
  const d =
    lang === "en"
      ? {
          ...Object.fromEntries(
            Object.entries(base).map(([k, v]) => [k, merge(v, enData[k])]),
          ),
          references: base.references.map((r) => ({
            ...r,
            sector: enData.sectorNames[r.sector] ?? r.sector,
          })),
        }
      : base;

  d.refSectors = [
    strings[lang].common.all,
    ...Array.from(new Set(d.references.map((r) => r.sector))).sort((a, b) =>
      a.localeCompare(b, lang),
    ),
  ];
  return d;
}

const content = { tr: buildContent("tr"), en: buildContent("en") };

/* ---------------------------------------------------------------- hook */

export function useLang() {
  const { pathname } = useLocation();
  const lang = getLang(pathname);

  return useMemo(
    () => ({
      lang,
      t: strings[lang],
      d: content[lang],
      lp: (trPath) => toLang(trPath, lang),
      /** Hizmetin geçerli dildeki slug'ı */
      slugOf: (s) => (lang === "en" ? s.slugEn : s.slug),
    }),
    [lang],
  );
}
