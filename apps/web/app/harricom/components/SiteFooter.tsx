import Link from "next/link";

import styles from "../harricom.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p>
        © 2026 HarriCom — Built by Patrick Harrison, field systems tech. 32yrs
        Verizon, 10yrs airport tech Essex County incl. Newark Liberty, Verizon
        NOC, L3Harris NOC, Vodafone Germany. Rack, stack, install, repair.{" "}
        <Link href="/">The Prodigal Program</Link>
      </p>
    </footer>
  );
}
