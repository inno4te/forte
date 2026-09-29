# Innocent Forteh — Project Portfolio

About Inno

I build and ship production web platforms end-to-end, from information architecture and custom i18n engines to serverless backends and native mobile packaging. Below are the six strongest builds from my public GitHub work, selected for code quality and architectural depth rather than raw size, with the specific engineering choices that back that up.

## Skills Demonstrated Across This Portfolio

| Area | Evidence |
|---|---|
| **Frontend architecture** | Component/data separation at scale (health), content-driven app shells (nnschool), modern build tooling — Vite/React/Tailwind (AiReady) |
| **Internationalization & accessibility** | Hand-built i18n engines (not libraries) spanning FR/EN/AR with RTL layout support (Insapt, health), 8-language coverage with ARIA and reduced-motion support (AiReady) |
| **Serverless backend integration** | Google Apps Script as a lightweight API layer with shared-key auth, live Google Sheets sync (Insapt, ForTe Fam) |
| **Data modeling & multi-tenancy** | Per-tenant namespaced storage, role-based access (super-admin / admin / member) (ForTe Fam) |
| **Auth & access control** | Login-gated portals, session-based role views (Insapt SCM, PMI Cameroon) |
| **Cross-platform delivery** | Native Android packaging via Capacitor alongside the web build (ForTe Fam) |
| **DevOps** | GitHub Actions CI auto-deploy, Vercel/GitHub Pages pipelines, MIT-licensed open source packaging (AiReady) |
| **Domain-specific tooling** | Barcode generation & CSV export/reporting engine (Insapt SCM), weighted rule-based scoring engine (AiReady) |

## Top 6 Projects

### 1. Team21 Health Platform
Preventive health & chronic disease intelligence platform: 20+ standalone topic pages (heart, brain, gut, kidneys, sleep, eyes, skin, men's/women's health, natural remedies, medicines, carcinogens, additives), a personal symptom tracker, and an interactive quiz engine.

**Architecture:**
- A dedicated data layer (`data.js` + `data-ext.js`, ~141KB combined) holds all structured health content separately from presentation — the site is effectively content-managed, not hardcoded per page.
- A hand-built internationalization engine (`lang.js` + `lang-data.js`, ~107KB) drives full-site translation — this is a custom i18n system written from scratch, not a wrapper around a library.
- A shared design system (`shared.css`, `shared.js`) and reusable page components (`components.js`, `system-page.js`) keep all 30 files visually and behaviorally consistent.
- Editorial-grade typography system (Fraunces display serif + Inter Tight + JetBrains Mono) for a "medical journal" feel rather than a generic template look.

**Skills demonstrated:** information architecture at scale, custom i18n engine design, content/presentation separation, component reuse across a large multi-page site.
- **Live:** https://health-self-chi.vercel.app
- **Repo:** https://github.com/inno4te/health

### 2. MaDSkillz AI Readiness
An AI Career Intelligence Platform: users enter a career, and a rule-based scoring engine evaluates 6 weighted dimensions (repetitive tasks, creativity, human interaction, technical complexity, physical presence, AI-adoption speed) to output a 0–100 automation-exposure score and generate a downloadable PDF report.

**Architecture:**
- Built with a real modern toolchain — **React + Vite + Tailwind + PostCSS** — the only project in this set with a production build pipeline rather than a static HTML file.
- Application logic, the career database, the scoring engine, and translations all live in a single `App.jsx` as an explicit single-source-of-truth design decision (documented in the README).
- Input validation classifies non-career entries (e.g. "father", "wife") and routes them to a dedicated reassurance screen instead of returning a nonsensical score — a deliberate UX/edge-case design decision, not an afterthought.
- 8-language i18n including Arabic (RTL) and Chinese; accessibility support for reduced motion, ARIA, and keyboard navigation.
- CI/CD via GitHub Actions auto-deploying to GitHub Pages, plus documented Vercel/Netlify paths; MIT-licensed with a genuinely complete README (setup, deployment, customization, and the scoring formula itself).

**Skills demonstrated:** modern frontend tooling, rule-based decision-engine design, internationalization including RTL, accessibility engineering, CI/CD pipeline setup, product documentation.
- **Live:** https://aiready-lilac.vercel.app
- **Repo:** https://github.com/inno4te/AiReady

### 3. INSAPT — Institutional Site + Supply Chain Management Portal
The official website and internal supply-chain management (SCM) system for Chad's National Institute of Public Health (INSAPT) — a real government client deliverable, trilingual in French (default), Arabic (RTL), and English, with the language choice persisted across sessions.

