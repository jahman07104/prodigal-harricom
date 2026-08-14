import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ProdigalFooter, WhatsAppFloat } from "./ProdigalChrome";
import { ProdigalHeader } from "./ProdigalHeader";
import { whatsappHref } from "./harricom/lib/brand";
import styles from "./prodigal.module.css";

export const metadata: Metadata = {
  title: "The Prodigal Program",
  description:
    "The Prodigal Program by HarriCom helps Jamaican diaspora and returning residents navigate RR concessions, business setup, and encore entrepreneurship. Built by a returnee, for returnees.",
};

const communityHref = whatsappHref(
  "Hi HarriCom, I want to join The Prodigal community",
);

function AwardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#b48e2e" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3 4 7v6c0 5 3.4 7.8 8 9 4.6-1.2 8-4 8-9V7l-8-4z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.8" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M21 19c0-2.4-1.6-4-4-4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b48e2e" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className={styles.page}>
      <ProdigalHeader />
      <main id="main">
        <section className={styles.hero} aria-labelledby="prodigal-title">
          <Image
            src="/prodigal/boat.jpg"
            alt="Jamaica — returning home by sea"
            fill
            priority
            sizes="100vw"
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <p className={styles.badge}>
              <span className={styles.gold}>
                <AwardIcon />
              </span>
              Returning Resident &amp; Diaspora Reintegration Program
            </p>
            <p className={styles.parentLine}>
              HarriCom · Harrison Communications
            </p>
            <h1 id="prodigal-title" className={styles.title}>
              THE <span className={styles.gold}>PRODIGAL</span>
            </h1>
            <p className={styles.quote}>
              I came back to Jamaica to build a life here — not just as a
              returning resident, but as an entrepreneur. Now I help fellow
              diaspora members do the same: navigate RR concessions, launch
              businesses, and retire into{" "}
              <strong>purpose.</strong>
            </p>
            <p className={styles.byline}>
              — Patrick Harrison, Founder · HarriCom Web Studio
            </p>
            <a
              className={styles.join}
              href={communityHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Community
            </a>
          </div>
        </section>

        <section className={styles.stone}>
          <div className={styles.inner}>
            <p className={styles.intro}>
              HarriCom builds websites for Jamaican businesses. The Prodigal
              Program is the consultancy arm — built from my own return journey
              — helping diaspora professionals turn overseas experience into
              local opportunity.
            </p>
            <div className={styles.cards}>
              <article className={styles.card}>
                <div className={styles.iconWrap}>
                  <BriefcaseIcon />
                </div>
                <h3>Monetize Skills</h3>
                <p>
                  Export international SOPs to Jamaican growth sectors —
                  agribusiness, KPO, fintech, and the web studio economy I
                  built with HarriCom.
                </p>
              </article>
              <article className={styles.card}>
                <div className={styles.iconWrap}>
                  <ShieldIcon />
                </div>
                <h3>Risk Mitigation</h3>
                <p>
                  Navigate Customs, RR concessions, Land Titles, and TAJ with
                  guidance from someone who has filed the paperwork and built
                  here.
                </p>
              </article>
              <article className={styles.card}>
                <div className={styles.iconWrap}>
                  <UsersIcon />
                </div>
                <h3>Peer Network</h3>
                <p>
                  Connect with returning residents and diaspora entrepreneurs
                  sharing real leads, vendors, and lessons from the ground in
                  Jamaica.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.green}>
          <div className={styles.inner}>
            <h2 className={styles.greenTitle}>
              Your expertise is Jamaica&apos;s
              <br />
              competitive advantage.
            </h2>
            <div className={styles.greenGrid}>
              <article className={styles.glass}>
                <CheckIcon />
                <h3>Maximize RR Concessions</h3>
                <p>
                  Bring in your professional tools of trade duty-free —
                  vehicles, equipment, and household effects — with a clear
                  plan before you land.
                </p>
              </article>
              <article className={styles.glass}>
                <CheckIcon />
                <h3>Build &amp; Launch in Jamaica</h3>
                <p>
                  From your first business website with HarriCom to full
                  consultancy support — we help you go from arrival to income.
                </p>
              </article>
            </div>
            <Link href="/insights" className={styles.storyLink}>
              Read my reintegration story →
            </Link>
          </div>
        </section>
      </main>
      <ProdigalFooter />
      <WhatsAppFloat />
    </div>
  );
}
