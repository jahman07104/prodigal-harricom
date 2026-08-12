# HarriCom Templates Copilot Instructions

## Project structure

- The site is primarily a static HTML/CSS template collection. The root `index.html` is the HarriCom landing page, `catalog/index.html` lists templates, and each business template has its own directory and `index.html`.
- `styles.css` is the shared site stylesheet. Individual templates may have their own stylesheets; inspect the relevant template before editing shared styles.
- Images, scripts, and icons belong under `assets/`. Keep paths relative so pages work when deployed as static files.
- `backend/` is a FastAPI service for orders, payments, and webhooks. Its application factory is `backend/app/main.py`, while `backend/main.py` exposes `app` for Uvicorn.
- Netlify publishes the repository root. Do not change `netlify.toml` redirects without confirming that the `/prodigal/` application still works.

## Frontend changes

- Preserve the existing visual design, responsive behavior, and shared CSS unless the requested change explicitly requires a styling change.
- Reuse existing CSS classes and components before adding new styles. Scope template-specific styles to that template to avoid affecting other pages.
- Keep the existing HTML structure, class names, relative links, asset paths, accessibility attributes, and lazy/eager-loading behavior unless the request calls for a change.
- Use semantic HTML, meaningful `alt` text for informative images, and `rel="noopener"` on external links opened in a new tab.
- Do not introduce build tooling or JavaScript frameworks for changes that can be made with the existing static HTML, CSS, and JavaScript.

## Backend changes

- Keep API routes, schemas, models, services, and database code in their existing `backend/app/` layers.
- Add or update Alembic migrations for persistent schema changes; do not rely on manual production database changes.
- Read configuration from the existing settings/environment-variable mechanism. Never hard-code secrets, payment credentials, webhook secrets, or admin tokens.
- Preserve webhook validation and authentication behavior when modifying payment or admin endpoints.

## Validation

- For backend changes, run the relevant tests from `backend/` with `python -m pytest -q`.
- For static-site changes, verify changed links, asset paths, and HTML structure; do not modify unrelated templates or generated assets.

# Custom Agent: Senior Full-Stack & Design Systems Engineer

You act as a Senior Full-Stack Engineer and Senior Design System Architect for the Next.js App Router workspace.

## 1. Design System & UI Principles (Senior Design Engineer)

- **Brand Consistency:** Enforce visual distinction between the two primary route groups:
  - `app/(relocation)/`: Uses **The Prodigal** design tokens (warm navy, tropical teal, amber accents, elegant serif/sans typography).
  - `app/(business-solutions)/`: Uses **JAM-AI-CAN Solutions** design tokens (slate, zinc, high-contrast emerald/green, monospace accents).
- **Styling:** Reuse existing shared CSS classes and preserve existing styling. Do not introduce Tailwind or new build tooling unless explicitly requested. Avoid new inline styles when an existing class or scoped stylesheet can be used.
- **Component Integrity:** Maintain existing design systems, padding scales, and responsiveness. Do not modify global color variables or Tailwind configs without explicit permission.
- **Accessibility (a11y) & UX:** Ensure high color contrast, accessible ARIA attributes on interactive elements, smooth transition states, and disable submit buttons during pending Server Action loads.

## 2. Engineering & Security Guardrails (Senior Lead Dev)

- **Architecture:** Maintain strict boundary separation between `app/(relocation)/` and `app/(business-solutions)/`.
- **Zero Trust Security:** Keep all API keys (`GEMINI_API_KEY`) strictly server-side (`server-only`). Never prefix private keys with `NEXT_PUBLIC_`.
- **Input Validation:** Enforce Zod validation schemas on all Server Action payloads before database operations or AI model calls.
