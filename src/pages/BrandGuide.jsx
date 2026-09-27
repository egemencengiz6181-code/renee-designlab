import { useState } from "react";
import { useLang } from "../i18n";
import Hl from "../components/Hl";
import useSeo from "../hooks/useSeo";
import Reveal, { useReveal } from "../components/Reveal";
import { ArrowUpRight, BrandMark, Sparkle } from "../components/Mark";
import { CtaBand, PageHead, SectionHead } from "../components/UI";

function ColorCard({ c, i }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const dark = c.hex === "#000000";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(c.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* pano erişimi yoksa sessizce geç */
    }
  };

  const [ref, shown] = useReveal();

  return (
    <button
      ref={ref}
      onClick={copy}
      className={`c4 rv ${shown ? "rv-in" : ""}`}
      style={{
        "--rv-y": "22px",
        "--rv-dur": "0.7s",
        "--rv-delay": `${i * 0.08}s`,
        background: c.hex,
        color: c.hex === "#c9fc4a" ? "#000" : "#fff",
        border: dark ? "1px solid var(--line)" : "none",
        padding: "clamp(1.5rem, 3vw, 2.4rem)",
        minHeight: "clamp(240px, 34vw, 380px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "left",
        width: "100%",
      }}
      aria-label={t.guide.copy(c.name)}
    >
      <div style={{ opacity: 0.85, fontSize: ".8rem", lineHeight: 1.7 }}>
        <div>{c.rgb}</div>
        <div>{c.cmyk}</div>
      </div>
      <div>
        <div
          style={{
            fontSize: "clamp(1.2rem,2vw,1.7rem)",
            letterSpacing: "-.03em",
          }}
        >
          {c.hex}
        </div>
        <div style={{ opacity: 0.8, fontSize: ".85rem", marginTop: ".3rem" }}>
          {copied ? t.guide.copied : c.name}
        </div>
      </div>
    </button>
  );
}

