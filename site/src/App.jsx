import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Work = lazy(() => import("./pages/Work"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const References = lazy(() => import("./pages/References"));
const BrandGuide = lazy(() => import("./pages/BrandGuide"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Sayfa girişi CSS animasyonuyla yapılır; böylece JS zamanlamasından
 * bağımsız olarak içerik her koşulda görünür kalır.
 */
function Page({ children }) {
  return <div className="page-enter">{children}</div>;
}

function Loader() {
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
      Yükleniyor
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Page>
                <Home />
              </Page>
            }
          />
          <Route
            path="/hakkimizda"
            element={
              <Page>
                <About />
              </Page>
            }
          />
          <Route
            path="/hizmetler"
            element={
              <Page>
                <Services />
              </Page>
            }
          />
          <Route
            path="/hizmetler/:slug"
            element={
              <Page>
                <ServiceDetail />
              </Page>
            }
          />
          <Route
            path="/calismalar"
            element={
              <Page>
                <Work />
              </Page>
            }
          />
          <Route
            path="/calismalar/:slug"
            element={
              <Page>
                <CaseStudy />
              </Page>
            }
          />
          <Route
            path="/referanslar"
            element={
              <Page>
                <References />
              </Page>
            }
          />
          <Route
            path="/kurumsal-kimlik"
            element={
              <Page>
                <BrandGuide />
              </Page>
            }
          />
          <Route
            path="/iletisim"
            element={
              <Page>
                <Contact />
              </Page>
            }
          />
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
