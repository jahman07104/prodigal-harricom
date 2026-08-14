"use client";

import { ProdigalFooter, WhatsAppFloat } from "../ProdigalChrome";
import { ProdigalHeader } from "../ProdigalHeader";
import { whatsappHref } from "../harricom/lib/brand";
import { getDictionary } from "../lib/i18n";
import { useI18n } from "../lib/LocaleProvider";
import styles from "../prodigal.module.css";

export function CommunityBody() {
  const { t } = useI18n();
  const community = t.community ?? getDictionary("en").community;
  const joinHref = whatsappHref(t.wa.community);

  return (
    <div className={styles.page}>
      <ProdigalHeader />
      <main id="main">
        <section className={styles.subHero}>
          <h1>{community.heading}</h1>
          <p>{community.description}</p>
        </section>
        <section className={styles.stone}>
          <div className={`${styles.inner} ${styles.center}`}>
            <p className={styles.intro}>{community.intro}</p>
            <a
              className={styles.join}
              href={joinHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {community.join}
            </a>
          </div>
        </section>
      </main>
      <ProdigalFooter />
      <WhatsAppFloat />
    </div>
  );
}
