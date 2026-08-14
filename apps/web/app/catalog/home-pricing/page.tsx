import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { startHref, whatsappHref } from "../../harricom/lib/brand";
import styles from "./homepricing.module.css";

export const metadata: Metadata = {
  title: "Home business pricing",
  description:
    "Simple, transparent pricing layout for Jamaican home-based businesses — bakers, tutors, crafters, and small service providers.",
};

const bookHref = whatsappHref("I want the Home Business AI site");
const buildHref = startHref("home-business");

export default function HomePricingTemplate() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.strip}>
        Template preview · Demo packages · Customize in 7 days · You own it
      </p>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          The Prodigal
        </Link>
        <nav className={styles.nav} aria-label="Home business pricing">
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
            <h1 className={styles.title}>Home business pricing template</h1>
            <p className={styles.subtitle}>
              Packages and a clear price menu for Jamaican home-based businesses
              — bakers, tutors, crafters, and small shops. Customers WhatsApp
              the order.
            </p>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/catalog/homepricing-hero.png"
              alt="Home business pricing hero"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 480px"
              className={styles.heroImg}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Pricing plans</h2>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h3>Starter</h3>
              <p className={styles.price}>From J$1,000</p>
              <ul className={styles.list}>
                <li>1 service included</li>
                <li>WhatsApp to book</li>
                <li>Pickup at the house</li>
                <li>Same-week turnaround</li>
              </ul>
            </article>
            <article className={styles.cardHighlight}>
              <h3>Professional</h3>
              <p className={styles.price}>From J$4,000</p>
              <ul className={styles.list}>
                <li>Up to 4 services</li>
                <li>Photos of your work</li>
                <li>Local delivery</li>
                <li>Repeat-customer rate</li>
              </ul>
            </article>
            <article className={styles.card}>
              <h3>Premium</h3>
              <p className={styles.price}>Custom quote</p>
              <ul className={styles.list}>
                <li>Unlimited / custom orders</li>
                <li>Delivery + priority slot</li>
                <li>Your colours and branding</li>
                <li>Booked on WhatsApp</li>
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.section} aria-label="Banner">
          <div className={styles.banner}>
            <Image
              src="/catalog/homepricing-banner.png"
              alt="Home business pricing banner"
              fill
              sizes="(max-width: 1120px) 100vw, 1120px"
              className={styles.bannerImg}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Live shops on this layout</h2>
          <p className={styles.ctaText}>
            Live working sites on this kind of layout.
          </p>
          <div className={styles.examples}>
            <Link className={styles.exampleLink} href="/harricom/demo/normans">
              Norman&apos;s Kitchen
            </Link>
            <Link className={styles.exampleLink} href="/harricom/demo/yellow">
              Yellow App
            </Link>
            <Link
              className={styles.exampleLink}
              href="/harricom/demo/ganja-gourmet"
            >
              Ganja Gourmet
            </Link>
            <Link className={styles.exampleLink} href="/harricom/demo/exquisite">
              Exquisite Roots Craft
            </Link>
            <Link className={styles.exampleLink} href="/harricom/demo/greenwood">
              Greenwood Community
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ready to use this template?</h2>
          <p className={styles.ctaText}>
            This is the master pricing layout. We swap in the business name,
            real packages, and photos. Customize in 7 days. You own it.
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
