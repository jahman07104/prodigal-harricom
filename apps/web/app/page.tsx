import Image from "next/image";
import Link from "next/link";

import { whatsappHref } from "./harricom/lib/brand";
import styles from "./prodigal.module.css";

export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <main id="main">
        <section className={styles.hero} aria-labelledby="prodigal-title">
          <div className={styles.heroContent}>
            <p className={styles.kicker}>Umbrella organization</p>
            <h1 id="prodigal-title" className={styles.title}>
              The Prodigal
            </h1>
            <p className={styles.subtitle}>
              A Jamaican-first program for returning residents and diaspora
              reintegration — with HarriCom as the digital studio that builds
              WhatsApp-ready sites for MSMEs.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/harricom" className={styles.ctaButton}>
                HarriCom Web Studio
              </Link>
              <a className={styles.secondaryButton} href="#returning">
                Returning residents
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/prodigal/logo.png"
              alt="The Prodigal Program"
              width={420}
              height={459}
              priority
            />
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="divisions-title"
        >
          <h2 id="divisions-title" className={styles.sectionTitle}>
            Our divisions
          </h2>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h3>HarriCom Web Studio</h3>
              <p>
                Websites for Jamaican businesses that answer WhatsApp. Templates,
                AI booking, and telecom-grade security — built by a 32-year
                Verizon field tech.
              </p>
              <Link href="/harricom" className={styles.cardLink}>
                Explore HarriCom
              </Link>
            </article>
            <article className={styles.card}>
              <h3>Returning Resident Program</h3>
              <p>
                RR concessions, Customs navigation, encore entrepreneurship, and
                a vendor network — built by a returnee who did the journey home.
              </p>
              <a className={styles.cardLink} href="#returning">
                How it works
              </a>
            </article>
            <article className={styles.card}>
              <h3>MSME digital support</h3>
              <p>
                Barber, cook shop, and guest house templates that close fastest
                in Jamaica. Customize in 7 days. You own the site.
              </p>
              <Link href="/catalog" className={styles.cardLink}>
                View templates
              </Link>
            </article>
          </div>
        </section>

        <section
          id="returning"
          className={styles.section}
          aria-labelledby="returning-title"
        >
          <h2 id="returning-title" className={styles.sectionTitle}>
            Returning home, with a plan
          </h2>
          <p className={styles.aboutText}>
            The Prodigal Program helps Jamaican diaspora and returning residents
            land with structure: concessions, business setup, and community —
            not a brochure and a prayer.
          </p>
          <ul className={styles.list}>
            <li>RR concessions and Customs navigation</li>
            <li>Encore entrepreneurship and business setup</li>
            <li>Consultations and a trusted vendor network</li>
          </ul>
          <div className={styles.ctaRow}>
            <a
              className={styles.ctaButton}
              href={whatsappHref(
                "Hi HarriCom, I'm interested in The Prodigal Program",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp consultation
            </a>
            <Link href="/harricom#prodigal-program" className={styles.secondaryButton}>
              See it on HarriCom
            </Link>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="about-title">
          <h2 id="about-title" className={styles.sectionTitle}>
            About The Prodigal
          </h2>
          <p className={styles.aboutText}>
            Founded by Patrick Harrison after 32 years at Verizon and the move
            home to Jamaica. The Prodigal is the umbrella. HarriCom is the
            studio. Both exist so returning residents and local MSMEs can operate
            like the infrastructure is supposed to stay up.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} The Prodigal Program ·{" "}
          <Link href="/harricom">HarriCom Web Studio</Link>
        </p>
      </footer>
    </div>
  );
}
