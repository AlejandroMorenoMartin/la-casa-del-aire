import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import "./Casa.css";

export default function Casa() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>{t("casa.meta.title")}</title>
        <meta name="description" content={t("casa.meta.description")} />
        <meta property="og:title" content={t("casa.meta.title")} />
        <meta property="og:description" content={t("casa.meta.description")} />
        <meta property="og:image" content="/src/assets/icons/favicon.svg" />
      </Helmet>

      <h1>{t("casa.title")}</h1>
      <p>{t("casa.description")}</p>
    </>
  );
}
