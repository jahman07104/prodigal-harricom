"use client";

import { useRouter } from "next/navigation";

import { LOCALE_COOKIE, type Locale } from "./i18n";
import { useI18n } from "./LocaleProvider";
import styles from "./LanguageSwitch.module.css";

export function LanguageSwitch() {
  const { locale, t } = useI18n();
  const router = useRouter();

  function setLocale(next: Locale) {
    if (next === locale) {
      return;
    }
    document.cookie = `${LOCALE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang = next;
    router.refresh();
  }

  return (
    <div className={styles.switch} role="group" aria-label={t.lang.label}>
      <button
        type="button"
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        {t.lang.en}
      </button>
      <span aria-hidden="true">|</span>
      <button
        type="button"
        aria-pressed={locale === "de"}
        onClick={() => setLocale("de")}
      >
        {t.lang.de}
      </button>
    </div>
  );
}
