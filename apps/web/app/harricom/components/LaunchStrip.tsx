"use client";

import { useI18n } from "../../lib/LocaleProvider";
import styles from "../harricom.module.css";
import { CtaLink } from "./CtaLink";

export function LaunchStrip() {
  const { t } = useI18n();

  return (
    <section id="launch" className={styles.stripCard} aria-labelledby="launch-title">
      <div className={styles.stripInner}>
        <h2 id="launch-title">{t.launch.title}</h2>
        <p>{t.launch.body}</p>
        <div className={styles.actions}>
          <CtaLink href="/catalog">{t.launch.browse}</CtaLink>
          <CtaLink href="/harricom/start" variant="secondary">
            {t.launch.start}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
