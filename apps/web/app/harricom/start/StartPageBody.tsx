"use client";

import { Suspense } from "react";

import { useI18n } from "../../lib/LocaleProvider";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import harricom from "../harricom.module.css";
import { StartForm } from "./StartForm";
import styles from "./start.module.css";

export function StartPageBody() {
  const { t } = useI18n();

  return (
    <div className={harricom.page}>
      <SiteHeader />
      <main id="main" className={styles.wrap}>
        <p className={styles.kicker}>{t.hero.kicker}</p>
        <h1 className={styles.title}>{t.start.title}</h1>
        <p className={styles.lead}>{t.start.lead}</p>
        <Suspense>
          <StartForm />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
