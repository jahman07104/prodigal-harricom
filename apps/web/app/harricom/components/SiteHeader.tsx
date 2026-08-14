"use client";

import Link from "next/link";
import { useState } from "react";

import { LanguageSwitch } from "../../lib/LanguageSwitch";
import { useI18n } from "../../lib/LocaleProvider";
import { whatsappHref } from "../lib/brand";
import styles from "../harricom.module.css";
import { BrandMark } from "./BrandMark";

export function TopStrip() {
  const { t } = useI18n();
  return <p className={styles.strip}>{t.strip}</p>;
}

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const chatHref = whatsappHref(t.wa.chat);

  return (
    <header className={styles.header}>
      <div className={styles.headerRow}>
        <BrandMark />
        <div className={styles.headerTools}>
          <LanguageSwitch />
          <button
            type="button"
            className={styles.menuBtn}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t.nav.close : t.nav.menu}
          </button>
          <nav className={styles.navDesktop} aria-label="HarriCom">
            <a className={styles.navLink} href="#how-it-works">
              {t.nav.how}
            </a>
            <a className={styles.navLink} href="#live-work">
              {t.nav.live}
            </a>
            <Link className={styles.navLink} href="/catalog">
              {t.nav.templates}
            </Link>
            <Link className={`${styles.navLink} ${styles.navProdigal}`} href="/">
              {t.nav.prodigal}
            </Link>
            <a
              className={styles.navLink}
              href={chatHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.nav.whatsapp}
            </a>
          </nav>
        </div>
      </div>
      {open ? (
        <nav className={styles.navMobile} aria-label="HarriCom">
          <a href="#how-it-works" onClick={() => setOpen(false)}>
            {t.nav.how}
          </a>
          <a href="#live-work" onClick={() => setOpen(false)}>
            {t.nav.live}
          </a>
          <Link href="/catalog" onClick={() => setOpen(false)}>
            {t.nav.templates}
          </Link>
          <Link href="/harricom/start" onClick={() => setOpen(false)}>
            {t.nav.start}
          </Link>
          <Link href="/" onClick={() => setOpen(false)}>
            {t.nav.prodigal}
          </Link>
          <a href={chatHref} target="_blank" rel="noopener noreferrer">
            {t.nav.whatsapp}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
