import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import Hl from "../components/Hl";
import useSeo from "../hooks/useSeo";
import Reveal from "../components/Reveal";
import Marquee from "../components/Marquee";
import { ArrowUpRight, Sparkle } from "../components/Mark";
import { CtaBand, PageHead, SectionHead } from "../components/UI";

export default function About() {
  const { t, d, lp } = useLang();
  const { about, company } = d;
  const a = t.about;

  useSeo({
    title: a.seoTitle,
    description: a.seoDesc,
    path: "/hakkimizda",
  });

  return (
    <>
      <PageHead
        label={a.label}
        title={<Hl parts={a.title} className="serif-i t-purple" />}
        lede={about.intro}
        crumbs={[{ label: t.common.home, to: "/" }, { label: a.crumb }]}
      />

      {/* --------------------------------------------------------- görsel */}
      <section>
        <div className="wrap">
          <Reveal>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src="/media/general/renee-1.jpg"
                alt={a.imageAlt}
                style={{
                  width: "100%",
                  height: "clamp(280px, 52svh, 620px)",
                  objectFit: "cover",
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- metin */}
      <section className="section">
        <div className="wrap">
          <div className="grid-12" style={{ rowGap: "2.5rem" }}>
            <div className="c4">
              <p className="mono-label row" style={{ gap: ".55rem" }}>
                <Sparkle size={9} variant="purple" />
                {a.aboutLabel}
              </p>
              <h2
                className="h3"
                style={{ marginTop: "1.4rem", maxWidth: "14ch" }}
              >
                {a.aboutTitle}
              </h2>
            </div>
            <div className="c-r6 stack gap-m">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className={i === 0 ? "lede" : "body"}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- misyon / vizyon */}
      <section className="section-tight">
        <div className="wrap">
          <div className="grid-12" style={{ rowGap: "2rem" }}>
            <Reveal className="c6">
              <div
                className="noise-panel"
                style={{ padding: "clamp(1.8rem, 4vw, 3rem)", height: "100%" }}
              >
                <p className="mono-label t-lime">{a.mission}</p>
                <p className="lede" style={{ marginTop: "1.4rem" }}>
                  {about.mission}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="c6">
              <div
                style={{
                  padding: "clamp(1.8rem, 4vw, 3rem)",
                  height: "100%",
                  background: "var(--purple)",
                  color: "#fff",
                }}
              >
                <p
                  className="mono-label"
                  style={{ color: "rgba(255,255,255,.75)" }}
                >
                  {a.vision}
                </p>
                <p
                  className="lede"
                  style={{ marginTop: "1.4rem", color: "#fff" }}
                >
                  {about.vision}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- alıntı */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <p
              className="h2 serif"
              style={{
                maxWidth: "20ch",
                lineHeight: 1.1,
                textAlign: "center",
                margin: "0 auto",
              }}
            >
              <Hl parts={a.quote} />
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- kültür */}
      <section className="section-tight">
        <div className="wrap">
          <div className="grid-12" style={{ rowGap: "2rem" }}>
            <div className="c4">
              <h2 className="h3">{a.culture}</h2>
            </div>
            <div className="c-r6">
              <p className="body">{about.culture}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- değerler */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            label={a.valuesLabel}
            title={a.valuesTitle}
          />
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
        </div>
      </section>

      {/* --------------------------------------------------------- şerit */}
      <div
        style={{
          borderTop: "1px solid var(--line-soft)",
          borderBottom: "1px solid var(--line-soft)",
          padding: "clamp(1.2rem, 3vw, 2rem) 0",
        }}
      >
        <Marquee speed={26}>
          {about.pillars.map((p, i) => (
            <span
              key={p}
              className={`ticker-word ${i % 2 ? "ticker-outline" : ""}`}
            >
              {p}
              <Sparkle
                size={18}
                variant="lime"
                style={{ display: "inline-block", marginLeft: "2.5rem" }}
              />
            </span>
          ))}
        </Marquee>
      </div>

      {/* -------------------------------------------------------- neden biz */}
      <section className="section">
        <div className="wrap">
          <SectionHead label={a.whyLabel} title={a.whyTitle} />
          <div className="grid-12" style={{ rowGap: "2rem" }}>
            {about.why.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.07} className="c4">
                <div
                  style={{
                    border: "1px solid var(--line-soft)",
                    padding: "clamp(1.5rem, 3vw, 2.4rem)",
                    height: "100%",
                  }}
                >
                  <span className="chip chip-lime">{`0${i + 1}`}</span>
                  <h3 className="h4" style={{ marginTop: "1.3rem" }}>
                    {w.title}
                  </h3>
                  <p
                    className="body"
                    style={{ marginTop: ".8rem", fontSize: ".93rem" }}
                  >
                    {w.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- strateji */}
      <section className="section">
        <div className="wrap">
          <div className="grid-12" style={{ rowGap: "2.5rem" }}>
            <div className="c5">
              <p className="mono-label">{a.strategyLabel}</p>
              <h2
                className="h2"
                style={{ marginTop: "1.4rem", maxWidth: "12ch" }}
              >
                <Hl parts={a.strategyTitle} className="serif-i t-purple" />
              </h2>
              <p
                className="body"
                style={{ marginTop: "1.6rem", maxWidth: "44ch" }}
              >
                {about.strategy.intro}
              </p>
            </div>
            <div className="c-r7">
              {about.strategy.steps.map((s, i) => (
                <Reveal
                  key={s}
                  delay={i * 0.06}
                  y={14}
                  duration={0.7}
                  style={{
                    borderBottom: "1px solid var(--line-soft)",
                    padding: "1.35rem 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.2rem",
                  }}
                >
                  <Sparkle size={11} variant="lime" />
                  <span style={{ fontSize: "clamp(1rem, 1.6vw, 1.3rem)" }}>
                    {s}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- yaratıcı çözümler */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            label={a.creativeLabel}
            title={a.creativeTitle}
          />
          <p
            className="lede"
            style={{ maxWidth: "52ch", marginBottom: "3rem" }}
          >
            {about.creative.intro}
          </p>
          <div className="grid-12" style={{ rowGap: "2rem" }}>
            {about.creative.items.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.07} className="c4">
                <h3 className="h4 t-lime">{c.title}</h3>
                <p className="body" style={{ marginTop: ".8rem" }}>
                  {c.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ süreç */}
      <section className="section">
        <div className="wrap">
          <SectionHead label={a.processLabel} title={a.processTitle} />
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
      </section>

      {/* -------------------------------------------------------- kimlik linki */}
      <section className="section-tight">
        <div className="wrap">
          <div
            className="row between"
            style={{
              gap: "1.5rem",
              border: "1px solid var(--line-soft)",
              padding: "clamp(1.5rem, 4vw, 2.6rem)",
            }}
          >
            <div>
              <p className="mono-label">{a.identityLabel}</p>
              <p
                className="h3"
                style={{ marginTop: ".8rem", maxWidth: "22ch" }}
              >
                {a.identityTitle}
              </p>
            </div>
            <Link to={lp("/kurumsal-kimlik")} className="btn">
              {a.identityBtn}
              <ArrowUpRight className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        label={a.ctaLabel}
        title={a.ctaTitle}
        text={a.ctaText(`${company.address.line1}, ${company.address.line2}`)}
      />
    </>
  );
}
