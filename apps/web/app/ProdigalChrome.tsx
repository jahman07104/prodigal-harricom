"use client";

import Image from "next/image";
import Link from "next/link";

import { PORTFOLIO_HREF, whatsappHref } from "./harricom/lib/brand";
import { bothCopy } from "./lib/bothCopy";
import { de, en } from "./lib/i18n";
import styles from "./prodigal.module.css";

export function ProdigalFooter() {
  const t = bothCopy();
  const consultEn = whatsappHref(en.wa.consult);
  const consultDe = whatsappHref(de.wa.consult);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerMark}>
        <Image
          src="/harricom/images/doctorbird.jpg"
          alt="HarriCom Doctor Bird"
          fill
          sizes="80px"
          className={styles.brandImg}
        />
      </div>
      <p className={styles.footerName}>The Prodigal</p>
      <p className={styles.footerSub}>Harrison Communications</p>
      <p className={styles.footerText}>{t.prodigal.footerText}</p>
      <p className={styles.disclaimer}>{t.prodigal.disclaimer}</p>
      <div className={styles.footerLinks}>
        <Link href="/harricom">{t.nav.studioLong}</Link>
        <Link href="/community">{t.nav.community}</Link>
        <a href={PORTFOLIO_HREF} target="_blank" rel="noopener noreferrer">
          {t.prodigal.profile}
        </a>
        <a
          className={`${styles.waLink} i18n-en`}
          href={consultEn}
          target="_blank"
          rel="noopener noreferrer"
        >
          {en.nav.whatsapp}
        </a>
        <a
          className={`${styles.waLink} i18n-de`}
          href={consultDe}
          target="_blank"
          rel="noopener noreferrer"
        >
          {de.nav.whatsapp}
        </a>
      </div>
      <p className={styles.copy}>
        Harrison Communications · Jamaica © {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export function WhatsAppFloat() {
  const consultEn = whatsappHref(en.wa.consult);
  const consultDe = whatsappHref(de.wa.consult);

  return (
    <>
      <a
        className={`${styles.float} i18n-en`}
        href={consultEn}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={en.prodigal.float}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2a9.97 9.97 0 0 0-8.7 14.7l-1.3 4.3 4.4-1.2A9.97 9.97 0 1 0 12.04 2zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-2.6.7.7-2.5-.2-.3a8.1 8.1 0 1 1 6.5 3.4zm4.5-6.1c-.25-.13-1.47-.73-1.7-.82-.23-.09-.4-.13-.57.13-.17.25-.65.82-.8.99-.15.17-.3.19-.55.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.5.12-.12.25-.3.37-.45.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.21-.51-.42-.44-.57-.45h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09 0 1.23.9 2.42 1.03 2.59.13.17 1.77 2.7 4.3 3.68.6.21 1.07.34 1.44.44.6.15 1.15.13 1.58.08.48-.06 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29z" />
        </svg>
      </a>
      <a
        className={`${styles.float} i18n-de`}
        href={consultDe}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={de.prodigal.float}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2a9.97 9.97 0 0 0-8.7 14.7l-1.3 4.3 4.4-1.2A9.97 9.97 0 1 0 12.04 2zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-2.6.7.7-2.5-.2-.3a8.1 8.1 0 1 1 6.5 3.4zm4.5-6.1c-.25-.13-1.47-.73-1.7-.82-.23-.09-.4-.13-.57.13-.17.25-.65.82-.8.99-.15.17-.3.19-.55.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.5.12-.12.25-.3.37-.45.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.21-.51-.42-.44-.57-.45h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09 0 1.23.9 2.42 1.03 2.59.13.17 1.77 2.7 4.3 3.68.6.21 1.07.34 1.44.44.6.15 1.15.13 1.58.08.48-.06 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29z" />
        </svg>
      </a>
    </>
  );
}
