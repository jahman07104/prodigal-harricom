import Image from "next/image";
import Link from "next/link";

import { startHref } from "../lib/brand";
import styles from "../harricom.module.css";

const templates = [
  {
    tag: "#1 closes fastest",
    name: "Barber shop",
    desc: "Customer books at 10pm. You wake up with appointments.",
    image: "/catalog/barber-thumb.png",
    preview: "/catalog/barber",
    slug: "barber",
    featured: true,
  },
  {
    tag: "#2 lunch rush",
    name: "Cook shop",
    desc: "Lunch rush on WhatsApp. Kitchen tickets. No phone chaos.",
    image: "/catalog/cook-shop.jpg",
    preview: "/catalog",
    slug: "cook-shop",
    featured: false,
  },
  {
    tag: "#3 tourist dollars",
    name: "Guest house",
    desc: "Tourists book on WhatsApp and pay a deposit online.",
    image: "/catalog/guest-house.jpg",
    preview: "/catalog",
    slug: "guest-house",
    featured: false,
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
          3 templates that close this week
        </h2>
        <p className={styles.lead}>
          Pick one. We customize in 7 days. You own it.
        </p>
        <div className={styles.grid}>
          {templates.map((item) => (
            <article
              key={item.name}
              className={`${styles.card} ${item.featured ? styles.featured : ""}`}
            >
              <div className={styles.thumb}>
                <Image
                  src={item.image}
                  alt={`${item.name} template`}
                  fill
                  sizes="(max-width: 900px) 100vw, 360px"
                  className={styles.thumbImg}
                />
              </div>
              <p className={`${styles.tag} ${item.featured ? styles.tagHot : ""}`}>
                {item.tag}
              </p>
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <p className={styles.cardBody}>{item.desc}</p>
              <Link className={styles.cardLink} href={item.preview}>
                View template
              </Link>
              <Link className={styles.cardLink} href={startHref(item.slug)}>
                Start a build
              </Link>
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
