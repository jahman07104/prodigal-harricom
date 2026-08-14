"use client";

import type { Locale } from "./i18n";
import { useI18n } from "./LocaleProvider";
import styles from "./LanguageSwitch.module.css";

export function LanguageSwitch({ labeled = false }: { labeled?: boolean }) {
  const { locale, t, msg, setLocale } = useI18n();

  function choose(next: Locale) {
    document.documentElement.lang = next;
    document.documentElement.setAttribute("data-locale", next);
    setLocale(next);
  }

  return (
    <div className={labeled ? styles.row : undefined}>
      {labeled ? <p className={styles.label}>{t.lang.label}</p> : null}
      <div className={styles.switch} role="group" aria-label={msg.lang.label}>
        <button
          type="button"
          aria-pressed={locale === "en"}
          onClick={() => choose("en")}
        >
          {t.lang.en}
        </button>
        <span aria-hidden="true">|</span>
        <button
          type="button"
          aria-pressed={locale === "de"}
          onClick={() => choose("de")}
        >
          {t.lang.de}
        </button>
      </div>
    </div>
  );
}
