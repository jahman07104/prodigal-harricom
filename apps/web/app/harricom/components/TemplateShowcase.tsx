"use client";

import Image from "next/image";
import Link from "next/link";

import { useI18n } from "../../lib/LocaleProvider";
import { startHref } from "../lib/brand";
import styles from "../harricom.module.css";

const previews: Record<string, string> = {
  barber: "/catalog/barber",
  "cook-shop": "/catalog",
  "guest-house": "/catalog",
};

const images: Record<string, string> = {
  barber: "/catalog/barber-thumb.png",
  "cook-shop": "/catalog/cook-shop.jpg",
  "guest-house": "/catalog/guest-house.jpg",
};

export function TemplateShowcase() {
  const { t } = useI18n();

  return (
    <section
      id="templates"
      className={styles.section}
      aria-labelledby="templates-title"
    >
      <div className={styles.container}>
        <h2 id="templates-title" className={styles.sectionTitle}>
          {t.templates.title}
        </h2>
        <p className={styles.lead}>{t.templates.lead}</p>
        <div className={styles.grid}>
          {t.templates.items.map((item, index) => (
            <article
              key={item.slug}
              className={`${styles.card} ${index === 0 ? styles.featured : ""}`}
            >
              <div className={styles.thumb}>
                <Image
                  src={images[item.slug]}
                  alt={`${item.name} template`}
                  fill
                  sizes="(max-width: 900px) 100vw, 360px"
                  className={styles.thumbImg}
                />
              </div>
              <p className={`${styles.tag} ${index === 0 ? styles.tagHot : ""}`}>
                {item.tag}
              </p>
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <p className={styles.cardBody}>{item.desc}</p>
              <Link className={styles.cardLink} href={previews[item.slug]}>
                {t.templates.view}
              </Link>
              <Link className={styles.cardLink} href={startHref(item.slug)}>
                {t.templates.start}
              </Link>
            </article>
          ))}
        </div>
        <p className={styles.catalogMore}>
          <Link className={styles.cardLink} href="/catalog">
            {t.templates.more}
          </Link>
        </p>
      </div>
    </section>
  );
}
