import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { budgets, company, services } from "../data/site";
import useSeo from "../hooks/useSeo";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { ArrowUpRight, Sparkle } from "../components/Mark";
import { PageHead } from "../components/UI";

export default function Contact() {
  const [params] = useSearchParams();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  useSeo({
    title: "İletişim",
    description: `Renee Design Lab ile iletişime geçin. ${company.address.line1}, ${company.address.line2}. Telefon: ${company.phone} — E-posta: ${company.email}`,
    path: "/iletisim",
  });

  useEffect(() => {
    const s = params.get("hizmet");
    if (s && services.some((x) => x.slug === s)) {
      setForm((f) => ({ ...f, service: s }));
    }
  }, [params]);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  /**
   * Site şu an statik olarak yayınlandığı için form, hazır bir e-posta
   * taslağı oluşturur. Sunucu tarafı bir uç nokta eklendiğinde bu fonksiyon
   * doğrudan fetch ile değiştirilebilir.
   */
  const onSubmit = (e) => {
    e.preventDefault();
    const svc = services.find((s) => s.slug === form.service);
    const subject = `Teklif talebi — ${form.company || form.name}`;
    const body = [
      `Ad Soyad: ${form.name}`,
      `Firma: ${form.company}`,
      `E-posta: ${form.email}`,
      `Telefon: ${form.phone}`,
      `Hizmet: ${svc ? svc.title : "Belirtilmedi"}`,
      `Bütçe: ${form.budget || "Belirtilmedi"}`,
      "",
      "Proje detayı:",
      form.message,
    ].join("\n");

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const contactLines = [
    {
      label: "Telefon",
      value: company.phone,
      href: `tel:${company.phoneIntl}`,
    },
    { label: "E-posta", value: company.email, href: `mailto:${company.email}` },
    {
      label: "Adres",
      value: `${company.address.line1}, ${company.address.line2}`,
      href: "https://maps.google.com/?q=YDA+Center+Kızılırmak+Çankaya+Ankara",
    },
    { label: "Web", value: company.site, href: `https://${company.site}` },
  ];

  return (
    <>
      <PageHead
        label="Tanışalım"
        title={
          <>
            Projenizi <span className="serif-i t-lime">anlatın</span>, gerisini
            konuşalım.
          </>
        }
        lede="Formu doldurun ya da doğrudan arayın. Keşif görüşmesinde ihtiyacınızı netleştirip size özel bir yol haritası çıkaralım."
        crumbs={[{ label: "Anasayfa", to: "/" }, { label: "İletişim" }]}
      />

      {/* ------------------------------------------------------- iletişim şeridi */}
      <section className="section-tight">
        <div className="wrap">
          <div
            className="grid-12"
            style={{
              rowGap: "2rem",
              borderTop: "1px solid var(--line-soft)",
              paddingTop: "2.5rem",
            }}
          >
            {contactLines.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06} className="c3">
                <p className="mono-label">{c.label}</p>
                <a
                  href={c.href}
                  className="link-u"
                  target={
                    c.label === "Adres" || c.label === "Web"
                      ? "_blank"
                      : undefined
                  }
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: ".9rem",
                    fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                    letterSpacing: "-.02em",
                  }}
                >
                  {c.value}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- form */}
      <section className="section">
        <div className="wrap">
          <div className="grid-12" style={{ rowGap: "3rem" }}>
            <div className="c4">
              <p className="mono-label row" style={{ gap: ".55rem" }}>
                <Sparkle size={9} color="#8766e8" />
                Teklif formu
              </p>
              <h2
                className="h3"
                style={{ marginTop: "1.3rem", maxWidth: "14ch" }}
              >
                Birkaç soruyla başlayalım.
              </h2>
              <p
                className="body"
                style={{ marginTop: "1.4rem", maxWidth: "38ch" }}
              >
                Formu gönderdiğinizde bilgiler hazır bir e-posta taslağına
                dönüşür. Dilerseniz doğrudan{" "}
                <a href={`tel:${company.phoneIntl}`} className="link-u t-lime">
                  {company.phone}
                </a>{" "}
                numarasından da ulaşabilirsiniz.
              </p>

              <div
                style={{
                  marginTop: "2.5rem",
                  padding: "1.5rem",
                  border: "1px solid var(--line-soft)",
                }}
              >
                <p className="mono-label">Çalışma saatleri</p>
                <p
                  className="body"
                  style={{ marginTop: ".8rem", fontSize: ".9rem" }}
                >
                  Pazartesi – Cuma
                  <br />
                  09.00 – 18.00 (TSİ)
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="c-r6 stack gap-l">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                  gap: "2rem",
                }}
              >
                <div className="field">
                  <label htmlFor="name">Ad Soyad *</label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Adınız"
                    autoComplete="name"
                  />
                </div>
                <div className="field">
                  <label htmlFor="company">Firma</label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={update("company")}
                    placeholder="Marka / firma adı"
                    autoComplete="organization"
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">E-posta *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="ornek@firma.com"
                    autoComplete="email"
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">Telefon</label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="05xx xxx xx xx"
                    autoComplete="tel"
                  />
                </div>
                <div className="field">
                  <label htmlFor="service">İlgilendiğiniz hizmet</label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={update("service")}
                  >
                    <option value="">Seçiniz</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="budget">Bütçe aralığı</label>
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={update("budget")}
                  >
                    <option value="">Seçiniz</option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">Projeniz *</label>
                <textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Markanızdan, hedeflerinizden ve beklediğiniz zaman planından kısaca bahsedin."
                />
              </div>

              <div className="row between" style={{ gap: "1.5rem" }}>
                <Magnetic strength={0.2}>
                  <button type="submit" className="btn">
                    Gönder
                    <ArrowUpRight className="arrow" />
                  </button>
                </Magnetic>

                {sent && (
                  <span
                    className="row t-lime rv rv-in"
                    style={{ gap: ".5rem", fontSize: ".9rem", "--rv-y": "8px" }}
                    role="status"
                  >
                    <Sparkle size={11} color="#c9fc4a" />
                    E-posta taslağınız hazırlandı.
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- harita */}
      <section className="section-tight">
        <div className="wrap">
          <div
            style={{
              border: "1px solid var(--line-soft)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <iframe
              title="Renee Design Lab ofis konumu"
              src="https://www.google.com/maps?q=YDA%20Center%20K%C4%B1z%C4%B1l%C4%B1rmak%20%C3%87ankaya%20Ankara&output=embed"
              width="100%"
              height="440"
              style={{
                border: 0,
                filter: "grayscale(1) invert(.92) contrast(.9)",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div
            className="row between"
            style={{ gap: "1.5rem", marginTop: "1.6rem" }}
          >
            <address className="body" style={{ fontStyle: "normal" }}>
              {company.address.line1}, {company.address.line2},{" "}
              {company.address.line3}
            </address>
            <a
              href="https://maps.google.com/?q=YDA+Center+Kızılırmak+Çankaya+Ankara"
              target="_blank"
              rel="noreferrer"
              className="link-u t-lime row"
              style={{ gap: ".4rem" }}
            >
              Yol tarifi al <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
