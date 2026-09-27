import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import Hl from "../components/Hl";
import useSeo from "../hooks/useSeo";
import { BRAND, ORG_ID, SITE } from "../seo/head";
import useParallax from "../hooks/useParallax";
import Reveal, { RevealLines, RevealWords } from "../components/Reveal";
import Marquee from "../components/Marquee";
import Magnetic from "../components/Magnetic";
import {
  ArrowDown,
  ArrowUpRight,
  BrandMark,
  Sparkle,
} from "../components/Mark";
import { CaseCard, CtaBand, SectionHead, ServiceList } from "../components/UI";

/* ------------------------------------------------------------------- hero */

function Hero() {
  const { t, d, lp } = useLang();
  const orbRef = useParallax({
    transform: (p) => `translateY(${p * 160}px) rotate(${p * 90}deg)`,
  });

  return (
    <section className="hero">
      <div
        className="glow"
        style={{
          width: "50vw",
          height: "50vw",
          background: "rgba(135,102,232,.5)",
          top: "-12vw",
          left: "-12vw",
        }}
      />
      <div
        className="glow"
        style={{
          width: "38vw",
          height: "38vw",
          background: "rgba(201,252,74,.14)",
          bottom: "8vw",
          right: "-8vw",
        }}
      />

      <div
        className="hero-orb"
        ref={orbRef}
        style={{
          right: "clamp(1rem, 6vw, 8rem)",
          top: "clamp(6rem, 18vh, 12rem)",
        }}
      >
        <BrandMark size={220} variant="purple" />
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <p
          className="mono-label row fade-in"
          style={{
            gap: ".6rem",
            marginBottom: "clamp(1.5rem,4vw,2.5rem)",
            "--rv-delay": "0.2s",
          }}
        >
          <Sparkle size={10} variant="lime" />
          {t.home.heroLabel}
        </p>

        <h1 className="display hero-title">
          <RevealLines
            lines={t.home.heroLines}
            delay={0.15}
            stagger={0.09}
          />
          <span className="reveal-mask">
            <span className="rv-line rv-in" style={{ "--rv-delay": "0.33s" }}>
              <Hl parts={t.home.heroLast} className="serif-i t-purple" />
            </span>
          </span>
        </h1>

        <div className="hero-meta">
          <div className="c5">
            <p className="lede">
              <RevealWords text={d.company.tagline} delay={0.5} />
            </p>
          </div>

          <div className="c-r8 row">
            <div
              className="row rv rv-in"
              style={{ gap: "1rem", "--rv-y": "16px", "--rv-delay": "0.7s" }}
            >
              <Magnetic strength={0.22}>
                <Link to={lp("/calismalar")} className="btn">
                  {t.home.work}
                  <ArrowUpRight className="arrow" />
                </Link>
              </Magnetic>
              <Link to={lp("/hizmetler")} className="btn btn-ghost">
                {t.home.services}
              </Link>
            </div>
          </div>
        </div>

        <div
          className="row scroll-hint"
          style={{
            gap: ".6rem",
            marginTop: "clamp(1.5rem, 4vw, 2.5rem)",
            color: "var(--mute-2)",
            fontSize: ".72rem",
            letterSpacing: ".2em",
            textTransform: "uppercase",
          }}
        >
          <span className="bob" style={{ display: "flex" }}>
            <ArrowDown size={13} />
          </span>
          {t.home.scroll}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- şeritler */

function ClaimTicker() {
  const { t } = useLang();

  return (
    <div
      style={{
        borderTop: "1px solid var(--line-soft)",
        borderBottom: "1px solid var(--line-soft)",
        padding: "clamp(1.2rem, 3vw, 2.2rem) 0",
        background: "rgba(255,255,255,.015)",
      }}
    >
      <Marquee speed={30}>
        {t.home.ticker.map((w, i) => (
          <span
            key={w}
            className={`ticker-word ${i % 2 === 1 ? "ticker-outline" : ""}`}
          >
            {w}
            <Sparkle
              size={20}
              variant="purple"
              style={{ display: "inline-block", marginLeft: "2.5rem" }}
            />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

function LogoBand() {
  const { t, d, lp } = useLang();
  const { references } = d;
  const rowA = references.slice(0, 18);
  const rowB = references.slice(18);

  // Şerit sürekli döndüğü için görseller tembel yüklenmez; aksi hâlde
  // ekrandan çıkan logolar geç yüklenip akışta boşluk bırakır.
  const row = (items) =>
    items.map((r) => (
      <Link key={r.n} to={lp("/referanslar")} title={r.name}>
        <img src={r.src} alt={r.name} width="160" height="64" />
      </Link>
    ));

  return (
    <section className="section-tight">
      <div className="wrap">
        <p
          className="mono-label"
          style={{ textAlign: "center", marginBottom: "clamp(2rem,4vw,3rem)" }}
        >
          {t.home.brands}
        </p>
      </div>
      <div className="stack gap-m logo-strip">
        <Marquee speed={52}>{row(rowA)}</Marquee>
        <Marquee speed={58} reverse>
          {row(rowB)}
        </Marquee>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ bölümler */

function Intro() {
  const { t, d, lp } = useLang();
  const { about, stats } = d;

  return (
    <section className="section">
      <div className="wrap">
        <div className="grid-12" style={{ rowGap: "3rem" }}>
          <div className="c5">
            <p className="mono-label row" style={{ gap: ".55rem" }}>
              <Sparkle size={9} variant="purple" />
              {t.home.introLabel}
            </p>
            <Reveal delay={0.05}>
              <h2
                className="h2"
                style={{ marginTop: "1.5rem", maxWidth: "13ch" }}
              >
                <Hl parts={t.home.introTitle} />
              </h2>
            </Reveal>
          </div>

          <div className="c-r7 stack gap-m">
            <p className="lede">{about.intro}</p>
            <p className="body">{about.intro2}</p>
            <div className="row" style={{ gap: "1rem", marginTop: ".8rem" }}>
              <Link to={lp("/hakkimizda")} className="btn btn-ghost">
                {t.home.about}
                <ArrowUpRight className="arrow" />
              </Link>
            </div>
          </div>
        </div>

        <div
          className="grid-12"
          style={{ marginTop: "clamp(3.5rem, 8vw, 7rem)", rowGap: "2.5rem" }}
        >
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="c3 stat">
              <span className="stat-n">{s.n}</span>
              <p style={{ marginTop: ".8rem", fontSize: ".98rem" }}>
                {s.label}
              </p>
              <p
                className="body"
                style={{ fontSize: ".82rem", marginTop: ".3rem" }}
              >
                {s.sub}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showreel() {
  const { t } = useLang();
  // Görsel, bölüm ekranda ilerledikçe hafifçe küçülür.
  const imgRef = useParallax({
    range: "enter",
    transform: (p) => `scale(${1.18 - p * 0.18})`,
  });

  return (
    <section style={{ overflow: "hidden" }}>
      <div
        style={{ height: "clamp(50svh, 78svh, 92svh)", position: "relative" }}
      >
        <img
          ref={imgRef}
          src="/media/general/renee-3.webp"
          alt={t.home.showreelAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scale(1.18)",
          }}
          loading="lazy"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,.85), rgba(0,0,0,.15) 40%, rgba(0,0,0,.9))",
          }}
        />
        <div
          className="wrap"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
            paddingBottom: "clamp(2rem, 6vw, 4.5rem)",
          }}
        >
          <div>
            <p className="mono-label" style={{ marginBottom: "1rem" }}>
              {t.home.philosophy}
            </p>
            <p
              className="h3 serif"
              style={{ maxWidth: "24ch", lineHeight: 1.12 }}
            >
              <Hl parts={t.home.quote} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesBlock() {
  const { t, lp } = useLang();

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          label={t.home.servicesLabel}
          title={t.home.servicesTitle}
          right={
            <Link to={lp("/hizmetler")} className="btn btn-ghost">
              {t.home.allServices}
              <ArrowUpRight className="arrow" />
            </Link>
          }
        />
        <ServiceList />
      </div>
    </section>
  );
}

function WorkBlock() {
  const { t, d, lp } = useLang();

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          label={t.home.workLabel}
          title={t.home.workTitle}
          right={
            <Link to={lp("/calismalar")} className="btn btn-ghost">
              {t.home.allWork}
              <ArrowUpRight className="arrow" />
            </Link>
          }
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "var(--gutter)",
          }}
        >
          {d.cases.slice(0, 3).map((c, i) => (
            <CaseCard key={c.slug} item={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuesBlock() {
  const { t, d } = useLang();
  const { about } = d;

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead label={t.home.valuesLabel} title={t.home.valuesTitle} />
        <div className="grid-12" style={{ rowGap: "2.5rem" }}>
          {about.values.map((v, i) => (
            <Reveal
              key={v.n}
              delay={i * 0.06}
              className="c3"
              style={{
                borderTop: "1px solid var(--line)",
                paddingTop: "1.6rem",
              }}
            >
              <span className="mono-label t-purple">{v.n}</span>
              <h3 className="h4" style={{ marginTop: "1rem" }}>
                {v.title}
              </h3>
              <p
                className="body"
                style={{ marginTop: ".7rem", fontSize: ".92rem" }}
              >
                {v.text}
              </p>
            </Reveal>
          ))}
        </div>

        <div
          className="row"
          style={{
            gap: "clamp(1rem,4vw,3rem)",
            marginTop: "clamp(3rem, 7vw, 5.5rem)",
            justifyContent: "space-between",
          }}
        >
          {about.pillars.map((p, i) => (
            <Reveal
              key={p}
              as="span"
              delay={i * 0.08}
              y={24}
              className="h2"
              style={{
                display: "inline-block",
                fontStyle: i === 2 ? "italic" : "normal",
                fontFamily: i === 2 ? "var(--serif)" : "var(--sans)",
                color: i % 2 ? "var(--purple)" : "var(--white)",
              }}
            >
              {p}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessBlock() {
  const { t, d } = useLang();

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          label={t.home.processLabel}
          title={t.home.processTitle}
        />
        <div>
          {d.about.process.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.05}>
              <div className="process-step">
                <span className="h3 t-purple tnum">{p.n}</span>
                <div>
                  <h3 className="h4">{p.title}</h3>
                  <p
                    className="body"
                    style={{ marginTop: ".7rem", maxWidth: "60ch" }}
                  >
                    {p.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- sayfa */

export default function Home() {
  const { t } = useLang();
  useSeo({
    fullTitle: t.home.seoTitle,
    description: t.home.seoDesc,
    path: "/",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        name: BRAND,
        url: `${SITE}/`,
        inLanguage: ["tr", "en"],
        publisher: { "@id": ORG_ID },
      },
    ],
  });

  return (
    <>
      <Hero />
      <ClaimTicker />
      <Intro />
      <Showreel />
      <ServicesBlock />
      <LogoBand />
      <WorkBlock />
      <ValuesBlock />
      <ProcessBlock />
      <CtaBand />
    </>
  );
}
