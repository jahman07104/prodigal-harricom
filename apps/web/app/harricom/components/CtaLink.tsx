import type { ReactNode } from "react";

import styles from "../harricom.module.css";

type Props = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export function CtaLink({
  children,
  href,
  variant = "primary",
  external = false,
}: Props) {
  const className = `${styles.btn} ${
    variant === "primary" ? styles.btnPrimary : styles.btnSecondary
  }`;

  if (external) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}
