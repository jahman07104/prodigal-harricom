import Image from "next/image";
import Link from "next/link";

import { liveDemos } from "../demos";
import styles from "../harricom.module.css";

export function LiveWork() {
  return (
    <section
      id="live-work"
      className={styles.section}
      aria-labelledby="live-title"
    >
      <div className={styles.container}>
        <h2 id="live-title" className={styles.sectionTitle}>
          See a real site
        </h2>
        <p className={styles.lead}>
          These are working shops, not mockups. Open one. Tap through. That is
          what your customers get.
        </p>
        <div className={styles.workGrid}>
          {liveDemos.map((shop) => (
            <article key={shop.slug} className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={shop.image}
                  alt={`${shop.name} live site`}
                  fill
                  sizes="(max-width: 900px) 100vw, 360px"
                  className={styles.thumbImg}
                />
              </div>
              <p className={styles.tag}>{shop.trade}</p>
              <h3 className={styles.cardTitle}>{shop.name}</h3>
              <p className={styles.cardBody}>{shop.text}</p>
              <div className={styles.cardActions}>
                <Link
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  href={`/harricom/demo/${shop.slug}`}
                >
                  Open the site
                </Link>
                <Link className={styles.cardLink} href={shop.template}>
                  View template
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
