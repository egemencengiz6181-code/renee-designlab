import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { services } from "../data/site";
import { ArrowUpRight, Plus, Sparkle } from "./Mark";
import Reveal from "./Reveal";

/* ------------------------------------------------------------------ başlık */

export function SectionHead({ label, title, right, id }) {
  return (
    <div className="section-head" id={id}>
      <div className="stack gap-s">
        {label && (
          <span className="mono-label row" style={{ gap: ".55rem" }}>
            <Sparkle size={9} color="#8766e8" />
            {label}
          </span>
        )}
        {title && (
          <h2 className="h2" style={{ maxWidth: "18ch" }}>
            {title}
          </h2>
        )}
      </div>
      {right && <div style={{ paddingBottom: ".4rem" }}>{right}</div>}
    </div>
  );
}

/* --------------------------------------------------------- sayfa başlıkları */

export function PageHead({ label, title, lede, crumbs = [] }) {
  return (
    <section className="page-head">
      <div
        className="glow"
        style={{
          width: "44vw",
          height: "44vw",
          background: "rgba(135,102,232,.4)",
          top: "-22vw",
          right: "-10vw",
        }}
      />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        {crumbs.length > 0 && (
          <nav className="crumb" aria-label="Site yolu">
            {crumbs.map((c, i) => (
              <span key={i} className="row" style={{ gap: ".6rem" }}>
                {c.to ? (
                  <Link to={c.to}>{c.label}</Link>
                ) : (
                  <span>{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
              </span>
            ))}
          </nav>
        )}
        {label && (
          <p
            className="mono-label row"
            style={{ gap: ".55rem", marginBottom: "1.2rem" }}
          >
            <Sparkle size={9} color="#c9fc4a" />
            {label}
          </p>
        )}
        <Reveal>
          <h1 className="h1" style={{ maxWidth: "17ch" }}>
            {title}
          </h1>
        </Reveal>
        {lede && (
          <Reveal delay={0.12}>
            <p
              className="lede"
              style={{ maxWidth: "58ch", marginTop: "1.8rem" }}
            >
              {lede}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ hizmet listesi */

export function ServiceList({ items = services, showPreview = true }) {
  const [active, setActive] = useState(null);
  const preview = useRef(null);

  const onMove = (e) => {
    if (!preview.current) return;
    preview.current.style.left = `${e.clientX}px`;
    preview.current.style.top = `${e.clientY}px`;
  };

  return (
    <>
      <div
        className="srv-list"
        onPointerMove={showPreview ? onMove : undefined}
      >
        {items.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 6) * 0.035} y={18} duration={0.7}>
            <Link
              to={`/hizmetler/${s.slug}`}
              className="srv-row"
              onPointerEnter={() => setActive(s)}
              onPointerLeave={() => setActive(null)}
            >
              <span className="srv-num">{s.num}</span>
              <span className="srv-name">{s.title}</span>
              <span className="srv-tag">{s.short}</span>
            </Link>
          </Reveal>
        ))}
      </div>

      {showPreview && (
        <div
          ref={preview}
          className={`hover-preview ${active ? "is-on" : ""}`}
          aria-hidden="true"
        >
          {active && <img src={active.image} alt="" />}
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ akordeon */

export function Accordion({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className="accordion-item" key={i}>
            <button
              className="accordion-btn"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
            >
              <span className="h4">{item.q}</span>
              <span className={`acc-icon ${isOpen ? "is-open" : ""}`}>
                <Plus size={18} />
              </span>
            </button>
            <div
              id={`faq-panel-${i}`}
              className={`accordion-panel ${isOpen ? "is-open" : ""}`}
            >
              <div style={{ minHeight: 0, overflow: "hidden" }}>
                <p
                  className="body"
                  style={{ maxWidth: "62ch", paddingBottom: "1.6rem" }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- vaka kartı */

export function CaseCard({ item, index = 0 }) {
  return (
    <Reveal delay={(index % 3) * 0.08} y={30}>
      <Link to={`/calismalar/${item.slug}`} className="card">
        <div className="card-media">
          <img src={item.cover} alt={item.coverAlt} loading="lazy" />
        </div>
        <div className="card-body">
          <div className="row between" style={{ gap: "1rem" }}>
            <h3 className="h3">{item.name}</h3>
            <span className="mono-label tnum">{item.year}</span>
          </div>
          <p className="body" style={{ fontSize: ".92rem" }}>
            {item.summary}
          </p>
          <div className="chips" style={{ marginTop: ".6rem" }}>
            <span className="chip chip-purple">{item.sector}</span>
            <span className="chip">{item.kind}</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* -------------------------------------------------------------------- CTA */

export function CtaBand({
  label = "Tanışalım",
  title = "Bir sonraki markanız bizimle konuşsun.",
  text = "Projenizi anlatın; keşif görüşmesinde ihtiyacınıza en uygun yol haritasını birlikte çıkaralım.",
}) {
  return (
    <section className="section">
      <div className="wrap">
        <div
          className="noise-panel"
          style={{
            padding: "clamp(2rem, 6vw, 5rem)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="glow"
            style={{
              width: "36vw",
              height: "36vw",
              background: "rgba(201,252,74,.16)",
              bottom: "-20vw",
              left: "-8vw",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              className="mono-label row"
              style={{ gap: ".55rem", marginBottom: "1.2rem" }}
            >
              <Sparkle size={9} color="#c9fc4a" />
              {label}
            </p>
            <Reveal>
              <h2 className="h2" style={{ maxWidth: "16ch" }}>
                {title}
              </h2>
            </Reveal>
            <p
              className="lede"
              style={{ maxWidth: "52ch", marginTop: "1.4rem" }}
            >
              {text}
            </p>
            <div className="row" style={{ gap: "1rem", marginTop: "2.4rem" }}>
              <Link to="/iletisim" className="btn">
                İletişime geçin
                <ArrowUpRight className="arrow" />
              </Link>
              <Link to="/calismalar" className="btn btn-ghost">
                Çalışmaları inceleyin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
