import Link from "next/link";

import { whatsappHref } from "../lib/brand";
import styles from "../harricom.module.css";
import { CtaLink } from "./CtaLink";

export function ProdigalBand() {
  return (
    <section
      id="prodigal-program"
      className={styles.section}
      aria-labelledby="prodigal-title"
    >
      <div className={styles.prodigal}>
        <p className={styles.prodigalBadge}>HarriCom Consultancy</p>
        <h2 id="prodigal-title">The Prodigal Program</h2>
        <p className={styles.lead}>
          Returning residents and diaspora reintegration — built by founder
          Patrick Harrison, who did the journey home from 32 years at Verizon
          to Jamaica.
        </p>
        <ul className={styles.features}>
          <li>RR concessions and Customs navigation</li>
          <li>Encore entrepreneurship and business setup</li>
          <li>Community, consultations, and vendor network</li>
        </ul>
        <div className={styles.actions}>
          <Link
            href="/"
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            Explore The Prodigal
          </Link>
          <CtaLink
            href={whatsappHref(
              "Hi HarriCom, I'm interested in The Prodigal Program",
            )}
            variant="secondary"
            external
          >
            WhatsApp consultation
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
