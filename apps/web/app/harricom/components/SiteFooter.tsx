import Link from "next/link";

import styles from "../harricom.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} HarriCom · a studio of{" "}
        <Link href="/">The Prodigal Program</Link>
      </p>
    </footer>
  );
}
