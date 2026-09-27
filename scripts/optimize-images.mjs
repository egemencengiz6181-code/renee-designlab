/**
 * public/media altındaki JPG/PNG görsellerin WebP kopyalarını üretir ve
 * tüm görsellerin piksel ölçülerini src/data/media-dims.json'a yazar.
 * Ölçüler, <img> etiketlerine width/height vermek (CLS'yi önlemek) için
 * kullanılır.
 *
 *   npm run images
 *
 * Yeni bir görsel eklediğinizde bu komutu çalıştırıp kodda .webp yolunu
 * kullanın. Mevcut WebP dosyaları, kaynak dosyadan yeniyse atlanır.
 */
import { readdir, stat, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("../public", import.meta.url));
const MEDIA = join(ROOT, "media");
const OUT = fileURLToPath(
  new URL("../src/data/media-dims.json", import.meta.url),
);
const SKIP_WEBP = ["media/docs/"];
// Arayüzde en fazla ~100px gösterilen marka ikonları için küçültülmüş
// kopya (-sm.webp) üretilir; marka işareti büyük gösterildiği için tam boyut kalır; PNG asılları favicon/paylaşım için kalır.
const SMALL = /media\/brand\/renee-star[^/]*\.png$/;
const SMALL_PX = 128;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const dims = {};
let made = 0;

for await (const file of walk(MEDIA)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const rel = "/" + relative(ROOT, file);
  const meta = await sharp(file).metadata();
  dims[rel] = [meta.width, meta.height];

  if (!/\.(jpe?g|png)$/i.test(file) || SKIP_WEBP.some((s) => rel.includes(s)))
    continue;

  const small = SMALL.test(rel);
  const suffix = small ? "-sm.webp" : ".webp";
  const webp = file.replace(/\.(jpe?g|png)$/i, suffix);
  const [w, h] = dims[rel];
  dims[rel.replace(/\.(jpe?g|png)$/i, suffix)] = small
    ? [SMALL_PX, Math.round((h / w) * SMALL_PX)]
    : dims[rel];

  const outTime = await stat(webp).then((x) => x.mtimeMs, () => 0);
  if (outTime > (await stat(file)).mtimeMs) continue;

  let img = sharp(file);
  if (small) img = img.resize({ width: SMALL_PX });
  await img
    .webp({ quality: /\.png$/i.test(file) ? 90 : 80, effort: 5 })
    .toFile(webp);
  made++;
}

const sorted = Object.fromEntries(
  Object.entries(dims).sort(([a], [b]) => a.localeCompare(b)),
);
await writeFile(OUT, JSON.stringify(sorted, null, 0).replace(/\],/g, "],\n") + "\n");
console.log(`WebP üretildi: ${made} · ölçü kaydı: ${Object.keys(dims).length}`);
