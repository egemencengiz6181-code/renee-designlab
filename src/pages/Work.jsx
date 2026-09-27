import { useMemo, useState } from "react";
import { useLang } from "../i18n";
import Hl from "../components/Hl";
import useSeo from "../hooks/useSeo";
import { breadcrumbLd } from "../seo/head";
import { CaseCard, CtaBand, PageHead } from "../components/UI";

export default function Work() {
  const { lang, t, d } = useLang();
  const { cases } = d;
  const w = t.work;
  const ALL = t.common.all;
  const [filter, setFilter] = useState(ALL);

  const sectors = useMemo(
    () => [ALL, ...Array.from(new Set(cases.map((c) => c.sector)))],
    [ALL, cases],
  );

  const list = useMemo(
    () => (filter === ALL ? cases : cases.filter((c) => c.sector === filter)),
    [filter, ALL, cases],
  );

  useSeo({
    title: w.seoTitle,
    description: w.seoDesc,
    path: "/calismalar",
    jsonLd: [
      breadcrumbLd(lang, [
        { name: t.common.home, path: "/" },
        { name: w.crumb, path: "/calismalar" },
      ]),
    ],
  });

  return (
    <>
      <PageHead
        label={w.label}
        title={<Hl parts={w.title} className="serif-i t-purple" />}
        lede={w.lede}
        crumbs={[{ label: t.common.home, to: "/" }, { label: w.crumb }]}
      />

      <section className="section-tight">
        <div className="wrap">
          <div
            className="row"
            style={{
              gap: ".6rem",
              paddingBottom: "2.5rem",
              borderBottom: "1px solid var(--line-soft)",
              marginBottom: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            {sectors.map((s) => (
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
              {w.count(list.length)}
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              gap: "var(--gutter)",
            }}
          >
            {list.map((c, i) => (
              <CaseCard key={c.slug} item={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        label={w.ctaLabel}
        title={w.ctaTitle}
        text={w.ctaText}
      />
    </>
  );
}
