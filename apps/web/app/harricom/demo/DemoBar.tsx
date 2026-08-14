"use client";

import Link from "next/link";

import { LanguageSwitch } from "../../lib/LanguageSwitch";
import { useI18n } from "../../lib/LocaleProvider";
import type { LiveDemo } from "../demos";
import styles from "../demo.module.css";

export function DemoBar({ demo }: { demo: LiveDemo }) {
  const { t } = useI18n();
  const note = t.live.blurbs[demo.slug] ?? demo.note ?? t.demo.note;

  return (
    <header className={styles.bar}>
      <Link className={styles.back} href="/harricom#live-work">
        {t.demo.back}
      </Link>
      <p className={styles.meta}>
        <span className={styles.name}>{demo.name}</span>
        <span className={styles.note}>{` · ${note}`}</span>
      </p>
      <LanguageSwitch />
    </header>
  );
}
