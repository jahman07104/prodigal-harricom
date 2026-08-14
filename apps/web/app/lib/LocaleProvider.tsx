"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";

import {
  dictionaries,
  readBrowserLocale,
  writeBrowserLocale,
  type Dictionary,
  type Locale,
} from "./i18n";

type I18nValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (next: Locale) => void;
};

const I18nContext = createContext<I18nValue>({
  locale: "en",
  t: dictionaries.en,
  setLocale: () => {},
});

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [current, setCurrent] = useState<Locale>(locale);

  useEffect(() => {
    setCurrent(locale);
  }, [locale]);

  useEffect(() => {
    setCurrent(readBrowserLocale());
  }, [pathname]);

  const setLocale = useCallback((next: Locale) => {
    writeBrowserLocale(next);
    document.documentElement.lang = next;
    setCurrent(next);
  }, []);

  const value = useMemo(
    () => ({
      locale: current,
      t: dictionaries[current],
      setLocale,
    }),
    [current, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
