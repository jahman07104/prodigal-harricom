import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { env } from "./env";

const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1_000;

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitStore = Map<string, RateLimitBucket>;

const globalForRateLimit = globalThis as typeof globalThis & {
  leadQualificationRateLimitStore?: RateLimitStore;
};

const store =
  globalForRateLimit.leadQualificationRateLimitStore ??
  (globalForRateLimit.leadQualificationRateLimitStore = new Map());

const distributedRateLimiter =
  env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: env.UPSTASH_REDIS_REST_URL,
          token: env.UPSTASH_REDIS_REST_TOKEN,
        }),
        limiter: Ratelimit.fixedWindow(MAX_REQUESTS, "10 m"),
        prefix: "harricom:qualify-lead",
      })
    : null;

function requestIdentifier(requestHeaders: Headers) {
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? requestHeaders.get("x-real-ip");

  return `lead-qualification:${ip || "unknown"}`;
}

export async function limitLeadQualification(requestHeaders: Headers) {
  const key = requestIdentifier(requestHeaders);

  if (distributedRateLimiter) {
    const result = await distributedRateLimiter.limit(key);
    return {
      allowed: result.success,
      retryAfterSeconds: result.success
        ? 0
        : Math.max(1, Math.ceil((result.reset - Date.now()) / 1_000)),
    };
  }

  const now = Date.now();
  const bucket = store.get(key);

  if (!bucket || bucket.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1_000)),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
