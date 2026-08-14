"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { catalogTemplates } from "../../catalog/templates";
import { useI18n } from "../../lib/LocaleProvider";
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
];

export function StartForm() {
  const { t } = useI18n();
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
      t.start.waIntro,
      "",
      `${t.start.waName}: ${name.trim()}`,
      `${t.start.waBusiness}: ${business.trim()}`,
      `${t.start.waParish}: ${parish}`,
      `${t.start.waTemplate}: ${selectedName ?? t.start.unsure}`,
    ];
    if (request.trim()) {
      lines.push(`${t.start.waRequest}: ${request.trim()}`);
    }
    window.location.href = whatsappHref(lines.join("\n"));
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.field}>
        <span>{t.start.name}</span>
        <input
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          autoComplete="name"
        />
      </label>
      <label className={styles.field}>
        <span>{t.start.business}</span>
        <input
          name="business"
          value={business}
          onChange={(event) => setBusiness(event.target.value)}
          required
          autoComplete="organization"
        />
      </label>
      <label className={styles.field}>
        <span>{t.start.parish}</span>
        <select
          name="parish"
          value={parish}
          onChange={(event) => setParish(event.target.value)}
          required
        >
          <option value="">{t.start.parishSelect}</option>
          {PARISHES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
          <option value={t.start.diaspora}>{t.start.diaspora}</option>
        </select>
      </label>
      <label className={styles.field}>
        <span>{t.start.template}</span>
        <select
          name="template"
          value={template}
          onChange={(event) => setTemplate(event.target.value)}
        >
          <option value="">{t.start.unsure}</option>
          {catalogTemplates.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.field}>
        <span>{t.start.need}</span>
        <textarea
          name="request"
          rows={4}
          value={request}
          onChange={(event) => setRequest(event.target.value)}
          placeholder={t.start.placeholder}
        />
      </label>
      <button className={styles.submit} type="submit">
        {t.start.submit}
      </button>
      <p className={styles.note}>{t.start.note}</p>
    </form>
  );
}
