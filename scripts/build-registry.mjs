#!/usr/bin/env node
// Scans apps/<domain>/<id>/ and writes data/registry.json, data/registry.js (full, admin) and data/registry.public.js
// consumed by the public portal (index.html) and the admin console (admin/).
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const cfg = JSON.parse(readFileSync(join(ROOT, "data/forte.config.json"), "utf8"));
const SKIP = new Set([".git", "node_modules"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else out.push({ path: p, size: s.size });
  }
  return out;
}

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();

function readmeSummary(dir) {
  const f = join(dir, "README.md");
  if (!existsSync(f)) return "";
  const lines = readFileSync(f, "utf8").split("\n").map((l) => l.trim());
  const para = lines.find((l) => l && !l.startsWith("#") && !l.startsWith("![") && !l.startsWith("|") && !l.startsWith("```"));
  return para ? para.replace(/^>\s*/, "").replace(/[*_`]/g, "").slice(0, 220) : "";
}

const projects = [];
for (const domain of Object.keys(cfg.domains)) {
  const base = join(ROOT, "apps", domain);
  if (!existsSync(base)) continue;
  for (const id of readdirSync(base).sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))) {
    const dir = join(base, id);
    if (!statSync(dir).isDirectory()) continue;
    const files = walk(dir);
    const rel = (f) => relative(dir, f.path).split("\\").join("/");
    const rootHtml = readdirSync(dir).filter((n) => n.endsWith(".html"));
    const entry = rootHtml.includes("index.html") ? "index.html" : rootHtml[0] || null;
    let title = id;
    if (entry) {
      const m = readFileSync(join(dir, entry), "utf8").slice(0, 60000).match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      if (m && decode(m[1])) title = decode(m[1]);
    }
    const names = files.map(rel);
    const tech = [];
    if (names.some((n) => /(^|\/)capacitor\.config\./.test(n))) tech.push("Capacitor");
    if (names.some((n) => /(^|\/)build\.gradle$/.test(n) || n.startsWith("android/"))) tech.push("Android");
    if (names.includes("package.json")) tech.push("Node");
    if (names.some((n) => n.endsWith(".gs"))) tech.push("Apps Script");
    if (entry) tech.push("Web");
    const adminPages = names.filter((n) => /admin/i.test(n) && n.endsWith(".html"));
    projects.push({
      id: `${domain}/${id}`,
      name: id,
      domain,
      title,
      description: readmeSummary(dir),
      access: cfg.adminOnly.includes(id) ? "admin" : "public",
      source: cfg.sources[id] || null,
      entry: entry ? `apps/${domain}/${id}/${entry}` : null,
      adminPages: adminPages.map((n) => `apps/${domain}/${id}/${n}`),
      tech,
      files: files.length,
      bytes: files.reduce((a, f) => a + f.size, 0),
    });
  }
}

const registry = { name: cfg.name, tagline: cfg.tagline, domains: cfg.domains, projects };
writeFileSync(join(ROOT, "data/registry.json"), JSON.stringify(registry, null, 1) + "\n");
writeFileSync(join(ROOT, "data/registry.js"), "window.FORTE_REGISTRY = " + JSON.stringify(registry) + ";\n");
const pub = { ...registry, projects: projects.filter((p) => p.access === "public") };
writeFileSync(join(ROOT, "data/registry.public.js"), "window.FORTE_REGISTRY = " + JSON.stringify(pub) + ";\n");
console.log(`registry: ${projects.length} projects (${projects.filter((p) => p.access === "admin").length} admin-only)`);
