"use client";

import { FormEvent, useState } from "react";

type FormValues = {
  businessName: string;
  industry: string;
  requirements: string;
  budgetRange: string;
};

type Qualification = {
  recommendedTier: "Template" | "Essentials + AI" | "Custom Solution";
  estimatedTimelineWeeks: number;
  dbjVoucherEligible: boolean;
  scopeSummary: string;
};

const initialFormValues: FormValues = {
  businessName: "",
  industry: "",
  requirements: "",
  budgetRange: "",
};

function isQualification(value: unknown): value is Qualification {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const qualification = value as Record<string, unknown>;
  return (
    ["Template", "Essentials + AI", "Custom Solution"].includes(
      qualification.recommendedTier as string,
    ) &&
    Number.isInteger(qualification.estimatedTimelineWeeks) &&
    (qualification.estimatedTimelineWeeks as number) >= 1 &&
    (qualification.estimatedTimelineWeeks as number) <= 52 &&
    typeof qualification.dbjVoucherEligible === "boolean" &&
    typeof qualification.scopeSummary === "string"
  );
}

function sanitizeDisplayText(value: string) {
  return value.replace(/[\u0000-\u001F\u007F<>]/g, " ").replace(/\s+/g, " ").trim();
}

export default function QuoteBuilderPage() {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [qualification, setQualification] = useState<Qualification | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  function updateField(field: keyof FormValues, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending) {
      return;
    }

    setIsPending(true);
    setMessage(null);
    setQualification(null);

    try {
      const response = await fetch("/api/qualify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      const payload: unknown = await response.json().catch(() => null);

      if (response.ok && isQualification(payload)) {
        setQualification(payload);
        return;
      }

      setMessage(
        response.status === 429
          ? "Too many requests. Please wait before trying again."
          : "We could not prepare a quote right now. Please try again.",
      );
    } catch (error) {
      console.error("Quote qualification request failed", error);
      setMessage("We could not prepare a quote right now. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <main className="home-page">
      <section className="section">
        <div className="container">
          <div className="card">
            <h1>Build Your HarriCom Quote</h1>
            <p>Tell us about your business and we will recommend the right platform tier.</p>

            <form onSubmit={handleSubmit} aria-busy={isPending}>
              <p>
                <label htmlFor="businessName">Business name</label>
                <br />
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  autoComplete="organization"
                  value={formValues.businessName}
                  onChange={(event) => updateField("businessName", event.target.value)}
                  required
                  maxLength={100}
                />
              </p>

              <p>
                <label htmlFor="industry">Industry</label>
                <br />
                <input
                  id="industry"
                  name="industry"
                  type="text"
                  value={formValues.industry}
                  onChange={(event) => updateField("industry", event.target.value)}
                  required
                  maxLength={80}
                />
              </p>

              <p>
                <label htmlFor="requirements">What does your business need?</label>
                <br />
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formValues.requirements}
                  onChange={(event) => updateField("requirements", event.target.value)}
                  required
                  maxLength={2000}
                  rows={6}
                />
              </p>

              <p>
                <label htmlFor="budgetRange">Budget range</label>
                <br />
                <input
                  id="budgetRange"
                  name="budgetRange"
                  type="text"
                  value={formValues.budgetRange}
                  onChange={(event) => updateField("budgetRange", event.target.value)}
                  required
                  maxLength={100}
                />
              </p>

              <button className="btn-primary" type="submit" disabled={isPending}>
                {isPending ? "Preparing Your Quote..." : "Get My Recommendation"}
              </button>
            </form>

            {message && (
              <p role="alert" aria-live="polite">
                {message}
              </p>
            )}

            {qualification && (
              <section aria-live="polite">
                <h2>Your Recommendation</h2>
                <p>
                  <strong>Recommended tier:</strong>{" "}
                  {sanitizeDisplayText(qualification.recommendedTier)}
                </p>
                <p>
                  <strong>Estimated timeline:</strong>{" "}
                  {qualification.estimatedTimelineWeeks} weeks
                </p>
                <p>
                  <strong>DBJ voucher eligibility:</strong>{" "}
                  {qualification.dbjVoucherEligible ? "Potentially eligible" : "To be confirmed"}
                </p>
                <p>{sanitizeDisplayText(qualification.scopeSummary)}</p>
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
