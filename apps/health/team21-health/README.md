# Team21 Health Platform

> A comprehensive, evidence-based preventive-health platform — mapping the dietary,
> environmental, behavioural and systemic factors implicated in cancer, cardiovascular
> disease, metabolic disorders and chronic illness.
>
> **© Innocent Forteh · Team21 Health Platform · All rights reserved.**
> *Edited by Innocent Forteh · For educational use only · Not medical advice.*

---

This repository contains the full Team21 platform as both a **website** AND an **installable Android app**. It is a Progressive Web App (PWA) that works offline, can be installed from any modern phone browser, and can be wrapped into a real signed APK in two different ways depending on how much control you need.

## What's inside

- **23 pages** of evidence-based health content (carcinogen library, 9 body systems, daily tracker, 8 quizzes, 24 proposals, natural remedies, common medicines, faith & encouragement, community Q&A, and more)
- **Full English / French toggle** with a comprehensive translation dictionary
- **Offline support** via service worker — every page works without internet after the first visit
- **Installable** on Android, iOS, Windows, Mac via "Add to home screen" / "Install app" — no app store required
- **APK-ready** via either PWABuilder (5 minutes, no Android SDK) or Capacitor (full native control)

---

## 🚀 Route 1 — Deploy & install as APK in under 10 minutes (recommended)

This is the fastest path. No Android Studio, no local SDK install. You'll end up with a real `.apk` file you can sideload, share, or upload to the Play Store.

### Step 1 — Push this folder to GitHub

```bash
# In the unzipped team21-app folder:
git init
git branch -M main
git add .
git commit -m "Initial commit — Team21 Health Platform"
git remote add origin https://github.com/YOUR_USERNAME/team21-health.git
git push -u origin main
```

### Step 2 — Enable GitHub Pages

1. Open your repo on github.com
2. Go to **Settings → Pages**
3. Under "Build and deployment", set **Source** to **GitHub Actions**
4. The included workflow (`.github/workflows/deploy.yml`) will run automatically and your site will be live at:
   `https://YOUR_USERNAME.github.io/team21-health/`

### Step 3 — Test the PWA on your phone

1. On your Android phone, open Chrome and visit your GitHub Pages URL
2. Chrome will show an **"Install app"** prompt (or tap the ⋮ menu → "Install app" / "Add to Home screen")
3. Tap install — you now have a Team21 icon on your home screen that launches like a native app, works offline, and has no browser chrome

This is already a real app for the user — it's how Twitter, Starbucks, Pinterest and many others ship on Android.

### Step 4 — Generate a real signed APK with PWABuilder

If you specifically need a `.apk` file to distribute (e.g. for the Play Store, for sideloading, or for offline distribution):

1. Visit **https://www.pwabuilder.com**
2. Paste your GitHub Pages URL (e.g. `https://YOUR_USERNAME.github.io/team21-health/`)
3. PWABuilder will score your PWA (this repo is set up to score very high — manifest, icons, service worker all present)
4. Click **Package For Stores → Android**
5. Choose either:
   - **Signed APK** (for direct install / sideloading)
   - **App Bundle (.aab)** (required for Play Store upload)
6. Download the package — you now have a real APK signed and ready to install

**To install the APK on a phone:**
- Email/transfer the `.apk` to the device
- Open it in the file manager
- Allow "Install from unknown sources" if prompted
- Tap install

---

## 🛠 Route 2 — Wrap as a native Android app with Capacitor (more control)

Choose this if you want native plugins, deeper Android integration, Play Store distribution with your own signing keys, or you want to add features like push notifications, native camera, etc.

### Prerequisites

- **Node.js 18+** (https://nodejs.org)
- **Android Studio** (https://developer.android.com/studio) — includes the Android SDK
- **Java JDK 17+** (bundled with Android Studio)

### Build the APK

```bash
# 1. Install dependencies
npm install

# 2. Add the Android platform (creates an android/ folder)
npx cap add android

# 3. Sync the web app into the Android project
npx cap sync android

# 4. Open in Android Studio
npx cap open android
```

In Android Studio:
- Let it finish indexing
- **Build → Build Bundle(s) / APK(s) → Build APK(s)**
- Your debug APK will be at:
  `android/app/build/outputs/apk/debug/app-debug.apk`

For a **signed release APK** (for distribution):
- **Build → Generate Signed Bundle / APK**
- Create or select a keystore (KEEP THIS FILE SAFE — losing it means you can never update your published app)
- Choose APK or App Bundle, signed with your key
- The release APK will be at:
  `android/app/build/outputs/apk/release/app-release.apk`

### Alternative: Build the APK in the cloud with GitHub Actions

You can add an Android build workflow to GitHub Actions so APKs are produced on every push without needing Android Studio locally. This is a more advanced setup — ask once you've completed Route 1 if you want this.

---

## 🧪 Test locally before deploying

```bash
npm install
npm run serve
# Opens http://localhost:8080 in your browser
```

Or with Python (no Node required):

```bash
python3 -m http.server 8080
```

---

## File structure

```
team21-app/
├── *.html                      ← 23 content pages
├── shared.css                  ← All styles
├── shared.js                   ← Nav, footer, auth, boot — injects © Innocent Forteh footer on every page
├── data.js / data-ext.js       ← All content data (topics, remedies, medicines, scriptures, quizzes…)
├── components.js               ← Topic-card renderer
├── system-page.js              ← Body-system page builder
├── lang.js / lang-data.js      ← Full French translation system
├── manifest.webmanifest        ← PWA app declaration
├── service-worker.js           ← Offline support, app shell caching
├── icons/                      ← 9 PNG icons (72–512px + maskable)
├── favicon.png                 ← Browser tab icon
├── apple-touch-icon.png        ← iOS home screen icon
├── capacitor.config.ts         ← Native Android wrap config (Route 2)
├── package.json                ← npm scripts and Capacitor deps
└── .github/workflows/deploy.yml ← Auto-deploy to GitHub Pages
```

## App icon

The icon is a serif "T21" mark on the cream paper background, with the signature amber accent rule beneath — matching the editorial design of the platform itself. Includes a maskable variant so Android can crop it to circular / squircle / teardrop themes without losing the mark.

To customise: replace the files in `icons/` (keep the same filenames and sizes), then re-run the GitHub Actions deploy or regenerate with `python3 gen_icons.py` if you keep that script.

## License

© Innocent Forteh · Team21 Health Platform · All rights reserved.
For educational use only · Not medical advice.
