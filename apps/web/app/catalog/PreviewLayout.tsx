import Image from "next/image";
import Link from "next/link";

import { startHref, whatsappHref } from "../harricom/lib/brand";
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
  servicesTitle = "Services",
  services,
  galleryTitle = "Gallery",
  gallery,
  ctaText,
}: PreviewLayoutProps) {
  const bookHref = whatsappHref(bookMessage);

  return (
    <div className={styles.wrapper}>
      <p className={styles.strip}>{strip}</p>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          The Prodigal
        </Link>
        <nav className={styles.nav} aria-label={navLabel}>
          <Link href="/catalog">Catalog</Link>
          <Link href="/harricom">HarriCom</Link>
          <a href={bookHref} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </nav>
      </header>

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
          <h2 className={styles.sectionTitle}>{servicesTitle}</h2>
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
          <h2 className={styles.sectionTitle}>{galleryTitle}</h2>
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

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ready to use this template?</h2>
          <p className={styles.ctaText}>{ctaText}</p>
          <Link href={startHref(templateSlug)} className={styles.ctaButton}>
            Start a build
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} HarriCom ·{" "}
          <Link href="/catalog">See all templates</Link>
        </p>
      </footer>
    </div>
  );
}
