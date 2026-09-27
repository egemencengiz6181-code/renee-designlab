import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import Hl from "./Hl";
import { ArrowUpRight, Sparkle } from "./Mark";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

function AnkaraClock({ lang }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Europe/Istanbul",
        }).format(new Date()),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lang]);

  return <span className="tnum">Ankara {time}</span>;
}

export default function Footer() {
  const { lang, t, d, lp } = useLang();
  const { company, nav, services } = d;

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="grid-12" style={{ rowGap: "clamp(2.5rem, 6vw, 4rem)" }}>
          <div className="c6">
            <Reveal>
              <p className="mono-label" style={{ marginBottom: "1.4rem" }}>
                {t.footer.next}
              </p>
              <h2 className="h2" style={{ maxWidth: "16ch" }}>
                <Hl parts={t.footer.title} />
              </h2>
              <div className="row" style={{ gap: "1rem", marginTop: "2.2rem" }}>
                <Magnetic strength={0.22}>
                  <Link to={lp("/iletisim")} className="btn">
                    {t.footer.cta}
                    <ArrowUpRight className="arrow" />
                  </Link>
                </Magnetic>
                <a href={`tel:${company.phoneIntl}`} className="btn btn-ghost">
                  {company.phone}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="c2">
            <p className="mono-label" style={{ marginBottom: "1.2rem" }}>
              {t.footer.menu}
            </p>
            <ul className="stack gap-xs" style={{ listStyle: "none" }}>
              {nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={lp(n.to)}
                    className="link-u body"
                    style={{ color: "rgba(255,255,255,.75)" }}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="c2">
            <p className="mono-label" style={{ marginBottom: "1.2rem" }}>
              {t.footer.services}
            </p>
            <ul className="stack gap-xs" style={{ listStyle: "none" }}>
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={lp(`/hizmetler/${s.slug}`)}
                    className="link-u body"
                    style={{ color: "rgba(255,255,255,.75)" }}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={lp("/hizmetler")} className="link-u body t-lime">
                  {t.footer.all}
                </Link>
              </li>
            </ul>
          </div>

          <div className="c2">
            <p className="mono-label" style={{ marginBottom: "1.2rem" }}>
              {t.footer.contact}
            </p>
            <address
              className="stack gap-xs body"
              style={{ fontStyle: "normal", color: "rgba(255,255,255,.75)" }}
            >
              <a href={`mailto:${company.email}`} className="link-u">
                {company.email}
              </a>
              <a href={`mailto:${company.email2}`} className="link-u">
                {company.email2}
              </a>
              <a href={`tel:${company.phoneIntl}`} className="link-u">
                {company.phone}
              </a>
              <span className="row" style={{ gap: ".9rem", marginTop: ".6rem" }}>
                {company.social.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    className="link-u"
                    target="_blank"
                    rel="noopener me"
                    aria-label={`${company.name} ${s.name}`}
                  >
                    {s.name}
                  </a>
                ))}
              </span>
              <span style={{ marginTop: ".6rem" }}>
                {company.address.line1}
                <br />
                {company.address.line2}
                <br />
                {company.address.line3}
              </span>
            </address>
          </div>
        </div>

        <img
          src="/media/brand/renee-logo-white-trim.webp"
          alt=""
          className="footer-word"
          loading="lazy"
          width="840"
          height="364"
        />

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.name}. {t.footer.rights}
          </span>
          <span className="row" style={{ gap: ".5rem" }}>
            <Sparkle size={9} variant="purple" />
            {company.claim}
          </span>
          <AnkaraClock lang={lang} />
        </div>
      </div>
    </footer>
  );
}
