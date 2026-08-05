import { useMemo, useState } from "react";
import { cases } from "../data/site";
import useSeo from "../hooks/useSeo";
import { CaseCard, CtaBand, PageHead } from "../components/UI";

export default function Work() {
  const [filter, setFilter] = useState("Tümü");

  const sectors = useMemo(
    () => ["Tümü", ...Array.from(new Set(cases.map((c) => c.sector)))],
    [],
  );

  const list = useMemo(
    () =>
      filter === "Tümü" ? cases : cases.filter((c) => c.sector === filter),
    [filter],
  );

  useSeo({
    title: "Çalışmalar",
    description:
      "Arni, Deru, ERTS, Every, Peralta ve Tepsta markaları için hazırladığımız kurumsal kimlik çalışmaları — konseptten uygulamaya vaka incelemeleri.",
    path: "/calismalar",
  });

  return (
    <>
      <PageHead
        label="Çalışmalar"
        title={
          <>
            Marka marka, <span className="serif-i t-purple">kimlik</span>{" "}
            hikayeleri.
          </>
        }
        lede="Her proje kendi hikayesiyle başlar. Aşağıda; problemi, kurduğumuz sistemi ve ortaya çıkan uygulamaları marka marka inceleyebilirsiniz."
        crumbs={[{ label: "Anasayfa", to: "/" }, { label: "Çalışmalar" }]}
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
              {list.length} çalışma
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
        label="Sıradaki siz olun"
        title="Markanızın hikayesini birlikte kuralım."
        text="Yeni bir kimlik ya da mevcut kimliğin yenilenmesi — hangi noktada olursanız olun, süreci sizin için netleştirelim."
      />
    </>
  );
}
