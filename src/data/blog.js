/* ==========================================================================
   Blog yazıları
   Her yazı Türkçe ve İngilizce içerir; `service` alanı yazının desteklediği
   hizmetin (Türkçe) slug'ıdır ve yazı o hizmet sayfasına bağlantı verir.

   Gövde blokları:
     ["h", "Ara başlık"]   → <h2>
     ["p", "Paragraf"]     → <p>
     ["ul", ["madde", …]]  → <ul>

   Yeni yazı eklemek için diziye bir nesne eklemek yeterlidir; sayfa, sitemap,
   llms.txt ve yapılandırılmış veri derlemede kendiliğinden üretilir.
   ========================================================================== */

export const posts = [
  {
    slug: "kurumsal-kimlik-tasarimi-nedir",
    slugEn: "what-is-corporate-identity-design",
    date: "2026-10-04",
    service: "kurumsal-kimlik-tasarimi",
    cover: "/media/services/kurumsal-kimlik.webp",
    tr: {
      title: "Kurumsal Kimlik Tasarımı Nedir, Neleri Kapsar?",
      seoTitle: "Kurumsal Kimlik Tasarımı Nedir? Kapsamı ve Süreci",
      description:
        "Kurumsal kimlik tasarımı nedir, logodan farkı ne, hangi unsurları kapsar? Kimlik rehberinden basılı ve dijital uygulamalara kadar adım adım anlatıyoruz.",
      excerpt:
        "Logo, kimliğin yalnızca bir parçası. Kurumsal kimlik; renkten tipografiye, kartvizitten sosyal medyaya kadar markanızın her temas noktasını yöneten bir sistemdir.",
      coverAlt: "Kurumsal kimliğin bina cephesindeki bayrak uygulaması",
      body: [
        [
          "p",
          "Bir markayı ilk kez gördüğümüzde aklımızda kalan şey çoğu zaman tek bir unsur değil, bir bütündür: logonun biçimi, renkleri, yazı karakteri, kartvizitin dokusu, web sitesinin düzeni. Kurumsal kimlik tasarımı, bu bütünü bilinçli olarak kurma işidir. Amaç, markanızın kim olduğunu her temas noktasında aynı dille anlatmaktır.",
        ],
        ["h", "Kurumsal kimlik ile logo arasındaki fark"],
        [
          "p",
          "Logo, kimliğin en görünür parçasıdır ama tek başına bir kimlik değildir. Kurumsal kimlik; logoyla birlikte renk paletini, tipografiyi, görsel dili, basılı ve dijital uygulamaları ve tüm bunların nasıl kullanılacağını tarif eden kuralları kapsar. Logosu güzel olan ama her mecrada farklı renk ve yazı karakteriyle görünen bir marka, akılda tutarlı bir iz bırakamaz.",
        ],
        ["h", "Kurumsal kimlik neleri kapsar?"],
        [
          "ul",
          [
            "Logo sistemi: ana logo, ikincil kilitler, marka simgesi, yatay–dikey ve tek renk versiyonlar",
            "Renk paleti: ana ve yardımcı renkler; baskı (CMYK) ve ekran (RGB, HEX) karşılıklarıyla",
            "Tipografi: başlık ve metin yazı karakterleri, hiyerarşi ve kullanım kuralları",
            "Görsel dil: ikonlar, desenler, fotoğraf ve illüstrasyon yaklaşımı",
            "Basılı uygulamalar: kartvizit, antetli kağıt, zarf, dosya, etiket ve ambalaj",
            "Dijital uygulamalar: sosyal medya şablonları, sunum şablonu, e-posta imzası",
            "Kurumsal kimlik rehberi: tüm bu unsurların doğru kullanımını anlatan kılavuz",
          ],
        ],
        ["h", "Neden önemli?"],
        [
          "p",
          "İyi tasarlanmış ve tutarlı uygulanan bir kimlik, müşterilerin ve paydaşların markanızı tanımasını ve ona güvenmesini kolaylaştırır. Ayrıca ekibinizin işini de hızlandırır: yeni bir broşür, sunum ya da sosyal medya gönderisi hazırlanırken her seferinde sıfırdan karar vermek gerekmez; kurallar zaten bellidir. Kimlik, markayı rakiplerinden ayıran değerleri ve kişiliği görünür hale getirir.",
        ],
        ["h", "Kurumsal kimlik tasarım süreci"],
        [
          "p",
          "Renee'de kimlik çalışmaları dört adımda ilerler. Önce keşif ve analizle markanın hedeflerini, hedef kitlesini ve rakiplerini anlarız. Ardından marka stratejisini ve konsepti netleştiririz. Tasarım aşamasında logo sistemi, renk ve tipografi kurulur, uygulamalar üretilir. Son aşamada sunum ve revizyon turlarıyla tasarımı birlikte olgunlaştırır, tüm dosyaları kimlik rehberiyle birlikte teslim ederiz.",
        ],
        ["h", "Kimlik rehberi neden gerekli?"],
        [
          "p",
          "Kimlik rehberi, tasarımın ajans dışında da doğru uygulanmasını sağlar. Matbaa, tabelacı, yazılım ekibi ya da yeni bir çalışan; herkes logonun minimum boyutunu, güvenli alanını, hangi zeminde hangi versiyonun kullanılacağını ve renk kodlarını tek bir dokümandan öğrenir. Kendi kimlik rehberimizi Kurumsal Kimlik sayfamızda açık olarak paylaşıyoruz; nasıl bir yapı kurduğumuzu oradan inceleyebilirsiniz.",
        ],
        ["h", "Ne zaman yenilenmeli?"],
        [
          "p",
          "Markanız büyüyüp yeni hizmet alanlarına açıldıysa, hedef kitleniz değiştiyse ya da mevcut kimlik dijital mecralarda zayıf kalıyorsa yenileme zamanı gelmiş olabilir. Yenileme her zaman sıfırdan başlamak anlamına gelmez; çoğu zaman tanınırlığı koruyarak logoyu sadeleştirmek ve sistemi güncel ihtiyaçlara göre genişletmek yeterlidir.",
        ],
      ],
    },
    en: {
      title: "What Is Corporate Identity Design and What Does It Include?",
      seoTitle: "What Is Corporate Identity Design? Scope and Process",
      description:
        "What is corporate identity design, how is it different from a logo, and what does it include? From brand guidelines to print and digital applications.",
      excerpt:
        "A logo is only one part of an identity. A corporate identity is a system that governs every touchpoint of your brand, from color and typography to business cards and social media.",
      coverAlt: "Flag application of a corporate identity on a building facade",
      body: [
        [
          "p",
          "When we see a brand for the first time, what stays with us is rarely a single element; it's the whole: the shape of the logo, its colors, the typeface, the feel of the business card, the layout of the website. Corporate identity design is the work of building that whole on purpose. The goal is to tell who your brand is in the same language at every touchpoint.",
        ],
        ["h", "Corporate identity vs. logo"],
        [
          "p",
          "The logo is the most visible part of an identity, but on its own it isn't an identity. A corporate identity covers the color palette, typography, visual language, print and digital applications, and the rules for using them, together with the logo. A brand with a beautiful logo that appears in different colors and typefaces on every channel cannot leave a consistent impression.",
        ],
        ["h", "What does a corporate identity include?"],
        [
          "ul",
          [
            "Logo system: primary logo, secondary lockups, brand symbol, horizontal, vertical and single-color versions",
            "Color palette: primary and supporting colors with print (CMYK) and screen (RGB, HEX) values",
            "Typography: heading and body typefaces, hierarchy and usage rules",
            "Visual language: icons, patterns, photography and illustration approach",
            "Print applications: business card, letterhead, envelope, folder, labels and packaging",
            "Digital applications: social media templates, presentation template, email signature",
            "Brand guidelines: the manual that explains how to use all of these correctly",
          ],
        ],
        ["h", "Why does it matter?"],
        [
          "p",
          "A well-designed and consistently applied identity makes it easier for customers and stakeholders to recognize and trust your brand. It also speeds up your team's work: when preparing a new brochure, presentation or social media post, there's no need to decide everything from scratch, because the rules are already set. An identity makes the values and personality that set your brand apart visible.",
        ],
        ["h", "The corporate identity design process"],
        [
          "p",
          "At Renee, identity projects move through four steps. First, through discovery and analysis, we understand the brand's goals, audience and competitors. Then we clarify the brand strategy and concept. In the design phase we build the logo system, color and typography, and produce the applications. Finally, through presentation and revision rounds we refine the design together and deliver all files along with the brand guidelines.",
        ],
        ["h", "Why do you need brand guidelines?"],
        [
          "p",
          "Brand guidelines make sure the design is applied correctly outside the agency too. Printers, sign makers, developers or a new team member can all learn the logo's minimum size, clear space, which version to use on which background and the color codes from a single document. We share our own brand guidelines openly on our Brand Identity page, so you can see the kind of structure we build.",
        ],
        ["h", "When should you refresh it?"],
        [
          "p",
          "If your brand has grown into new service areas, your audience has changed, or your current identity looks weak on digital channels, it may be time for a refresh. A refresh doesn't always mean starting from scratch; often it's enough to simplify the logo while keeping its recognition and extend the system for today's needs.",
        ],
      ],
    },
  },
  {
    slug: "logo-tasarim-sureci",
    slugEn: "logo-design-process",
    date: "2026-10-04",
    service: "logo-tasarimi",
    cover: "/media/services/logo-tasarimi.webp",
    tr: {
      title: "Logo Tasarım Süreci Adım Adım: Keşiften Teslimata",
      seoTitle: "Logo Tasarım Süreci Adım Adım: Keşiften Teslimata",
      description:
        "Profesyonel logo tasarımı nasıl yapılır? Keşif görüşmesinden konsept, revizyon ve dosya teslimine kadar logo tasarım sürecinin tüm adımlarını anlatıyoruz.",
      excerpt:
        "İyi bir logo bir anda çizilmez; markayı anlamakla başlayan, konseptlerle olgunlaşan ve her boyutta test edilen bir sürecin sonucudur.",
      coverAlt: "Tipografik marka duvarı uygulaması",
      body: [
        [
          "p",
          "Logo, bir markanın yüzüdür ve markalaşma sürecindeki tüm tasarım unsurlarının üzerine inşa edildiği temeldir. Bu yüzden iyi bir logo, bir anda çizilen bir simge değil; markayı anlamakla başlayan ve dikkatle test edilen bir sürecin sonucudur. Aşağıda bir logo projesinin hangi adımlardan geçtiğini anlatıyoruz.",
        ],
        ["h", "1. Keşif görüşmesi"],
        [
          "p",
          "Süreç markanızı tanımakla başlar. Ne yapıyorsunuz, kime hitap ediyorsunuz, rakipleriniz kimler, markanızın nasıl algılanmasını istiyorsunuz? Bu görüşmede beğendiğiniz ve beğenmediğiniz örnekleri konuşmak da yön bulmayı kolaylaştırır.",
        ],
        ["h", "2. Araştırma ve moodboard"],
        [
          "p",
          "Keşiften çıkan bilgilerle sektörü ve rakipleri inceler, markanın ayrışabileceği alanı ararız. Ardından renk, biçim ve tipografi yönlerini gösteren bir moodboard hazırlarız. Moodboard, çizime başlamadan önce görsel yön üzerinde uzlaşmayı sağlar.",
        ],
        ["h", "3. Konsept geliştirme"],
        [
          "p",
          "Bu aşamada birbirinden ayrışan konseptler üretilir. Her konsept markanın hikayesini farklı bir yoldan anlatır: kimi tipografik, kimi bir simgeye dayalı, kimi ikisinin birleşimi. Konseptleri yalnızca beyaz zeminde değil, gerçek kullanım örnekleri üzerinde sunarız; böylece logonun kartvizitte, uygulama ikonunda ya da tabelada nasıl duracağını görebilirsiniz.",
        ],
        ["h", "4. Detaylandırma ve revizyon"],
        [
          "p",
          "Seçilen yön üzerinde çalışmaya devam ederiz. Oranlar, harf aralıkları, çizgi kalınlıkları ve renkler ince ayardan geçer. Geri bildirimleriniz doğrultusunda revizyon turları yapılır. Bu aşamada logonun farklı boyutlarda okunabilirliği de test edilir.",
        ],
        ["h", "5. Varyasyonlar ve kullanım kuralları"],
        [
          "ul",
          [
            "Ana logo, ikincil kilit ve marka simgesi",
            "Yatay, dikey ve tek renk versiyonlar",
            "Açık ve koyu zemin uygulamaları",
            "Minimum kullanım ölçüleri ve güvenli alan tanımı",
            "Renk kodları (CMYK, RGB, HEX)",
          ],
        ],
        ["h", "6. Teslim"],
        [
          "p",
          "Son aşamada vektörel kaynak dosyaları ve baskı ile dijital kullanım için hazırlanmış tüm formatları, kullanım kurallarıyla birlikte teslim ederiz. Tescil başvurusu gibi hukuki süreçler için dosyalar uygun formatlarda sağlanır.",
        ],
        ["h", "İyi bir logonun özellikleri"],
        [
          "p",
          "İyi bir logo sade, ayırt edici ve akılda kalıcıdır; küçük bir ikon boyutunda da büyük bir cephede de okunur, tek renkte bile çalışır ve moda akımlara değil markanın stratejisine dayanır. Logonuzu kurumsal kimliğin geri kalanıyla birlikte düşünmek, uzun vadede en sağlıklı sonucu verir.",
        ],
      ],
    },
    en: {
      title: "The Logo Design Process Step by Step: From Discovery to Delivery",
      seoTitle: "The Logo Design Process Step by Step",
      description:
        "How is a professional logo designed? From the discovery call to concepts, revisions and file delivery, we walk through every step of the logo design process.",
      excerpt:
        "A good logo isn't drawn in a moment; it's the result of a process that starts with understanding the brand, matures through concepts and is tested at every size.",
      coverAlt: "Typographic brand wall application",
      body: [
        [
          "p",
          "A logo is the face of a brand and the foundation on which every design element in the branding process is built. That's why a good logo isn't a symbol drawn in a moment; it's the result of a process that starts with understanding the brand and is carefully tested. Below we explain the steps a logo project goes through.",
        ],
        ["h", "1. Discovery call"],
        [
          "p",
          "The process starts with getting to know your brand. What do you do, who do you speak to, who are your competitors, how do you want your brand to be perceived? Talking about examples you like and dislike also helps find direction.",
        ],
        ["h", "2. Research and moodboard"],
        [
          "p",
          "With what we learn in discovery, we study the industry and competitors and look for the space where the brand can stand apart. Then we prepare a moodboard showing directions for color, form and typography. The moodboard creates agreement on the visual direction before drawing begins.",
        ],
        ["h", "3. Concept development"],
        [
          "p",
          "In this phase we produce distinct concepts. Each tells the brand's story in a different way: some typographic, some built on a symbol, some a combination of both. We present concepts not only on a white background but on real usage examples, so you can see how the logo will look on a business card, an app icon or a sign.",
        ],
        ["h", "4. Refinement and revisions"],
        [
          "p",
          "We keep working on the chosen direction. Proportions, letter spacing, stroke weights and colors are fine-tuned, and revision rounds follow your feedback. In this phase we also test the logo's legibility at different sizes.",
        ],
        ["h", "5. Variations and usage rules"],
        [
          "ul",
          [
            "Primary logo, secondary lockup and brand symbol",
            "Horizontal, vertical and single-color versions",
            "Applications on light and dark backgrounds",
            "Minimum sizes and clear space definitions",
            "Color codes (CMYK, RGB, HEX)",
          ],
        ],
        ["h", "6. Delivery"],
        [
          "p",
          "Finally, we deliver vector source files and all formats prepared for print and digital use, together with usage guidelines. For legal processes such as trademark registration, files are provided in suitable formats.",
        ],
        ["h", "What makes a good logo"],
        [
          "p",
          "A good logo is simple, distinctive and memorable; it's legible both as a small icon and on a large facade, works even in a single color, and is built on the brand's strategy rather than passing trends. Thinking about your logo together with the rest of your corporate identity gives the healthiest result in the long run.",
        ],
      ],
    },
  },
  {
    slug: "kurumsal-web-sitesi-seo-kontrol-listesi",
    slugEn: "corporate-website-seo-checklist",
    date: "2026-10-04",
    service: "dijital-pazarlama-seo",
    cover: "/media/services/seo.webp",
    tr: {
      title: "Kurumsal Web Siteleri İçin 10 Maddelik SEO Kontrol Listesi",
      seoTitle: "Kurumsal Web Sitesi İçin 10 Maddelik SEO Kontrol Listesi",
      description:
        "Kurumsal web sitenizin Google'da görünür olması için kontrol etmeniz gereken 10 temel SEO maddesi: teknik altyapı, başlıklar, hız, yerel SEO ve daha fazlası.",
      excerpt:
        "Güzel bir web sitesi, aranmadığı sürece bulunmaz. Sitenizin arama motorlarında görünür olması için kontrol etmeniz gereken 10 temel madde.",
      coverAlt: "Arama motoru performansının izlendiği analiz ekranı",
      body: [
        [
          "p",
          "Bir web sitesi ne kadar iyi tasarlanmış olursa olsun, hizmetinizi arayan kişi onu bulamıyorsa işini yapamaz. Arama motoru optimizasyonu (SEO), sitenizin doğru aramalarda görünmesini sağlayan teknik ve içerik çalışmalarının bütünüdür. Aşağıdaki liste, kurumsal bir sitede ilk kontrol edilmesi gereken temel maddeleri içeriyor.",
        ],
        ["h", "1. Her sayfanın kendine ait başlığı ve açıklaması olsun"],
        [
          "p",
          "Arama sonuçlarında görünen başlık ve açıklama, sayfanın vitrinidir. Her sayfa için içeriği anlatan, ana anahtar kelimeyi barındıran benzersiz bir başlık (yaklaşık 60 karakter) ve açıklama (yaklaşık 155 karakter) yazın. Tüm sayfalarda aynı başlığın görünmesi en sık yapılan hatalardandır.",
        ],
        ["h", "2. Tek bir H1 ve mantıklı bir başlık yapısı kullanın"],
        [
          "p",
          "Her sayfada sayfanın konusunu söyleyen tek bir ana başlık (H1) olmalı; alt bölümler H2 ve H3 ile sıralanmalıdır. Bu yapı hem okuyucunun hem arama motorunun içeriği anlamasını kolaylaştırır.",
        ],
        ["h", "3. İçerik, JavaScript beklemeden görünür olsun"],
        [
          "p",
          "Modern web siteleri içeriği çoğu zaman tarayıcıda JavaScript ile oluşturur. Arama motorları bunu işleyebilse de, sayfaların önceden oluşturulmuş HTML olarak sunulması taramayı hızlandırır ve sosyal medya önizlemelerinin doğru görünmesini sağlar.",
        ],
        ["h", "4. Site hızına ve mobil deneyime bakın"],
        [
          "p",
          "Ziyaretçilerin büyük bölümü siteye telefondan gelir. Görselleri WebP gibi modern formatlarda ve doğru boyutta sunmak, sayfa yüklenirken içeriğin kaymasını önlemek ve gereksiz kodu azaltmak, hem kullanıcı deneyimini hem sıralamayı iyileştirir. Google'ın PageSpeed Insights aracıyla kendi sitenizi ölçebilirsiniz.",
        ],
        ["h", "5. Tek bir adres seçin: www mi, değil mi?"],
        [
          "p",
          "Siteniz hem www'li hem www'siz adreste açılıyorsa biri diğerine kalıcı olarak yönlenmeli ve sayfalardaki canonical etiketi asıl adresi göstermelidir. Aksi halde Google aynı içeriği iki farklı adreste görür.",
        ],
        ["h", "6. Site haritası ve robots.txt"],
        [
          "p",
          "Sitenizdeki tüm önemli sayfaları listeleyen bir sitemap.xml dosyası hazırlayın ve Google Search Console'a gönderin. robots.txt dosyasının önemli sayfaları yanlışlıkla engellemediğinden emin olun.",
        ],
        ["h", "7. Eski adresleri yönlendirin"],
        [
          "p",
          "Siteyi yenilediyseniz eski sayfaların adresleri değişmiş olabilir. Google'da indekslenmiş eski adresleri yeni karşılıklarına 301 ile yönlendirmek, yıllar içinde biriken sıralama gücünü korur ve ziyaretçilerin hata sayfasıyla karşılaşmasını önler.",
        ],
        ["h", "8. Yapılandırılmış veri ekleyin"],
        [
          "p",
          "Schema.org yapılandırılmış verisi, arama motorlarına işletmenizi, hizmetlerinizi ve sık sorulan sorularınızı makine tarafından okunabilir biçimde anlatır. Doğru kurulduğunda arama sonuçlarında daha zengin görünümlerin önünü açar.",
        ],
        ["h", "9. Yerel SEO'yu ihmal etmeyin"],
        [
          "p",
          "Belirli bir şehirde hizmet veriyorsanız Google İşletme Profili oluşturun; işletme adı, adres ve telefon bilgilerinin sitede, profilde ve diğer platformlarda birebir aynı olmasına dikkat edin. Müşteri yorumları yerel aramalarda belirleyici bir sinyaldir.",
        ],
        ["h", "10. Düzenli içerik ve ölçüm"],
        [
          "p",
          "SEO tek seferlik bir iş değildir. Hedef kitlenizin sorduğu sorulara cevap veren rehber içerikler yayınlamak ve Search Console verilerini düzenli izlemek, hangi aramalarda görünür olduğunuzu ve neyi iyileştirmeniz gerektiğini gösterir.",
        ],
      ],
    },
    en: {
      title: "A 10-Point SEO Checklist for Corporate Websites",
      seoTitle: "A 10-Point SEO Checklist for Corporate Websites",
      description:
        "The 10 essential SEO points to check so your corporate website is visible on Google: technical setup, titles, speed, local SEO and more.",
      excerpt:
        "A beautiful website isn't found unless people can find it in search. Here are 10 essential points to check so your site is visible in search engines.",
      coverAlt: "Analytics screen tracking search engine performance",
      body: [
        [
          "p",
          "No matter how well a website is designed, it can't do its job if people searching for your service can't find it. Search engine optimization (SEO) is the combination of technical and content work that makes your site appear in the right searches. The list below covers the essentials to check first on a corporate website.",
        ],
        ["h", "1. Give every page its own title and description"],
        [
          "p",
          "The title and description shown in search results are the page's shop window. Write a unique title (around 60 characters) and description (around 155 characters) for each page that describes its content and includes the main keyword. Showing the same title on every page is one of the most common mistakes.",
        ],
        ["h", "2. Use a single H1 and a logical heading structure"],
        [
          "p",
          "Each page should have a single main heading (H1) stating its topic, with sub-sections organized under H2 and H3. This structure helps both readers and search engines understand the content.",
        ],
        ["h", "3. Make content visible without waiting for JavaScript"],
        [
          "p",
          "Modern websites often build content in the browser with JavaScript. Search engines can process it, but serving pages as pre-rendered HTML speeds up crawling and makes social media previews display correctly.",
        ],
        ["h", "4. Check site speed and the mobile experience"],
        [
          "p",
          "Most visitors arrive on their phones. Serving images in modern formats like WebP at the right size, preventing content from shifting while the page loads and reducing unnecessary code improve both user experience and rankings. You can measure your own site with Google's PageSpeed Insights.",
        ],
        ["h", "5. Choose one address: www or not?"],
        [
          "p",
          "If your site opens both with and without www, one should permanently redirect to the other and the canonical tag on each page should point to the main address. Otherwise Google sees the same content at two different addresses.",
        ],
        ["h", "6. Sitemap and robots.txt"],
        [
          "p",
          "Prepare a sitemap.xml file listing all the important pages on your site and submit it to Google Search Console. Make sure robots.txt doesn't accidentally block important pages.",
        ],
        ["h", "7. Redirect old URLs"],
        [
          "p",
          "If you've rebuilt your site, the URLs of old pages may have changed. Redirecting old indexed URLs to their new counterparts with a 301 preserves ranking strength built up over the years and keeps visitors from landing on an error page.",
        ],
        ["h", "8. Add structured data"],
        [
          "p",
          "Schema.org structured data describes your business, services and frequently asked questions to search engines in a machine-readable way. Set up correctly, it opens the door to richer appearances in search results.",
        ],
        ["h", "9. Don't neglect local SEO"],
        [
          "p",
          "If you serve a specific city, create a Google Business Profile and make sure your business name, address and phone number are exactly the same on your site, your profile and other platforms. Customer reviews are a decisive signal in local search.",
        ],
        ["h", "10. Regular content and measurement"],
        [
          "p",
          "SEO isn't a one-off job. Publishing guides that answer your audience's questions and regularly reviewing Search Console data shows which searches you appear in and what needs improving.",
        ],
      ],
    },
  },
  {
    slug: "sosyal-medya-yonetimi-rehberi",
    slugEn: "social-media-management-guide",
    date: "2026-10-04",
    service: "sosyal-medya-yonetimi",
    cover: "/media/services/sosyal-medya.webp",
    tr: {
      title: "Sosyal Medya Yönetimi: Ajansla Çalışmadan Önce Bilmeniz Gerekenler",
      seoTitle: "Sosyal Medya Yönetimi Rehberi: Ajans Seçmeden Önce",
      description:
        "Sosyal medya yönetimi neleri kapsar, ajansla süreç nasıl işler, başarı nasıl ölçülür? Markanız için doğru sosyal medya stratejisini kurmanın temelleri.",
      excerpt:
        "Düzenli paylaşım yapmak, sosyal medya yönetimi demek değildir. Strateji, tutarlı görsel dil ve veriyle yön değiştiren bir planın nasıl kurulduğunu anlatıyoruz.",
      coverAlt:
        "Every markası için hazırlanan duvar grafiği ve marka iletişimi uygulaması",
      body: [
        [
          "p",
          "Sosyal medya, markanızın hedef kitlesiyle doğrudan konuştuğu en önemli alanlardan biridir. Ancak düzenli paylaşım yapmak tek başına sosyal medya yönetimi değildir. İyi yönetilen bir hesap; bir stratejiye dayanır, tutarlı bir görsel dille ilerler ve sonuçlara göre kendini günceller. Bir ajansla çalışmayı düşünüyorsanız sürecin nasıl işlediğini bilmek, doğru beklentiyle başlamanızı sağlar.",
        ],
        ["h", "Sosyal medya yönetimi neleri kapsar?"],
        [
          "ul",
          [
            "Hedef kitle ve rakip analizi, platform seçimi",
            "Sosyal medya stratejisi ve dönemsel içerik takvimi",
            "Post, carousel, story ve reels tasarımları",
            "Marka tonuna uygun metin yazarlığı",
            "Topluluk yönetimi: yorum ve mesajların takibi",
            "Performans ölçümü ve raporlama",
          ],
        ],
        ["h", "Strateji neden önce gelir?"],
        [
          "p",
          "Rastgele paylaşımlar kısa vadede hesabı canlı gösterse de bir yere götürmez. Strateji; kime konuştuğunuzu, ne söylediğinizi ve her içeriğin amacını belirler: bilinirlik mi, etkileşim mi, yoksa web sitesine yönlendirme ve satış mı? Bu çerçeve olmadan hangi içeriğin başarılı olduğunu ölçmek de mümkün olmaz.",
        ],
        ["h", "Her platform aynı değildir"],
        [
          "p",
          "Instagram görsel ve kısa video ağırlıklı, LinkedIn kurumsal ve profesyonel, X anlık ve sohbet odaklı, TikTok ise kısa ve eğlenceli formatlarla çalışır. Aynı içeriği her platforma kopyalamak yerine, mesajı platformun diline uyarlamak çok daha iyi sonuç verir. Her platformda olmak zorunda da değilsiniz; hedef kitlenizin bulunduğu kanallara odaklanmak daha verimlidir.",
        ],
        ["h", "Tutarlı görsel dil"],
        [
          "p",
          "Akışınıza bakan biri, gönderilerin tek bir markadan çıktığını ilk bakışta anlamalı. Bunun yolu kurumsal kimliğinize uygun şablonlar, renk ve tipografi kurallarıdır. Kurumsal kimliği güçlü markalarda sosyal medya tasarımı hem daha hızlı hem daha tutarlı ilerler.",
        ],
        ["h", "Ajansla süreç nasıl işler?"],
        [
          "p",
          "Süreç genellikle bir keşif görüşmesi ve analizle başlar. Ardından strateji ve içerik takvimi hazırlanır, tasarımlar ve metinler yayından önce onayınıza sunulur. Yayın sonrası etkileşim ve mesajlar takip edilir, dönem sonunda sonuçlar raporlanır ve bir sonraki dönemin planı bu veriye göre güncellenir. İçerikleri onaylama hakkınızın olması ve raporların düzenli paylaşılması, iyi bir iş birliğinin temel işaretleridir.",
        ],
        ["h", "Başarı nasıl ölçülür?"],
        [
          "p",
          "Takipçi sayısı tek başına iyi bir ölçüt değildir. Erişim, etkileşim oranı, profil ziyaretleri, web sitesine giden tıklamalar ve dönüşümler (form, arama, satış) birlikte değerlendirilmelidir. Hedefler başta net konulursa, raporlar da bu hedeflere göre anlam kazanır.",
        ],
        ["h", "Organik içerik ve reklam birlikte"],
        [
          "p",
          "Organik içerik markanızın sesini ve topluluğunu kurar; Meta reklamları ise bu içeriği doğru kitleye hızlıca ulaştırır. İkisini tek bir plan altında yürütmek, bütçenin de içeriğin de daha verimli kullanılmasını sağlar.",
        ],
      ],
    },
    en: {
      title: "Social Media Management: What to Know Before Working with an Agency",
      seoTitle: "Social Media Management Guide: Before You Hire an Agency",
      description:
        "What does social media management include, how does working with an agency go, and how is success measured? The basics of the right social strategy.",
      excerpt:
        "Posting regularly isn't the same as social media management. Here's how a strategy, a consistent visual language and a data-driven plan come together.",
      coverAlt:
        "Wall graphic and brand communication application designed for the Every brand",
      body: [
        [
          "p",
          "Social media is one of the most important places where your brand speaks directly with its audience. But posting regularly is not social media management on its own. A well-managed account is built on a strategy, follows a consistent visual language and updates itself based on results. If you're considering working with an agency, knowing how the process works helps you start with the right expectations.",
        ],
        ["h", "What does social media management include?"],
        [
          "ul",
          [
            "Audience and competitor analysis, platform selection",
            "Social media strategy and a periodic content calendar",
            "Post, carousel, story and reels designs",
            "Copywriting in your brand's tone of voice",
            "Community management: following up on comments and messages",
            "Performance measurement and reporting",
          ],
        ],
        ["h", "Why strategy comes first"],
        [
          "p",
          "Random posts may make an account look active in the short term, but they don't lead anywhere. Strategy defines who you're talking to, what you're saying and the purpose of every piece of content: awareness, engagement, or driving traffic and sales? Without that framework, it's also impossible to measure which content works.",
        ],
        ["h", "Not every platform is the same"],
        [
          "p",
          "Instagram is driven by visuals and short video, LinkedIn is corporate and professional, X is real-time and conversational, and TikTok works with short, entertaining formats. Adapting the message to each platform's language works far better than copying the same content everywhere. You don't have to be on every platform either; focusing on the channels where your audience is is more efficient.",
        ],
        ["h", "A consistent visual language"],
        [
          "p",
          "Anyone looking at your feed should see at a glance that the posts come from one brand. The way to get there is templates and color and typography rules aligned with your corporate identity. For brands with a strong identity, social media design moves both faster and more consistently.",
        ],
        ["h", "How does the process work with an agency?"],
        [
          "p",
          "The process usually starts with a discovery call and analysis. Then the strategy and content calendar are prepared, and designs and copy are submitted for your approval before publishing. After publishing, engagement and messages are followed up; at the end of each period results are reported and the next plan is updated based on that data. Being able to approve content and receiving regular reports are key signs of a good partnership.",
        ],
        ["h", "How is success measured?"],
        [
          "p",
          "Follower count alone isn't a good measure. Reach, engagement rate, profile visits, clicks to your website and conversions (forms, calls, sales) should be evaluated together. When goals are set clearly at the start, reports become meaningful against those goals.",
        ],
        ["h", "Organic content and ads together"],
        [
          "p",
          "Organic content builds your brand's voice and community; Meta ads deliver that content to the right audience quickly. Running both under a single plan makes better use of both budget and content.",
        ],
      ],
    },
  },
];

export const getPost = (slug) =>
  posts.find((p) => p.slug === slug || p.slugEn === slug);

/** Dakika cinsinden okuma süresi (dakikada ~200 kelime). */
export function readingTime(body) {
  const words = body
    .flatMap(([, v]) => (Array.isArray(v) ? v : [v]))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Ön-çizim ve tarayıcı aynı sonucu versin diye UTC ile biçimlendirir. */
export function formatDate(iso, lang) {
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
