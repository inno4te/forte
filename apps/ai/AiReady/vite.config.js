import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT FOR GITHUB PAGES:
// If deploying to https://USERNAME.github.io/REPO-NAME/, set base to "/REPO-NAME/"
// If deploying to a custom domain or to Vercel/Netlify, leave as "/"
//
// Example: if your repo is "madskillz-ai-readiness", uncomment the line below:
// export default defineConfig({ plugins: [react()], base: "/madskillz-ai-readiness/" });

export default defineConfig({
  plugins: [react()],
  base: "/", // change to "/your-repo-name/" for GitHub Pages
});
