import { ProdigalFooter, WhatsAppFloat } from "../ProdigalChrome";
import { ProdigalHeader } from "../ProdigalHeader";
import { whatsappHref } from "../harricom/lib/brand";
import { de, en, type Locale } from "../lib/i18n";
import styles from "../prodigal.module.css";

export function CommunityBody({ locale }: { locale: Locale }) {
  const community = locale === "de" ? de.community : en.community;
  const joinHref = whatsappHref(
    locale === "de" ? de.wa.community : en.wa.community,
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
