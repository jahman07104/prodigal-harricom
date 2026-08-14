"use client";

import Link from "next/link";

import { LanguageSwitch } from "../lib/LanguageSwitch";
import { useI18n } from "../lib/LocaleProvider";
import { whatsappHref } from "../harricom/lib/brand";

type Css = Record<string, string>;

export function CatalogNav({
  styles,
  variant = "preview",
  whatsappMessage,
  ariaLabel,
}: {
  styles: Css;
  variant?: "index" | "preview";
  whatsappMessage?: string;
  ariaLabel?: string;
}) {
  const { t } = useI18n();
  const waHref = whatsappHref(whatsappMessage ?? t.catalog.launchWa);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        {t.catalog.brand}
      </Link>
      <nav className={styles.nav} aria-label={ariaLabel ?? t.catalog.navLabel}>
        {variant === "preview" ? (
          <Link href="/catalog">{t.preview.catalog}</Link>
        ) : (
          <Link href="/">{t.nav.prodigal}</Link>
        )}
        <Link href="/harricom">HarriCom</Link>
        <a href={waHref} target="_blank" rel="noopener noreferrer">
          {t.nav.whatsapp}
        </a>
        <LanguageSwitch />
      </nav>
    </header>
  );
}

export function CatalogHeroActions({
  buildHref,
  styles,
  showAll = false,
}: {
  buildHref: string;
  styles: Css;
  showAll?: boolean;
}) {
  const { t } = useI18n();

  return (
    <div className={styles.actions}>
      <Link className={`${styles.btn} ${styles.btnPrimary}`} href={buildHref}>
        {t.catalog.start}
      </Link>
      {showAll && styles.btnSecondary ? (
        <Link
          className={`${styles.btn} ${styles.btnSecondary}`}
          href="/catalog"
        >
          {t.catalog.all}
        </Link>
      ) : null}
    </div>
  );
}

export function CatalogReadyBlock({
  buildHref,
  lead,
  styles,
}: {
  buildHref: string;
  lead: string;
  styles: Css;
}) {
  const { t } = useI18n();
  const buttonClass =
    styles.ctaButton ?? `${styles.btn ?? ""} ${styles.btnPrimary ?? ""}`.trim();

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{t.preview.ready}</h2>
      <p className={styles.ctaText}>{lead}</p>
      <Link href={buildHref} className={buttonClass}>
        {t.catalog.start}
      </Link>
    </section>
  );
}

export function CatalogFooter({
  styles,
  prefix,
  home = false,
}: {
  styles: Css;
  prefix?: string;
  home?: boolean;
}) {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <p>
        {prefix ?? `© ${new Date().getFullYear()} HarriCom`} ·{" "}
        {home ? (
          <Link href="/">{t.catalog.footer}</Link>
        ) : (
          <Link href="/catalog">{t.preview.all}</Link>
        )}
      </p>
    </footer>
  );
}
