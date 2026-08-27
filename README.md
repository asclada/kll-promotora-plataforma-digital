🇺🇸 English | 🇧🇷 [Português](README.pt-br.md)

# KLL Promotora — Digital Platform

Institutional website for **KLL Promotora**, a licensed loan-broker
("correspondente bancário") in Natal/RN specialized in payroll-deductible
loans, rebuilt from a generic React/Vite app into a Next.js application with
a real design system and 100% real client content.

## What this project is

Today KLL captures leads manually: a visitor clicks a button, opens a
WhatsApp conversation with a pre-filled message, and from there the father
or son who run the company are the ones reading, answering, and qualifying
that contact — there's no automatic triage and no structured record of who
reached out. That's the problem the full platform exists to solve, which
matters even more given that a large part of the audience (retirees and
pensioners on Brazil's INSS social security) is a frequent scam target and
needs trust signals before they'll even talk.

The full solution has three parts:

1. **This website** — a redesigned, faster public presence with real content
   and institutional trust signals (this repository). **Done.**
2. **A CRM** — a separate product ([`kll-promotora-crm`](https://github.com/asclada/kll-promotora-crm),
   private repo) for the father and son to review qualified leads, following
   the same pattern as the CRM already built for another client. **Schema
   and authenticated panel skeleton done** (login, lead list, archived
   list, read-only triage detail); editing the sales funnel from the UI
   (status, negotiated value, bank, notes) is a deliberate fast-follow, not
   built yet.
3. **An AI lead-qualification widget** — the hero card already exists in
   this UI and turns into a chat on click, but today it's a **frontend
   mock** (fixed script, no real AI call). The real integration (via an n8n
   workflow, writing into the CRM's database) is the next phase. **Not
   started.**

**This repository is the website only.** No database, no API route, no real
AI integration — the only "capture" today is an
`https://api.whatsapp.com/send?phone=...` link with a pre-filled message,
matching the previous site's behavior.

## Tech stack

Confirmed from `package.json` — nothing listed here is planned or unused.

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4 — design tokens declared via `@theme` in
  `src/app/globals.css`, utility classes only, no inline CSS
- **Icons:** `lucide-react` (the stamp graphic and the WhatsApp glyph are
  original SVGs)
- **Deploy target:** Vercel

## Architecture

**Current (what exists today):**

```
User
  │
  ▼
Website (Next.js, this repo) — no backend
  │
  ▼
api.whatsapp.com/send  — direct link, pre-filled message, no triage
```

**Planned (next phases, outside this repository):**

```
User
  │
  ▼
Website (Next.js, this repo)
  │
  │  chat widget → stateless proxy
  ▼
n8n workflow (webhook, external) — owns the AI triage logic
  │
  ▼
CRM — database (separate repository)
```

## Development process

This project follows Vibe Digital's standard process, defined in
[`CLAUDE.md`](CLAUDE.md): structural changes (a new integration, a new
product) get a formal spec in `docs/specs/`; one-off UI and copy tweaks
follow a lighter process, straight in the code. The visual build followed
the **Impeccable** design skill: the design system is documented in
[`DESIGN.md`](DESIGN.md), with automated contrast, Lighthouse, and
"AI-slop" anti-pattern checks before delivery — no automated test suite at
this stage (no client-side business logic yet, just real-content
presentation).

## Current status

- **Phase 1 — Website redesign:** done. Next.js + TypeScript + Tailwind v4;
  every route rebuilt with real content pulled from the previous site (NAP,
  CNPJ, services, differentiators, the bank-correspondent legal notice,
  privacy policy) plus a new FAQ section (8 questions, approved by the
  client). Visual direction: "Registro" ("Record"), a system modeled on an
  official stamped document, with a palette pulled from the company's own
  logo (indigo + yellow) instead of the generic navy/gold look of Brazilian
  payroll-loan sites. Verified: mobile Lighthouse 93/100/100/100
  (performance/accessibility/best-practices/SEO) on the homepage and 90+ on
  every other route, minimum 4.5:1 contrast measured (not estimated) across
  all text, zero console errors, zero flags from Impeccable's automated
  anti-pattern detector. Partner bank logos (Dígio, Daycoval, Banrisul, C6
  Bank, BMG, Safra, VCTex, V8 Fintech) added once the client confirmed the
  list, sourced from each institution's own site or Wikimedia Commons.
- **Phase 2 — CRM (schema + panel skeleton):** done, in
  [`kll-promotora-crm`](https://github.com/asclada/kll-promotora-crm)
  (private repo). Supabase schema applied (`leads`/`profiles`, RLS,
  explicit grants, the triage-completion guard constraint) and an
  authenticated Next.js panel working end-to-end — login, lead list,
  archived list, read-only triage detail with an archive action — tested
  with both real users. Editing the sales funnel from the UI (status,
  negotiated value, bank, attendant notes) and any AI-agent logic are
  explicitly out of scope for this phase.
- **Phase 3 — Triage agent (n8n):** done, in
  [`kll-promotora-n8n-agent`](https://github.com/asclada/kll-promotora-n8n-agent)
  (private repo). n8n workflow adapted from a pattern already proven on
  another triage agent, but simplified — collects 4 fields (full name,
  employment type, CPF, phone) over up to 5 conversation turns and writes
  straight to the CRM's (Phase 2) `leads` table, with a database-level
  guard: a lead is only marked `aguardando_contato` once CPF and phone are
  present and correctly formatted. Manually tested via direct webhook
  calls (two full simulated conversations, including a retry after an
  invalid CPF format). Not yet wired to the site — that's Phase 4.
- **Phase 4 — Widget + integration:** not started. The chat widget
  (`src/components/home/AssistantCard.tsx`) has existed since Phase 1 as a
  frontend mock with a fixed script; what's missing is the real
  integration — wiring that widget to the Phase 3 agent's webhook, and
  confirming leads show up correctly in the Phase 2 CRM (widget → n8n →
  CRM → Supabase, end to end). Detailed scope not yet defined.
- **Phase 5 — Deploy + QA:** not started. Production domain, environment
  variables, and a final portfolio checklist. Detailed scope not yet
  defined.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build       # production build
npm run typecheck   # TypeScript with no emit
```

No environment variables at this stage — there's no external integration
yet.

## Where to edit content

All business copy is centralized — nothing scattered across components:

- **`src/lib/site.ts`** — NAP (name, address, phones, e-mail, hours, CNPJ)
  and the `whatsappLink()` helper.
- **`src/lib/content.ts`** — segments, services, differentiators, FAQ,
  process steps, required documents, and the partner-bank list
  (`partnerBanks`).
- **`src/lib/seo.ts`** — JSON-LD (`FinancialService`, `FAQPage`,
  `BreadcrumbList`).
- **`DESIGN.md`** — the full visual system (palette, type, shapes,
  components); `.impeccable/design.json` is the technical sidecar (shadows,
  motion, breakpoints, component snippets).

## License / authorship

Built by Lucas Santana (Vibe Digital) — a real freelance project for this
client, and also part of a public full-stack development portfolio. Not
published under an open-source license.
