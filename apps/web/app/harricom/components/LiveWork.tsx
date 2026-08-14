"use client";

import Image from "next/image";
import Link from "next/link";

import { useI18n } from "../../lib/LocaleProvider";
import { liveDemos } from "../demos";
import styles from "../harricom.module.css";

export function LiveWork() {
  const { t } = useI18n();

  return (
    <section
      id="live-work"
      className={styles.section}
      aria-labelledby="live-title"
    >
      <div className={styles.container}>
        <h2 id="live-title" className={styles.sectionTitle}>
          {t.live.title}
        </h2>
        <p className={styles.lead}>{t.live.lead}</p>
        <div className={styles.workGrid}>
          {liveDemos.map((shop) => (
            <article key={shop.slug} className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={shop.image}
                  alt={`${shop.name} demo`}
                  fill
                  sizes="(max-width: 900px) 100vw, 360px"
                  className={styles.thumbImg}
                />
              </div>
              <p className={styles.tag}>{shop.trade}</p>
              <h3 className={styles.cardTitle}>{shop.name}</h3>
              <p className={styles.cardBody}>
                {t.live.blurbs[shop.slug] ?? shop.text}
              </p>
              <div className={styles.cardActions}>
                <Link
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  href={`/harricom/demo/${shop.slug}`}
                >
                  {shop.cta ? t.live.demo : t.live.open}
                </Link>
                <Link className={styles.cardLink} href={shop.template}>
                  {t.live.template}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
