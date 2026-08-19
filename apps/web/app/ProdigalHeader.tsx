"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LanguageSwitch } from "./lib/LanguageSwitch";
import { useI18n } from "./lib/LocaleProvider";
import { whatsappHref } from "./harricom/lib/brand";
import styles from "./prodigal.module.css";

const linkHrefs = [
  { href: "/", key: "home" as const },
  { href: "/insights", key: "insights" as const },
  { href: "/community", key: "community" as const },
];

export function ProdigalHeader() {
  const { t, msg } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const home = pathname === "/";
  const solid = scrolled || !home;
  const consultHref = whatsappHref(msg.wa.consult);
  const links = linkHrefs.map((link) => ({
    ...link,
    label: t.nav[link.key],
  }));

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
        <Link href="/" className={styles.brand} aria-label={msg.prodigal.homeAria}>
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
            <span className={styles.brandName}>The Prodigal</span>
            <span className={styles.brandSub}>Harrison Communications</span>
          </span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="/harricom" className={styles.studioLink}>
            {t.nav.studio}
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
            {t.nav.consult}
          </a>
        </div>

        <div className={styles.headerTools}>
          <LanguageSwitch />
          <button
            type="button"
            className={styles.menuBtn}
            aria-label={open ? msg.nav.closeMenu : msg.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div className={`${styles.mobile} ${open ? styles.mobileOpen : ""}`}>
        <div className={styles.mobileInner}>
          <LanguageSwitch labeled />
          <Link href="/harricom">{t.nav.studioLong}</Link>
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
            {t.nav.consult}
          </a>
        </div>
      </div>
    </nav>
  );
}
