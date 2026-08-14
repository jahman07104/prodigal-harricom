import type { Metadata } from "next";
import { Suspense } from "react";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import harricom from "../harricom.module.css";
import { StartForm } from "./StartForm";
import styles from "./start.module.css";

export const metadata: Metadata = {
  title: "Start a build",
  description:
    "Tell HarriCom your name, parish, and what you need. We open WhatsApp with that already filled in.",
};

export default function StartPage() {
  return (
    <div className={harricom.page}>
      <SiteHeader />
      <main id="main" className={styles.wrap}>
        <p className={styles.kicker}>HarriCom Web Studio</p>
        <h1 className={styles.title}>Start a build</h1>
        <p className={styles.lead}>
          Tell us who you are and what you need. Send opens WhatsApp with that
          already written, so we are not guessing.
        </p>
        <Suspense>
          <StartForm />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
