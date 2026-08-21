import type { MetadataRoute } from "next";

import { catalogTemplates } from "./catalog/templates";
import { liveDemos } from "./harricom/demos";
import { absoluteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "/",
    "/harricom",
    "/harricom/start",
    "/catalog",
    "/catalog/home-menu",
    "/community",
    "/insights",
    "/profile",
  ];
  const catalogPaths = catalogTemplates
    .map((template) => template.href)
    .filter((href): href is string => Boolean(href));
  const demoPaths = liveDemos.map((demo) => `/harricom/demo/${demo.slug}`);

  const paths = [...new Set([...staticPaths, ...catalogPaths, ...demoPaths])];

  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/catalog") ? 0.8 : 0.6,
  }));
}
