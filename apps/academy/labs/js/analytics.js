/* ============================================================
   Innov8te Labs4Africa — Analytics (analytics.js)
   ------------------------------------------------------------
   Lightweight, no-cookie, privacy-aware usage tracking that
   works on a fully STATIC site (GitHub Pages, no backend).

   WHAT IT DOES
   - Counts page views and lab opens
   - Tracks which lab/tool is most popular
   - Records first-seen country/city (one cheap geo lookup, cached)
   - Stores everything in this browser's localStorage

   IMPORTANT LIMITATION (please read the README):
   localStorage is PER-DEVICE. The admin page shows data collected
   on THE ADMIN'S OWN browser plus any device that opts to sync.
   For TRUE global, cross-visitor stats on a static site, enable a
   free privacy-friendly counter (GoatCounter) — see README + the
   commented block at the bottom of this file. Both can run together.
   ============================================================ */
(function (w) {
  "use strict";
  var KEY = "i8l_analytics_v1";
  var GEO_KEY = "i8l_geo_v1";
  var VID_KEY = "i8l_vid_v1";

  function now() { return Date.now(); }
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || base(); }
    catch (e) { return base(); }
  }
  function base() {
    return { events: [], firstSeen: now(), visits: 0 };
  }
  function save(d) {
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
  }
  function visitorId() {
    var v = localStorage.getItem(VID_KEY);
    if (!v) {
      v = "v_" + Math.random().toString(36).slice(2, 10) + now().toString(36);
      try { localStorage.setItem(VID_KEY, v); } catch (e) {}
    }
    return v;
  }

  /* One-time, cached, best-effort geolocation by IP (no key required).
     Fails silently and never blocks the page. */
  function ensureGeo() {
    try {
      var cached = JSON.parse(localStorage.getItem(GEO_KEY));
      if (cached && cached.country) return Promise.resolve(cached);
    } catch (e) {}
    if (!w.fetch) return Promise.resolve(null);
    return fetch("https://ipapi.co/json/")
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) return null;
        var g = {
          country: j.country_name || "Unknown",
          countryCode: j.country_code || "",
          city: j.city || "",
          region: j.region || ""
        };
        try { localStorage.setItem(GEO_KEY, JSON.stringify(g)); } catch (e) {}
        return g;
      })
      .catch(function () { return null; });
  }

  var Analytics = {
    /* Record an event. type = 'page' | 'lab' | 'video' | 'resource' | 'action' */
    track: function (type, name, extra) {
      var d = load();
      var ev = {
        t: type, n: name || "", ts: now(),
        vid: visitorId(),
        ref: (document.referrer || "").slice(0, 120),
        ua: navigator.userAgent.slice(0, 120)
      };
      if (extra) ev.x = extra;
      d.events.push(ev);
      if (d.events.length > 4000) d.events = d.events.slice(-4000); /* cap storage */
      if (type === "page") d.visits++;
      save(d);
      // attach geo asynchronously to the most recent event
      ensureGeo().then(function (g) {
        if (!g) return;
        var dd = load();
        for (var i = dd.events.length - 1; i >= 0; i--) {
          if (dd.events[i].ts === ev.ts) { dd.events[i].geo = g; break; }
        }
        save(dd);
      });
      // OPTIONAL: forward to GoatCounter if configured (see bottom)
      if (w.goatcounter && w.goatcounter.count) {
        try { w.goatcounter.count({ path: (type + "/" + name), title: name, event: type !== "page" }); } catch (e) {}
      }
    },
    pageview: function (label) { this.track("page", label || document.title); },
    all: function () { return load(); },
    reset: function () { save(base()); try { localStorage.removeItem(GEO_KEY); } catch (e) {} },
    visitorId: visitorId
  };

  w.Analytics = Analytics;

  /* Auto page view: a page can set window.PAGE_LABEL before loading this. */
  if (document.readyState !== "loading") Analytics.pageview(w.PAGE_LABEL);
  else document.addEventListener("DOMContentLoaded", function () { Analytics.pageview(w.PAGE_LABEL); });

  /* ----------------------------------------------------------
     OPTIONAL — REAL GLOBAL ANALYTICS (recommended for launch)
     GoatCounter is free, ~3.5KB, privacy-friendly, no cookies,
     gives you country-level location + top pages across ALL
     visitors. Great for low-bandwidth regions.
     1) Make a free account at https://www.goatcounter.com
     2) Put this <script> in every page's <head>, replacing CODE:
        <script data-goatcounter="https://CODE.goatcounter.com/count"
                async src="//gc.zgo.at/count.js"></script>
     The hook above will then mirror lab opens as events too.
     ---------------------------------------------------------- */
})(window);
