"use client";

import { useI18n } from "../../lib/LocaleProvider";
import styles from "../harricom.module.css";

export function Tiers() {
  const { t } = useI18n();

  return (
    <section className={styles.section} aria-labelledby="tiers-title">
      <div className={styles.container}>
        <h2 id="tiers-title" className={styles.sectionTitle}>
          {t.tiers.title}
        </h2>
        <p className={styles.lead}>{t.tiers.lead}</p>
        <div className={styles.grid}>
          {t.tiers.items.map((tier, index) => (
            <article
              key={index}
              className={`${styles.card} ${tier.featured ? styles.featured : ""}`}
            >
              {tier.featured ? (
                <p className={`${styles.tag} ${styles.tagHot}`}>{t.tiers.most}</p>
              ) : null}
              <h3 className={styles.cardTitle}>{tier.name}</h3>
              <p className={styles.tierPrice}>{tier.price}</p>
              <p className={styles.cardBody}>{tier.body}</p>
              <p className={styles.tierMeta}>{tier.meta}</p>
              <a className={styles.cardLink} href={tier.href}>
                {tier.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
