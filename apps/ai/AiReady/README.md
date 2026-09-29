# MaDSkillz AI Readiness

> **AI Career Intelligence Platform** — Helping people understand how exposed their job is to AI and automation, and what to do about it.

Built by [Innocent Forteh](https://wa.me/237674917169) for **Team21 Academy**.

![Status](https://img.shields.io/badge/status-production--ready-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Languages](https://img.shields.io/badge/languages-8-orange)

---

## ✨ Features

- **Multilingual** — 8 languages: English, French, Spanish, Arabic (RTL), Portuguese, Swahili, Chinese, German
- **AI Exposure Engine** — Internal rule-based scoring across 6 dimensions, no external APIs
- **Smart Input Validation** — Detects non-careers (e.g. "father", "wife") and responds with reassurance instead of fake scores
- **Beautiful UI** — Pure black + orange/red palette, glassmorphism, animated counters, smooth transitions
- **15+ Career Database** — Pre-loaded careers with custom skills and future role suggestions
- **PDF Reports** — One-click downloadable assessment report
- **Coaching Integration** — WhatsApp + Email lead capture with prefilled forms
- **Admin Dashboard** — Live platform analytics
- **Mobile-First** — Optimized for low-bandwidth users (Africa-friendly)
- **Accessibility** — Reduced-motion support, ARIA-friendly, keyboard navigation

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or higher
- npm (comes with Node) or yarn / pnpm

### Local Development

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/madskillz-ai-readiness.git
cd madskillz-ai-readiness

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — the app will hot-reload as you edit.

### Production Build

```bash
npm run build      # output goes to /dist
npm run preview    # preview the production build locally
```

---

## 🌍 Deployment

### Option 1 — Vercel (recommended, easiest)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**
3. Import your GitHub repo — Vercel auto-detects Vite
4. Click **Deploy**

That's it. Every git push to `main` redeploys automatically. Free tier covers small/medium traffic.

### Option 2 — Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → **"Add new site"** → **"Import from Git"**
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click Deploy

### Option 3 — GitHub Pages (free, included workflow)

This repo includes a GitHub Actions workflow that auto-deploys to GitHub Pages.

**Step 1:** Update `vite.config.js` — change `base` from `"/"` to `"/your-repo-name/"`:

```js
export default defineConfig({
  plugins: [react()],
  base: "/madskillz-ai-readiness/", // <-- match your repo name
});
```

**Step 2:** Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/madskillz-ai-readiness.git
git push -u origin main
```

**Step 3:** Enable GitHub Pages:
- Go to your repo → **Settings** → **Pages**
- Under "Build and deployment" → **Source**: select **GitHub Actions**
- The workflow runs automatically on every push to `main`
- Your site will be live at `https://YOUR_USERNAME.github.io/madskillz-ai-readiness/`

### Option 4 — Manual GitHub Pages with `gh-pages` package

```bash
npm run deploy
```

---

## 📁 Project Structure

```
madskillz-ai-readiness/
├── .github/workflows/deploy.yml   # Auto-deploy to GitHub Pages
├── public/
│   └── favicon.svg                # App icon
├── src/
│   ├── App.jsx                    # Main app — all components, i18n, scoring engine
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind directives + custom scrollbar
├── index.html                     # HTML shell with SEO meta tags
├── package.json
├── vite.config.js                 # Vite config (set base path here for GH Pages)
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

The entire application logic — translations, career database, scoring engine, UI components — lives in `src/App.jsx` for easy maintenance and a single source of truth.

---

## 🧠 How the Exposure Engine Works

The scoring engine evaluates 6 dimensions (0–100) per career:

1. **Repetitive tasks** — How much of the job is rule-based / predictable
2. **Creativity required** — Original thinking, design, problem-solving
3. **Human interaction** — Empathy, persuasion, emotional intelligence
4. **Technical complexity** — Specialized technical knowledge
5. **Physical presence** — On-site / hands-on requirements
6. **AI adoption speed** — How fast the industry is integrating AI

The formula weights repetitive + technical + AI-speed positively (raises exposure) and creativity + human + physical negatively (reduces it). The result maps to 5 risk tiers: Very Low, Moderate, Significant, High, Critical.

For inputs that aren't actually careers (e.g. "father", "human", "myself"), the classifier routes to a dedicated reassurance screen showing **0% replaceability**.

---

## 🎨 Customization

### Add a new career
Edit the `CAREERS` array in `src/App.jsx`:

```js
{
  id: "your-career", name: "Your Career", icon: "🎯",
  repetitive: 50, creativity: 70, human: 60, technical: 65, physical: 30, aiSpeed: 70,
  skills: ["Skill 1", "Skill 2", ...],
  futureRoles: ["Future Role 1", "Future Role 2", ...]
}
```

### Add a new language
Add a new key to `TRANSLATIONS` and a matching entry to the `LANGS` array in `src/App.jsx`.

### Change the color palette
Search for `from-orange-500 to-red-500` and replace with your gradient. The `text-shimmer` class in the global `<style>` tag controls the brand gradient.

### Update coaching contact
Search for `wa.me/237674917169` and `team21online@gmail.com` in `src/App.jsx`.

---

## 📞 Coaching & Contact

- **WhatsApp:** [+237 674 917 169](https://wa.me/237674917169)
- **Email:** [team21online@gmail.com](mailto:team21online@gmail.com)

---

## 📜 License

MIT © Innocent Forteh — Team21 Academy

> *"AI is changing jobs, but those who prepare early will thrive."*
