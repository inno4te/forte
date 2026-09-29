# Access model

| Level | What it means | Enforcement |
|---|---|---|
| Public | Listed on `/` | none needed |
| Admin | Hidden from the `/` catalog; listed in `/admin/` | client-side passphrase gate |

## Limits (read this)
The site is static. Admin-only projects are **not listed** publicly, but their files are still served at their URLs, and the gate is JavaScript in the browser. Do **not** place secrets, personal data (e.g. evaluation results, ERP data) or credentials in this repository.

## Setting the admin passphrase
- Repo-wide: `node scripts/set-admin-password.mjs "<10+ char passphrase>"`, then commit `admin/config.js` (only a SHA-256 hash is stored).
- Until then, the first visitor to `/admin/` sets a per-browser passphrase (localStorage).

## Real protection
For genuine authentication put Forte behind Cloudflare Access, Netlify/Vercel password protection or an SSO reverse proxy, and move admin-only apps (`forteErp`, `pmiceval`, `360`, `lat`, `consulting`, `jimit`, `zoeconsulting`, `mobprod`, `t21prod`) into a private repository. Google Apps Script backends (`Code.gs`, `team21_backend.gs`) enforce access in Google.
