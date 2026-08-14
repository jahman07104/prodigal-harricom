import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { startHref, whatsappHref } from "../../harricom/lib/brand";
import styles from "./dressmaker.module.css";

export const metadata: Metadata = {
  title: "Dressmaker template",
  description:
    "Island Stitch demo — a HarriCom dressmaker template. Custom dresses, alterations, uniforms, and WhatsApp orders.",
};

const bookHref = whatsappHref("I want the Dressmaker AI site");
const buildHref = startHref("dressmaker");

export default function DressmakerTemplate() {
  return (
    <div className={styles.page}>
      <p className={styles.strip}>
        Template preview · Not a live shop · Customize in 7 days · You own it
      </p>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          The Prodigal
        </Link>
        <nav className={styles.nav} aria-label="Dressmaker template">
          <Link href="/catalog">Catalog</Link>
          <Link href="/harricom">HarriCom</Link>
          <a href={bookHref} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </nav>
      </header>

      <main id="main">
        <section className={styles.hero} aria-labelledby="dressmaker-title">
          <div>
            <p className={styles.kicker}>HarriCom · Dressmaker template</p>
            <p className={styles.shopName}>Island Stitch</p>
            <p className={styles.meta}>
              Demo shop · Kingston · Fitted by appointment · Orders on WhatsApp
            </p>
            <h1 id="dressmaker-title" className={styles.title}>
              Custom fits. Clean finishes.{" "}
              <span className={styles.accent}>Made just for you.</span>
            </h1>
            <p className={styles.lead}>
              From alterations to custom dresses, suits, uniforms, and formal
              wear — measured, stitched, and finished with care. Customers send
              a photo. You confirm the job.
            </p>
            <div className={styles.pills}>
              <span className={styles.pill}>Custom dresses</span>
              <span className={styles.pill}>Alterations</span>
              <span className={styles.pill}>Men&apos;s tailoring</span>
              <span className={styles.pill}>School uniforms</span>
              <span className={styles.pill}>Formal wear</span>
              <span className={styles.pill}>Repairs</span>
            </div>
            <div className={styles.prices}>
              <div className={styles.priceRow}>
                <span>Dress alterations</span>
                <strong>From J$2,000</strong>
              </div>
              <div className={styles.priceRow}>
                <span>Custom dress</span>
                <strong>From J$15,000</strong>
              </div>
              <div className={styles.priceRow}>
                <span>Pants hem</span>
                <strong>J$1,000</strong>
              </div>
              <div className={styles.priceRow}>
                <span>Uniform tailoring</span>
                <strong>From J$2,000</strong>
              </div>
            </div>
            <div className={styles.actions}>
              <Link
                className={`${styles.btn} ${styles.btnPrimary}`}
                href={buildHref}
              >
                Start a build
              </Link>
            </div>
          </div>
          <div className={styles.visual}>
            <div className={styles.photo}>
              <Image
                src="/catalog/dressmaker-hero.jpg"
                alt="Dressmaker at the sewing machine"
                fill
                priority
                sizes="(max-width: 800px) 100vw, 480px"
                className={styles.photoImg}
              />
            </div>
            <p className={styles.heroNote}>
              Custom pieces from <strong>J$15,000</strong>
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.split}>
            <div>
              <h2 className={styles.sectionTitle}>Why this layout</h2>
              <p className={styles.sectionLead}>
                A lookbook plus a price list. Customers see the work, pick a
                job, and WhatsApp you — even after the shop is closed.
              </p>
              <div className={styles.whyGrid}>
                <article className={styles.card}>
                  <h3>Perfect fit</h3>
                  <p>
                    Every piece is measured, fitted, and finished with
                    precision.
                  </p>
                </article>
                <article className={styles.card}>
                  <h3>Elegant craftsmanship</h3>
                  <p>
                    Clean lines, neat stitching, and professional tailoring.
                  </p>
                </article>
              </div>
            </div>
            <div className={styles.chat} aria-label="WhatsApp order demo">
              <div className={styles.chatHead}>
                <span>Island Stitch</span>
                <span className={styles.online}>Online</span>
              </div>
              <div className={styles.transcript}>
                <p className={styles.time}>Yesterday 8:14pm</p>
                <p className={styles.inbound}>
                  Need a church dress by Easter, size 12, gold
                </p>
                <p className={styles.outbound}>
                  Yes — custom dress from J$15,000. Send 2 photos of a style you
                  like and we book a fitting.
                </p>
                <p className={styles.inbound}>
                  Can you hem a suit pants too?
                </p>
                <p className={styles.outbound}>
                  Pants hem is J$1,000. Dress alterations from J$2,000. Come
                  Saturday 10am?
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ready to use this template?</h2>
          <p className={styles.ctaText}>
            This is the master layout for dressmakers and tailors. WhatsApp us
            with the shop name, lookbook, and prices. We customize in 7 days.
            You own it.
          </p>
          <Link
            className={`${styles.btn} ${styles.btnPrimary}`}
            href={buildHref}
          >
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
