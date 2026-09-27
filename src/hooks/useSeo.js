import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLang, toLang } from "../i18n";

const SITE = "https://reneedesignlab.com";

const DEFAULT_TITLE = {
  tr: "Renee Design Lab — Yaratıcılığın işaret ettiği sınırların ötesinde",
  en: "Renee Design Lab — Beyond the boundaries creativity points to",
};

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) || [];
    if (key && val) el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel, href, hreflang) {
  const sel = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let link = document.head.querySelector(sel);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    if (hreflang) link.setAttribute("hreflang", hreflang);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

/**
 * Sayfa başına başlık, açıklama, canonical, hreflang ve Open Graph
 * etiketlerini yazar. `path` her zaman Türkçe yol olarak verilir.
 */
export default function useSeo({ title, description, path = "", image }) {
  const { pathname } = useLocation();
  const lang = getLang(pathname);

  useEffect(() => {
    const full = title
      ? `${title} — Renee Design Lab`
      : DEFAULT_TITLE[lang];
    const url = `${SITE}${toLang(path, lang)}`;

    document.title = full;
    document.documentElement.lang = lang;

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
    }

    setMeta('meta[property="og:title"]', "content", full);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta(
      'meta[property="og:locale"]',
      "content",
      lang === "en" ? "en_US" : "tr_TR",
    );

    if (image) {
      setMeta('meta[property="og:image"]', "content", `${SITE}${image}`);
    }

    setLink("canonical", url);
    setLink("alternate", `${SITE}${path}`, "tr");
    setLink("alternate", `${SITE}${toLang(path, "en")}`, "en");
    setLink("alternate", `${SITE}${path}`, "x-default");
  }, [title, description, path, image, lang]);
}
