import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { toLang, toTr, useLang } from "../i18n";
import { ArrowUpRight, Sparkle } from "./Mark";
import Magnetic from "./Magnetic";

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { lang, t, d, lp } = useLang();
  const { nav, company } = d;
  const other = lang === "en" ? "tr" : "en";
  const switchTo = toLang(toTr(pathname), other);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={`nav ${stuck || open ? "is-stuck" : ""}`}>
        <div className="nav-inner">
          <Link
            to={lp("/")}
            className="nav-logo"
            aria-label={`${company.name} — ${t.nav.homeAria}`}
          >
            <img
              src="/media/brand/renee-logo-white-trim.webp"
              alt=""
              width="210"
              height="91"
            />
            <span className="sr-only">{company.name}</span>
          </Link>

          <nav className="nav-links" aria-label={t.nav.mainMenu}>
            {nav.slice(1).map((item) => (
              <NavLink
                key={item.to}
                to={lp(item.to)}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "is-active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="row" style={{ gap: ".75rem" }}>
            <Link
              to={switchTo}
              className="lang-switch"
              hrefLang={other}
              lang={other}
              title={t.lang.switchLabel}
            >
              {t.lang.switchTo}
              <span className="sr-only"> — {t.lang.switchLabel}</span>
            </Link>
            <Magnetic strength={0.25}>
              <Link to={lp("/iletisim")} className="nav-cta">
                {t.nav.cta}
                <ArrowUpRight size={13} />
              </Link>
            </Magnetic>

            <button
              className={`burger ${open ? "is-open" : ""}`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobil-menu"
              aria-label={open ? t.nav.close : t.nav.open}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="menu" id="mobil-menu">
          <ul className="menu-list">
            {nav.map((item, i) => (
              <li
                key={item.to}
                className="rv rv-in"
                style={{
                  "--rv-y": "24px",
                  "--rv-delay": `${0.06 + i * 0.045}s`,
                }}
              >
                <Link to={lp(item.to)} className="menu-item">
                  <span className="idx">0{i + 1}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="menu-foot">
            <a href={`tel:${company.phoneIntl}`} className="link-u">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="link-u">
              {company.email}
            </a>
            <span className="row" style={{ gap: ".4rem" }}>
              <Sparkle size={9} variant="lime" />
              {company.address.line2}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
