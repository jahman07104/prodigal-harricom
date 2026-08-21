const DEFAULT_SITE_URL = "http://localhost:3000";

/** Public site origin (no trailing slash). Set NEXT_PUBLIC_SITE_URL in Vercel. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) {
    return DEFAULT_SITE_URL;
  }
  return raw.replace(/\/$/, "");
}

/** Build an absolute URL for metadata, sitemap, redirects, etc. */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}
