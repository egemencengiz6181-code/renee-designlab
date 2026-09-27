import dims from "./media-dims.json";

/**
 * Görselin gerçek piksel ölçülerini <img> için width/height olarak verir;
 * tarayıcı yeri önceden ayırır ve sayfa kaymaz (CLS).
 * Ölçüler `npm run images` ile güncellenir.
 */
export function size(src) {
  const d = dims[src];
  return d ? { width: d[0], height: d[1] } : {};
}
