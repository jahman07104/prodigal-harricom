"use client";

import { useI18n } from "../../lib/LocaleProvider";
import styles from "../harricom.module.css";

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section
      id="how-it-works"
      className={styles.section}
      aria-labelledby="how-title"
    >
      <div className={styles.container}>
        <h2 id="how-title" className={styles.sectionTitle}>
          {t.how.title}
        </h2>
        <ol className={styles.steps}>
          {t.how.steps.map((step) => (
            <li key={step.n} className={styles.step}>
              <span className={styles.stepNum} aria-hidden="true">
                {step.n}
              </span>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardBody}>{step.body}</p>
              <p className={styles.tierLabel}>{step.label}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
