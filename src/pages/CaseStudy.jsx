import { Link, Navigate, useParams } from "react-router-dom";
import { useLang } from "../i18n";
import useSeo from "../hooks/useSeo";
import { ORG_ID, SITE, breadcrumbLd } from "../seo/head";
import useParallax from "../hooks/useParallax";
import Reveal from "../components/Reveal";
import { ArrowUpRight, Sparkle } from "../components/Mark";
import { SectionHead } from "../components/UI";
import { size } from "../data/media";

export default function CaseStudy() {
  const { slug } = useParams();
  const { lang, t, d, lp } = useLang();
  const { cases } = d;
  const item = cases.find((c) => c.slug === slug);
  const ct = t.case;
  const bgRef = useParallax({ transform: (p) => `translateY(${p * 18}%)` });

  useSeo({
    title: item && ct.seoTitle(item),
    description: item?.summary,
    path: `/calismalar/${slug}`,
    image: item?.cover,
    jsonLd: item
      ? [
          breadcrumbLd(lang, [
            { name: t.common.home, path: "/" },
            { name: t.work.crumb, path: "/calismalar" },
            { name: item.name, path: `/calismalar/${item.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: ct.seoTitle(item),
            description: item.summary,
            image: `${SITE}${item.cover}`,
            dateCreated: item.year,
            inLanguage: lang,
            creator: { "@id": ORG_ID },
            about: item.services,
          },
        ]
      : [],
  });

  if (!item) return <Navigate to={lp("/calismalar")} replace />;

  const index = cases.indexOf(item);
  const next = cases[(index + 1) % cases.length];

  return (
    <>
      {/* --------------------------------------------------------------- hero */}
      <section className="case-hero">
        <div className="case-hero-bg" ref={bgRef}>
          <img
            src={item.hero}
            alt={item.heroAlt}
            {...size(item.hero)}
            fetchPriority="high"
          />
        </div>

        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="crumb" aria-label={t.common.crumb}>
            <Link to={lp("/")}>{t.common.home}</Link>
            <span aria-hidden="true">/</span>
            <Link to={lp("/calismalar")}>{t.work.crumb}</Link>
            <span aria-hidden="true">/</span>
            <span>{item.name}</span>
          </nav>

          <Reveal>
            <h1 className="display" style={{ marginBottom: "1.5rem" }}>
              {item.name}
            </h1>
          </Reveal>

          <div className="chips">
            <span className="chip chip-lime">{item.kind}</span>
            <span className="chip chip-purple">{item.sector}</span>
            <span className="chip tnum">{item.year}</span>
          </div>

          <Reveal delay={0.1}>
            <p className="lede" style={{ maxWidth: "52ch", marginTop: "2rem" }}>
              {item.summary}
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- künye */}
      <section className="section-tight">
        <div className="wrap">
          <div
            className="grid-12"
            style={{
              rowGap: "2rem",
              borderTop: "1px solid var(--line-soft)",
              paddingTop: "2.5rem",
            }}
          >
            <div className="c3">
              <p className="mono-label">{ct.brand}</p>
              <p className="h4" style={{ marginTop: ".8rem" }}>
                {item.name}
              </p>
            </div>
            <div className="c3">
              <p className="mono-label">{ct.sector}</p>
              <p className="h4" style={{ marginTop: ".8rem" }}>
                {item.sector}
              </p>
            </div>
            <div className="c3">
              <p className="mono-label">{ct.year}</p>
              <p className="h4 tnum" style={{ marginTop: ".8rem" }}>
                {item.year}
              </p>
            </div>
            <div className="c3">
              <p className="mono-label">{ct.services}</p>
              <ul
                className="stack gap-xs"
                style={{ listStyle: "none", marginTop: ".8rem" }}
              >
                {item.services.map((s) => (
                  <li key={s} className="body" style={{ fontSize: ".9rem" }}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- anlatı */}
      <section className="section">
        <div className="wrap">
          <div className="grid-12" style={{ rowGap: "3rem" }}>
            <Reveal className="c4">
              <p className="mono-label row" style={{ gap: ".5rem" }}>
                <Sparkle size={9} variant="purple" /> {ct.problem}
              </p>
              <p className="body" style={{ marginTop: "1.2rem" }}>
                {item.challenge}
              </p>
            </Reveal>
            <Reveal delay={0.07} className="c4">
              <p className="mono-label row" style={{ gap: ".5rem" }}>
                <Sparkle size={9} variant="lime" /> {ct.approach}
              </p>
              <p className="body" style={{ marginTop: "1.2rem" }}>
                {item.approach}
              </p>
            </Reveal>
            <Reveal delay={0.14} className="c4">
              <p className="mono-label row" style={{ gap: ".5rem" }}>
                <Sparkle size={9} variant="purple" /> {ct.result}
              </p>
              <p className="body" style={{ marginTop: "1.2rem" }}>
                {item.result}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- palet */}
      <section className="section-tight">
        <div className="wrap">
          <div
            className="row between"
            style={{ gap: "2rem", alignItems: "flex-end" }}
          >
            <div>
              <p className="mono-label">{ct.palette}</p>
              <p className="h4" style={{ marginTop: ".8rem" }}>
                {ct.paletteTitle(item.name)}
              </p>
            </div>
            <div className="swatches">
              {item.palette.map((c, i) => (
                <Reveal
                  key={c}
                  className="swatch"
                  style={{ background: c }}
                  delay={i * 0.05}
                  y={12}
                  duration={0.5}
                >
                  <span>{c}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ galeri */}
      <section className="section">
        <div className="wrap">
          <SectionHead label={ct.galleryLabel} title={ct.galleryTitle} />
          <div className="gallery">
            {item.images.map((img, i) => (
              <Reveal
                key={img.src}
                as="figure"
                className={img.span}
                delay={(i % 2) * 0.07}
                y={26}
                duration={0.9}
              >
                <div className="g-figure">
                  <img
                    src={img.src}
                    alt={img.alt}
                    {...size(img.src)}
                    loading="lazy"
                  />
                </div>
                <figcaption className="g-cap">{img.alt}</figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ sonraki */}
      <section className="section">
        <div className="wrap">
          <Link
            to={lp(`/calismalar/${next.slug}`)}
            className="card"
            style={{ display: "block" }}
          >
            <div
              style={{
                position: "relative",
                minHeight: "clamp(220px, 40svh, 420px)",
                display: "flex",
                alignItems: "flex-end",
                overflow: "hidden",
              }}
            >
              <img
                src={next.cover}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.4,
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: "relative",
                  padding: "clamp(1.5rem, 4vw, 3rem)",
                  width: "100%",
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,.85), transparent)",
                }}
              >
                <p className="mono-label">{ct.next}</p>
                <h2
                  className="h2 row"
                  style={{ gap: "1rem", marginTop: ".8rem" }}
                >
                  {next.name}
                  <ArrowUpRight size={30} />
                </h2>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
