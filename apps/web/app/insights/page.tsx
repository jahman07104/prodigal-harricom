import type { Metadata } from "next";

import { ProdigalFooter, WhatsAppFloat } from "../ProdigalChrome";
import { ProdigalHeader } from "../ProdigalHeader";
import styles from "../prodigal.module.css";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Real guidance from a returning resident who built HarriCom on the ground in Jamaica — plus the sectors where diaspora expertise converts fastest.",
};

const paths = [
  {
    name: "Encore Entrepreneurship",
    role: "Consulting & Professional Services",
    story:
      "Many returnees don't want retirement — they want a second act. Exporting international SOPs into Jamaica's growing KPO, fintech, and professional services sectors is a proven path we guide you through.",
    impact: "Business setup + HarriCom web presence",
  },
  {
    name: "Property & Relocation",
    role: "Returning Resident Concessions",
    story:
      "RR status unlocks duty-free imports on tools of trade, vehicles, and household effects — but timing and documentation matter. We help you plan before you ship, not after you're stuck at the port.",
    impact: "Customs · JCA · vendor network",
  },
  {
    name: "Agribusiness & Local Industry",
    role: "Hands-on Enterprise",
    story:
      "Jamaica's agribusiness and food-tech sectors are growing fast. Returnees with operations, logistics, or tech backgrounds are well placed — if you understand local supply chains and MSME realities.",
    impact: "Sector mapping + local partnerships",
  },
];

export default function InsightsPage() {
  return (
    <div className={styles.page}>
      <ProdigalHeader />
      <main id="main">
        <section className={styles.subHero}>
          <h1>Market Insights</h1>
          <p>
            Real guidance from a returning resident who built HarriCom on the
            ground in Jamaica — plus the sectors where diaspora expertise
            converts fastest.
          </p>
        </section>
        <section className={styles.stone}>
          <div className={styles.inner}>
            <h2 className={styles.sectionTitle}>Founder Story</h2>
            <p className={styles.intro}>
              The Prodigal Program exists because I lived this journey.
            </p>
            <article className={styles.storyCard}>
              <div className={styles.storyHead}>
                <div className={styles.avatar} aria-hidden="true">
                  P
                </div>
                <div>
                  <h3>Patrick Harrison</h3>
                  <p className={styles.role}>
                    Returning Resident · Founder, HarriCom
                  </p>
                </div>
              </div>
              <blockquote>
                “I left Jamaica, built a career abroad, and made the decision to
                come home for good. The paperwork was one thing — Customs, Land
                Titles, TAJ — but the real work was figuring out how to earn
                here with skills I developed overseas. I started HarriCom to
                give Jamaican MSMEs professional websites, and launched The
                Prodigal Program so no returnee has to figure it out alone.”
              </blockquote>
              <p className={styles.chip}>
                HarriCom Web Studio · The Prodigal Program
              </p>
            </article>
            <h2 className={styles.sectionTitle}>Paths We Guide</h2>
            <div className={styles.pathGrid}>
              {paths.map((path) => (
                <article key={path.name} className={styles.path}>
                  <h3>{path.name}</h3>
                  <p className={styles.role}>{path.role}</p>
                  <p>{path.story}</p>
                  <p className={styles.chip}>{path.impact}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ProdigalFooter />
      <WhatsAppFloat />
    </div>
  );
}
