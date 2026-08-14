import type { Metadata } from "next";
import Image from "next/image";

import { startHref } from "../../harricom/lib/brand";
import {
  CatalogFooter,
  CatalogHeroActions,
  CatalogNav,
} from "../CatalogChrome";
import styles from "./barber.module.css";

export const metadata: Metadata = {
  title: "Barber shop template",
  description:
    "Island Cuts demo — a HarriCom barber template with WhatsApp booking AI. Customer books at 10pm. You wake up with appointments.",
};

const buildHref = startHref("barber");

export default function BarberTemplatePage() {
  return (
    <div className={styles.page}>
      <p className={styles.strip}>
        Template preview · Not a live shop · Customize in 7 days · You own it
      </p>
      <CatalogNav
        styles={styles}
        whatsappMessage="I want the Barber AI site"
        ariaLabel="Barber template"
      />

      <main id="main">
        <section className={styles.hero} aria-labelledby="barber-title">
          <div>
            <p className={styles.kicker}>HarriCom · Barber template</p>
            <p className={styles.shopName}>Island Cuts</p>
            <p className={styles.meta}>
              Demo shop · Island-wide · 14 parishes · Open 9am–7pm · AI books
              24/7 on WhatsApp
            </p>
            <h1 id="barber-title" className={styles.title}>
              Cut at 10am Saturday?{" "}
              <span className={styles.accent}>
                Booked at 9:42pm while we were closed.
              </span>
            </h1>
            <p className={styles.lead}>
              Most barbers lose 3–5 customers a week because they don&apos;t
              answer WhatsApp fast. This AI answers in 3 seconds, even at 10pm.
            </p>
            <div className={styles.prices}>
              <div className={styles.priceRow}>
                <span>Adult cut</span>
                <strong>J$3,000</strong>
              </div>
              <div className={styles.priceRow}>
                <span>Cut + beard</span>
                <strong>J$4,000</strong>
              </div>
              <div className={styles.priceRow}>
                <span>Kids cut</span>
                <strong>J$2,000</strong>
              </div>
              <div className={styles.priceRow}>
                <span>Line up</span>
                <strong>J$1,500</strong>
              </div>
            </div>
            <CatalogHeroActions
              buildHref={buildHref}
              styles={styles}
              showAll
            />
            <p className={styles.trust}>
              <strong>Built by Patrick Harrison, HarriCom.</strong> Field
              systems tech — 32 years Verizon, 10 years airport tech including
              Newark Liberty. Rack, stack, install, repair. Built to stay up.
            </p>
          </div>

          <div className={styles.visual}>
            <div className={styles.photo}>
              <Image
                src="/catalog/barber-hero.png"
                alt="Barber at work — Island Cuts template"
                fill
                priority
                sizes="(max-width: 800px) 100vw, 420px"
                className={styles.photoImg}
              />
            </div>
            <aside className={styles.chat} aria-label="WhatsApp booking demo">
              <div className={styles.chatHead}>
                <span>Island Cuts AI</span>
                <span className={styles.online}>Online · 2s</span>
              </div>
              <div className={styles.transcript}>
                <p className={styles.time}>
                  Today · AI replies even when the shop is closed · 9:42 PM
                </p>
                <p className={styles.inbound}>How much for cut Saturday?</p>
                <p className={styles.outbound}>
                  Hey! Adult cut J$3,000. We have 10am and 2pm open Saturday at
                  Half Way Tree. Want me to book 10am? Reply YES
                </p>
                <p className={styles.inbound}>YES 10am</p>
                <p className={styles.outbound}>
                  Booked! See you Sat 10am. Pay at the shop. Thanks — Island
                  Cuts (AI)
                </p>
                <p className={styles.time}>
                  Booked in 18 seconds · Customer saved · J$3,000
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.gallery} aria-labelledby="gallery-title">
          <h2 id="gallery-title" className={styles.moneyTitle}>
            Cuts from the demo shop
          </h2>
          <p className={styles.moneyLead}>
            Your photos replace these when we customize the site in 7 days.
          </p>
          <div className={styles.galleryGrid}>
            <div className={styles.galleryItem}>
              <Image
                src="/catalog/barber1.png"
                alt="Burst fade"
                fill
                sizes="(max-width: 800px) 100vw, 360px"
                className={styles.photoImg}
              />
            </div>
            <div className={styles.galleryItem}>
              <Image
                src="/catalog/barber2.png"
                alt="Beard lineup"
                fill
                sizes="(max-width: 800px) 100vw, 360px"
                className={styles.photoImg}
              />
            </div>
            <div className={styles.galleryItem}>
              <Image
                src="/catalog/barber3.png"
                alt="Low fade"
                fill
                sizes="(max-width: 800px) 100vw, 360px"
                className={styles.photoImg}
              />
            </div>
          </div>
        </section>

        <section className={styles.money} aria-labelledby="money-title">
          <h2 id="money-title" className={styles.moneyTitle}>
            How this makes you money
          </h2>
          <p className={styles.moneyLead}>
            Old way: customer messages at 9pm, you reply next morning, they
            already went elsewhere. New way: AI books instantly.
          </p>
          <div className={styles.stats}>
            <article className={styles.stat}>
              <strong>3 bookings a week saved</strong>
              <span>× J$3,000 = J$36k/month extra</span>
            </article>
            <article className={styles.stat}>
              <strong>No extra work</strong>
              <span>You wake up to a full calendar</span>
            </article>
            <article className={styles.stat}>
              <strong>You own it</strong>
              <span>No Wix monthly. We customize in 7 days.</span>
            </article>
          </div>
        </section>
      </main>

      <CatalogFooter styles={styles} prefix="Demo by HarriCom" />
    </div>
  );
}
