import styles from "../harricom.module.css";

const tiers = [
  {
    name: "Starter",
    body: "A live template on your domain. Menu, gallery, WhatsApp button.",
    price: "J$35,000–50,000",
    meta: "7 days · You own it",
    href: "#templates",
    cta: "View templates",
    featured: false,
  },
  {
    name: "Professional",
    body: "The template plus WhatsApp AI that answers in your voice.",
    price: "J$75,000–100,000",
    meta: "2 weeks · + J$8,000/mo AI",
    href: "#templates",
    cta: "See templates",
    featured: true,
  },
  {
    name: "Custom",
    body: "Payments, kitchen tickets, dashboards — built for the shop.",
    price: "J$150,000–250,000",
    meta: "3–4 weeks",
    href: "/harricom/start",
    cta: "Start a build",
    featured: false,
  },
];

export function Tiers() {
  return (
    <section className={styles.section} aria-labelledby="tiers-title">
      <div className={styles.container}>
        <h2 id="tiers-title" className={styles.sectionTitle}>
          What it costs
        </h2>
        <p className={styles.lead}>
          One price. You own the site. No monthly Wix fee.
        </p>
        <div className={styles.grid}>
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`${styles.card} ${tier.featured ? styles.featured : ""}`}
            >
              {tier.featured ? (
                <p className={`${styles.tag} ${styles.tagHot}`}>Most shops</p>
              ) : null}
              <h3 className={styles.cardTitle}>{tier.name}</h3>
              <p className={styles.tierPrice}>{tier.price}</p>
              <p className={styles.cardBody}>{tier.body}</p>
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