**Architecture:**
- Clean repo structure: `assets/` (design system + i18n engine), `documents/` (official laws, decrees, and a full procurement manual, print-ready), `scm/` (the gated internal app), `google-apps-script/` (the backend).
- The SCM portal is a login-gated 7-tab application: dashboard with live KPIs, a synthesized procurement-procedure guide, a 24-chapter procurement manual rendered in-app with print support, sequential barcode generation (`INSAPT-YYYY-NNNNNN`) with printable previews, a stock registry with search and **CSV export**, and pre-built reporting queries (asset age, spend by donor, spend by category, items due for reform).
- A live **Google Sheets backend** via Google Apps Script — barcodes and stock entries sync to a real spreadsheet through a shared-key-authenticated API, with a connection-status indicator on load.
- RTL layout engineering for the Arabic locale, not just mirrored text.

**Skills demonstrated:** client-facing product delivery, auth-gated internal tooling, barcode/inventory system design, CSV/reporting pipelines, serverless backend integration, RTL-aware UI engineering.
- **Live:** https://insapt.vercel.app
- **Repo:** https://github.com/inno4te/Insapt

### 4. ForTe Fam
A multi-family household platform — chats, shared events, goals, diagnostics, a prayer journal, notepads, and an internal marketplace — with hard data isolation between families.

**Architecture:**
- **Multi-tenant data model on a spreadsheet backend:** every family's records live in their own namespaced tabs within a single Google Sheet, so families never see each other's data while sharing infrastructure.
- **Role-based access:** a 3-step onboarding wizard (family name → admin credentials → mission/values/goals) creates a new tenant; the admin can add up to 7 members with individual username/PIN logins and can reset or remove them; a super-admin dashboard (visible only to the platform owner) rolls up every family's activity.
- Legacy data migration was handled automatically when the multi-tenant model was introduced — the original family's history was preserved without manual reformatting.
- Ships as both a web app and a **native Android build via Capacitor**, sharing one codebase.
- Backend logic lives in `Code.gs` (Google Apps Script), redeployed in place across versions to preserve the same live endpoint — evidence of a real release process, not a one-off script.

**Skills demonstrated:** multi-tenant SaaS data modeling, role-based access control, cross-platform mobile packaging, iterative release management on a live backend.
- **Live:** https://fortehsm.vercel.app
- **Repo:** https://github.com/inno4te/fortehsm

### 5. Ngochi & Ndezo's School of Champions
A 21-week servant leadership academy for young African leaders, presented as a single-page editorial experience rather than a typical course-listing site.

**Architecture:**
- Curriculum content is fully decoupled from the app shell: **`content.js` (335KB)** holds the structured 21-week program data, while `app.js` (101KB) drives the interactive shell — a real content/logic split at a scale that would be painful to hardcode inline.
- A bespoke typographic and color system (Fraunces + Cormorant Garamond display faces over Inter body text, a custom emerald/gold/terracotta palette) built from CSS custom properties rather than a template.
- A hand-rolled generative background texture (inline SVG `feTurbulence` noise filter) for a tactile, paper-like feel — a hand-crafted visual detail, not a stock asset.

**Skills demonstrated:** content-driven application architecture at scale, custom design-token systems, generative CSS/SVG effects, editorial UX writing.
- **Live:** https://nnschool.vercel.app
- **Repo:** https://github.com/inno4te/nnschool

### 6. PMI Cameroon — Volunteer Evaluations 2026
A gated evaluation and assessment portal built for the PMI Cameroon chapter to review its 2026 cohort of volunteers.

**Architecture:**
- A hand-rolled single-page app router (`.page` / `.page.active` toggling) rather than a page-per-file site — a lightweight app-shell pattern built from scratch and reused deliberately across this portfolio's more "tool-like" projects (INSAPT's SCM portal, this one).
- A gated login flow with role-aware chips/avatars in the header, and a cohesive branded button system (primary / secondary / accent / ghost / WhatsApp / success states) applied consistently across the UI rather than ad-hoc styling per screen.
- Built French-first for a professional/government-adjacent audience, matching the target users' working language.

**Skills demonstrated:** lightweight SPA routing without a framework, auth/session-gated UI design, consistent component/button systems, localization for a professional audience.
- **Live:** https://pmiceval.vercel.app
- **Repo:** https://github.com/inno4te/pmiceval

