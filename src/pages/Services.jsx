import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import Hl from "../components/Hl";
import useSeo from "../hooks/useSeo";
import Reveal from "../components/Reveal";
import { ArrowUpRight, Sparkle } from "../components/Mark";
import { CtaBand, PageHead, SectionHead, ServiceList } from "../components/UI";

export default function Services() {
  const { t, d, lp } = useLang();
  const { about, services } = d;
  const sv = t.services;

  useSeo({
    title: sv.seoTitle,
    description: sv.seoDesc,
    path: "/hizmetler",
  });

  return (
    <>
      <PageHead
        label={sv.label}
        title={<Hl parts={sv.title} />}
        lede={sv.lede}
        crumbs={[{ label: t.common.home, to: "/" }, { label: sv.crumb }]}
      />

      <section className="section-tight">
        <div className="wrap">
          <ServiceList />
        </div>
      </section>

      {/* -------------------------------------------------------- kart ızgara */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            label={sv.detailsLabel}
            title={sv.detailsTitle}
            right={
              <span className="mono-label tnum">
                {sv.count(services.length)}
              </span>
            }
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "var(--gutter)",
            }}
          >
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <Link
                  to={lp(`/hizmetler/${s.slug}`)}
                  className="card"
                  style={{ height: "100%" }}
                >
                  <div
                    className="card-media"
                    style={{ aspectRatio: "16 / 10" }}
                  >
                    <img src={s.image} alt={s.imageAlt} loading="lazy" />
                  </div>
                  <div className="card-body">
                    <span className="mono-label t-purple">{s.num}</span>
                    <h3 className="h4">{s.title}</h3>
                    <p className="body" style={{ fontSize: ".9rem" }}>
                      {s.short}
                    </p>
                    <span
                      className="row t-lime"
                      style={{
                        gap: ".45rem",
                        marginTop: ".7rem",
                        fontSize: ".85rem",
                      }}
                    >
                      {sv.explore} <ArrowUpRight size={13} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- süreç */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            label={sv.howLabel}
            title={sv.howTitle}
          />
          <div className="grid-12" style={{ rowGap: "2rem" }}>
            {about.process.map((p, i) => (
              <Reveal
                key={p.n}
                delay={i * 0.06}
                className="c3"
                style={{
                  borderTop: "1px solid var(--line)",
                  paddingTop: "1.5rem",
                }}
              >
                <span className="row" style={{ gap: ".5rem" }}>
                  <Sparkle size={10} variant="purple" />
                  <span className="mono-label">
                    {sv.step} {p.n}
                  </span>
                </span>
                <h3 className="h4" style={{ marginTop: "1rem" }}>
                  {p.title}
                </h3>
                <p
                  className="body"
                  style={{ marginTop: ".7rem", fontSize: ".9rem" }}
                >
                  {p.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        label={sv.ctaLabel}
        title={sv.ctaTitle}
        text={sv.ctaText}
      />
    </>
  );
}
