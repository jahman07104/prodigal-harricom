import type { Metadata } from "next";
import { cookies } from "next/headers";

import { getDictionary, parseLocale } from "../lib/i18n";
import { CommunityBody } from "./CommunityBody";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const t = getDictionary(cookies().get("locale")?.value);
  return {
    title: t.community.title,
    description: t.community.description,
  };
}

export default function CommunityPage() {
  const locale = parseLocale(cookies().get("locale")?.value);
  return <CommunityBody locale={locale} />;
}
