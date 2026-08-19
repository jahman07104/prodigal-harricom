import { ProdigalFooter, WhatsAppFloat } from "../ProdigalChrome";
import { ProdigalHeader } from "../ProdigalHeader";
import { whatsappHref } from "../harricom/lib/brand";
import { bothCopy } from "../lib/bothCopy";
import { de, en } from "../lib/i18n";
import styles from "../prodigal.module.css";

export function CommunityBody() {
  const community = bothCopy().community;

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
            <span className="i18n-en">
              <a
                className={styles.communityCta}
                href={whatsappHref(en.wa.community)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {en.community.join}
              </a>
            </span>
            <span className="i18n-de">
              <a
                className={styles.communityCta}
                href={whatsappHref(de.wa.community)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {de.community.join}
              </a>
            </span>
          </div>
        </section>
      </main>
      <ProdigalFooter />
      <WhatsAppFloat />
    </div>
  );
}
