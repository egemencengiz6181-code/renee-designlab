import { useMemo, useState } from "react";
import { useLang } from "../i18n";
import Hl from "../components/Hl";
import useSeo from "../hooks/useSeo";
import { breadcrumbLd } from "../seo/head";
import { CtaBand, PageHead } from "../components/UI";
import { size } from "../data/media";

export default function References() {
  const { lang, t, d } = useLang();
  const { refSectors, references } = d;
  const rf = t.refs;
  const ALL = refSectors[0];
  const [filter, setFilter] = useState(ALL);

  const list = useMemo(
    () =>
      filter === ALL
        ? references
        : references.filter((r) => r.sector === filter),
    [filter, ALL, references],
  );

  useSeo({
    title: rf.seoTitle,
    description: rf.seoDesc,
    path: "/referanslar",
    jsonLd: [
      breadcrumbLd(lang, [
        { name: t.common.home, path: "/" },
        { name: rf.crumb, path: "/referanslar" },
      ]),
    ],
  });

  return (
    <>
      <PageHead
        label={rf.label}
        title={<Hl parts={rf.title} />}
        lede={rf.lede}
        crumbs={[{ label: t.common.home, to: "/" }, { label: rf.crumb }]}
      />

      <section className="section-tight">
        <div className="wrap">
          <div
            className="row"
            style={{
              gap: ".6rem",
              paddingBottom: "2.2rem",
              borderBottom: "1px solid var(--line-soft)",
              marginBottom: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            {refSectors.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className="chip"
                style={
                  filter === s
                    ? {
                        background: "var(--white)",
                        color: "var(--black)",
                        borderColor: "var(--white)",
                      }
                    : undefined
                }
                aria-pressed={filter === s}
              >
                {s}
              </button>
            ))}
            <span className="mono-label tnum" style={{ marginLeft: "auto" }}>
              {rf.count(list.length)}
            </span>
          </div>

          <div className="ref-grid">
            {list.map((r, i) => (
              <div
                key={`${filter}-${r.n}`}
                className="ref-cell fade-in"
                style={{ "--rv-delay": `${(i % 12) * 0.02}s` }}
                title={r.name}
              >
                <img
                  src={r.src}
                  alt={rf.logoAlt(r.name)}
                  {...size(r.src)}
                  loading="lazy"
                />
                <span className="ref-name">{r.name}</span>
              </div>
            ))}
          </div>

          <p
            className="body"
            style={{
              marginTop: "2.5rem",
              fontSize: ".85rem",
              maxWidth: "60ch",
            }}
          >
            {rf.note}
          </p>
        </div>
      </section>

      <CtaBand
        label={rf.ctaLabel}
        title={rf.ctaTitle}
        text={rf.ctaText}
      />
    </>
  );
}
