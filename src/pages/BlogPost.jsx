import { Link, Navigate, useParams } from "react-router-dom";
import { formatDate, getPost, posts, readingTime } from "../data/blog";
import { size } from "../data/media";
import useSeo from "../hooks/useSeo";
import { breadcrumbLd, BRAND, ORG_ID, SITE } from "../seo/head";
import { useLang } from "../i18n";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { ArrowUpRight, Sparkle } from "../components/Mark";
import { SectionHead } from "../components/UI";
import PostCard from "../components/PostCard";

function Block({ type, value }) {
  if (type === "h") return <h2 className="h3">{value}</h2>;
  if (type === "ul")
    return (
      <ul>
        {value.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
    );
  return <p>{value}</p>;
}

export default function BlogPost() {
  const { slug } = useParams();
  const { lang, t, d, lp } = useLang();
  const post = getPost(slug);
  const b = t.blog;
  const c = post?.[lang];
  const ownSlug = post && (lang === "en" ? post.slugEn : post.slug);
  const service = post && d.services.find((s) => s.slug === post.service);

  const url = post && `${SITE}${lp(`/blog/${post.slug}`)}`;
  useSeo({
    fullTitle:
      c &&
      (c.seoTitle.length + BRAND.length + 3 <= 60
        ? `${c.seoTitle} | ${BRAND}`
        : c.seoTitle),
    description: c?.description,
    path: `/blog/${post?.slug ?? slug}`,
    image: post?.cover,
    jsonLd: post
      ? [
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: c.title,
            description: c.description,
            image: `${SITE}${post.cover}`,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: lang,
            mainEntityOfPage: url,
            author: { "@id": ORG_ID },
            publisher: { "@id": ORG_ID },
            about: service && {
              "@id": `${SITE}${lp(`/hizmetler/${service.slug}`)}#service`,
            },
          },
          breadcrumbLd(lang, [
            { name: t.common.home, path: "/" },
            { name: b.crumb, path: "/blog" },
            { name: c.title, path: `/blog/${post.slug}` },
          ]),
        ]
      : [],
  });

  if (!post) return <Navigate to={lp("/blog")} replace />;
  // Diğer dilin slug'ıyla gelindiyse doğru adrese yönlendir.
  if (slug !== ownSlug) {
    return <Navigate to={lp(`/blog/${post.slug}`)} replace />;
  }

  const others = posts.filter((p) => p !== post).slice(0, 3);

  return (
    <>
      {/* ------------------------------------------------------------- başlık */}
      <section className="page-head">
        <div
          className="glow"
          style={{
            width: "40vw",
            height: "40vw",
            background: "rgba(135,102,232,.35)",
            top: "-18vw",
            right: "-12vw",
          }}
        />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="crumb" aria-label={t.common.crumb}>
            <Link to={lp("/")}>{t.common.home}</Link>
            <span aria-hidden="true">/</span>
            <Link to={lp("/blog")}>{b.crumb}</Link>
          </nav>

          <p
            className="mono-label row"
            style={{ gap: ".55rem", marginBottom: "1.2rem" }}
          >
            <Sparkle size={9} variant="lime" />
            <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
            {" · "}
            {b.read(readingTime(c.body))}
          </p>

          <Reveal>
            <h1 className="h1" style={{ maxWidth: "20ch" }}>
              {c.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede" style={{ maxWidth: "58ch", marginTop: "1.8rem" }}>
              {c.excerpt}
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- görsel */}
      <section>
        <div className="wrap">
          <img
            src={post.cover}
            alt={c.coverAlt}
            {...size(post.cover)}
            fetchPriority="high"
            style={{
              display: "block",
              width: "100%",
              maxWidth: "1040px",
              height: "auto",
              margin: "0 auto",
            }}
          />
        </div>
      </section>

      {/* ---------------------------------------------------------------- yazı */}
      <section className="section-tight">
        <div className="wrap">
          <article className="prose">
            {c.body.map((block, i) => (
              <Block key={i} type={block[0]} value={block[1]} />
            ))}
          </article>
        </div>
      </section>

      {/* --------------------------------------------------------- ilgili hizmet */}
      {service && (
        <section className="section-tight">
          <div className="wrap">
            <div
              className="noise-panel row between"
              style={{ padding: "clamp(1.8rem, 5vw, 3.5rem)", gap: "2rem" }}
            >
              <div>
                <p className="mono-label">{b.related}</p>
                <p
                  className="h3"
                  style={{ marginTop: "1rem", maxWidth: "22ch" }}
                >
                  {b.relatedTitle(service.title)}
                </p>
              </div>
              <Magnetic strength={0.2}>
                <Link
                  to={lp(`/hizmetler/${service.slug}`)}
                  className="btn btn-purple"
                >
                  {b.relatedBtn}
                  <ArrowUpRight className="arrow" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- diğer yazılar */}
      {others.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHead label={b.label} title={b.more} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
                gap: "var(--gutter)",
              }}
            >
              {others.map((p, i) => (
                <PostCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
