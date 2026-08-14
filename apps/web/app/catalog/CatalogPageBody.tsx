"use client";

import Image from "next/image";
import Link from "next/link";

import { useI18n } from "../lib/LocaleProvider";
import { CatalogFooter, CatalogNav } from "./CatalogChrome";
import styles from "./catalog.module.css";
import { catalogTemplates } from "./templates";

export function CatalogPageBody() {
  const { t } = useI18n();

  return (
    <div className={styles.wrapper}>
      <CatalogNav styles={styles} variant="index" />

      <main id="main">
        <section className={styles.hero} aria-labelledby="catalog-title">
          <p className={styles.kicker}>{t.catalog.kicker}</p>
          <h1 id="catalog-title" className={styles.title}>
            {t.catalog.title}
          </h1>
          <p className={styles.subtitle}>{t.catalog.subtitle}</p>
        </section>

        <section className={styles.gridSection} aria-label={t.nav.templates}>
          <div className={styles.grid}>
            {catalogTemplates.map((item) => (
              <article
                key={item.slug}
                className={`${styles.card} ${item.featured ? styles.featured : ""}`}
              >
                <div className={styles.thumbWrap}>
                  <Image
                    src={item.image}
                    alt={`${item.name} template`}
                    fill
                    sizes="(max-width: 700px) 100vw, 420px"
                    className={styles.thumb}
                  />
                </div>
                {item.badge ? (
                  <p className={styles.badge}>{item.badge}</p>
                ) : null}
                <h2 className={styles.cardTitle}>{item.name}</h2>
                <p className={styles.cardText}>{item.text}</p>
                {item.href ? (
                  <Link className={styles.cardLink} href={item.href}>
                    {t.catalog.view}
                  </Link>
                ) : (
                  <Link
                    className={styles.cardLink}
                    href={`/harricom/start?template=${item.slug}`}
                  >
                    {t.catalog.start}
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>

      <CatalogFooter styles={styles} home />
    </div>
  );
}
