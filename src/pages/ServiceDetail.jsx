import { Link, Navigate, useParams } from "react-router-dom";
import { about, getService, services } from "../data/site";
import useSeo from "../hooks/useSeo";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { ArrowUpRight, Sparkle } from "../components/Mark";
import { Accordion, SectionHead } from "../components/UI";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  useSeo({
    title: service?.title,
    description: service
      ? `${service.short} ${service.intro}`.slice(0, 300)
      : "",
    path: `/hizmetler/${slug}`,
    image: service?.image,
  });

  if (!service) return <Navigate to="/hizmetler" replace />;

  const index = services.findIndex((s) => s.slug === slug);
  const next = services[(index + 1) % services.length];
  const related = (service.related || [])
    .map((r) => services.find((s) => s.slug === r))
    .filter(Boolean);

  return (
    <>
      {/* ------------------------------------------------------------- başlık */}
      <section className="page-head">
        <div
          className="glow"
          style={{
            width: "40vw",
            height: "40vw",
            background: "rgba(135,102,232,.35)",
            top: "-18vw",
            left: "-12vw",
          }}
        />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="crumb" aria-label="Site yolu">
            <Link to="/">Anasayfa</Link>
            <span aria-hidden="true">/</span>
            <Link to="/hizmetler">Hizmetler</Link>
            <span aria-hidden="true">/</span>
            <span>{service.title}</span>
          </nav>

          <div className="row" style={{ gap: ".8rem", marginBottom: "1.5rem" }}>
            <span className="chip chip-purple tnum">{service.num}</span>
            <span className="mono-label">Hizmet</span>
          </div>

          <Reveal>
            <h1 className="h1" style={{ maxWidth: "15ch" }}>
              {service.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="h3 serif-i t-lime"
              style={{ marginTop: "1.8rem", maxWidth: "24ch" }}
            >
              {service.hero}
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- görsel */}
      <section>
        <div className="wrap">
          <Reveal>
            {/* Görsel kırpılmadan, kendi en-boy oranıyla gösterilir. */}
            <img
              src={service.image}
              alt={service.imageAlt}
              style={{
                display: "block",
                width: "100%",
                maxWidth: "1040px",
                height: "auto",
                margin: "0 auto",
              }}
            />
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------- metin */}
      <section className="section">
        <div className="wrap">
          <div className="grid-12" style={{ rowGap: "2.5rem" }}>
            <div className="c4">
              <p className="mono-label row" style={{ gap: ".55rem" }}>
                <Sparkle size={9} variant="lime" />
                Yaklaşımımız
              </p>
            </div>
            <div className="c-r6 stack gap-m">
              <p className="lede">{service.intro}</p>
              {service.intro2 && <p className="body">{service.intro2}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- kapsam */}
      <section className="section-tight">
        <div className="wrap">
          <SectionHead label="Kapsam" title="Neleri içerir?" />
          <div>
            {service.deliverables.map((d, i) => (
              <Reveal
                key={d}
                delay={i * 0.05}
                y={16}
                duration={0.65}
                style={{
                  display: "grid",
                  gridTemplateColumns: "3.5rem 1fr",
                  gap: "1rem",
                  padding: "1.35rem 0",
                  borderBottom: "1px solid var(--line-soft)",
                  alignItems: "baseline",
                }}
              >
                <span className="mono-label t-purple tnum">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>
                  {d}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- süreç */}
      <section className="section">
        <div className="wrap">
          <SectionHead label="Süreç" title="Dört adımda ilerliyoruz." />
          <div className="grid-12" style={{ rowGap: "2rem" }}>
            {about.process.map((p, i) => (
              <Reveal
                key={p.n}
                delay={i * 0.05}
                className="c3"
                style={{
                  borderTop: "1px solid var(--line)",
                  paddingTop: "1.4rem",
                }}
              >
                <span className="mono-label t-purple">0{p.n}</span>
                <h3 className="h4" style={{ marginTop: ".9rem" }}>
                  {p.title}
                </h3>
                <p
                  className="body"
                  style={{ marginTop: ".6rem", fontSize: ".88rem" }}
                >
                  {p.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- SSS */}
      {service.faq?.length > 0 && (
        <section className="section-tight">
          <div className="wrap">
            <SectionHead label="Sık sorulanlar" title="Merak edilenler." />
            <div style={{ maxWidth: "78ch" }}>
              <Accordion items={service.faq} />
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------ ilgili */}
      {related.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHead
              label="İlgili hizmetler"
              title="Birlikte daha iyi çalışır."
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                gap: "var(--gutter)",
              }}
            >
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.06}>
                  <Link
                    to={`/hizmetler/${r.slug}`}
                    className="card"
                    style={{ height: "100%" }}
                  >
                    <div className="card-body" style={{ padding: "1.6rem" }}>
                      <span className="mono-label t-purple">{r.num}</span>
                      <h3 className="h4" style={{ marginTop: ".6rem" }}>
                        {r.title}
                      </h3>
                      <p className="body" style={{ fontSize: ".88rem" }}>
                        {r.short}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------- CTA */}
      <section className="section">
        <div className="wrap">
          <div
            className="noise-panel row between"
            style={{ padding: "clamp(1.8rem, 5vw, 3.5rem)", gap: "2rem" }}
          >
            <div>
              <p className="mono-label">Bu hizmetle ilgileniyor musunuz?</p>
              <h2
                className="h3"
                style={{ marginTop: "1rem", maxWidth: "20ch" }}
              >
                {service.title} için teklif alın.
              </h2>
            </div>
            <Magnetic strength={0.2}>
              <Link
                to={`/iletisim?hizmet=${service.slug}`}
                className="btn btn-purple"
              >
                Teklif isteyin
                <ArrowUpRight className="arrow" />
              </Link>
            </Magnetic>
          </div>

          <Link
            to={`/hizmetler/${next.slug}`}
            className="row between"
            style={{
              marginTop: "clamp(2rem, 5vw, 3.5rem)",
              paddingTop: "1.6rem",
              borderTop: "1px solid var(--line-soft)",
              gap: "1rem",
            }}
          >
            <span className="mono-label">Sonraki hizmet</span>
            <span className="h3 row" style={{ gap: ".8rem" }}>
              {next.title}
              <ArrowUpRight size={22} />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
