"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { catalogTemplates } from "../../catalog/templates";
import { whatsappHref } from "../lib/brand";
import styles from "./start.module.css";

const PARISHES = [
  "Kingston",
  "St. Andrew",
  "St. Thomas",
  "Portland",
  "St. Mary",
  "St. Ann",
  "Trelawny",
  "St. James",
  "Hanover",
  "Westmoreland",
  "St. Elizabeth",
  "Manchester",
  "Clarendon",
  "St. Catherine",
  "Not in Jamaica / diaspora",
];

export function StartForm() {
  const searchParams = useSearchParams();
  const preset = searchParams.get("template") ?? "";
  const knownSlug = catalogTemplates.some((item) => item.slug === preset)
    ? preset
    : "";

  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [parish, setParish] = useState("");
  const [template, setTemplate] = useState(knownSlug);
  const [request, setRequest] = useState("");

  const selectedName = useMemo(() => {
    return catalogTemplates.find((item) => item.slug === template)?.name;
  }, [template]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const lines = [
      "Hi HarriCom, I want a site.",
      "",
      `Name: ${name.trim()}`,
      `Business: ${business.trim()}`,
      `Parish: ${parish}`,
      `Template: ${selectedName ?? "Not sure yet"}`,
    ];
    if (request.trim()) {
      lines.push(`Request: ${request.trim()}`);
    }
    window.location.href = whatsappHref(lines.join("\n"));
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.field}>
        <span>Your name</span>
        <input
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          autoComplete="name"
        />
      </label>
      <label className={styles.field}>
        <span>Business name</span>
        <input
          name="business"
          value={business}
          onChange={(event) => setBusiness(event.target.value)}
          required
          autoComplete="organization"
        />
      </label>
      <label className={styles.field}>
        <span>Parish</span>
        <select
          name="parish"
          value={parish}
          onChange={(event) => setParish(event.target.value)}
          required
        >
          <option value="">Select parish</option>
          {PARISHES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.field}>
        <span>Template</span>
        <select
          name="template"
          value={template}
          onChange={(event) => setTemplate(event.target.value)}
        >
          <option value="">Not sure yet</option>
          {catalogTemplates.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.field}>
        <span>What do you need?</span>
        <textarea
          name="request"
          rows={4}
          value={request}
          onChange={(event) => setRequest(event.target.value)}
          placeholder="Photos, menu, hours, anything we should know"
        />
      </label>
      <button className={styles.submit} type="submit">
        Send on WhatsApp
      </button>
      <p className={styles.note}>
        This opens WhatsApp with your details already filled in. We reply there.
        No account. No form sitting in a database.
      </p>
    </form>
  );
}
