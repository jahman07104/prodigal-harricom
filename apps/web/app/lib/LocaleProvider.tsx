"use client";

import { useCallback, useLayoutEffect, useState } from "react";

import { bothCopy } from "./bothCopy";
import {
  getDictionary,
  readBrowserLocale,
  writeBrowserLocale,
  type Dictionary,
  type Locale,
} from "./i18n";

const MEMORY_KEY = "__harricomLocale";
const EVENT = "harricom-locale-change";

function readMemory(): Locale | null {
  const globalRef = globalThis as typeof globalThis & {
    [MEMORY_KEY]?: Locale;
  };
  const value = globalRef[MEMORY_KEY];
  return value === "de" || value === "en" ? value : null;
}

function writeMemory(next: Locale) {
  (globalThis as typeof globalThis & { [MEMORY_KEY]?: Locale })[MEMORY_KEY] =
    next;
}

export function applyLocale(next: Locale) {
  writeMemory(next);
  writeBrowserLocale(next);
  if (typeof document !== "undefined") {
    document.documentElement.lang = next;
    document.documentElement.setAttribute("data-locale", next);
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVENT));
  }
}

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    const stored = readMemory() ?? readBrowserLocale();
    const next = stored === "en" ? locale : stored;
    applyLocale(next);
  }, [locale]);

  return children;
}

export function useI18n(): {
  locale: Locale;
  t: Dictionary;
  msg: Dictionary;
  setLocale: (next: Locale) => void;
} {
  const [locale, setLocaleState] = useState<Locale>("en");

  useLayoutEffect(() => {
    const sync = () => {
      setLocaleState(readMemory() ?? readBrowserLocale());
    };
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setLocale = useCallback((next: Locale) => {
    applyLocale(next);
  }, []);

  return {
    locale,
    t: bothCopy(),
    msg: getDictionary(locale),
    setLocale,
  };
}
