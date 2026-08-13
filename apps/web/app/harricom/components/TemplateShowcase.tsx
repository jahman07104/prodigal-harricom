import Link from "next/link";

import { whatsappHref } from "../lib/brand";
import styles from "../harricom.module.css";

const templates = [
  {
    tag: "#1 closes fastest",
    name: "Barbershop — WhatsApp booking",
    desc: "Customer books at 10pm via WhatsApp AI. You wake up with appointments. No more “are you open?” lost sales.",
    features: [
      "WhatsApp AI answers pricing and hours",
      "Books directly to your calendar",
      "Secure · Mobile-first",
    ],
    tone: "community",
    featured: true,
    href: whatsappHref("I want the Barber AI site"),
  },
  {
    tag: "Cookshop — online ordering",
    name: "Cook shop + restaurant",
    desc: "Lunch rush handled via WhatsApp. Kitchen ticket system. No more phone chaos.",
    features: ["Menu + ordering + WiPay", "Kitchen view + WhatsApp alerts"],
    tone: "food",
    featured: false,
    href: whatsappHref("I want the Cook Shop AI site"),
  },
  {
    tag: "Guest house — tourism",
    name: "Guest house — tourist dollars",
    desc: "Tourists book on WhatsApp, pay deposit online. Built for Jamaica tourism.",
    features: ["Booking + deposit + map", "WhatsApp concierge AI"],
    tone: "community",
    featured: false,
    href: whatsappHref("I want the Guest House AI site"),
  },
];

export function TemplateShowcase() {
  return (
    <section
      id="templates"
      className={styles.section}
      aria-labelledby="templates-title"
    >
      <div className={styles.container}>
        <h2 id="templates-title" className={styles.sectionTitle}>
          3 templates that make money this week
        </h2>
        <p className={styles.lead}>
          Stop browsing 25 templates. These 3 close fastest in Jamaica. Pick
          one — we customize it in 7 days.
        </p>
        <div className={styles.grid}>
          {templates.map((item) => (
            <article
              key={item.name}
              className={`${styles.card} ${
                item.tone === "food" ? styles.food : styles.community
              } ${item.featured ? styles.featured : ""}`}
            >
              <p className={`${styles.tag} ${item.featured ? styles.tagHot : ""}`}>
                {item.tag}
              </p>
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <p className={styles.cardBody}>{item.desc}</p>
              <ul className={styles.features}>
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className={styles.cardLink}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get this on WhatsApp
              </a>
            </article>
          ))}
        </div>
        <p className={styles.catalogMore}>
          <Link className={styles.cardLink} href="/catalog">
            See all templates →
          </Link>
        </p>
      </div>
    </section>
  );
}
