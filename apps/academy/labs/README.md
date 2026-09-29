# Innov8te Labs4Africa 🧪🌍

Free, lightweight, **fully static** virtual science & technology labs for African
students. Hands-on, drag-and-drop simulations that work on slow connections and
on a phone — **no login, no cost, no server required.**

A project by **Innocent Forteh — Paid All Links Foundation**.

---

## ✨ What's inside

**Live interactive labs**
- 🖥️ **PC Builder** — drag components into a build with live socket / memory / power compatibility checks.
- 🌐 **Network Builder** — wire devices into a correct topology, assign IPs, run a ping test.
- 🛡️ **Phishing Spotter** — find every red flag in a realistic scam email.
- 🔬 **Cell Explorer** — label an animal cell and learn each organelle's function.

**Plus**
- A catalog with 8+ more labs marked *Coming soon* (CS, Networking, Cyber Security, Chemistry, Biology, Physics).
- Curated YouTube videos (lazy-loaded — they only download when tapped) and free external resources.
- An **admin dashboard** (`admin.html`) showing visits, most-popular tools, visitor locations, devices/browsers and recent activity, with JSON/CSV export.

Everything is plain HTML + CSS + vanilla JavaScript. No frameworks, no build step.

---

## 📁 Project structure

```
innov8te-labs4africa/
├── index.html              ← landing page + lab catalog
├── about.html              ← mission / how it works
├── admin.html              ← usage analytics dashboard (passcode-gated)
├── css/
│   └── style.css           ← shared design system
├── js/
│   ├── analytics.js        ← lightweight usage tracking
│   └── main.js             ← nav, lazy YouTube, drag-and-drop engine
├── labs/
│   ├── pc-builder.html
│   ├── network-builder.html
│   ├── cyber-phishing.html
│   └── biology-cell.html
└── README.md
```

---

## 🚀 Deploy free on GitHub Pages

1. Create a new GitHub repository (e.g. `labs4africa`).
2. Upload **all** files **keeping the folder structure above** (don't flatten the
   `css/`, `js/`, `labs/` folders).
3. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*,
   Branch = `main`, Folder = `/ (root)`. Save.
4. Wait ~1 minute. Your site is live at
   `https://<your-username>.github.io/labs4africa/`.

> Want it at the repository root URL? Name the repo
> `<your-username>.github.io`. It also works on Netlify or Cloudflare Pages —
> just drag the folder in.

---

## 🔐 Admin dashboard

- Open `admin.html`. Default passcode: **`labs4africa`**.
- Change it in `admin.html` — search for `var PASSCODE =` near the bottom.
- The passcode is client-side only (it deters casual visitors, it is **not** real
  security). For genuine protection, keep the URL private or host the page behind
  Netlify / Cloudflare Access.

### About the analytics numbers (important)
Because the site is static (no backend), the dashboard reads from each **browser's
local storage** + one approximate location lookup per visitor. So it reflects
activity on **your own device**, not every visitor automatically.

**To get real, global, cross-visitor stats** (top pages + country-level location,
all aggregated for you), add a free, privacy-friendly counter — **[GoatCounter](https://www.goatcounter.com)**
is perfect for low-bandwidth regions (~3.5 KB, no cookies):

1. Make a free account, get your code.
2. Add this to the `<head>` of every page (replace `CODE`):
   ```html
   <script data-goatcounter="https://CODE.goatcounter.com/count"
           async src="//gc.zgo.at/count.js"></script>
   ```
The built-in tracker in `js/analytics.js` will automatically mirror lab opens to
GoatCounter as events. Both systems can run together.

---

## ➕ Add your own lab

1. Copy any file in `labs/` (e.g. `pc-builder.html`) as a starting template.
2. Keep the shared header/footer and the two script tags at the bottom:
   ```html
   <script src="../js/analytics.js"></script>
   <script src="../js/main.js"></script>
   ```
3. Track the lab open so it appears in the dashboard:
   ```js
   if (window.Analytics) window.Analytics.track("lab", "your-lab-id");
   ```
4. For drag-and-drop, reuse the built-in engine (works on touch **and** mouse):
   ```js
   LabDnD.init({
     container: document.querySelector(".lab-layout"),
     dragSel: ".part",        // your draggable items
     dropSel: ".slot",        // your drop zones
     onDrop: function (dragEl, dropEl) { /* your validation */ }
   });
   ```
5. Add a card for it on `index.html` (copy a `.lab-card`, set `data-cat` to the
   subject so the filter works, and flip the badge from `soon` to `live`).
6. Add a nice display name in `admin.html`'s `LABNAMES` map.

---

## 🎨 Customising

- **Colours / fonts:** all design tokens live at the top of `css/style.css` under `:root`.
- **Videos:** swap the YouTube IDs in any `data-yt="..."` attribute. Thumbnails and
  the player load only on tap to save data.
- **Resource links:** edit the `.link-list` items on the home page / lab pages.

---

## ♿ & 📶 Built for real conditions
- No heavy frameworks; pages are small and cache well.
- Videos are click-to-load facades (no autoplay, no preloaded players).
- Drag-and-drop supports touch, mouse, **and** tap-to-place as a fallback.
- Respects `prefers-reduced-motion` and uses visible keyboard focus styles.

---

## 📜 License & credit
© Innov8te Labs4Africa · **Innocent Forteh — Paid All Links Foundation.** All rights reserved.

You're encouraged to mirror and share the labs for educational use. Please keep the
attribution in the footer.
