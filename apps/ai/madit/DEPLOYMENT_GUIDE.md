# MaD — Make a Difference — Deployment Guide

**Two things ship here:**
1. **`index.html`** — the whole MaD website (single self-contained file)
2. **`Code.gs`** — the Google Apps Script backend so submissions, actions, and ideas are **visible to everyone** (not just local to each browser)

You can run the website standalone — but to make posts visible everywhere, you must deploy the backend once. Takes about 5 minutes.

---

## Admin access

Login → Admin tab:
- Username: **`forteh`**
- Password: **`f0rteh`**

The password can be changed inside the admin dashboard → Settings tab.

---

## Part 1 — Deploy the Google Apps Script backend (5 min, one-time)

### Step 1: Create the sheet
1. Go to https://sheets.google.com
2. Click **Blank** to create a new sheet
3. Rename it to **MaD Backend**

### Step 2: Open the script editor
1. In the sheet: **Extensions → Apps Script**
2. Delete whatever placeholder code is there
3. Open the `Code.gs` file from this package, copy **everything**, paste into the editor
4. Click the disk icon 💾 (or Ctrl+S) to save

### Step 3: Run the setup
1. In the script editor, above the code, there's a function dropdown — pick **`setup`**
2. Click **Run**
3. Google will ask for permissions — **Review permissions → pick your account → Advanced → Go to project (unsafe) → Allow**
   (This is normal — Google flags any script that touches your sheets as "unsafe" until reviewed)
4. Wait a moment — you should get a popup: **✅ MaD Backend ready**
5. Go back to the sheet — you'll now see 6 tabs: `Stories`, `Actions`, `Submissions`, `Ideas`, `Votes`, `Log`

### Step 4: Deploy as a Web App
1. In the script editor, click **Deploy → New deployment**
2. Click the gear icon ⚙️ next to "Select type" → pick **Web app**
3. Fill in:
   - **Description**: `MaD Backend v1`
   - **Execute as**: `Me (your email)`
   - **Who has access**: **`Anyone`** ← important, so the website can call it
4. Click **Deploy**
5. Copy the **Web app URL** — it looks like `https://script.google.com/macros/s/AKfy.../exec`

### Step 5: Wire the website to the backend
1. Open `index.html` in any text editor
2. Near the top, find the line:
   ```js
   const MAD_BACKEND_URL = "";
   ```
3. Paste your URL between the quotes:
   ```js
   const MAD_BACKEND_URL = "https://script.google.com/macros/s/AKfy.../exec";
   ```
4. Save. Done.

Every MaD action, submission, idea, and vote from anywhere in the world now writes to your Google Sheet, and the site hydrates from it on load.

### If you update the script later
Any code change requires a **new deployment version**:
- **Deploy → Manage deployments → pencil icon** → Version: **New version** → **Deploy**
- The URL stays the same, no need to change `index.html`

---

## Part 2 — Host the website

### Option A — GitHub Pages (free, easy, recommended)
1. Create a new GitHub repo (e.g., `mad-platform`)
2. Upload `index.html` to the root
3. **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` → Folder: `/ (root)` → Save
4. Wait about a minute — your site is live at `https://YOUR-USER.github.io/mad-platform/`

### Option B — Any static host
Netlify, Vercel, Cloudflare Pages, or plain nginx/Apache — just drop `index.html` in.

### Option C — Local test
Open `index.html` directly in any browser (double-click). Works offline (except live news, which needs the internet).

---

## Part 3 — Android APK (optional)

Wrap the website as an Android app using free tools:

### Option A — PWABuilder (easiest, browser-based)
1. Go to https://www.pwabuilder.com/
2. Enter your GitHub Pages URL
3. Click **Package for stores → Android**
4. Download the APK

### Option B — Bubblewrap (command-line)
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest=https://YOUR-DOMAIN/manifest.json
bubblewrap build
```
You'll need to add a `manifest.json` (icons, theme color, start URL) — I can generate one on request.

---

## Editing the CSS (if you want to tweak the look)

The CSS is pre-compiled and inlined inside `index.html` — no build step required for normal use.

If you want to change colors/styles:
```bash
cd build
npm install
# Edit build/src/input.css
npx tailwindcss -i ./src/input.css -o ./dist/mad.css --minify
```
Then swap the `<style>` block in `index.html` for the new `dist/mad.css` content.

---

## What lives where

```
mad-platform.zip
├── index.html              → the website (single file, 220KB)
├── Code.gs                 → Google Apps Script backend
├── DEPLOYMENT_GUIDE.md     → this file
├── README.md               → feature summary
└── build/
    ├── package.json        → Tailwind dev dependency
    ├── tailwind.config.js  → colors, fonts, safelist
    ├── src/input.css       → source styles (edit here)
    └── dist/mad.css        → compiled CSS (already inlined in index.html)
```

---

## Troubleshooting

**"The website loads but nothing syncs to my sheet"**
Check the browser console (F12). If you see CORS errors, the Web App wasn't deployed with **Who has access: Anyone**. Redeploy with the right setting.

**"Google says my script is unsafe when I try to run setup()"**
This is a standard warning for personal scripts. Click **Advanced → Go to project (unsafe) → Allow**. It's your own script — you're safe.

**"I updated Code.gs but the site still behaves the same"**
GAS caches deployments. You need to create a **new deployment version** (Manage deployments → pencil → New version → Deploy). The URL stays the same.

**"News is not loading"**
The 3 free CORS proxies rotate through fallbacks. If all fail, the site shows curated static news. Refresh in a minute — usually one proxy is up.

**"How do I change the admin password permanently?"**
Log in as `forteh` / `f0rteh` → Admin dashboard → **Settings** tab → change password. It persists in browser storage until you change it or clear data.

---

**Contact:** Innocent Forteh — team21online@gmail.com · WhatsApp +237 694 294 406
**Team21 Academy • inno4te**
