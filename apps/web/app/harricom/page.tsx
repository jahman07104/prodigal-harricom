import type { Metadata } from "next";
import Script from "next/script";
import { cookies } from "next/headers";

import { parseLocale } from "../lib/i18n";

import "./harricom.css";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { LaunchStrip } from "./components/LaunchStrip";
import { LiveWork } from "./components/LiveWork";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader, TopStrip } from "./components/SiteHeader";
import { TemplateShowcase } from "./components/TemplateShowcase";
import { Tiers } from "./components/Tiers";
import styles from "./harricom.module.css";

export function generateMetadata(): Metadata {
  const german = parseLocale(cookies().get("locale")?.value) === "de";
  return {
    title: german
      ? "HarriCom — KI-Websites, die WhatsApp beantworten"
      : "HarriCom — AI websites that answer WhatsApp",
    description: german
      ? "HarriCom baut KI-Websites für jamaikanische Kleinbetriebe, die WhatsApp automatisch beantworten. Ein Prodigal-Studio. Gebaut von Patrick Harrison."
      : "HarriCom builds AI-powered websites for Jamaican small business that answer WhatsApp automatically. A Prodigal studio. Built by Patrick Harrison — 32 years Verizon field systems tech.",
  };
}

export default function HarricomPage() {
  return (
    <div className={styles.page}>
      <TopStrip />
      <SiteHeader />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Tiers />
        <LiveWork />
        <TemplateShowcase />
        <LaunchStrip />
      </main>
      <SiteFooter />
      <Script src="/harricom/js/whatsapp-tracking.js" strategy="afterInteractive" />
    </div>
  );
}
