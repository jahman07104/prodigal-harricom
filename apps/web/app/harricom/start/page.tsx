import type { Metadata } from "next";
import { cookies } from "next/headers";

import { getDictionary } from "../../lib/i18n";
import { StartPageBody } from "./StartPageBody";

export function generateMetadata(): Metadata {
  const t = getDictionary(cookies().get("locale")?.value);
  return {
    title: t.start.title,
    description: t.start.description,
  };
}

export default function StartPage() {
  return <StartPageBody />;
}
