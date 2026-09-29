#!/usr/bin/env node
// Usage: node scripts/set-admin-password.mjs "<passphrase>"  -> rewrites admin/config.js
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
const pw = process.argv[2];
if (!pw || pw.length < 10) { console.error('Provide a passphrase of 10+ characters: node scripts/set-admin-password.mjs "<passphrase>"'); process.exit(1); }
const hash = createHash("sha256").update(pw).digest("hex");
writeFileSync(new URL("../admin/config.js", import.meta.url),
`// SHA-256 hash of the admin passphrase. Generate with: node scripts/set-admin-password.mjs "<passphrase>"
// While empty, the console lets the first visitor set a passphrase for THIS browser only (localStorage).
window.FORTE_ADMIN = { passHash: "${hash}" };
`);
console.log("admin/config.js updated.");
