"use client";

import { useLayoutEffect, useState } from "react";

import type { Locale } from "./i18n";

export function useHtmlLang(): Locale {
  const [lang, setLang] = useState<Locale>("en");

  useLayoutEffect(() => {
    const sync = () => {
      setLang(document.documentElement.lang === "de" ? "de" : "en");
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
    window.addEventListener("harricom-locale-change", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("harricom-locale-change", sync);
    };
  }, []);

  return lang;
}
