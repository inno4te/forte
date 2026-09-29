# ForTe WebSwissKnife — Android APK build

This repo packages the ForTe WebSwissKnife web app (`www/index.html`) as a native
Android app using [Capacitor](https://capacitorjs.com/), and builds the APK
automatically with GitHub Actions — you don't need Android Studio installed
anywhere to get an installable APK.

## What's in here

```
www/index.html          ← the app itself (edit this file to update the app)
capacitor.config.json   ← app id, name, and WebView settings
android/                ← the generated native Android project (committed so
                           CI can build it directly, no "cap add" step needed)
.github/workflows/
  build-apk.yml          ← the GitHub Actions pipeline
```

## 1. Push this to GitHub

```bash
git init
git add .
git commit -m "ForTe WebSwissKnife — initial Android project"
git branch -M main
git remote add origin https://github.com/<your-username>/forte-webswissknife.git
git push -u origin main
```

As soon as you push, the workflow in `.github/workflows/build-apk.yml` runs
automatically.

## 2. Download the APK

Go to your repo → **Actions** tab → click the latest **Build ForTe
WebSwissKnife APK** run → scroll to **Artifacts** → download
**ForTe-WebSwissKnife-debug-apk**. That's a zip containing `app-debug.apk`.

This debug APK is self-signed with a generic debug key. It installs fine on
any Android phone (enable "Install unknown apps" for whichever app you use
to open the file — Files, Chrome, WhatsApp, etc.), but Android will show an
"unverified app" warning, and you can't publish a debug build to the Play
Store. That's expected — see below if you want a proper signed release.

## 3. Updating the app

To change any tool, edit `www/index.html` directly, commit, and push. The
next Actions run rebuilds the APK with your changes — no other file needs
to change for content updates.

```bash
git add www/index.html
git commit -m "Update tools"
git push
```

## 4. Signing a release build (optional, for the Play Store or a "trusted"

 install)

A release build needs a signing keystore. Generate one **once**, keep it
somewhere safe (losing it means you can never update that app listing again):

```bash
keytool -genkeypair -v -keystore release.keystore \
  -alias forte-webswissknife -keyalg RSA -keysize 2048 -validity 10000
```

It will ask for a keystore password and a key password — remember both.

Then add four **repository secrets** (GitHub repo → Settings → Secrets and
variables → Actions → New repository secret):

| Secret name                  | Value                                             |
|-------------------------------|----------------------------------------------------|
| `ANDROID_KEYSTORE_BASE64`     | Output of `base64 -i release.keystore` (one line)  |
| `ANDROID_KEYSTORE_PASSWORD`   | The keystore password you chose                    |
| `ANDROID_KEY_ALIAS`           | `forte-webswissknife` (or whatever alias you used) |
| `ANDROID_KEY_PASSWORD`        | The key password you chose                         |

Once those secrets exist, push a version tag to trigger a signed release
build and an automatic GitHub Release with the APK attached:

```bash
git tag v1.0
git push origin v1.0
```

## 5. App identity

- **App name:** ForTe WebSwissKnife
- **Package / Application ID:** `com.team21academy.fortewebswissknife`
- **Version:** set in `android/app/build.gradle` (`versionCode` / `versionName`)

If you want a different package id later, changing it after publishing means
Android treats it as a *different app* — decide on the final id before your
first real release.

## 6. App icon

Right now the app uses Capacitor's default placeholder icon. To use your own:

1. Make a 1024×1024 PNG logo.
2. Install the icon generator once, locally: `npm install -g @capacitor/assets`
3. From the project root: `npx @capacitor/assets generate --android`
4. Commit the regenerated files under `android/app/src/main/res/`.

## 7. Permissions already configured

`android/app/src/main/AndroidManifest.xml` already requests everything the
web app's tools need: camera, microphone, precise/coarse location, flashlight,
vibration, and biometric (for the Face ID/Touch ID-style vault, using Android's
equivalent biometric prompt). All are requested at runtime by the WebView
only when a tool actually calls for them — nothing is requested up front.

## 8. A note on the "iPhone Pro" tools

A handful of tools (multi-lens camera switching, AR Quick Look, the
barometric altimeter reading, Face ID vault) lean on APIs that behave best on
Safari/iOS. On Android they either work through Android's equivalents
(Chrome's WebView supports getUserMedia zoom, biometric prompts, geolocation
altitude, etc. on most modern phones) or the tool shows an in-app note
explaining the limitation rather than failing silently. Nothing needs to be
changed for the Android build — it's the same `www/index.html` either way.

## Troubleshooting

- **Build fails at `gradlew assembleDebug`:** usually a Java/Gradle version
  mismatch. This workflow pins JDK 17, which matches Capacitor 6's Android
  Gradle Plugin — don't change the JDK version without checking Capacitor's
  compatibility table.
- **APK installs but a camera/mic tool shows a blank screen:** make sure you
  granted the permission when Android prompted; if you tapped "Deny," reset
  it in Android Settings → Apps → ForTe WebSwissKnife → Permissions.
- **Want to test locally before pushing:** `npx cap open android` opens the
  project in Android Studio if you have it installed, or run
  `cd android && ./gradlew assembleDebug` directly if you have the Android
  SDK set up locally.
