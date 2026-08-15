"use client";

import Link from "next/link";

import { PORTFOLIO_HREF } from "../lib/brand";
import { useI18n } from "../../lib/LocaleProvider";
import styles from "../harricom.module.css";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} {t.footer}{" "}
        <Link href="/">{t.nav.prodigal}</Link>
        {" · "}
        <a href={PORTFOLIO_HREF} target="_blank" rel="noopener noreferrer">
          {t.prodigal.profile}
        </a>
      </p>
    </footer>
  );
}
