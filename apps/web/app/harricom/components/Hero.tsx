import Image from "next/image";

import styles from "../harricom.module.css";
import { CtaLink } from "./CtaLink";
import { WhatsAppDemo } from "./WhatsAppDemo";

export function Hero() {
  return (
    <section className={styles.heroWrap} aria-labelledby="harricom-hero-title">
      <div className={styles.heroFrame}>
        <Image
          src="/harricom/images/background.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 1120px) 100vw, 1120px"
          className={styles.heroMedia}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>HarriCom Web Studio</p>
            <h1 id="harricom-hero-title" className={styles.heroTitle}>
              Your shop answers WhatsApp at 10pm.
            </h1>
            <p className={styles.audience}>
              Barbers, cook shops, guest houses — anywhere in Jamaica. We
              customize in 7 days. You own it.
            </p>
            <div className={styles.actions}>
              <CtaLink href="/harricom/start">Start a build</CtaLink>
              <CtaLink href="#templates" variant="secondary">
                See templates
              </CtaLink>
            </div>
            <p className={styles.subtext}>
              From J$35,000 · No monthly Wix fees
            </p>
            <p className={styles.quiet}>
              Patrick Harrison · 32 years Verizon field tech, now building in
              Jamaica.
            </p>
          </div>
          <WhatsAppDemo />
        </div>
      </div>
    </section>
  );
}
