import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { whatsappHref } from "../harricom/lib/brand";
import styles from "./catalog.module.css";
import { catalogTemplates, templateWhatsAppHref } from "./templates";

export const metadata: Metadata = {
  title: "Business templates",
  description:
    "HarriCom MSME starter websites for Jamaican businesses — barber, cook shop, guest house, and more. Customize in 7 days.",
};

export default function CatalogPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          The Prodigal
        </Link>
        <nav className={styles.nav} aria-label="Catalog">
          <Link href="/harricom">HarriCom</Link>
          <Link href="/">Prodigal</Link>
          <a
            href={whatsappHref("Hi HarriCom, I want to launch a template")}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </nav>
      </header>

      <main id="main">
        <section className={styles.hero} aria-labelledby="catalog-title">
          <p className={styles.kicker}>HarriCom Web Studio</p>
          <h1 id="catalog-title" className={styles.title}>
            Business templates catalog
          </h1>
          <p className={styles.subtitle}>
            Ready-made MSME starter sites for Jamaican entrepreneurs. The three
            that close fastest are pinned first. We customize in 7 days. You own
            it.
          </p>
        </section>

        <section className={styles.gridSection} aria-label="Templates">
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
                <a
                  className={styles.cardLink}
                  href={templateWhatsAppHref(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get this on WhatsApp
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} HarriCom ·{" "}
          <Link href="/">The Prodigal Program</Link>
        </p>
      </footer>
    </div>
  );
}
