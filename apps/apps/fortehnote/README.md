# ForTe Notes — Android build

This repo packages the ForTe Notes web app (in `www/index.html`) into an installable
Android APK using [Capacitor](https://capacitorjs.com/), built automatically by
GitHub Actions — no Android Studio required.

## Repo layout

```
.
├── www/
│   └── index.html          ← the ForTe Notes app itself
├── capacitor.config.json   ← app id, name, and web folder
├── package.json            ← Capacitor dependencies
├── .github/
│   └── workflows/
│       └── build-apk.yml   ← builds the APK on every push to main
└── .gitignore
```

The `android/` native project is **not** committed — the workflow generates it
fresh every run via `npx cap add android`, so the repo stays small.

## One-time setup

1. Create a new GitHub repository.
2. Add all the files/folders above, preserving the paths exactly
   (`www/index.html` must exist, not just `index.html` at the root).
3. Commit and push to the `main` branch.

That's it — pushing to `main` triggers the workflow automatically. You can also
trigger it manually from the **Actions** tab (`Run workflow` button), since the
workflow includes `workflow_dispatch`.

## Getting the APK

1. Go to the **Actions** tab of your repo.
2. Open the latest "Build ForTe Notes APK" run.
3. Scroll to **Artifacts** and download `fortenotes-debug-apk` (a zip containing
   `app-debug.apk`).
4. Transfer that `.apk` to your Samsung Note 20 (email it to yourself, use
   Google Drive, or plug in via USB).
5. On the phone, tap the file to install. Android will ask you to allow
   "install unknown apps" for whichever app you used to open it (Files,
   Chrome, Gmail, etc.) — allow it, then install.

## Notes and known limitations

- This is a **debug** build, which is perfectly fine to install and use
  yourself. It's unsigned for the Play Store, so if you ever want to
  distribute it publicly you'd need a release build signed with your own
  keystore (happy to add that step later if you want it).
- Android's system WebView (which Capacitor uses) does **not** support the
  `showSaveFilePicker` file-picker API that Chrome desktop has. Inside the
  app, Save will automatically fall back to a normal download into the
  device's Downloads folder using the filename you typed — the "choose
  folder/drive" picker only appears when the app is opened in a browser that
  supports it.
- If you change `www/index.html` later, just push again — the workflow
  rebuilds the APK from the latest version automatically.

## Changing the app name or package ID

Edit `capacitor.config.json`:
- `appId` — reverse-domain style identifier (e.g. `com.forte.notes`). Change
  this only before your first real install if you plan to reinstall updates
  later, since Android treats a different `appId` as a different app.
- `appName` — the name shown under the icon on the home screen.
