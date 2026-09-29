module.exports = {
  content: ["../index.html", "./src/**/*.{css,html,js}"],
  theme: {
    extend: {
      colors: {
        'mad-yellow': '#FACC15',
        'mad-blue': '#1E40AF',
        'mad-black': '#0A0A0A',
        'mad-cream': '#FFFDF7'
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        sans: ['Archivo', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace']
      }
    }
  },
  safelist: [
    'bg-mad-yellow','bg-mad-blue','bg-mad-black','bg-mad-cream',
    'text-mad-yellow','text-mad-blue','text-mad-black','text-mad-cream',
    'border-mad-yellow','border-mad-blue','border-mad-black','border-mad-cream',
    'shadow-brutal','shadow-brutal-yellow','shadow-brutal-blue',
    'story-fallback','stripe-bg','grain',
    'animate-fade-in','animate-fade-up','animate-marquee','animate-float','animate-pulse-dot','animate-bounce-in',
    'mobile-menu-enter','tab','pill','btn-primary','btn-outline','field','nav-link','stat-num','progress-bar','progress-fill'
  ]
};
