"use client";

import { ProdigalFooter, WhatsAppFloat } from "../ProdigalChrome";
import { ProdigalHeader } from "../ProdigalHeader";
import { getDictionary } from "../lib/i18n";
import { useI18n } from "../lib/LocaleProvider";
import styles from "../prodigal.module.css";

export function InsightsBody() {
  const { t } = useI18n();
  const insights = t.insights ?? getDictionary("en").insights;

  return (
    <div className={styles.page}>
      <ProdigalHeader />
      <main id="main">
        <section className={styles.subHero}>
          <h1>{insights.heading}</h1>
          <p>{insights.description}</p>
        </section>
        <section className={styles.stone}>
          <div className={styles.inner}>
            <h2 className={styles.sectionTitle}>{insights.founderTitle}</h2>
            <p className={styles.intro}>{insights.founderIntro}</p>
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
            </article>
            <h2 className={styles.sectionTitle}>{insights.pathsTitle}</h2>
            <div className={styles.pathGrid}>
              {insights.paths.map((path) => (
                <article key={path.name} className={styles.path}>
                  <h3>{path.name}</h3>
                  <p className={styles.role}>{path.role}</p>
                  <p>{path.story}</p>
                  <p className={styles.chip}>{path.impact}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ProdigalFooter />
      <WhatsAppFloat />
    </div>
  );
}
