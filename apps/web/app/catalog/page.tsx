import type { Metadata } from "next";
import { cookies } from "next/headers";

import { getDictionary } from "../lib/i18n";
import { CatalogPageBody } from "./CatalogPageBody";

export function generateMetadata(): Metadata {
  const t = getDictionary(cookies().get("locale")?.value);
  return {
    title: t.catalog.title,
    description: t.catalog.subtitle,
  };
}

export default function CatalogPage() {
  return <CatalogPageBody />;
}
