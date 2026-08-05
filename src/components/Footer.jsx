import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { company, nav, services } from "../data/site";
import { ArrowUpRight, Sparkle } from "./Mark";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

function AnkaraClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("tr-TR", {
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
  }, []);

  return <span className="tnum">Ankara {time}</span>;
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="grid-12" style={{ rowGap: "clamp(2.5rem, 6vw, 4rem)" }}>
          <div className="c6">
            <Reveal>
              <p className="mono-label" style={{ marginBottom: "1.4rem" }}>
                Bir sonraki iş
              </p>
              <h2 className="h2" style={{ maxWidth: "16ch" }}>
                Markanızı <span className="serif-i t-lime">yeniden</span>{" "}
                şekillendirelim.
              </h2>
              <div className="row" style={{ gap: "1rem", marginTop: "2.2rem" }}>
                <Magnetic strength={0.22}>
                  <Link to="/iletisim" className="btn">
                    Projenizi anlatın
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
              Menü
            </p>
            <ul className="stack gap-xs" style={{ listStyle: "none" }}>
              {nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
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
              Hizmetler
            </p>
            <ul className="stack gap-xs" style={{ listStyle: "none" }}>
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/hizmetler/${s.slug}`}
                    className="link-u body"
                    style={{ color: "rgba(255,255,255,.75)" }}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/hizmetler" className="link-u body t-lime">
                  Tümü
                </Link>
              </li>
            </ul>
          </div>

          <div className="c2">
            <p className="mono-label" style={{ marginBottom: "1.2rem" }}>
              İletişim
            </p>
            <address
              className="stack gap-xs body"
              style={{ fontStyle: "normal", color: "rgba(255,255,255,.75)" }}
            >
              <a href={`mailto:${company.email}`} className="link-u">
                {company.email}
              </a>
              <a href={`tel:${company.phoneIntl}`} className="link-u">
                {company.phone}
              </a>
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
          src="/media/brand/renee-logo-white-trim.png"
          alt=""
          className="footer-word"
          loading="lazy"
          width="840"
          height="364"
        />

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.name}. Tüm hakları saklıdır.
          </span>
          <span className="row" style={{ gap: ".5rem" }}>
            <Sparkle size={9} variant="purple" />
            {company.claim}
          </span>
          <AnkaraClock />
        </div>
      </div>
    </footer>
  );
}
