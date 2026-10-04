import { posts } from "../data/blog";
import useSeo from "../hooks/useSeo";
import { breadcrumbLd, BRAND, ORG_ID, SITE } from "../seo/head";
import { useLang } from "../i18n";
import Hl from "../components/Hl";
import PostCard from "../components/PostCard";
import { CtaBand, PageHead } from "../components/UI";

export default function Blog() {
  const { lang, t, lp } = useLang();
  const b = t.blog;
  const list = [...posts].sort((x, y) => y.date.localeCompare(x.date));

  useSeo({
    title: b.seoTitle,
    description: b.seoDesc,
    path: "/blog",
    jsonLd: [
      breadcrumbLd(lang, [
        { name: t.common.home, path: "/" },
        { name: b.crumb, path: "/blog" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: `${BRAND} Blog`,
        url: `${SITE}${lp("/blog")}`,
        inLanguage: lang,
        publisher: { "@id": ORG_ID },
        blogPost: list.map((p) => ({
          "@type": "BlogPosting",
          headline: p[lang].title,
          url: `${SITE}${lp(`/blog/${p.slug}`)}`,
          datePublished: p.date,
        })),
      },
    ],
  });

  return (
    <>
      <PageHead
        label={b.label}
        title={<Hl parts={b.title} />}
        lede={b.lede}
        crumbs={[{ label: t.common.home, to: "/" }, { label: b.crumb }]}
      />

      <section className="section-tight">
        <div className="wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
              gap: "var(--gutter)",
            }}
          >
            {list.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
