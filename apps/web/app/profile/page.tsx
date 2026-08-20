import type { Metadata } from "next";
import { cookies } from "next/headers";

import { getDictionary } from "../lib/i18n";
import { ProfileBody } from "./ProfileBody";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const t = getDictionary(cookies().get("locale")?.value);
  return {
    title: t.profile.title,
    description: t.profile.story,
  };
}

export default function ProfilePage() {
  return <ProfileBody />;
}
