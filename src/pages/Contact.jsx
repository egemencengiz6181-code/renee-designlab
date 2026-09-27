import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLang } from "../i18n";
import Hl from "../components/Hl";
import useSeo from "../hooks/useSeo";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { ArrowUpRight, Sparkle } from "../components/Mark";
import { PageHead } from "../components/UI";

export default function Contact() {
  const { lang, t, d } = useLang();
  const { budgets, company, services } = d;
  const c = t.contact;
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
    title: c.seoTitle,
    description: c.seoDesc(company),
    path: "/iletisim",
  });

  // Hizmet sayfasından gelindiyse ilgili hizmeti önceden seç.
  // Form değeri her iki dilde de Türkçe slug olarak tutulur.
  useEffect(() => {
    const s = params.get(lang === "en" ? "service" : "hizmet");
    const svc = s && services.find((x) => x.slug === s || x.slugEn === s);
    if (svc) setForm((f) => ({ ...f, service: svc.slug }));
  }, [params, lang, services]);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  /**
   * Site şu an statik olarak yayınlandığı için form, hazır bir e-posta
   * taslağı oluşturur. Sunucu tarafı bir uç nokta eklendiğinde bu fonksiyon
   * doğrudan fetch ile değiştirilebilir.
   */
  const onSubmit = (e) => {
    e.preventDefault();
    const m = c.mail;
    const svc = services.find((s) => s.slug === form.service);
    const subject = `${m.subject} — ${form.company || form.name}`;
    const body = [
      `${m.name}: ${form.name}`,
      `${m.company}: ${form.company}`,
      `${m.email}: ${form.email}`,
      `${m.phone}: ${form.phone}`,
      `${m.service}: ${svc ? svc.title : m.none}`,
      `${m.budget}: ${form.budget || m.none}`,
      "",
      m.details,
      form.message,
    ].join("\n");

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const contactLines = [
    {
      label: c.phone,
      values: [{ value: company.phone, href: `tel:${company.phoneIntl}` }],
    },
    {
      label: c.email,
      values: [
        { value: company.email, href: `mailto:${company.email}` },
        { value: company.email2, href: `mailto:${company.email2}` },
      ],
    },
    {
      label: c.address,
      external: true,
      values: [
        {
          value: `${company.address.line1}, ${company.address.line2}`,
          href: `https://maps.google.com/?q=${encodeURIComponent(company.mapQuery)}`,
        },
      ],
    },
    {
      label: c.web,
      external: true,
      values: [{ value: company.site, href: `https://${company.site}` }],
    },
  ];

  return (
    <>
      <PageHead
        label={c.label}
        title={<Hl parts={c.title} />}
        lede={c.lede}
        crumbs={[{ label: t.common.home, to: "/" }, { label: c.crumb }]}
      />

      {/* ------------------------------------------------------- iletişim şeridi */}
      <section className="section-tight">
        <div className="wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: "2rem",
              borderTop: "1px solid var(--line-soft)",
              paddingTop: "2.5rem",
            }}
          >
            {contactLines.map((line, i) => (
              <Reveal key={line.label} delay={i * 0.06}>
                <p className="mono-label">{line.label}</p>
                <span className="stack gap-xs" style={{ marginTop: ".9rem" }}>
                  {line.values.map((v) => (
                    <a
                      key={v.value}
                      href={v.href}
                      className="link-u"
                      target={line.external ? "_blank" : undefined}
                      rel={line.external ? "noreferrer" : undefined}
                      style={{
                        display: "inline-block",
                        fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                        letterSpacing: "-.02em",
                      }}
                    >
                      {v.value}
                    </a>
                  ))}
                </span>
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
                <Sparkle size={9} variant="purple" />
                {c.formLabel}
              </p>
              <h2
                className="h3"
                style={{ marginTop: "1.3rem", maxWidth: "14ch" }}
              >
                {c.formTitle}
              </h2>
              <p
                className="body"
                style={{ marginTop: "1.4rem", maxWidth: "38ch" }}
              >
                {c.formNote[0]}
                <a href={`tel:${company.phoneIntl}`} className="link-u t-lime">
                  {company.phone}
                </a>
                {c.formNote[1]}
              </p>

              <div
                style={{
                  marginTop: "2.5rem",
                  padding: "1.5rem",
                  border: "1px solid var(--line-soft)",
                }}
              >
                <p className="mono-label">{c.hours}</p>
                <p
                  className="body"
                  style={{ marginTop: ".8rem", fontSize: ".9rem" }}
                >
                  {c.days}
                  <br />
                  {c.time}
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
                  <label htmlFor="name">{c.name}</label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder={c.namePh}
                    autoComplete="name"
                  />
                </div>
                <div className="field">
                  <label htmlFor="company">{c.company}</label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={update("company")}
                    placeholder={c.companyPh}
                    autoComplete="organization"
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">{c.emailLabel}</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder={c.emailPh}
                    autoComplete="email"
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">{c.phoneLabel}</label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder={c.phonePh}
                    autoComplete="tel"
                  />
                </div>
                <div className="field">
                  <label htmlFor="service">{c.service}</label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={update("service")}
                  >
                    <option value="">{c.select}</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="budget">{c.budget}</label>
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={update("budget")}
                  >
                    <option value="">{c.select}</option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">{c.message}</label>
                <textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={update("message")}
                  placeholder={c.messagePh}
                />
              </div>

              <div className="row between" style={{ gap: "1.5rem" }}>
                <Magnetic strength={0.2}>
                  <button type="submit" className="btn">
                    {c.send}
                    <ArrowUpRight className="arrow" />
                  </button>
                </Magnetic>

                {sent && (
                  <span
                    className="row t-lime rv rv-in"
                    style={{ gap: ".5rem", fontSize: ".9rem", "--rv-y": "8px" }}
                    role="status"
                  >
                    <Sparkle size={11} variant="lime" />
                    {c.sent}
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
              title={c.mapTitle}
              src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`}
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
              href={`https://maps.google.com/?q=${encodeURIComponent(company.mapQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="link-u t-lime row"
              style={{ gap: ".4rem" }}
            >
              {c.directions} <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
