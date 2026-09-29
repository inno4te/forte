/* ===================================================================
   FORTE EA — Encyclopedia Africa — app.js
   Vanilla JS, no build step, no frameworks. Reads window.FORTE_DATA
   (populated by data/*.js files loaded before this script).
   =================================================================== */

(function () {
  "use strict";

  var COUNTRIES = (window.FORTE_DATA || []).slice().sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  var REGION_ORDER = ["North Africa", "West Africa", "Central Africa", "East Africa", "Southern Africa"];

  var SECTION_DEFS = [
    { key: "origins",    label: "Deep Antiquity & Origins",              icon: "origins" },
    { key: "biblical",   label: "Biblical & Genealogical Traditions",    icon: "biblical", note: "Presented as received religious and interpretive tradition alongside the society's own indigenous origin accounts — not as a claim of verified history." },
    { key: "ancient",    label: "Ancient & Classical Civilizations",     icon: "ancient" },
    { key: "kingdoms",   label: "Kingdoms & Empires",                    icon: "kingdoms" },
    { key: "religion",   label: "Religion & Spiritual Traditions",       icon: "religion" },
    { key: "colonial",   label: "Colonial Encounter",                    icon: "colonial" },
    { key: "slavery",    label: "Slavery",                               icon: "slavery" },
    { key: "government", label: "Independence & Modern Government",      icon: "government", note: "Political leadership changes often. Reflects available reporting as of mid-2026 — verify current officeholders independently." },
    { key: "culture",    label: "Cultural Flourishing",                  icon: "culture" }
  ];

  var ICON_PATHS = {
    origins:   '<circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><path d="M12 12 C 8 12, 8 7, 12 7 C 17 7, 17 3, 12 3"/><path d="M12 12 C 16 12, 16 17, 12 17 C 7 17, 7 21, 12 21"/>',
    biblical:  '<path d="M4 5 C 4 4, 5 4, 6 4.4 C 7.5 5, 8.5 5, 10 4.4 L 10 18.6 C 8.5 18, 7.5 18, 6 18.6 C 5 19, 4 19, 4 18 Z"/><path d="M20 5 C 20 4, 19 4, 18 4.4 C 16.5 5, 15.5 5, 14 4.4 L 14 18.6 C 15.5 18, 16.5 18, 18 18.6 C 19 19, 20 19, 20 18 Z"/>',
    ancient:   '<path d="M4 20 L20 20"/><path d="M5 20 L5 8 M9 20 L9 8 M15 20 L15 8 M19 20 L19 8"/><path d="M3 8 L12 3 L21 8 Z"/>',
    kingdoms:  '<path d="M4 18 L20 18 L18.5 9 L14.5 13 L12 6 L9.5 13 L5.5 9 Z"/><circle cx="12" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="8.5" r="1" fill="currentColor" stroke="none"/><circle cx="19.5" cy="8.5" r="1" fill="currentColor" stroke="none"/>',
    religion:  '<circle cx="12" cy="12" r="2"/><path d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12 M4.9 4.9 L7.6 7.6 M16.4 16.4 L19.1 19.1 M19.1 4.9 L16.4 7.6 M7.6 16.4 L4.9 19.1"/>',
    colonial:  '<path d="M12 3 L12 14"/><path d="M6 8 L18 8"/><path d="M6 8 C 6 11.5, 9 13, 9 13 C 9 13, 12 11.5, 12 8" /><path d="M12 8 C 12 11.5, 15 13, 15 13 C 15 13, 18 11.5, 18 8"/><path d="M9 18 C 9 18, 12 20, 15 18"/><path d="M12 14 L12 17"/>',
    slavery:   '<circle cx="8" cy="8" r="4" fill="none"/><circle cx="16" cy="16" r="4" fill="none"/><path d="M10.8 10.8 L13.2 13.2" stroke-dasharray="2 2"/>',
    government:'<path d="M4 20 L20 20"/><path d="M5 20 L5 11 M19 20 L19 11 M9 20 L9 11 M15 20 L15 11"/><path d="M3 11 L12 5 L21 11 Z"/><path d="M12 5 L12 3"/>',
    culture:   '<path d="M8 21 C 6.5 21, 6 19.5, 6 17 C 6 12, 6.5 9, 8 6 C 9 4, 10.5 3, 12 3 C 13.5 3, 15 4, 16 6 C 17.5 9, 18 12, 18 17 C 18 19.5, 17.5 21, 16 21 Z"/><path d="M6.5 13 L17.5 13"/>',
    search:    '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M19 19 L15.2 15.2"/>'
  };

  function icon(name, extraClass) {
    var body = ICON_PATHS[name] || "";
    return '<svg class="' + (extraClass || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' + body + "</svg>";
  }

  /* ---------------------------------------------------------------
     Search index
     --------------------------------------------------------------- */
  var SEARCH_INDEX = [];
  COUNTRIES.forEach(function (c) {
    SEARCH_INDEX.push({ country: c, section: null, label: null, text: c.name + " " + c.region });
    SECTION_DEFS.forEach(function (sd) {
      var arr = c.sections[sd.key] || [];
      arr.forEach(function (bullet) {
        SEARCH_INDEX.push({ country: c, section: sd.key, label: sd.label, text: bullet });
      });
    });
  });

  function runSearch(q) {
    q = q.trim().toLowerCase();
    if (q.length < 2) return [];
    var terms = q.split(/\s+/);
    var scored = [];
    SEARCH_INDEX.forEach(function (item) {
      var hay = (item.country.name + " " + (item.label || "") + " " + item.text).toLowerCase();
      var ok = terms.every(function (t) { return hay.indexOf(t) !== -1; });
      if (ok) {
        var score = item.section === null ? 10 : 0;
        if (item.country.name.toLowerCase().indexOf(q) === 0) score += 20;
        scored.push({ item: item, score: score });
      }
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, 8).map(function (s) { return s.item; });
  }

  /* ---------------------------------------------------------------
     Routing
     --------------------------------------------------------------- */
  function parseHash() {
    var h = window.location.hash.replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    if (parts.length === 0) return { view: "home" };
    if (parts[0] === "region" && parts[1]) return { view: "region", region: decodeURIComponent(parts[1]) };
    if (parts[0] === "country" && parts[1]) return { view: "country", id: parts[1], section: parts[2] || null };
    return { view: "home" };
  }

  function go(hash) {
    window.location.hash = hash;
  }

  window.addEventListener("hashchange", render);
  document.addEventListener("DOMContentLoaded", function () {
    buildShell();
    render();
  });

  /* ---------------------------------------------------------------
     Shell (topbar) — built once
     --------------------------------------------------------------- */
  function buildShell() {
    var root = document.getElementById("app");
    var topbar = document.createElement("div");
    topbar.className = "topbar";
    topbar.innerHTML =
      '<div class="topbar-inner">' +
        '<a class="brand" onclick="event.preventDefault(); location.hash=\'\';"><span class="brand-mark">Forte <em>EA</em></span><span class="brand-sub">Encyclopedia Africa</span></a>' +
        '<div class="search-box">' +
          icon("search", "search-icon") +
          '<input id="searchInput" type="text" placeholder="Search 55 countries — kingdoms, leaders, traditions…" autocomplete="off" />' +
          '<div class="search-results" id="searchResults"></div>' +
        "</div>" +
      "</div>";
    root.parentNode.insertBefore(topbar, root);

    var input = topbar.querySelector("#searchInput");
    var resultsBox = topbar.querySelector("#searchResults");

    input.addEventListener("input", function () {
      var results = runSearch(input.value);
      if (results.length === 0) { resultsBox.classList.remove("open"); resultsBox.innerHTML = ""; return; }
      resultsBox.innerHTML = results.map(function (r) {
        var snip = r.text.length > 110 ? r.text.slice(0, 110) + "…" : r.text;
        return '<div class="search-result-item" data-id="' + r.country.id + '" data-section="' + (r.section || "") + '">' +
          '<span class="sr-country">' + r.country.name + "</span>" +
          (r.label ? '<span class="sr-section">' + r.label + "</span>" : "") +
          '<span class="sr-snip">' + snip + "</span>" +
        "</div>";
      }).join("");
      resultsBox.classList.add("open");
    });

    resultsBox.addEventListener("click", function (e) {
      var item = e.target.closest(".search-result-item");
      if (!item) return;
      var id = item.getAttribute("data-id");
      var section = item.getAttribute("data-section");
      resultsBox.classList.remove("open");
      input.value = "";
      go("/country/" + id + (section ? "/" + section : ""));
    });

    document.addEventListener("click", function (e) {
      if (!topbar.contains(e.target)) resultsBox.classList.remove("open");
    });
  }

  /* ---------------------------------------------------------------
     Render dispatcher
     --------------------------------------------------------------- */
  function render() {
    var route = parseHash();
    var root = document.getElementById("app");
    window.scrollTo(0, 0);
    if (route.view === "country") {
      var c = COUNTRIES.filter(function (x) { return x.id === route.id; })[0];
      if (!c) { renderHome(root); return; }
      renderCountry(root, c, route.section);
    } else if (route.view === "region") {
      renderHome(root, route.region);
    } else {
      renderHome(root, null);
    }
  }

  /* ---------------------------------------------------------------
     Home / region grid view
     --------------------------------------------------------------- */
  function renderHome(root, activeRegion) {
    window.onscroll = null;
    var byRegion = {};
    COUNTRIES.forEach(function (c) {
      byRegion[c.region] = byRegion[c.region] || [];
      byRegion[c.region].push(c);
    });

    var shown = activeRegion ? COUNTRIES.filter(function (c) { return c.region === activeRegion; }) : COUNTRIES;

    var html = "";

    html += '<section class="hero">' +
      '<div class="hero-eyebrow">A Living Reference, Built From The Continent Outward</div>' +
      "<h1>Africa's history,<br>told <em>whole</em>.</h1>" +
      '<p class="hero-lede">Forte EA is a country-by-country encyclopedia spanning deep antiquity to the present — kingdoms and empires, faiths and revolutions, colonial ruptures and independence, slavery and cultural flourishing. Built to center African voices and sources, while keeping every account honest about what is tradition, what is contested, and what is documented.</p>' +
      '<div class="hero-stats">' +
        '<div class="hero-stat"><div class="n">55</div><div class="l">Nations &amp; Territories</div></div>' +
        '<div class="hero-stat"><div class="n">9</div><div class="l">Lenses Per Entry</div></div>' +
        '<div class="hero-stat"><div class="n">5</div><div class="l">Regions</div></div>' +
      "</div>" +
    "</section>";

    html += '<div class="region-rail"><div class="region-rail-inner">';
    html += '<button class="region-tab' + (!activeRegion ? " active" : "") + '" data-region="">All Regions <span class="count">' + COUNTRIES.length + "</span></button>";
    REGION_ORDER.forEach(function (r) {
      var n = (byRegion[r] || []).length;
      html += '<button class="region-tab' + (activeRegion === r ? " active" : "") + '" data-region="' + r + '">' + r + ' <span class="count">' + n + "</span></button>";
    });
    html += "</div></div>";

    html += '<section class="grid-section">';
    if (!activeRegion) {
      html += '<div class="skip-note">Every entry below has been researched in depth across all nine lenses — named kingdoms, specific colonial officers and incidents, documented slave routes and ports, restitution disputes, and named cultural traditions, not surface-level summaries. The Government &amp; Independence lens moves fastest (coups, elections, transitions) and reflects reporting as of mid-2026 — verify current officeholders independently. This remains a living reference: corrections and further depth are always welcome.</div>';
    }
    html += '<div class="section-label">' + (activeRegion || "All Countries") + " — " + shown.length + " Entries</div>";
    html += '<div class="country-grid">';
    shown.forEach(function (c) {
      html += '<div class="country-card" data-id="' + c.id + '">' +
        '<div class="country-region-tag">' + c.region + "</div>" +
        '<div class="country-name">' + c.name + "</div>" +
        '<div class="country-meta">' + (c.capital ? "Capital: " + c.capital : "") + "</div>" +
      "</div>";
    });
    html += "</div></section>";

    html += footerHtml();

    root.innerHTML = html;

    root.querySelectorAll(".region-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var r = btn.getAttribute("data-region");
        go(r ? "/region/" + encodeURIComponent(r) : "/");
      });
    });
    root.querySelectorAll(".country-card").forEach(function (card) {
      card.addEventListener("click", function () {
        go("/country/" + card.getAttribute("data-id"));
      });
    });
  }

  /* ---------------------------------------------------------------
     Country detail view
     --------------------------------------------------------------- */
  function renderCountry(root, c, focusSection) {
    var html = "";

    html += '<div class="detail-header">' +
      '<div class="breadcrumb" id="backBtn">&larr; All Countries · ' + c.region + "</div>" +
      "<h1>" + c.name + "</h1>" +
      '<div class="detail-meta">' +
        (c.capital ? '<div><strong>Capital</strong>' + c.capital + "</div>" : "") +
        (c.independence ? '<div><strong>Independence</strong>' + c.independence + "</div>" : "") +
        '<div><strong>Region</strong>' + c.region + "</div>" +
      "</div>" +
    "</div>";

    html += '<div class="detail-body">';

    html += '<nav class="toc">';
    SECTION_DEFS.forEach(function (sd) {
      var has = (c.sections[sd.key] || []).length > 0;
      if (!has) return;
      html += '<div class="toc-item" data-target="sec-' + sd.key + '">' + icon(sd.icon) + "<span>" + sd.label + "</span></div>";
    });
    if (c.sections.sources && c.sections.sources.length) {
      html += '<div class="toc-item" data-target="sec-sources">' + icon("ancient") + "<span>Sources</span></div>";
    }
    html += "</nav>";

    html += '<div class="sections">';
    SECTION_DEFS.forEach(function (sd) {
      var arr = c.sections[sd.key] || [];
      if (arr.length === 0) return;
      html += '<div class="section-block' + (sd.key === "biblical" ? " biblical-block" : "") + '" id="sec-' + sd.key + '">';
      html += "<h2>" + icon(sd.icon) + sd.label + "</h2>";
      if (sd.note) html += '<p class="section-note">' + sd.note + "</p>";
      html += '<ul class="bullets">';
      arr.forEach(function (b) { html += "<li>" + b + "</li>"; });
      html += "</ul></div>";
    });

    if (c.sections.sources && c.sections.sources.length) {
      html += '<div class="section-block" id="sec-sources">';
      html += "<h2>" + icon("ancient") + "Sources &amp; Further Reading</h2>";
      html += '<div class="sources-box"><strong>Starting points for deeper research:</strong><br>' + c.sections.sources.join(" &middot; ") + "</div>";
      html += "</div>";
    }

    html += "</div></div>";
    html += footerHtml();

    root.innerHTML = html;

    document.getElementById("backBtn").addEventListener("click", function () {
      go(c.region ? "/region/" + encodeURIComponent(c.region) : "/");
    });

    root.querySelectorAll(".toc-item").forEach(function (item) {
      item.addEventListener("click", function () {
        var target = document.getElementById(item.getAttribute("data-target"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    if (focusSection) {
      var t = document.getElementById("sec-" + focusSection);
      if (t) setTimeout(function () { t.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
    }

    // Scrollspy: highlight active TOC item
    var blocks = Array.prototype.slice.call(root.querySelectorAll(".section-block"));
    var tocItems = root.querySelectorAll(".toc-item");
    window.onscroll = function () {
      var pos = window.scrollY + 120;
      var current = null;
      blocks.forEach(function (b) { if (b.offsetTop <= pos) current = b.id; });
      tocItems.forEach(function (item) {
        item.classList.toggle("active", item.getAttribute("data-target") === current);
      });
    };
  }

  function footerHtml() {
    return '<footer class="site-footer"><div class="wrap">' +
      '<div>Forte EA — Encyclopedia Africa. A living reference; corrections and deeper sourcing welcome.</div>' +
      '<div>Built with IF Consulting</div>' +
    "</div></footer>";
  }
})();
