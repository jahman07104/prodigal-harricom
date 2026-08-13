import { whatsappHref } from "../lib/brand";
import styles from "../harricom.module.css";
import { CtaLink } from "./CtaLink";

export function LaunchStrip() {
  return (
    <section
      id="launch"
      className={styles.stripCard}
      aria-labelledby="launch-title"
    >
      <div className={styles.stripInner}>
        <h2 id="launch-title">Ready to launch in 7 days?</h2>
        <p>
          Built by a field tech who kept Newark Liberty airport running — not a
          kid with Canva. Telecom-grade uptime.
        </p>
        <div className={styles.actions}>
          <CtaLink href="#templates">Browse templates</CtaLink>
          <CtaLink
            href={whatsappHref("Hi HarriCom, I want to launch in 7 days")}
            variant="secondary"
            external
          >
            Chat on WhatsApp
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
