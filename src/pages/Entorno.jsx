import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import "./Entorno.css";

export default function Entorno() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>{t("entorno.meta.title")}</title>
        <meta name="description" content={t("entorno.meta.description")} />
        <meta property="og:title" content={t("entorno.meta.title")} />
        <meta property="og:description" content={t("entorno.meta.description")} />
        <meta property="og:image" content="/src/assets/icons/favicon.svg" />
      </Helmet>

      <h1>{t("entorno.title")}</h1>
      <p>{t("entorno.description")}</p>
    </>
  );
}
