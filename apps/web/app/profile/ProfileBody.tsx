import Link from "next/link";

import { ProdigalFooter, WhatsAppFloat } from "../ProdigalChrome";
import { ProdigalHeader } from "../ProdigalHeader";
import { bothCopy } from "../lib/bothCopy";
import { de, en } from "../lib/i18n";
import styles from "../prodigal.module.css";

const FULL_PORTFOLIO_HREF = "https://dev-personal-project.vercel.app/";

const PROJECT_DEMOS = [
  "https://greenwood-community-hub.replit.app/",
  "https://code-companion-jahman07104.replit.app/tmt-jamaica/",
  "https://code-companion-jahman07104.replit.app/",
] as const;

export function ProfileBody() {
  const profile = bothCopy().profile;

  return (
    <div className={styles.page}>
      <ProdigalHeader />
      <main id="main">
        <section className={styles.subHero}>
          <p>
            <Link className={`${styles.backLink} i18n-en`} href="/">
              {en.insights.back}
            </Link>
            <Link className={`${styles.backLink} i18n-de`} href="/">
              {de.insights.back}
            </Link>
          </p>
          <h1>{profile.name}</h1>
          <p className={styles.profileRole}>{profile.role}</p>
        </section>
        <section className={styles.stone}>
          <div className={styles.inner}>
            <p className={styles.profileStory}>{profile.story}</p>

            <h2 className={styles.sectionTitle}>{profile.credibilityTitle}</h2>
            <ul className={styles.profileFacts}>
              {profile.facts.map((fact, index) => (
                <li key={en.profile.facts[index]}>{fact}</li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>{profile.workTitle}</h2>
            <p className={styles.intro}>{profile.workIntro}</p>
            <div className={styles.pathGrid}>
              {profile.projects.map((project, index) => (
                <article key={en.profile.projects[index].name} className={styles.path}>
                  <h3>{project.name}</h3>
                  <p className={styles.role}>{project.category}</p>
                  <p>{project.description}</p>
                  <p>
                    <a
                      className={`${styles.workLink} i18n-en`}
                      href={PROJECT_DEMOS[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {en.profile.projects[index].demo}
                    </a>
                    <a
                      className={`${styles.workLink} i18n-de`}
                      href={PROJECT_DEMOS[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {de.profile.projects[index].demo}
                    </a>
                  </p>
                </article>
              ))}
            </div>

            <div className={styles.portfolioBlock}>
              <span className="i18n-en">
                <a
                  className={styles.communityCta}
                  href={FULL_PORTFOLIO_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {en.profile.portfolioCta}
                </a>
              </span>
              <span className="i18n-de">
                <a
                  className={styles.communityCta}
                  href={FULL_PORTFOLIO_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {de.profile.portfolioCta}
                </a>
              </span>
              <p className={styles.portfolioNote}>{profile.portfolioNote}</p>
            </div>
          </div>
        </section>
      </main>
      <ProdigalFooter />
      <WhatsAppFloat />
    </div>
  );
}
