/* eslint-disable react/only-export-components -- sunucu girişi; tarayıcıda hızlı yenilemeye girmez */
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { cases, services } from "./data/site";
import { toLang } from "./i18n";
import { collectHead } from "./seo/head";

export { headToHtml, SITE } from "./seo/head";

/**
 * Ön-çizilecek tüm adresler, Türkçe–İngilizce çiftleri hâlinde.
 * Yeni bir sayfa ya da hizmet eklendiğinde buraya kendiliğinden girer.
 */
export function routes() {
  const tr = [
    "/",
    "/hakkimizda",
    "/hizmetler",
    ...services.map((s) => `/hizmetler/${s.slug}`),
    "/calismalar",
    ...cases.map((c) => `/calismalar/${c.slug}`),
    "/referanslar",
    "/kurumsal-kimlik",
    "/iletisim",
  ];
  return tr.map((p) => ({ tr: p, en: toLang(p, "en") }));
}

async function streamToString(stream) {
  let out = "";
  for await (const chunk of stream) out += chunk;
  return out;
}

/** Bir adresi tam HTML'e çizer; lazy sayfaların yüklenmesini bekler. */
export async function render(url) {
  const box = {};
  collectHead(box);
  try {
    const { prelude } = await prerenderToNodeStream(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
      // Büyük Suspense blokları dışarı alınıp betikle yerine taşınmasın;
      // içerik yerinde yazılsın (sayfa kaymaz, JS'siz tarayıcı da görür).
      { progressiveChunkSize: Number.MAX_SAFE_INTEGER },
    );
    return { html: await streamToString(prelude), head: box.head };
  } finally {
    collectHead(null);
  }
}
