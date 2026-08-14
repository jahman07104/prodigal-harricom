"use client";

import { useI18n } from "../../lib/LocaleProvider";
import styles from "../harricom.module.css";

export function WhatsAppDemo() {
  const { t } = useI18n();

  return (
    <aside className={styles.phone} aria-label="Miss T's Cook Shop WhatsApp demo">
      <div className={styles.phoneHead}>
        <span>Miss T&apos;s Cook Shop</span>
        <span className={styles.online}>Online</span>
      </div>
      <div className={styles.chat}>
        <p className={styles.time}>Yesterday 9:42 PM</p>
        <p className={`${styles.bubble} ${styles.inbound}`}>
          Hi! How much for brown stew chicken Saturday?
        </p>
        <p className={`${styles.bubble} ${styles.outbound}`}>
          Brown stew is J$1,800 with rice &amp; peas. 12pm and 3pm pickup open.
          Book 12pm? Reply YES.
        </p>
        <p className={`${styles.bubble} ${styles.inbound}`}>YES 12pm</p>
        <p className={`${styles.bubble} ${styles.outbound}`}>
          Booked. Saturday 12pm at 12 Half Way Tree Rd. Pay at pickup. — Miss T
          (AI)
        </p>
        <p className={styles.chatNote}>
          Replied in 2.3 seconds · shop was closed · J$1,800 kept
        </p>
      </div>
      <div className={styles.phoneFoot}>
        <a className={`${styles.btn} ${styles.btnPrimary}`} href="/harricom/start">
          {t.shopCta}
        </a>
      </div>
    </aside>
  );
}
