import { Link } from "react-router-dom";
import useSeo from "../hooks/useSeo";
import { useLang } from "../i18n";
import Hl from "../components/Hl";
import { ArrowUpRight, BrandMark } from "../components/Mark";

export default function NotFound() {
  const { t, d, lp } = useLang();
  const nf = t.notFound;

  useSeo({
    title: nf.seoTitle,
    description: nf.seoDesc,
    path: "/404",
  });

  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="glow"
        style={{
          width: "48vw",
          height: "48vw",
          background: "rgba(135,102,232,.4)",
          top: "-10vw",
          right: "-10vw",
        }}
      />

      <div
        className="spin-slow"
        style={{ position: "absolute", left: "6vw", bottom: "8vh", zIndex: 0 }}
      >
        <BrandMark size={180} variant="lime" />
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <p className="mono-label">{nf.label}</p>
        <h1 className="display" style={{ margin: "1.5rem 0" }}>
          <Hl parts={nf.title} className="serif-i t-purple" />
        </h1>
        <p className="lede" style={{ maxWidth: "44ch" }}>
          {nf.text}
        </p>

        <div
          className="row"
          style={{ gap: ".6rem", marginTop: "2.5rem", flexWrap: "wrap" }}
        >
          {d.nav.map((n) => (
            <Link key={n.to} to={lp(n.to)} className="chip">
              {n.label}
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "2.5rem" }}>
          <Link to={lp("/")} className="btn">
            {nf.back}
            <ArrowUpRight className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
