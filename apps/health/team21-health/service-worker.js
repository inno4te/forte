/* ============================================================
   Team21 Health Platform — Service Worker
   Cache-first strategy: app shell + content cached on install,
   served instantly on subsequent visits even offline.
   © Innocent Forteh · Team21 Health Platform
============================================================ */

const CACHE_VERSION = 'team21-v1.0.0';
const APP_SHELL = [
  './',
  './index.html',
  './carcinogens.html',
  './additives.html',
  './lifestyle.html',
  './african-diet.html',
  './natural-remedies.html',
  './medicines.html',
  './proposals.html',
  './tracker.html',
  './quizzes.html',
  './notes.html',
  './community.html',
  './evidence.html',
  './encouragement.html',
  './heart.html',
  './sleep.html',
  './brain.html',
  './gut.html',
  './kidneys.html',
  './skin.html',
  './eyes.html',
  './women.html',
  './men.html',
  './shared.css',
  './shared.js',
  './data.js',
  './data-ext.js',
  './components.js',
  './system-page.js',
  './lang.js',
  './lang-data.js',
  './manifest.webmanifest',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-192.png',
  './icons/icon-256.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png'
];

/* INSTALL — cache the entire app shell */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      // Cache files one by one; don't fail the whole install if one optional asset is missing
      return Promise.all(
        APP_SHELL.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Skip caching', url, err.message))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

/* ACTIVATE — clean up old cache versions */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* FETCH — cache-first for same-origin, network-first for the rest */
self.addEventListener('fetch', event => {
  const req = event.request;
  // Only handle GETs
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts: cache-first with separate cache
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open('team21-fonts').then(cache =>
        cache.match(req).then(hit => hit || fetch(req).then(res => {
          cache.put(req, res.clone());
          return res;
        }).catch(() => hit))
      )
    );
    return;
  }

  // Same-origin: cache-first, fallback to network, fallback to offline index
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(res => {
          // Cache successful navigations and assets opportunistically
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then(c => c.put(req, copy));
          }
          return res;
        }).catch(() => {
          // Offline + not cached: serve index for navigation, else nothing
          if (req.mode === 'navigate') return caches.match('./index.html');
        });
      })
    );
    return;
  }

  // Cross-origin: network with cache fallback
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});

/* MESSAGE — allow page to trigger updates */
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
