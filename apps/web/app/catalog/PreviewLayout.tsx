"use client";

import Image from "next/image";

import { startHref } from "../harricom/lib/brand";
import { useI18n } from "../lib/LocaleProvider";
import { CatalogFooter, CatalogNav, CatalogReadyBlock } from "./CatalogChrome";
import styles from "./preview.module.css";

export type PreviewService = {
  title: string;
  text: string;
  price: string;
};

export type PreviewShot = {
  src: string;
  alt: string;
};

export type PreviewLayoutProps = {
  navLabel: string;
  strip: string;
  title: string;
  subtitle: string;
  bookMessage: string;
  templateSlug: string;
  heroSrc: string;
  heroAlt: string;
  servicesTitle?: string;
  services: PreviewService[];
  galleryTitle?: string;
  gallery: PreviewShot[];
  ctaText: string;
};

export function PreviewLayout({
  navLabel,
  strip,
  title,
  subtitle,
  bookMessage,
  templateSlug,
  heroSrc,
  heroAlt,
  servicesTitle,
  services,
  galleryTitle,
  gallery,
  ctaText,
}: PreviewLayoutProps) {
  const { t } = useI18n();

  return (
    <div className={styles.wrapper}>
      <p className={styles.strip}>{strip}</p>
      <CatalogNav
        styles={styles}
        whatsappMessage={bookMessage}
        ariaLabel={navLabel}
      />

      <main id="main">
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
          <div className={styles.heroImage}>
            <Image
              src={heroSrc}
              alt={heroAlt}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 480px"
              className={styles.heroImg}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {servicesTitle ?? t.preview.services}
          </h2>
          <div className={styles.grid}>
            {services.map((service) => (
              <article key={service.title} className={styles.card}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <p className={styles.price}>{service.price}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {galleryTitle ?? t.preview.gallery}
          </h2>
          <div className={styles.galleryGrid}>
            {gallery.map((shot) => (
              <div key={shot.src} className={styles.thumb}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 800px) 100vw, 300px"
                  className={styles.thumbImg}
                />
              </div>
            ))}
          </div>
        </section>

        <CatalogReadyBlock
          buildHref={startHref(templateSlug)}
          lead={ctaText}
          styles={styles}
        />
      </main>

      <CatalogFooter styles={styles} />
    </div>
  );
}
