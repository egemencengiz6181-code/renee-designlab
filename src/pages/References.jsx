import { useMemo, useState } from "react";
import { refSectors, references } from "../data/site";
import useSeo from "../hooks/useSeo";
import { CtaBand, PageHead } from "../components/UI";

export default function References() {
  const [filter, setFilter] = useState("Tümü");

  const list = useMemo(
    () =>
      filter === "Tümü"
        ? references
        : references.filter((r) => r.sector === filter),
    [filter],
  );

  useSeo({
    title: "Referanslarımız",
    description:
      "Eğitimden sağlığa, teknolojiden perakendeye 90'ı aşkın marka Renee Design Lab ile çalıştı. Final Okulları, Bayer, Medicana, Yataş Bedding, Altava Group ve daha fazlası.",
    path: "/referanslar",
  });

  return (
    <>
      <PageHead
        label="Referanslar"
        title={
          <>
            Bizimle çalışan <span className="serif-i t-lime">markalar</span>.
          </>
        }
        lede="Eğitimden sağlığa, teknolojiden perakendeye kadar 90'ı aşkın markayla; kimlik, dijital ve iletişim projelerinde birlikte çalıştık. Aşağıda bu markalardan bir seçki yer alıyor."
        crumbs={[{ label: "Anasayfa", to: "/" }, { label: "Referanslar" }]}
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
              {list.length} marka
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
                <img src={r.src} alt={`${r.name} logosu`} loading="lazy" />
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
            Listelenen markalara ait logolar, yalnızca gerçekleştirilen iş
            birliklerini belirtmek amacıyla kullanılmaktadır. Tüm marka ve logo
            hakları ilgili kuruluşlara aittir.
          </p>
        </div>
      </section>

      <CtaBand
        label="Yeni iş birliği"
        title="Listeye siz de katılın."
        text="Markanızın bugünkü ihtiyacını konuşalım; size en uygun çalışma modelini birlikte belirleyelim."
      />
    </>
  );
}
