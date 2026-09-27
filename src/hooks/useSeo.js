import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLang } from "../i18n";
import { applyHead, buildHead, emitHead } from "../seo/head";

/**
 * Sayfa başına başlık, açıklama, canonical, hreflang, Open Graph ve
 * yapılandırılmış veri (JSON-LD) etiketlerini yazar.
 *
 * `path` her zaman Türkçe yol olarak verilir; dile göre çevrilir.
 * `title` marka adıyla birleştirilir, `fullTitle` olduğu gibi kullanılır.
 */
export default function useSeo(opts) {
  const { pathname } = useLocation();
  const head = buildHead({ ...opts, lang: getLang(pathname) });

  // Ön-çizimde effect çalışmaz; head doğrudan toplayıcıya verilir.
  if (import.meta.env.SSR) emitHead(head);

  const key = JSON.stringify(head);
  useEffect(() => {
    applyHead(JSON.parse(key));
  }, [key]);
}
