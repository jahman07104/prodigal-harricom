import styles from "../harricom.module.css";

const tiers = [
  {
    title: "Built for Jamaica — rack/stack tough",
    body: "Same mindset that kept airport comms up at Newark Liberty. Your site stays up when others go down.",
    label: "Tier 1: Templates",
    price: "J$35,000–50,000",
    meta: "7 days · You own it",
    href: "#templates",
    cta: "View templates",
  },
  {
    title: "WhatsApp AI ready",
    body: "Every template optimized for WhatsApp bookings. AI agent answers in your voice.",
    label: "Tier 2: Essentials + AI",
    price: "J$75,000–100,000",
    meta: "2 weeks · + J$8k/mo AI",
    href: "#templates",
    cta: "See demo",
  },
  {
    title: "Secure — not a toy",
    body: "Bank-level headers: CSP, HSTS, X-Frame-Options. No cheap WordPress hacks.",
    label: "Tier 3: Solutions",
    price: "J$150,000–250,000",
    meta: "3–4 weeks · Payments, dashboards",
    href: "#launch",
    cta: "Start a build",
  },
];

export function Tiers() {
  return (
    <section className={styles.section} aria-labelledby="tiers-title">
      <div className={styles.container}>
        <h2 id="tiers-title" className="sr-only">
          HarriCom service tiers
        </h2>
        <div className={styles.grid}>
          {tiers.map((tier) => (
            <article key={tier.label} className={styles.card}>
              <h3 className={styles.cardTitle}>{tier.title}</h3>
              <p className={styles.cardBody}>{tier.body}</p>
              <p className={styles.tierLabel}>{tier.label}</p>
              <p className={styles.tierPrice}>{tier.price}</p>
              <p className={styles.tierMeta}>{tier.meta}</p>
              <a className={styles.cardLink} href={tier.href}>
                {tier.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
