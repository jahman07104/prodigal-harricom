import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { startHref, whatsappHref } from "../../harricom/lib/brand";
import styles from "./hairdresser.module.css";

export const metadata: Metadata = {
  title: "Hairdresser template",
  description:
    "Professional styling for the modern Jamaican woman. A HarriCom beauty-industry layout for salons, stylists, and hair care studios.",
};

const bookHref = whatsappHref("I want the Hairdresser AI site");
const buildHref = startHref("beauty");

export default function HairdresserTemplate() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.strip}>
        Template preview · Not a live salon · Customize in 7 days · You own it
      </p>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          The Prodigal
        </Link>
        <nav className={styles.nav} aria-label="Hairdresser template">
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
            <h1 className={styles.title}>Hairdresser template</h1>
            <p className={styles.subtitle}>
              Professional styling for the modern Jamaican woman. A clean,
              beauty-industry layout designed for salons, stylists, and hair
              care studios.
            </p>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/catalog/hairdresser-hero.png"
              alt="Hairdresser template hero"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 480px"
              className={styles.heroImg}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Services</h2>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h3>Wash &amp; style</h3>
              <p>Clean, moisturize, and style your hair to perfection.</p>
              <p className={styles.price}>J$5,000</p>
            </article>
            <article className={styles.card}>
              <h3>Relaxer</h3>
              <p>Smooth, silky finish with premium relaxer products.</p>
              <p className={styles.price}>From J$8,000</p>
            </article>
            <article className={styles.card}>
              <h3>Silk press</h3>
              <p>Shiny, bouncy, heat-styled perfection.</p>
              <p className={styles.price}>J$8,000</p>
            </article>
            <article className={styles.card}>
              <h3>Braids</h3>
              <p>Knotless, box braids, twists, and more.</p>
              <p className={styles.price}>From J$7,000</p>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Gallery</h2>
          <div className={styles.galleryGrid}>
            <div className={styles.thumb}>
              <Image
                src="/catalog/hair1.png"
                alt="Hairdresser work 1"
                fill
                sizes="(max-width: 800px) 100vw, 300px"
                className={styles.thumbImg}
              />
            </div>
            <div className={styles.thumb}>
              <Image
                src="/catalog/hair2.png"
                alt="Hairdresser work 2"
                fill
                sizes="(max-width: 800px) 100vw, 300px"
                className={styles.thumbImg}
              />
            </div>
            <div className={styles.thumb}>
              <Image
                src="/catalog/hair3.png"
                alt="Hairdresser work 3"
                fill
                sizes="(max-width: 800px) 100vw, 300px"
                className={styles.thumbImg}
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ready to use this template?</h2>
          <p className={styles.ctaText}>
            This is the master layout for salons and stylists. WhatsApp us with
            the shop name, menu, and photos. We customize in 7 days. You own it.
          </p>
          <Link href={buildHref} className={styles.ctaButton}>
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
