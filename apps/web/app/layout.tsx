import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { cookies } from "next/headers";

import { bothCopy } from "./lib/bothCopy";
import { LocaleProvider } from "./lib/LocaleProvider";
import { parseLocale } from "./lib/i18n";
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
  title: {
    default: "HarriCom | The Prodigal Program",
    template: "%s · The Prodigal Program",
  },
  description:
    "The Prodigal Program by HarriCom helps Jamaican diaspora and returning residents navigate RR concessions, business setup, and encore entrepreneurship.",
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
