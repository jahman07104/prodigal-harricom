import { NextResponse } from "next/server";

import { LOCALE_COOKIE, parseLocale } from "../../lib/i18n";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { locale?: string } | null;
  const locale = parseLocale(body?.locale);
  const response = NextResponse.json({ locale });

  response.cookies.set({
    name: LOCALE_COOKIE,
    value: locale,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
  });

  return response;
}
