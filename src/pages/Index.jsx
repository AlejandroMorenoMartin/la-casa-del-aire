import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import VideoHero from "../components/VideoHero";
import Footer from "../components/Footer";
import "./Index.css";

export default function Index() {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* SEO */}
      <Helmet>
        <html lang={i18n.language} />
        <title>{t("index.meta.title")}</title>
        <meta
          name="description"
          content={t("index.meta.description")}
        />
        <meta property="og:title" content={t("index.meta.title")} />
        <meta
          property="og:description"
          content={t("index.meta.description")}
        />
        <meta property="og:image" content="/src/assets/icons/favicon.svg" />
      </Helmet>

      {/* Layout principal */}
      <div className="page">
        <Navbar />
        <main className="main">
          <VideoHero />
        </main>
        <Footer />
      </div>
    </>
  );
}
