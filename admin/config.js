// SHA-256 hash of the admin passphrase. Generate with: node scripts/set-admin-password.mjs "<passphrase>"
// While empty, the console lets the first visitor set a passphrase for THIS browser only (localStorage).
window.FORTE_ADMIN = { passHash: "" };
