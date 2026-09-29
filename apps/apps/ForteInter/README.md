# ForTeInter — Android app build

This folder turns the ForTeInter web page into a downloadable Android APK,
built automatically by GitHub Actions using [Capacitor](https://capacitorjs.com/).

## What's here

```
forteinter-apk/
├── www/index.html              ← your ForTeInter app (the actual UI)
├── capacitor.config.json       ← app id, app name, tells Capacitor where the web app lives
├── package.json                ← Capacitor dependencies
├── .gitignore                  ← keeps the generated android/ folder out of git
└── .github/workflows/build-apk.yml   ← builds the APK on every push
```

The native `android/` project is **not** committed — the workflow generates
it fresh on every run with `npx cap add android`, so the repo stays small
and there's nothing platform-specific to keep in sync by hand.

## One-time setup

1. Create a new GitHub repository (or use an existing one).
2. Copy everything in this `forteinter-apk/` folder into the root of that
   repository (so `.github/workflows/build-apk.yml` sits at
   `your-repo/.github/workflows/build-apk.yml`, not nested inside another
   folder).
3. Commit and push to the `main` branch.

## Building the APK

- Every push to `main` triggers the workflow automatically.
- You can also trigger it manually: go to the **Actions** tab on GitHub →
  **Build Android APK** → **Run workflow**.
- When it finishes (usually 3–6 minutes), open the completed run and
  scroll down to **Artifacts** → download `forteinter-debug-apk`. Unzip it
  to get `app-debug.apk`.

## Installing the APK on a phone

This is a **debug** build, so Android will warn about installing from an
unknown source — that's expected for an app not published on the Play
Store. Transfer the `.apk` to the phone (email, Drive, USB) and tap it to
install, allowing the "install unknown apps" permission when prompted.

## Notes

- The app is a WebView wrapper around `www/index.html`, so it still talks
  live to your Google Apps Script backend over the internet — the phone
  needs a network connection for the board to load and update.
- If you ever want a **release** (signed, Play-Store-ready) build instead
  of a debug one, that needs a signing keystore added as GitHub secrets —
  ask if you'd like that set up.
- To change the app name or package id, edit `capacitor.config.json`
  before the next push.
