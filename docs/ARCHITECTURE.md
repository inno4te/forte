# Architecture

Forte is a static monorepo: no build step is needed to serve it.

- **Registry** — `scripts/build-registry.mjs` scans `apps/<area>/<name>/`, reads the page `<title>`, README summary, tech markers (Capacitor, Android, Node, Apps Script), admin pages and size, and joins it with `data/forte.config.json`. It emits `data/registry.json`, `data/registry.js` (full; admin console) and `data/registry.public.js` (admin-only projects removed; public portal).
- **Portal** — `index.html` renders the public registry with search and area filters.
- **Admin console** — `admin/index.html` renders the full registry, admin-only projects, per-project admin pages (`vision10000-admin.html`, `admin.html`, `admin-progress.html`), a sortable inventory and source links.
- **Apps** — each keeps its own dependencies. Node/Android projects (`ForTeSK`, `ForteInter`, `fortehnote`, `fortehsm`, `tierworld`, `team21-ae-app`, `team21ai`, `madit`) retain their own `package.json`/Gradle build; run those from inside their directory.
- **CI** — `.github/workflows/pages.yml` verifies the registry is current and deploys to GitHub Pages.

Apps were copied unmodified. Any that use absolute paths (`/x.js`) will need those made relative when served from a subfolder.
