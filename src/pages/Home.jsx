import { Link } from "react-router-dom";
import { about, cases, company, references, stats } from "../data/site";
import useSeo from "../hooks/useSeo";
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
          Ankara · Tasarım ve Reklam Ajansı
        </p>

        <h1 className="display hero-title">
          <RevealLines
            lines={["Yaratıcılığın", "işaret ettiği"]}
            delay={0.15}
            stagger={0.09}
          />
          <span className="reveal-mask">
            <span className="rv-line rv-in" style={{ "--rv-delay": "0.33s" }}>
              <span className="serif-i t-purple">sınırların</span> ötesinde
            </span>
          </span>
        </h1>

        <div className="hero-meta">
          <div className="c5">
            <p className="lede">
              <RevealWords text={company.tagline} delay={0.5} />
            </p>
          </div>

          <div className="c-r8 row">
            <div
              className="row rv rv-in"
              style={{ gap: "1rem", "--rv-y": "16px", "--rv-delay": "0.7s" }}
            >
              <Magnetic strength={0.22}>
                <Link to="/calismalar" className="btn">
                  Çalışmalarımız
                  <ArrowUpRight className="arrow" />
                </Link>
              </Magnetic>
              <Link to="/hizmetler" className="btn btn-ghost">
                Hizmetler
              </Link>
            </div>
          </div>
        </div>

        <div
          className="row scroll-hint"
          style={{
            gap: ".6rem",
            marginTop: "clamp(1.5rem, 4vw, 2.5rem)",
            color: "#6b6b6b",
            fontSize: ".72rem",
            letterSpacing: ".2em",
            textTransform: "uppercase",
          }}
        >
          <span className="bob" style={{ display: "flex" }}>
            <ArrowDown size={13} />
          </span>
          Kaydırın
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- şeritler */

function ClaimTicker() {
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
        {[
          "KURUMSAL KİMLİK",
          "LOGO TASARIMI",
          "WEB TASARIM",
          "SOSYAL MEDYA",
          "SEO",
          "3D RENDER",
          "PRODÜKSİYON",
          "REKLAM YÖNETİMİ",
        ].map((w, i) => (
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
  const rowA = references.slice(0, 18);
  const rowB = references.slice(18);

  // Şerit sürekli döndüğü için görseller tembel yüklenmez; aksi hâlde
  // ekrandan çıkan logolar geç yüklenip akışta boşluk bırakır.
  const row = (items) =>
    items.map((r) => (
      <Link key={r.n} to="/referanslar" title={r.name}>
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
          Bizimle çalışan markalar
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
  return (
    <section className="section">
      <div className="wrap">
        <div className="grid-12" style={{ rowGap: "3rem" }}>
          <div className="c5">
            <p className="mono-label row" style={{ gap: ".55rem" }}>
              <Sparkle size={9} variant="purple" />
              Biz kimiz
            </p>
            <Reveal delay={0.05}>
              <h2
                className="h2"
                style={{ marginTop: "1.5rem", maxWidth: "13ch" }}
              >
                Tasarım <span className="serif-i t-lime">estetiktir</span>,
                strateji yön verir.
              </h2>
            </Reveal>
          </div>

          <div className="c-r7 stack gap-m">
            <p className="lede">{about.intro}</p>
            <p className="body">{about.intro2}</p>
            <div className="row" style={{ gap: "1rem", marginTop: ".8rem" }}>
              <Link to="/hakkimizda" className="btn btn-ghost">
                Hakkımızda
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
          src="/media/general/renee-3.jpg"
          alt="Renee marka kimliğinin nesne uygulamaları"
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
              Marka felsefemiz
            </p>
            <p
              className="h3 serif"
              style={{ maxWidth: "24ch", lineHeight: 1.12 }}
            >
              “Her renk, her çizgi ve her detay bir hikaye anlatır;{" "}
              <span className="serif-i t-lime">Renee</span> ile kimliğinizi
              yeniden keşfedin.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesBlock() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          label="Hizmetlerimiz"
          title="Uçtan uca, tek bir ekip."
          right={
            <Link to="/hizmetler" className="btn btn-ghost">
              Tüm hizmetler
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
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          label="Seçili çalışmalar"
          title="Kimlikten uygulamaya."
          right={
            <Link to="/calismalar" className="btn btn-ghost">
              Tüm çalışmalar
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
          {cases.slice(0, 3).map((c, i) => (
            <CaseCard key={c.slug} item={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuesBlock() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead label="Değerlerimiz" title="Neden Renée?" />
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
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          label="Çalışma sürecimiz"
          title="Dört adımda net bir akış."
        />
        <div>
          {about.process.map((p, i) => (
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
  useSeo({
    title: "Yaratıcılığın işaret ettiği sınırların ötesinde",
    description:
      "Renee Design Lab; kurumsal kimlik, logo tasarımı, web tasarım, sosyal medya yönetimi, SEO, 3D render ve prodüksiyon hizmetleri sunan Ankara merkezli tasarım ve reklam ajansı.",
    path: "/",
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
