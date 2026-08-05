import { Link } from "react-router-dom";
import useSeo from "../hooks/useSeo";
import { nav } from "../data/site";
import { ArrowUpRight, BrandMark } from "../components/Mark";

export default function NotFound() {
  useSeo({
    title: "Sayfa bulunamadı",
    description: "Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.",
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
        <BrandMark size={180} color="rgba(201,252,74,.18)" />
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <p className="mono-label">Hata 404</p>
        <h1 className="display" style={{ margin: "1.5rem 0" }}>
          Kayıp <span className="serif-i t-purple">sayfa</span>
        </h1>
        <p className="lede" style={{ maxWidth: "44ch" }}>
          Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir. Aşağıdaki
          bağlantılardan devam edebilirsiniz.
        </p>

        <div
          className="row"
          style={{ gap: ".6rem", marginTop: "2.5rem", flexWrap: "wrap" }}
        >
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="chip">
              {n.label}
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "2.5rem" }}>
          <Link to="/" className="btn">
            Anasayfaya dön
            <ArrowUpRight className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
