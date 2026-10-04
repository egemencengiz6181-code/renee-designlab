import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { toLang, useLang } from "./i18n";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Work = lazy(() => import("./pages/Work"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const References = lazy(() => import("./pages/References"));
const BrandGuide = lazy(() => import("./pages/BrandGuide"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Sayfa girişi CSS animasyonuyla yapılır; böylece JS zamanlamasından
 * bağımsız olarak içerik her koşulda görünür kalır.
 */
function Page({ children }) {
  return <div className="page-enter">{children}</div>;
}

function Loader() {
  const { t } = useLang();
  return (
    <div
      style={{
        minHeight: "70svh",
        display: "grid",
        placeItems: "center",
        color: "#5a5a5a",
        fontSize: ".78rem",
        letterSpacing: ".2em",
        textTransform: "uppercase",
      }}
    >
      {t.common.loading}
    </div>
  );
}

/** Her sayfa hem Türkçe yolunda hem de /en altındaki karşılığında yaşar. */
const ROUTES = [
  ["/", Home],
  ["/hakkimizda", About],
  ["/hizmetler", Services],
  ["/hizmetler/:slug", ServiceDetail],
  ["/calismalar", Work],
  ["/calismalar/:slug", CaseStudy],
  ["/referanslar", References],
  ["/kurumsal-kimlik", BrandGuide],
  ["/blog", Blog],
  ["/blog/:slug", BlogPost],
  ["/iletisim", Contact],
];

export default function App() {
  const location = useLocation();

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes location={location} key={location.pathname}>
          {ROUTES.flatMap(([path, Component]) =>
            [path, toLang(path, "en")].map((p) => (
              <Route
                key={p}
                path={p}
                element={
                  <Page>
                    <Component />
                  </Page>
                }
              />
            )),
          )}
          <Route
            path="*"
            element={
              <Page>
                <NotFound />
              </Page>
            }
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}
