import Link from "next/link";

import { whatsappHref } from "../lib/brand";
import styles from "../harricom.module.css";
import { BrandMark } from "./BrandMark";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <BrandMark />
      <nav className={styles.nav} aria-label="HarriCom">
        <a className={styles.navLink} href="#how-it-works">
          How it works
        </a>
        <a className={styles.navLink} href="#live-work">
          Live shops
        </a>
        <Link className={styles.navLink} href="/catalog">
          Templates
        </Link>
        <Link className={`${styles.navLink} ${styles.navProdigal}`} href="/">
          The Prodigal Program
        </Link>
        <a
          className={styles.navLink}
          href={whatsappHref("Hi HarriCom, I want the AI WhatsApp site")}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
