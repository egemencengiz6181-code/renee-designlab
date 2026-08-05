import { useEffect } from "react";

const SITE = "https://reneedesignlab.com";

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

/**
 * Sayfa başına başlık, açıklama, canonical ve Open Graph etiketlerini yazar.
 */
export default function useSeo({ title, description, path = "", image }) {
  useEffect(() => {
    const full = title
      ? `${title} — Renee Design Lab`
      : "Renee Design Lab — Yaratıcılığın işaret ettiği sınırların ötesinde";

    document.title = full;

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
    }

    setMeta('meta[property="og:title"]', "content", full);
    setMeta('meta[property="og:url"]', "content", `${SITE}${path}`);

    if (image) {
      setMeta('meta[property="og:image"]', "content", `${SITE}${image}`);
    }

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", `${SITE}${path}`);
  }, [title, description, path, image]);
}
