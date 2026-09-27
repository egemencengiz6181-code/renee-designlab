/**
 * Derleme sonrası ön-çizim ve SEO denetimi.
 *
 * 1. Her adresi (TR + EN) tam HTML olarak dist/ altına yazar; arama
 *    motorları ve sosyal ağlar içeriği JavaScript beklemeden görür.
 * 2. dist/404.html ve dist/sitemap.xml dosyalarını üretir.
 * 3. Her sayfayı temel SEO kurallarına göre denetler. `--strict` ile
 *    hata bulunursa süreç başarısız olur (CI bunu kullanır).
 *
 * `npm run build` içinden çağrılır.
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIST = join(ROOT, "dist");
const SSR = join(ROOT, "dist-ssr");
const STRICT = process.argv.includes("--strict");

const { render, routes, headToHtml, SITE } = await import(
  pathToFileURL(join(SSR, "entry-server.js")).href
);
const template = await readFile(join(DIST, "index.html"), "utf8");

function page(html, head) {
  return template
    .replace(/<html lang="[^"]*"/, `<html lang="${head.lang}"`)
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, headToHtml(head).trimStart())
    .replace("<!--app-->", html);
}

/** "/en/about" → dist/en/about.html, "/" → dist/index.html */
function fileFor(url) {
  return url === "/" ? join(DIST, "index.html") : join(DIST, `${url}.html`);
}

async function write(file, content) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
}

/* ------------------------------------------------------------ denetim */

const errors = [];
const warnings = [];
const seen = { title: new Map(), description: new Map() };

function audit(url, html, head) {
  const e = (m) => errors.push(`${url}: ${m}`);
  const w = (m) => warnings.push(`${url}: ${m}`);

  if (!head) return e("sayfa useSeo çağırmıyor");
  const { title, description } = head;

  if (!title) e("başlık yok");
  else if (title.length > 60) w(`başlık ${title.length} karakter (≤60 önerilir)`);
  else if (title.length < 25) w(`başlık kısa: ${title.length} karakter`);

  if (!description) e("meta açıklama yok");
  else if (description.length > 160)
    w(`açıklama ${description.length} karakter (≤160 önerilir)`);
  else if (description.length < 70)
    w(`açıklama kısa: ${description.length} karakter`);

  for (const [k, v] of [
    ["title", title],
    ["description", description],
  ]) {
    if (!v) continue;
    if (seen[k].has(v)) e(`${k} şu sayfayla aynı: ${seen[k].get(v)}`);
    else seen[k].set(v, url);
  }

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) e(`${h1} adet <h1> var (tam 1 olmalı)`);

  const noAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/g) || []).length;
  if (noAlt) e(`${noAlt} görselde alt metni yok`);

  if (html.length < 2000) w("içerik çok az; sayfa boş çizilmiş olabilir");
}

/* ------------------------------------------------------------- çizim */

const pairs = routes();
const urls = [];
const heads = {};

for (const { tr, en } of pairs) {
  for (const url of [tr, en]) {
    const { html, head } = await render(url);
    audit(url, html, head);
    await write(fileFor(url), page(html, head));
    urls.push(url);
    heads[url] = head;
  }
}

{
  const { html, head } = await render("/404");
  await write(join(DIST, "404.html"), page(html, head));
}

/* ------------------------------------------------------------ sitemap */

const today = new Date().toISOString().slice(0, 10);
const priority = (p) => (p === "/" ? "1.0" : p.split("/").length > 2 ? "0.8" : "0.9");
const entries = pairs.flatMap(({ tr, en }) =>
  [tr, en].map(
    (loc) => `  <url>
    <loc>${SITE}${loc}</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="${SITE}${tr}" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${tr}" />
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${loc === tr ? priority(tr) : (priority(tr) - 0.1).toFixed(1)}</priority>
  </url>`,
  ),
);
await write(
  join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`,
);

/* ----------------------------------------------------------- llms.txt */

// Yapay zekâ tabanlı arama motorları için sitenin kısa bir haritası.
const line = (u) => `- [${heads[u].title}](${SITE}${u}): ${heads[u].description}`;
await write(
  join(DIST, "llms.txt"),
  `# Renee Design Lab

> ${heads["/"].description}

Ankara (ODTÜ Teknokent) merkezli tasarım ve reklam ajansı. İletişim: info@reneedesignlab.com · +90 532 504 66 06

## Türkçe

${pairs.map(({ tr }) => line(tr)).join("\n")}

## English

${pairs.map(({ en }) => line(en)).join("\n")}
`,
);

await rm(SSR, { recursive: true, force: true });

/* ------------------------------------------------------------- rapor */

console.log(`\nÖn-çizim: ${urls.length} sayfa + 404 · sitemap: ${urls.length} adres`);
if (warnings.length) {
  console.log(`\nSEO uyarıları (${warnings.length}):`);
  for (const m of warnings) console.log(`  ! ${m}`);
}
if (errors.length) {
  console.log(`\nSEO hataları (${errors.length}):`);
  for (const m of errors) console.log(`  ✗ ${m}`);
  if (STRICT) process.exit(1);
} else {
  console.log("SEO denetimi: hata yok ✓");
}
