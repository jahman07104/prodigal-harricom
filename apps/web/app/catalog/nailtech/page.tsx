import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { startHref, whatsappHref } from "../../harricom/lib/brand";
import styles from "./nailtech.module.css";

export const metadata: Metadata = {
  title: "Nail technician template",
  description:
    "Clean, elegant design for Jamaican nail techs, studios, and mobile technicians. Acrylics, gel, nail art, and pedicures — booked on WhatsApp.",
};

const bookHref = whatsappHref("I want the Nail Tech AI site");
const buildHref = startHref("nailtech");

export default function NailTechTemplate() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.strip}>
        Template preview · Not a live studio · Customize in 7 days · You own it
      </p>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          The Prodigal
        </Link>
        <nav className={styles.nav} aria-label="Nail tech template">
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
            <h1 className={styles.title}>Nail technician template</h1>
            <p className={styles.subtitle}>
              Clean, elegant, beauty-industry design for Jamaican nail techs,
              studios, and mobile technicians. Modern, feminine, and
              service-focused.
            </p>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/catalog/nailtech-hero.png"
              alt="Nail tech template hero"
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
              <h3>Acrylic full set</h3>
              <p>Custom shapes, lengths, and designs.</p>
              <p className={styles.price}>J$3,500</p>
            </article>
            <article className={styles.card}>
              <h3>Gel polish</h3>
              <p>Long-lasting gel polish with a glossy finish.</p>
              <p className={styles.price}>J$2,000</p>
            </article>
            <article className={styles.card}>
              <h3>Nail art</h3>
              <p>Creative designs, gems, foils, and custom artwork.</p>
              <p className={styles.price}>From J$500</p>
            </article>
            <article className={styles.card}>
              <h3>Pedicure</h3>
              <p>Relaxing foot care with polish or gel finish.</p>
              <p className={styles.price}>J$2,500</p>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Gallery</h2>
          <div className={styles.galleryGrid}>
            <div className={styles.thumb}>
              <Image
                src="/catalog/nails1.png"
                alt="Nail tech work 1"
                fill
                sizes="(max-width: 800px) 100vw, 300px"
                className={styles.thumbImg}
              />
            </div>
            <div className={styles.thumb}>
              <Image
                src="/catalog/nails2.png"
                alt="Nail tech work 2"
                fill
                sizes="(max-width: 800px) 100vw, 300px"
                className={styles.thumbImg}
              />
            </div>
            <div className={styles.thumb}>
              <Image
                src="/catalog/nails3.png"
                alt="Nail tech work 3"
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
            This is the master layout for nail techs and mobile technicians.
            WhatsApp us with the studio name, menu, and photos. We customize in
            7 days. You own it.
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
