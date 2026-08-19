import Link from "next/link";

import { ProdigalFooter, WhatsAppFloat } from "../ProdigalChrome";
import { ProdigalHeader } from "../ProdigalHeader";
import { bothCopy } from "../lib/bothCopy";
import { de, en } from "../lib/i18n";
import styles from "../prodigal.module.css";

export function ProfileBody() {
  const insights = bothCopy().insights;

  return (
    <div className={styles.page}>
      <ProdigalHeader />
      <main id="main">
        <section className={styles.subHero}>
          <p>
            <Link className={`${styles.backLink} i18n-en`} href="/">
              {en.insights.back}
            </Link>
            <Link className={`${styles.backLink} i18n-de`} href="/">
              {de.insights.back}
            </Link>
          </p>
          <h1>{insights.founderTitle}</h1>
          <p>{insights.founderIntro}</p>
        </section>
        <section className={styles.stone}>
          <div className={styles.inner}>
            <article className={styles.storyCard}>
              <div className={styles.storyHead}>
                <div className={styles.avatar} aria-hidden="true">
                  P
                </div>
                <div>
                  <h3>Patrick Harrison</h3>
                  <p className={styles.role}>{insights.founderRole}</p>
                </div>
              </div>
              <blockquote>{insights.quote}</blockquote>
              <p className={styles.chip}>{insights.chip}</p>
              <p>
                <Link className={`${styles.backLink} i18n-en`} href="/">
                  {en.insights.back}
                </Link>
                <Link className={`${styles.backLink} i18n-de`} href="/">
                  {de.insights.back}
                </Link>
              </p>
            </article>
          </div>
        </section>
      </main>
      <ProdigalFooter />
      <WhatsAppFloat />
    </div>
  );
}
