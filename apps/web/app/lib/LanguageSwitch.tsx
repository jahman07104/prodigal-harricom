"use client";

import { useRouter } from "next/navigation";

import type { Locale } from "./i18n";
import { useI18n } from "./LocaleProvider";
import styles from "./LanguageSwitch.module.css";

export function LanguageSwitch({ labeled = false }: { labeled?: boolean }) {
  const { locale, t, setLocale } = useI18n();
  const router = useRouter();

  async function choose(next: Locale) {
    if (next === locale) {
      return;
    }
    setLocale(next);
    try {
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
        credentials: "same-origin",
      });
    } catch {
      // Phone browsers still keep the choice in localStorage.
    }
    router.refresh();
  }

  return (
    <div className={labeled ? styles.row : undefined}>
      {labeled ? <p className={styles.label}>{t.lang.label}</p> : null}
      <div className={styles.switch} role="group" aria-label={t.lang.label}>
        <button
          type="button"
          aria-pressed={locale === "en"}
          onClick={() => void choose("en")}
        >
          {t.lang.en}
        </button>
        <span aria-hidden="true">|</span>
        <button
          type="button"
          aria-pressed={locale === "de"}
          onClick={() => void choose("de")}
        >
          {t.lang.de}
        </button>
      </div>
    </div>
  );
}
