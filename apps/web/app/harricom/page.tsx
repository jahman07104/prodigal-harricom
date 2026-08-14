import type { Metadata } from "next";
import Script from "next/script";

import "./harricom.css";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { LaunchStrip } from "./components/LaunchStrip";
import { LiveWork } from "./components/LiveWork";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { TemplateShowcase } from "./components/TemplateShowcase";
import { Tiers } from "./components/Tiers";
import styles from "./harricom.module.css";

export const metadata: Metadata = {
  title: "HarriCom — AI websites that answer WhatsApp",
  description:
    "HarriCom builds AI-powered websites for Jamaican small business that answer WhatsApp automatically. A Prodigal studio. Built by Patrick Harrison — 32 years Verizon field systems tech.",
};

export default function HarricomPage() {
  return (
    <div className={styles.page}>
      <p className={styles.strip}>
        Customize in 7 days · You own it · From J$35,000
      </p>
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
