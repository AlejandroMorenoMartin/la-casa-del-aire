import { useTranslation } from "react-i18next";

export default function VideoHero() {
  const { t } = useTranslation();

  return (
    <section className="video-hero">
      <video autoPlay muted loop playsInline>
        <source src="/videos/video_720.webm" type="video/webm" />
        <source src="/videos/video_720.mp4" type="video/mp4" />
      </video>
      <div className="overlay">
        <h1>{t("index.hero.title")}</h1>
      </div>
    </section>
  );
}
