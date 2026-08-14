"use client";

import Link from "next/link";

import { useI18n } from "../../lib/LocaleProvider";
import styles from "../harricom.module.css";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} {t.footer}{" "}
        <Link href="/">{t.nav.prodigal}</Link>
      </p>
    </footer>
  );
}
