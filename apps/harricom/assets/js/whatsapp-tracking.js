(function () {
  const STORAGE_KEY = "harricom_whatsapp_clicks";
  const VISITOR_KEY = "harricom_visitor_id";
  const SESSION_KEY = "harricom_session_id";
  const SCHEMA_VERSION = 2;

  // Set window.HARRICOM_API_URL = "http://localhost:8787" (or your deployed URL)
  // before this script loads to enable server-side event ingestion.
  // If unset, events are stored only in localStorage (default offline mode).
  function getApiUrl() {
    return (typeof globalThis.HARRICOM_API_URL === "string" && globalThis.HARRICOM_API_URL.trim())
      ? globalThis.HARRICOM_API_URL.trim().replace(/\/$/, "")
      : null;
  }

  function postToServer(evt) {
    const url = getApiUrl();
    if (!url) return;
    try {
      navigator.sendBeacon(url + "/events", new Blob([JSON.stringify(evt)], { type: "application/json" }));
    } catch (err) {
      console.warn("whatsapp-tracking: server post failed", err);
    }
  }

  function slugify(input) {
    return String(input || "")
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replaceAll(/^-+|-+$/g, "")
      .slice(0, 64) || "unknown";
  }

  function makeId(prefix) {
    const rand = Math.random().toString(36).slice(2, 10);
    const ts = Date.now().toString(36);
    return prefix + "_" + ts + rand;
  }

  function getOrCreateStorageValue(storage, key, prefix) {
    try {
      const existing = storage.getItem(key);
      if (existing) {
        return existing;
      }
      const created = makeId(prefix);
      storage.setItem(key, created);
      return created;
    } catch (err) {
      console.warn("whatsapp-tracking: storage unavailable", err);
      return prefix + "_unavailable";
    }
  }

  function getVisitorId() {
    return getOrCreateStorageValue(globalThis.localStorage, VISITOR_KEY, "visitor");
  }

  function getSessionId() {
    return getOrCreateStorageValue(globalThis.sessionStorage, SESSION_KEY, "session");
  }

  function getPageSlug() {
    const pathname = globalThis.location?.pathname || "";
    const cleaned = pathname.replaceAll("\\", "/");
    const parts = cleaned.split("/").filter(Boolean);

    if (!parts.length) {
      return "home";
    }

    const last = parts.at(-1);
    if (String(last).toLowerCase() === "index.html") {
      return parts.length > 1 ? slugify(parts.at(-2)) : "home";
    }

    return slugify(String(last).replace(/\.html$/i, ""));
  }

  function getCtaSlug(link, index) {
    const explicit = link.dataset.waCta;
    if (explicit) {
      return slugify(explicit);
    }

    const text = String(link.textContent || "").trim();
    if (!text) {
      return "wa-link-" + (index + 1);
    }

    return slugify(text).slice(0, 42);
  }

  function getUtmParams() {
    const params = new URLSearchParams(globalThis.location?.search || "");
    return {
      source: params.get("utm_source") || "",
      medium: params.get("utm_medium") || "",
      campaign: params.get("utm_campaign") || "",
      term: params.get("utm_term") || "",
      content: params.get("utm_content") || ""
    };
  }

  function getDeviceType() {
    const ua = (globalThis.navigator?.userAgent || "").toLowerCase();
    return /android|iphone|ipad|mobile/.test(ua) ? "mobile" : "desktop";
  }

  function updateWhatsAppHref(link, pageSlug, ctaSlug) {
    try {
      const url = new URL(link.href, globalThis.location.origin);
      if (!/wa\.me$/i.test(url.hostname)) {
        return;
      }

      link.target = "_blank";
      link.rel = "noopener noreferrer";
      // Do NOT append tracking info to the WhatsApp message text anymore.
    } catch (err) {
      console.warn("whatsapp-tracking: unable to update href", err);
    }
  }

  function getDestinationNumber(href) {
    try {
      const parsed = new URL(href, globalThis.location.origin);
      const parts = parsed.pathname.split("/").filter(Boolean);
      return parts.length ? parts[0] : "unknown";
    } catch (err) {
      console.warn("whatsapp-tracking: unable to parse destination", err);
      return "unknown";
    }
  }

  function trackClick(pageSlug, ctaSlug, href, visitorId, sessionId) {
    const utm = getUtmParams();
    const evt = {
      schemaVersion: SCHEMA_VERSION,
      event: "wa_click",
      page: pageSlug,
      cta: ctaSlug,
      number: getDestinationNumber(href),
      href: href,
      ts: new Date().toISOString(),
      visitorId: visitorId,
      sessionId: sessionId,
      device: getDeviceType(),
      referrer: globalThis.document?.referrer || "",
      language: globalThis.navigator?.language || "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      utm: utm
    };

    try {
      const current = JSON.parse(globalThis.localStorage.getItem(STORAGE_KEY) || "[]");
      current.push(evt);
      const trimmed = current.length > 500 ? current.slice(-500) : current;
      globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (err) {
      console.warn("whatsapp-tracking: storage write failed", err);
    }

    postToServer(evt);

    if (Array.isArray(globalThis.dataLayer)) {
      globalThis.dataLayer.push(evt);
    }

    if (typeof globalThis.gtag === "function") {
      globalThis.gtag("event", "wa_click", {
        page: pageSlug,
        cta: ctaSlug,
        number: evt.number,
        session_id: sessionId,
        visitor_id: visitorId
      });
    }
  }

  function init() {
    const links = [...document.querySelectorAll('a[href*="wa.me/"]')];
    if (!links.length) {
      return;
    }

    const pageSlug = getPageSlug();
    const visitorId = getVisitorId();
    const sessionId = getSessionId();

    links.forEach(function (link, index) {
      const ctaSlug = getCtaSlug(link, index);
      updateWhatsAppHref(link, pageSlug, ctaSlug);
      link.addEventListener("click", function () {
        trackClick(pageSlug, ctaSlug, link.href, visitorId, sessionId);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
