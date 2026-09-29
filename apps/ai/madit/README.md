# MaD — Make a Difference

**Giving Life to Likes.** A "911 for the Web" — click MaD on any story or news item to commit real action in under a minute.

## What's in this package

| File | What it is |
|------|-----------|
| `index.html` | The whole website — single self-contained file, ~220KB |
| `Code.gs` | Google Apps Script backend so posts are visible to everyone |
| `DEPLOYMENT_GUIDE.md` | Step-by-step deployment (5 min for backend, 2 min for hosting) |
| `build/` | Tailwind source (optional — CSS already inlined in index.html) |

**Start with `DEPLOYMENT_GUIDE.md`** — it walks you through everything.

## Admin login
- **Username:** `forteh`
- **Password:** `f0rteh`
- Changeable inside the admin dashboard → Settings

## The MaD button
Clicking MaD on any story opens a 3-step action form:
1. **Pick how you can help** — donate money / time / skills, spread the word, connect resources, add your voice, or start a group
2. **Fill in details** — amount picker, hours & availability, skill categories, share buttons, message boxes
3. **Contact info** (anonymous option available) → success with reference ID `MAD-XXXXXX`

## Backend (Google Apps Script)
When you paste your GAS Web App URL into `index.html`:
- Every MaD action, submission, idea, and vote writes to a shared Google Sheet
- The website hydrates from that sheet on load — everyone sees the same data
- Six sheets are auto-created: `Stories`, `Actions`, `Submissions`, `Ideas`, `Votes`, `Log`
- If no URL is set, the site works in local demo mode

## Languages
5 languages via dropdown in navbar: 🇬🇧 English · 🇫🇷 Français · 🇪🇸 Español · 🇵🇹 Português · 🇹🇿 Kiswahili

## Free tools stack
- React 18 + Babel Standalone (via CDN)
- Tailwind CSS (pre-compiled and inlined)
- Lucide icons
- 3 free CORS proxies chained for news RSS: codetabs · allorigins · x2u
- Browser's native `DOMParser` for RSS
- Google Apps Script for the shared backend
- **Zero paid APIs. Zero API keys.**

## Feature list
- MaD Action Modal (the 911 form)
- Home with country filter (33 countries + Global)
- Stories page with search + category/region filters
- Live News feed from BBC, Reuters, Guardian, AP, NPR, Al Jazeera
- Ideas Market — submit → vote → admin promotes at 100+ votes → auto-creates project story
- Get Involved with 5 submission types (story, link, event, photo, donation cycle)
- Story detail with action plan, fundraiser tab, task tracking
- Admin dashboard: verification queue, published stories, ideas ready to promote, password change
- OAuth-style member login (Google/Facebook/Apple/Microsoft/GitHub — placeholders, ready for real OAuth wiring)
- Founder bio for Innocent Forteh
- 8 social icons + newsletter in footer
- Floating help button + slide-out help panel + welcome toast + tooltips
- Fully responsive (mobile menu, tablet grids, desktop layouts)

---

**Team21 Academy • inno4te • Yaoundé, Cameroon**
Innocent Forteh — team21online@gmail.com — WhatsApp +237 694 294 406

## Under the hood — precompiled JS

The JSX in this project is **precompiled** to plain JavaScript. No Babel runs in the browser (no warnings, faster first paint). If you edit the app logic:

1. Extract the JSX from `index.html` (the big `<script>` block) into `build/src/app.jsx`
2. Rebuild: `cd build && npm install && npm run build:js`
3. Paste the contents of `build/dist/app.compiled.js` back into the `<script>` block in `index.html`
