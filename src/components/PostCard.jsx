import { Link } from "react-router-dom";
import { formatDate, readingTime } from "../data/blog";
import { size } from "../data/media";
import { useLang } from "../i18n";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./Mark";

/** Yazı kartı; blog listesinde ve yazı sayfasının altında kullanılır. */
export default function PostCard({ post, index = 0 }) {
  const { lang, t, lp } = useLang();
  const c = post[lang];

  return (
    <Reveal delay={(index % 3) * 0.06} style={{ height: "100%" }}>
      <Link
        to={lp(`/blog/${post.slug}`)}
        className="card"
        style={{ height: "100%" }}
      >
        <div className="card-media" style={{ aspectRatio: "16 / 10" }}>
          <img
            src={post.cover}
            alt={c.coverAlt}
            {...size(post.cover)}
            loading="lazy"
          />
        </div>
        <div className="card-body">
          <span className="mono-label">
            <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
            {" · "}
            {t.blog.read(readingTime(c.body))}
          </span>
          <h2 className="h4">{c.title}</h2>
          <p className="body" style={{ fontSize: ".9rem" }}>
            {c.excerpt}
          </p>
          <span
            className="row t-lime"
            style={{ gap: ".45rem", marginTop: ".7rem", fontSize: ".85rem" }}
          >
            {t.blog.readMore} <ArrowUpRight size={13} />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
