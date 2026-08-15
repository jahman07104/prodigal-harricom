"use client";

import Image from "next/image";

import { PORTFOLIO_HREF } from "../lib/brand";
import { useI18n } from "../../lib/LocaleProvider";
import styles from "../harricom.module.css";
import { WhatsAppDemo } from "./WhatsAppDemo";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className={styles.heroWrap} aria-labelledby="harricom-hero-title">
      <div className={styles.heroFrame}>
        <Image
          src="/harricom/images/background.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 1120px) 100vw, 1120px"
          className={styles.heroMedia}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>{t.hero.kicker}</p>
            <h1 id="harricom-hero-title" className={styles.heroTitle}>
              {t.hero.title}
            </h1>
            <p className={styles.audience}>{t.hero.audience}</p>
            <div className={styles.actions}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="/harricom/start">
                {t.hero.start}
              </a>
              <a className={`${styles.btn} ${styles.btnSecondary}`} href="#templates">
                {t.hero.templates}
              </a>
            </div>
            <p className={styles.subtext}>{t.hero.subtext}</p>
            <a
              className={styles.quiet}
              href={PORTFOLIO_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.hero.quiet}
            </a>
          </div>
          <WhatsAppDemo />
        </div>
      </div>
    </section>
  );
}
