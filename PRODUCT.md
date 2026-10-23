# Science & Deep Tech showcase — Product truth

> Inferred from the code and copy (no user interview), 2026-10-23. The portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`) has no row for this site; nothing here goes beyond
> what the pages render.

## What it is

A static (Next.js `output: "export"`) showcase page for the Science & Deep Tech vertical, plus one service page
(`/services/deep-tech-commercialization-map/`). All copy is hard-coded in `lib/site.ts` and `lib/pseo.ts`.

## Who it is for

The owner, to test positioning and search intent for the offer "Technical diligence and commercialization map". Visitors can read it; they cannot
send anything.

## What works today

1. Home page: promise, buyer, starting offer, scope (R&D, Advanced technology, Scientific commercialization, Technical diligence), what must be built, and an honest readiness note
   (`target` / P3, "เตรียมไว้ใน portfolio").
2. Service page: search intent, a 4-step workflow, deliverables, evidence boundary and the readiness
   gate that must pass before any inquiry is accepted. It carries Service and BreadcrumbList JSON-LD.
3. Search engines are kept out by default (`noindex, nofollow`, `Disallow: /`, empty sitemap). Indexing turns on only
   when an approved `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_SITE_INDEXABLE=true` are set at build time.
4. Browser errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- A research-to-market trace with its unknowns still visible.
- ไม่อ้าง scientific validation, patent ownership หรือ market traction โดยไม่มีหลักฐาน
- ไม่เก็บ confidential research หรือ unpublished IP ใน public repo
- การรับรองทางเทคนิคและกฎหมายทรัพย์สินทางปัญญาต้องใช้ผู้เชี่ยวชาญที่เหมาะสม
- No lead form, inquiry intake, account, API, database, analytics identifier or client data.
- No clients, case studies or results. The workflow and deliverables describe a planned scope, not delivered work.

## Live URL and deploy state

- Live: https://solo-agency-science-deep-tech.vercel.app (HTTP 200 on 2026-10-23).
- The Vercel project `solo-agency-science-deep-tech` has no Git link, so a push to `main` does not deploy. The last production deployment
  is the CVE patch (2026-10-23 12:02, Vercel CLI, commit 31df74f). The L2 commits (tests, Sentry, CI, heading spacing) stay
  undeployed until the owner connects Vercel Git to `bookchaowalit-agency/agency-science-deep-tech-web` (owner action D9).
- `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `agency-science-deep-tech-web`, org `personal-yu0`); it takes
  effect with the next deployment.

## Boundaries

- Static files only; no server runtime. Keep `npm run check` (typecheck + static export) passing.
- Follow `AGENTS.md`: public-safe positioning only.
