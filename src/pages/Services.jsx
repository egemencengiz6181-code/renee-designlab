import { Link } from "react-router-dom";
import { about, services } from "../data/site";
import useSeo from "../hooks/useSeo";
import Reveal from "../components/Reveal";
import { ArrowUpRight, Sparkle } from "../components/Mark";
import { CtaBand, PageHead, SectionHead, ServiceList } from "../components/UI";

export default function Services() {
  useSeo({
    title: "Hizmetlerimiz",
    description:
      "Sosyal medya yönetimi, kurumsal kimlik tasarımı, dijital pazarlama ve SEO, logo tasarımı, web tasarım ve geliştirme, marka stratejisi, 3D render, prodüksiyon, Google ve Meta reklam yönetimi, influencer marketing.",
    path: "/hizmetler",
  });

  return (
    <>
      <PageHead
        label="Hizmetlerimiz"
        title={
          <>
            Strateji, tasarım ve dijital{" "}
            <span className="serif-i t-lime">tek çatı</span> altında.
          </>
        }
        lede="Kurumsal kimlikten dijital dönüşüme, sosyal medya yönetiminden 3D görselleştirmeye kadar geniş bir hizmet yelpazesiyle markanızın iletişim ihtiyaçlarına uçtan uca çözümler üretiyoruz."
        crumbs={[{ label: "Anasayfa", to: "/" }, { label: "Hizmetler" }]}
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
            label="Detaylar"
            title="Her hizmetin kendi sayfası var."
            right={
              <span className="mono-label tnum">{services.length} hizmet</span>
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
                  to={`/hizmetler/${s.slug}`}
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
                      İncele <ArrowUpRight size={13} />
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
            label="Nasıl çalışıyoruz"
            title="Şeffaf ve öngörülebilir bir süreç."
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
                  <span className="mono-label">Adım {p.n}</span>
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
        label="Nereden başlamalı?"
        title="Hangi hizmete ihtiyacınız olduğundan emin değil misiniz?"
        text="Kısa bir keşif görüşmesiyle başlayalım; markanızın bugünkü durumuna bakıp en çok fark yaratacak adımı birlikte belirleyelim."
      />
    </>
  );
}
