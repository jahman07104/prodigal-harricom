"use client";

import { ProdigalFooter, WhatsAppFloat } from "../ProdigalChrome";
import { ProdigalHeader } from "../ProdigalHeader";
import { whatsappHref } from "../harricom/lib/brand";
import { de, en } from "../lib/i18n";
import { useHtmlLang } from "../lib/useHtmlLang";
import styles from "../prodigal.module.css";

export function CommunityBody() {
  const lang = useHtmlLang();
  const community = lang === "de" ? de.community : en.community;
  const joinHref = whatsappHref(
    lang === "de" ? de.wa.community : en.wa.community,
  );

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