export default function BrandGuide() {
  const { t, d } = useLang();
  const { brandGuide, company } = d;
  const g = t.guide;

  useSeo({
    title: g.seoTitle,
    description: g.seoDesc,
    path: "/kurumsal-kimlik",
  });

  return (
    <>
      <PageHead
        label={g.label}
        title={<Hl parts={g.title} className="serif-i t-purple" />}
        lede={brandGuide.intro}
        crumbs={[{ label: t.common.home, to: "/" }, { label: g.crumb }]}
      />

      {/* -------------------------------------------------------------- alıntı */}
      <section className="section-tight">
        <div className="wrap">
          <Reveal>
            <p
              className="h2"
              style={{
                maxWidth: "22ch",
                color: "var(--purple)",
                lineHeight: 1.04,
              }}
            >
              {brandGuide.quote}
            </p>
          </Reveal>
          <p className="body" style={{ maxWidth: "62ch", marginTop: "2.5rem" }}>
            {brandGuide.intro2}
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- logo */}
      <section className="section">
        <div className="wrap">
          <SectionHead label={g.logoLabel} title={g.logoTitle} />
          <div className="grid-12" style={{ rowGap: "2rem" }}>
            <div className="c5">
              <p className="lede">{brandGuide.logoQuote}</p>
              <p className="body" style={{ marginTop: "1.6rem" }}>
                {brandGuide.bgNote}
              </p>
            </div>

            <div
              className="c-r7"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1px",
                background: "var(--line-soft)",
                border: "1px solid var(--line-soft)",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  display: "grid",
                  placeItems: "center",
                  aspectRatio: "1 / 1",
                  padding: "2rem",
                }}
              >
                <BrandMark size={90} variant="purple" />
              </div>
              <div
                style={{
                  background: "#000",
                  display: "grid",
                  placeItems: "center",
                  aspectRatio: "1 / 1",
                  padding: "2rem",
                }}
              >
                <BrandMark size={90} variant="lime" />
              </div>
              <div
                style={{
                  background: "#8766e8",
                  display: "grid",
                  placeItems: "center",
                  aspectRatio: "1 / 1",
                  padding: "2rem",
                }}
              >
                <img
                  src="/media/brand/renee-logo-white-trim.png"
                  alt={g.logoWhiteAlt}
                  style={{ maxWidth: "78%" }}
                />
              </div>
              <div
                style={{
                  background: "#fff",
                  display: "grid",
                  placeItems: "center",
                  aspectRatio: "1 / 1",
                  padding: "2rem",
                }}
              >
                <img
                  src="/media/brand/renee-logo-trim.png"
                  alt={g.logoMainAlt}
                  style={{ maxWidth: "78%" }}
                />
              </div>
            </div>
          </div>

          {/* ölçüler */}
          <div
            className="grid-12"
            style={{
              marginTop: "clamp(2.5rem, 6vw, 4.5rem)",
              rowGap: "1.5rem",
            }}
          >
            {brandGuide.logoSizes.map((s, i) => (
              <Reveal
                key={s.mm}
                delay={i * 0.06}
                className="c3"
                style={{
                  borderTop: "1px solid var(--line)",
                  paddingTop: "1.3rem",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <div>
                  <p className="h4 tnum">{s.mm}</p>
                  <p
                    className="body"
                    style={{ fontSize: ".82rem", marginTop: ".4rem" }}
                  >
                    {s.use}
                  </p>
                </div>
                <BrandMark size={54 - i * 10} variant="purple" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- renk */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            label={g.colorLabel}
            title={g.colorTitle}
            right={<span className="mono-label">{g.colorHint}</span>}
          />
          <p
            className="lede"
            style={{ maxWidth: "48ch", marginBottom: "2.5rem" }}
          >
            {brandGuide.colorNote}
          </p>
          <div className="grid-12" style={{ rowGap: "1rem" }}>
            {brandGuide.colors.map((c, i) => (
              <ColorCard key={c.hex} c={c} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- tipografi */}
      <section className="section">
        <div className="wrap">
          <SectionHead label={g.typeLabel} title={brandGuide.typography.name} />
          <div className="grid-12" style={{ rowGap: "2rem" }}>
            <div className="c4">
              <p className="body">{brandGuide.typography.note}</p>
            </div>
            <div className="c-r6">
              <p
                style={{
                  fontSize: "clamp(4rem, 13vw, 11rem)",
                  lineHeight: 0.85,
                  letterSpacing: "-.05em",
                }}
              >
                Aa Bb
              </p>
              <p
                className="body"
                style={{ marginTop: "2rem", fontSize: "1rem", lineHeight: 1.9 }}
              >
                {brandGuide.typography.sample}
                <br />
                <span className="tnum">{brandGuide.typography.numerals}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ dökümanlar */}
      <section className="section">
        <div className="wrap">
          <SectionHead label={g.docsLabel} title={g.docsTitle} />
          <div className="grid-12" style={{ rowGap: "1.5rem" }}>
            {brandGuide.documents.map((d, i) => (
              <Reveal
                key={d.n}
                delay={i * 0.06}
                className="c3"
                style={{
                  border: "1px solid var(--line-soft)",
                  padding: "clamp(1.3rem, 2.5vw, 2rem)",
                }}
              >
                <span className="mono-label t-purple tnum">{d.n}</span>
                <h3 className="h4" style={{ marginTop: ".9rem" }}>
                  {d.title}
                </h3>
                <ul
                  className="stack gap-xs body"
                  style={{
                    listStyle: "none",
                    marginTop: "1rem",
                    fontSize: ".85rem",
                  }}
                >
                  {d.specs.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- ikon */}
      <section className="section">
        <div className="wrap">
          <div
            style={{
              background: "var(--purple)",
              padding: "clamp(2rem, 6vw, 4.5rem)",
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: "var(--gutter)",
              rowGap: "2.5rem",
              alignItems: "center",
            }}
          >
            <div className="c4">
              <p
                className="mono-label"
                style={{ color: "rgba(255,255,255,.75)" }}
              >
                {g.iconLabel}
              </p>
              <p
                className="h3"
                style={{ marginTop: "1.2rem", color: "#fff", maxWidth: "16ch" }}
              >
                {brandGuide.icons.note}
              </p>
              <p
                style={{
                  marginTop: "1.6rem",
                  color: "rgba(255,255,255,.75)",
                  fontSize: ".85rem",
                  lineHeight: 1.8,
                }}
              >
                {brandGuide.icons.min}
                <br />
                {brandGuide.icons.max}
              </p>
            </div>

            <div
              className="c-r6"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
                gap: "1.4rem",
              }}
            >
              {Array.from({ length: 18 }).map((_, i) => (
                <Reveal
                  key={i}
                  delay={i * 0.025}
                  y={14}
                  duration={0.5}
                  style={{ display: "grid", placeItems: "center" }}
                >
                  {i % 2 === 0 ? (
                    <Sparkle size={30} variant="lime" />
                  ) : (
                    <BrandMark
                      size={38}
                      variant="lime"
                      style={{ transform: `rotate(${(i % 4) * 90}deg)` }}
                    />
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- indir */}
      <section className="section-tight">
        <div className="wrap">
          <div
            className="noise-panel row between"
            style={{ padding: "clamp(1.6rem, 4vw, 3rem)", gap: "1.5rem" }}
          >
            <div>
              <p className="mono-label">{g.downloadLabel}</p>
              <p
                className="h3"
                style={{ marginTop: ".8rem", maxWidth: "24ch" }}
              >
                {g.downloadTitle}
              </p>
            </div>
            <div className="row" style={{ gap: "1rem" }}>
              <a
                href="/media/docs/renee-kurumsal-kimlik-rehberi.pdf"
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                {g.guidePdf}
                <ArrowUpRight className="arrow" />
              </a>
              <a
                href="/media/docs/renee-marka-hizmet-sunumu.pdf"
                className="btn btn-ghost"
                target="_blank"
                rel="noreferrer"
              >
                {g.deckPdf}
                <ArrowUpRight className="arrow" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- kapanış */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <p
              className="h2 serif"
              style={{
                maxWidth: "24ch",
                margin: "0 auto",
                textAlign: "center",
                lineHeight: 1.1,
              }}
            >
              “{brandGuide.closingQuote}”
            </p>
          </Reveal>
          <p
            className="mono-label"
            style={{ textAlign: "center", marginTop: "2rem" }}
          >
            {company.site}
          </p>
        </div>
      </section>

      <CtaBand
        label={g.ctaLabel}
        title={g.ctaTitle}
        text={g.ctaText}
      />
    </>
  );
}
