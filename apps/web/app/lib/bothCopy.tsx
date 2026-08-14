import type { ReactNode } from "react";

import { de, en } from "./i18n";

const PASS_THROUGH = new Set(["href", "slug", "n"]);

function both(english: string, german: string): ReactNode {
  if (english === german) {
    return english;
  }

  return (
    <>
      <span className="i18n-en">{english}</span>
      <span className="i18n-de">{german}</span>
    </>
  );
}

function walk(english: unknown, german: unknown, key?: string): unknown {
  if (typeof english === "string") {
    if (key && PASS_THROUGH.has(key)) {
      return english;
    }
    return both(english, typeof german === "string" ? german : english);
  }

  if (Array.isArray(english)) {
    const germanList = Array.isArray(german) ? german : [];
    return english.map((item, index) => walk(item, germanList[index]));
  }

  if (english && typeof english === "object") {
    const germanObj =
      german && typeof german === "object"
        ? (german as Record<string, unknown>)
        : {};
    const result: Record<string, unknown> = {};
    for (const [entryKey, value] of Object.entries(
      english as Record<string, unknown>,
    )) {
      result[entryKey] = walk(value, germanObj[entryKey], entryKey);
    }
    return result;
  }

  return english;
}

export function bothCopy() {
  return walk(en, de) as typeof en;
}
