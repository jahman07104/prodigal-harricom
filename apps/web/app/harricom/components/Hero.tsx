import Image from "next/image";

import styles from "../harricom.module.css";
import { CtaLink } from "./CtaLink";
import { WhatsAppDemo } from "./WhatsAppDemo";

const badges = [
  "32 years Verizon",
  "10 yrs airport tech · Essex County incl. Newark Liberty",
  "Island-wide · 14 parishes · Kingston to Negril",
  "Verizon NOC + L3Harris NOC",
  "Vodafone Germany",
];

export function Hero() {
  return (
    <section className={styles.heroWrap} aria-labelledby="harricom-hero-title">
      <div className={styles.heroFrame}>
        <Image
          src="/harricom/images/background.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 1120px) 100vw, 1120px"
          className={styles.heroMedia}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.rainbow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.heroBox}>
            <div className={styles.badges}>
              {badges.map((badge) => (
                <span key={badge} className={styles.badge}>
                  {badge}
                </span>
              ))}
            </div>
            <h1 id="harricom-hero-title" className={styles.heroTitle}>
              Websites for Jamaican businesses island-wide that answer WhatsApp
              for you — Kingston to Negril, 14 parishes.
            </h1>
            <p className={styles.cred}>
              <strong>
                I&apos;m Patrick Harrison, field systems tech — not an engineer.
              </strong>{" "}
              Rack, stack, install, repair. 32 years keeping Verizon running.
              Last 10 years as airport tech for Essex County airports including
              Newark Liberty. Now in Jamaica, I build sites the same way: built
              to stay up, built to answer.
            </p>
            <p className={styles.audience}>
              Built for barbers in MoBay, cook shops in Spanish Town, guest
              houses in Negril, taxis in Ocho Rios, tradesmen in Mandeville —
              anywhere in Jamaica — who lose customers when they don&apos;t
              answer WhatsApp fast enough.
            </p>
            <div className={styles.actions}>
              <WhatsAppDemo />
              <CtaLink href="#templates" variant="secondary">
                Choose your style
              </CtaLink>
            </div>
            <p className={styles.subtext}>
              From J$35,000 · Launch in 7 days · Telecom-grade security included
            </p>
            <p className={styles.subtext}>No monthly Wix fees. You own it.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
