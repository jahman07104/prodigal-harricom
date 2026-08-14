"use client";

import { useI18n } from "../../lib/LocaleProvider";
import styles from "../harricom.module.css";

export function LaunchStrip() {
  const { t } = useI18n();

  return (
    <section id="launch" className={styles.stripCard} aria-labelledby="launch-title">
      <div className={styles.stripInner}>
        <h2 id="launch-title">{t.launch.title}</h2>
        <p>{t.launch.body}</p>
        <div className={styles.actions}>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href="/catalog">
            {t.launch.browse}
          </a>
          <a className={`${styles.btn} ${styles.btnSecondary}`} href="/harricom/start">
            {t.launch.start}
          </a>
        </div>
      </div>
    </section>
  );
}
