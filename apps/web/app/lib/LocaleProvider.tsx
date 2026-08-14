"use client";

import {
  Fragment,
  useCallback,
  useLayoutEffect,
  useSyncExternalStore,
} from "react";

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

function subscribe(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Locale {
  return readMemory() ?? readBrowserLocale();
}

function getServerSnapshot(): Locale {
  return "en";
}

function setAppLocale(next: Locale) {
  writeMemory(next);
  writeBrowserLocale(next);
  if (typeof document !== "undefined") {
    document.documentElement.lang = next;
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
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useLayoutEffect(() => {
    if (readMemory()) {
      return;
    }
    const stored = readBrowserLocale();
    const next = stored === "en" ? locale : stored;
    writeMemory(next);
    document.documentElement.lang = next;
    if (next !== current) {
      window.dispatchEvent(new Event(EVENT));
    }
  }, [current, locale]);

  return <Fragment key={current}>{children}</Fragment>;
}

export function useI18n(): {
  locale: Locale;
  t: Dictionary;
  setLocale: (next: Locale) => void;
} {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setLocale = useCallback((next: Locale) => {
    setAppLocale(next);
  }, []);

  return {
    locale,
    t: getDictionary(locale),
    setLocale,
  };
}
