import "server-only";

import { z } from "zod";

const optionalSecret = z.string().trim().min(1).optional();

function readOptional(name: string) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    return undefined;
  }
  return value.trim();
}

const serverEnvSchema = z
  .object({
    GEMINI_API_KEY: optionalSecret,
    GEMINI_MODEL: z.string().trim().min(1).default("gemini-2.0-flash"),
    OPENAI_API_KEY: optionalSecret,
    OPENAI_MODEL: z.string().trim().min(1).default("gpt-4o-mini"),
    FIREBASE_ADMIN_PROJECT_ID: optionalSecret,
    FIREBASE_ADMIN_CLIENT_EMAIL: optionalSecret,
    FIREBASE_ADMIN_PRIVATE_KEY: optionalSecret,
    UPSTASH_REDIS_REST_URL: optionalSecret,
    UPSTASH_REDIS_REST_TOKEN: optionalSecret,
  })
  .superRefine((value, context) => {
    const firebaseCredentials = [
      value.FIREBASE_ADMIN_PROJECT_ID,
      value.FIREBASE_ADMIN_CLIENT_EMAIL,
      value.FIREBASE_ADMIN_PRIVATE_KEY,
    ];
    const configuredFirebaseCredentials =
      firebaseCredentials.filter(Boolean).length;
    if (
      configuredFirebaseCredentials > 0 &&
      configuredFirebaseCredentials < 3
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY must be set together.",
        path: ["FIREBASE_ADMIN_PROJECT_ID"],
      });
    }

    const upstashCredentials = [
      value.UPSTASH_REDIS_REST_URL,
      value.UPSTASH_REDIS_REST_TOKEN,
    ];
    const configuredUpstashCredentials =
      upstashCredentials.filter(Boolean).length;
    if (
      configuredUpstashCredentials > 0 &&
      configuredUpstashCredentials < upstashCredentials.length
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set together.",
        path: ["UPSTASH_REDIS_REST_URL"],
      });
    }
  });

function rejectPublicSecrets() {
  const publicSecretNames = Object.keys(process.env).filter(
    (name) =>
      name.startsWith("NEXT_PUBLIC_") &&
      /(API_KEY|PRIVATE_KEY|SECRET|TOKEN|CREDENTIAL)/.test(name),
  );

  if (publicSecretNames.length > 0) {
    throw new Error(
      `Sensitive environment variables must not use NEXT_PUBLIC_: ${publicSecretNames.join(", ")}`,
    );
  }
}

rejectPublicSecrets();

const parsedEnv = serverEnvSchema.safeParse({
  GEMINI_API_KEY: readOptional("GEMINI_API_KEY"),
  GEMINI_MODEL: readOptional("GEMINI_MODEL"),
  OPENAI_API_KEY: readOptional("OPENAI_API_KEY"),
  OPENAI_MODEL: readOptional("OPENAI_MODEL"),
  FIREBASE_ADMIN_PROJECT_ID: readOptional("FIREBASE_ADMIN_PROJECT_ID"),
  FIREBASE_ADMIN_CLIENT_EMAIL: readOptional("FIREBASE_ADMIN_CLIENT_EMAIL"),
  FIREBASE_ADMIN_PRIVATE_KEY: readOptional("FIREBASE_ADMIN_PRIVATE_KEY"),
  UPSTASH_REDIS_REST_URL: readOptional("UPSTASH_REDIS_REST_URL"),
  UPSTASH_REDIS_REST_TOKEN: readOptional("UPSTASH_REDIS_REST_TOKEN"),
});

if (!parsedEnv.success) {
  throw new Error(
    `Invalid server environment variables: ${parsedEnv.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ")}`,
  );
}

export const env = parsedEnv.data;
