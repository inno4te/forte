# Forte

One platform for **Team21 Academy**, the **Forte** apps and every **inno4te** venture. Forte consolidates 72 formerly separate repositories into a single, logically organised monorepo with a **public portal** and a password-gated **admin console**.

| Surface | Path | Audience |
|---|---|---|
| Public portal (searchable catalog) | `/` | Everyone |
| Admin console (all projects, admin pages, sources) | `/admin/` | Administrators |
| Individual apps | `/apps/<area>/<project>/` | As listed |

## Structure

```
forte/
├── index.html            Public portal (reads data/registry.public.js)
├── admin/                Admin console (reads data/registry.js)
├── assets/               Shared CSS/JS
├── apps/<area>/<name>/   Every imported project, unmodified
├── data/                 forte.config.json (areas, admin-only list, sources) + generated registry
├── scripts/              build-registry.mjs, set-admin-password.mjs
├── docs/                 ARCHITECTURE.md, ACCESS.md, PROJECTS.md
└── .github/workflows/    GitHub Pages deploy
```

Areas: `academy`, `ai`, `certification`, `business`, `economics`, `health`, `chad`, `apps`, `profile`. See [docs/PROJECTS.md](docs/PROJECTS.md) for the full inventory.

## Quick start

```bash
npm run serve            # http://localhost:8080
npm run registry         # rebuild data/registry*.js after adding/changing apps
node scripts/set-admin-password.mjs "a-long-passphrase"   # set the admin passphrase
```

## Adding a project
1. Copy it to `apps/<area>/<name>/` (entry `index.html`).
2. Add `"<name>": "owner/repo"` under `sources` in `data/forte.config.json`; add the name to `adminOnly` if it is not public.
3. `npm run registry` and commit.

## Access model
Read [docs/ACCESS.md](docs/ACCESS.md) before publishing: the admin gate is client-side, suitable for hiding internal tools from the public catalog, **not** for protecting secrets.

## Provenance
Each project's original repository is recorded in `data/forte.config.json` (`sources`). Files were copied as-is; the originals (and their git history) remain untouched in their own repositories.
