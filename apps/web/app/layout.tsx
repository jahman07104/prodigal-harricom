import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { LocaleProvider } from "./lib/LocaleProvider";
import { getDictionary, parseLocale } from "./lib/i18n";
import "./globals.css";

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
  const t = getDictionary(locale);

  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans antialiased">
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
