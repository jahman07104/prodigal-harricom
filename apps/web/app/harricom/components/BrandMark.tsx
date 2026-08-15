import Image from "next/image";
import Link from "next/link";

import { STUDIO_HREF } from "../lib/brand";
import styles from "../harricom.module.css";

export function BrandMark() {
  return (
    <Link href={STUDIO_HREF} className={styles.brand}>
      <span className={styles.logo}>
        <Image
          src="/harricom/images/doctorbird.jpg"
          alt="HarriCom Doctor Bird"
          fill
          sizes="100px"
          className={styles.logoImg}
          priority
        />
      </span>
      <span className={styles.titleWrap}>
        <span className={styles.title}>HarriCom Web Studio</span>
        <span className={styles.titleShort}>HarriCom</span>
        <span className={styles.dot} aria-hidden="true" />
        <span className="sr-only">Live studio</span>
      </span>
    </Link>
  );
}
