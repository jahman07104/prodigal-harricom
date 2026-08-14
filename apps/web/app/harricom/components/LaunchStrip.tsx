import styles from "../harricom.module.css";
import { CtaLink } from "./CtaLink";

export function LaunchStrip() {
  return (
    <section id="launch" className={styles.stripCard} aria-labelledby="launch-title">
      <div className={styles.stripInner}>
        <h2 id="launch-title">Ready to launch in 7 days?</h2>
        <p>Tell us the name, parish, and what you need. We pick it up on WhatsApp.</p>
        <div className={styles.actions}>
          <CtaLink href="/catalog">Browse templates</CtaLink>
          <CtaLink href="/harricom/start" variant="secondary">
            Start a build
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
