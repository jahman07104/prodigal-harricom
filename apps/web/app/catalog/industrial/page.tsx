import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { startHref, whatsappHref } from "../../harricom/lib/brand";
import styles from "./industrial.module.css";

export const metadata: Metadata = {
  title: "Industrial / technician template",
  description:
    "HarriCom template for plumbers, electricians, masons, welders, and contractors in Jamaica. WhatsApp quotes that actually answer.",
};

const bookHref = whatsappHref("I want the Tradesman AI site");
const buildHref = startHref("tradesman");

export default function IndustrialTemplate() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.strip}>
        Template preview · Not a live crew · Customize in 7 days · You own it
      </p>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          The Prodigal
        </Link>
        <nav className={styles.nav} aria-label="Industrial template">
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
            <h1 className={styles.title}>Industrial / technician template</h1>
            <p className={styles.subtitle}>
              Skilled hands. Reliable work. Built to last. Plumbing, electrical,
              masonry, welding, and general contracting — quotes on WhatsApp.
            </p>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/catalog/industrial-hero.png"
              alt="Industrial technician template hero"
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
              <h3>Pipe repair / leak fix</h3>
              <p>Stop the leak and get the line running again.</p>
              <p className={styles.price}>From J$3,500</p>
            </article>
            <article className={styles.card}>
              <h3>Electrical outlet install</h3>
              <p>Safe new outlets for homes and shops.</p>
              <p className={styles.price}>From J$2,500</p>
            </article>
            <article className={styles.card}>
              <h3>Tiling</h3>
              <p>Floors and walls, priced per square foot.</p>
              <p className={styles.price}>From J$600 / sq ft</p>
            </article>
            <article className={styles.card}>
              <h3>Full job quotes</h3>
              <p>WhatsApp the job. Get a free quote back.</p>
              <p className={styles.price}>Free</p>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Recent work</h2>
          <div className={styles.galleryGrid}>
            <div className={styles.thumb}>
              <Image
                src="/catalog/industrial1.png"
                alt="Tradesman work 1"
                fill
                sizes="(max-width: 800px) 100vw, 300px"
                className={styles.thumbImg}
              />
            </div>
            <div className={styles.thumb}>
              <Image
                src="/catalog/industrial2.png"
                alt="Electrical work"
                fill
                sizes="(max-width: 800px) 100vw, 300px"
                className={styles.thumbImg}
              />
            </div>
            <div className={styles.thumb}>
              <Image
                src="/catalog/industrial3.png"
                alt="Tradesman work 3"
                fill
                sizes="(max-width: 800px) 100vw, 300px"
                className={styles.thumbImg}
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Live shops on this layout</h2>
          <p className={styles.ctaText}>
            A live working site on this kind of layout.
          </p>
          <div className={styles.examples}>
            <Link className={styles.exampleLink} href="/harricom/demo/boss">
              Boss Installations
            </Link>
            <Link className={styles.exampleLink} href="/harricom/demo/tmt">
              TMT Jamaica
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ready to use this template?</h2>
          <p className={styles.ctaText}>
            This is the master layout for tradesmen and technicians. WhatsApp us
            with the trade, parish, and job photos. We customize in 7 days. You
            own it.
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
