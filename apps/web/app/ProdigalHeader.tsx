"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { whatsappHref } from "./harricom/lib/brand";
import styles from "./prodigal.module.css";

const consultHref = whatsappHref(
  "Hi HarriCom, I'm interested in The Prodigal Program for returning residents.",
);

const links = [
  { href: "/", label: "Home" },
  { href: "/insights", label: "Insights" },
  { href: "/community", label: "Community" },
];

export function ProdigalHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const home = pathname === "/";
  const solid = scrolled || !home;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className={`${styles.nav} ${solid ? styles.navSolid : styles.navClear}`}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.brand} aria-label="HarriCom The Prodigal Program home">
          <span className={styles.brandMark}>
            <Image
              src="/harricom/images/doctorbird.jpg"
              alt="HarriCom Doctor Bird"
              fill
              sizes="58px"
              className={styles.brandImg}
              priority
            />
          </span>
          <span>
            <span className={styles.brandName}>HarriCom</span>
            <span className={styles.brandSub}>The Prodigal Program</span>
          </span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="/harricom" className={styles.studioLink}>
            Web Studio
          </Link>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ""}`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a className={styles.consult} href={consultHref} target="_blank" rel="noopener noreferrer">
            Consultation
          </a>
        </div>

        <button
          type="button"
          className={styles.menuBtn}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <div className={`${styles.mobile} ${open ? styles.mobileOpen : ""}`}>
        <div className={styles.mobileInner}>
          <Link href="/harricom">HarriCom Web Studio</Link>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? styles.mobileActive : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a href={consultHref} target="_blank" rel="noopener noreferrer">
            Consultation
          </a>
        </div>
      </div>
    </nav>
  );
}
