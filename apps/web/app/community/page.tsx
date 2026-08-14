import type { Metadata } from "next";

import { ProdigalFooter, WhatsAppFloat } from "../ProdigalChrome";
import { ProdigalHeader } from "../ProdigalHeader";
import { whatsappHref } from "../harricom/lib/brand";
import styles from "../prodigal.module.css";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Connect with returning residents and diaspora entrepreneurs sharing real leads, vendors, and lessons from the ground in Jamaica.",
};

const joinHref = whatsappHref(
  "Hi HarriCom, I want to join The Prodigal community",
);

export default function CommunityPage() {
  return (
    <div className={styles.page}>
      <ProdigalHeader />
      <main id="main">
        <section className={styles.subHero}>
          <h1>Peer Network</h1>
          <p>
            Connect with returning residents and diaspora entrepreneurs sharing
            real leads, vendors, and lessons from the ground in Jamaica.
          </p>
        </section>
        <section className={styles.stone}>
          <div className={`${styles.inner} ${styles.center}`}>
            <p className={styles.intro}>
              The Prodigal community is WhatsApp-first. Tell us who you are and
              where you are in the journey home — we add you to the group.
            </p>
            <a className={styles.join} href={joinHref} target="_blank" rel="noopener noreferrer">
              Join Community
            </a>
          </div>
        </section>
      </main>
      <ProdigalFooter />
      <WhatsAppFloat />
    </div>
  );
}
