import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { cookies } from "next/headers";

import { bothCopy } from "./lib/bothCopy";
import { LocaleProvider } from "./lib/LocaleProvider";
import { parseLocale } from "./lib/i18n";
import { getSiteUrl } from "./lib/site";
import "./globals.css";

const LOCALE_BOOT =
  '(function(){try{var l=localStorage.getItem("locale");if(l!=="de"&&l!=="en"){var m=document.cookie.match(/(?:^|; )locale=([^;]*)/);l=m?decodeURIComponent(m[1]):""}if(l==="de"||l==="en"){document.documentElement.lang=l;document.documentElement.setAttribute("data-locale",l)}}catch(e){}})();';

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "The Prodigal",
    template: "%s · The Prodigal",
  },
  description:
    "The Prodigal is a Jamaica-connected platform helping people around the world and at home return, build, invest, work, manage property and create opportunity in Jamaica.",
};

export const dynamic = "force-dynamic";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = parseLocale(cookies().get("locale")?.value);
  const t = bothCopy();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Script id="locale-boot" strategy="beforeInteractive">
          {LOCALE_BOOT}
        </Script>
        <LocaleProvider locale={locale}>
          <a className="skip-link" href="#main">
            {t.skip}
          </a>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
