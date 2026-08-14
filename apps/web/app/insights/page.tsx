import type { Metadata } from "next";
import { cookies } from "next/headers";

import { getDictionary, parseLocale } from "../lib/i18n";
import { InsightsBody } from "./InsightsBody";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const t = getDictionary(cookies().get("locale")?.value);
  return {
    title: t.insights.title,
    description: t.insights.description,
  };
}

export default function InsightsPage() {
  const locale = parseLocale(cookies().get("locale")?.value);
  return <InsightsBody locale={locale} />;
}
