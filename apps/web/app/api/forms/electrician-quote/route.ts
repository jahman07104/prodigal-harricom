import { NextResponse } from "next/server";

import { absoluteUrl } from "../../../lib/site";

type QuotePayload = {
  name: string;
  email: string;
  phone: string;
  description: string;
};

function redirectToForm(query: string) {
  return NextResponse.redirect(absoluteUrl(`/work/electrician/${query}`), 303);
}

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(payload: QuotePayload): string | null {
  if (!payload.name || payload.name.length > 120) {
    return "Invalid name";
  }
  if (!payload.email || payload.email.length > 254 || !payload.email.includes("@")) {
    return "Invalid email";
  }
  if (!payload.phone || payload.phone.length > 40) {
    return "Invalid phone";
  }
  if (!payload.description || payload.description.length > 2000) {
    return "Invalid description";
  }
  return null;
}

async function forwardWebhook(payload: QuotePayload) {
  const webhookUrl = process.env.QUOTE_FORM_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return;
  }

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      form: "electrician-quote-request",
      submittedAt: new Date().toISOString(),
      ...payload,
    }),
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();

  if (readField(formData, "bot-field")) {
    return redirectToForm("?sent=1");
  }

  const payload: QuotePayload = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    phone: readField(formData, "phone"),
    description: readField(formData, "description"),
  };

  const validationError = validatePayload(payload);
  if (validationError) {
    return redirectToForm("?error=1");
  }

  try {
    await forwardWebhook(payload);
  } catch {
    return redirectToForm("?error=1");
  }

  return redirectToForm("?sent=1");
}
