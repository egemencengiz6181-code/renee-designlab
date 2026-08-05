# Renee Design Lab — Web Sitesi

Renee Design Lab için hazırlanmış çok sayfalı React sitesi. Tüm metin, görsel ve
renk kararları `içerik/` klasöründeki **Kurumsal Kimlik Rehberi** ve **Marka
Hizmet Sunumu** dokümanlarından türetilmiştir.

## Çalıştırma

```bash
cd site
npm install
npm run dev      # geliştirme sunucusu
npm run build    # üretim derlemesi -> dist/
npm run preview  # derlemeyi yerelde önizle
```

## Sayfalar

| Yol | Sayfa |
| --- | --- |
| `/` | Anasayfa |
| `/hakkimizda` | Hakkımızda — biz kimiz, misyon, vizyon, kültür, süreç |
| `/hizmetler` | Hizmetler listesi |
| `/hizmetler/:slug` | 10 hizmetin ayrı sayfası |
| `/calismalar` | Çalışmalar (vaka incelemeleri) |
| `/calismalar/:slug` | Arni, Deru, ERTS, Every, Peralta, Tepsta |
| `/referanslar` | 36 referans markanın logo galerisi |
| `/kurumsal-kimlik` | Renee kurumsal kimlik rehberi |
| `/iletisim` | İletişim ve teklif formu |

## Kurumsal kimlik

Rehberden alınan değerler `src/styles/global.css` içindeki değişkenlerde tanımlıdır:

- **Mor** `#8766e8` · **Limon** `#c9fc4a` · **Siyah** `#000000`
- Ana tipografi **Helvetica Neue**, vurgular için **Instrument Serif** (italik)
- Marka işareti (dört köşeli yıldız + yay) `src/components/Mark.jsx` içinde SVG olarak

## İçerik nasıl güncellenir?

Sitedeki neredeyse tüm metin tek bir dosyada toplanmıştır:

```
src/data/site.js
```

- `company` — telefon, e-posta, adres
- `services` — hizmetler, kapsam maddeleri, SSS
- `cases` — vaka incelemeleri, görseller ve açıklamaları
- `references` — referans markalar ve sektörleri
- `brandGuide` — kurumsal kimlik sayfası içeriği

Görseller `public/media/` altındadır: `brand/`, `general/`, `refs/`,
`work/<marka>/`, `docs/` (indirilebilir PDF'ler).

## Teknik notlar

- **Vite + React + React Router**; sayfalar `lazy()` ile ayrı paketlere bölünür.
- Animasyonlar harici kütüphane olmadan CSS ve küçük yardımcı kancalarla yapılır
  (`src/components/Reveal.jsx`, `src/hooks/useParallax.js`). Ekranda görünen
  içerik boyama öncesinde açılır; hiçbir bölüm gizli kalmaz.
- `prefers-reduced-motion` tercih edildiğinde tüm hareketler kapanır.
- SEO: sayfa başına başlık/açıklama/canonical (`src/hooks/useSeo.js`),
  `public/sitemap.xml`, `public/robots.txt` ve `index.html` içinde JSON-LD.
- Tek sayfa uygulaması olduğu için derin bağlantıların çalışması adına sunucuda
  yönlendirme gerekir: Netlify için `public/_redirects`, Vercel için `vercel.json`
  hazır durumdadır.

## İletişim formu

Form şu an sunucusuz çalışır; gönderildiğinde bilgilerle hazır bir e-posta
taslağı açar. Sunucu tarafı bir uç nokta eklendiğinde `src/pages/Contact.jsx`
içindeki `onSubmit` fonksiyonunu `fetch` çağrısıyla değiştirmek yeterlidir.
