/* ===================================================================
   FORTE — SOFT EXTRUDED behaviour
   Theme switch (moulded from the surface) + universal action feedback.
   =================================================================== */
(function () {
  "use strict";

  /* ---- theme: remembered per visitor, follows the OS otherwise ---- */
  var KEY = "forte-theme";
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  function current() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function mountSwitch() {
    if (document.querySelector(".fs-theme")) return;
    var sw = document.createElement("button");
    sw.className = "fs-theme";
    sw.type = "button";
    sw.setAttribute("aria-label", "Switch between light and dark surface");
    sw.innerHTML = '<span class="knob" aria-hidden="true"></span>';
    function label() {
      var t = current();
      sw.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
      sw.querySelector(".knob").textContent = t === "dark" ? "◑" : "◐";
    }
    sw.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label();
    });
    document.body.appendChild(sw);
    label();
  }

  /* ---- every action gets a pressed + settled state ---- */
  function wireFeedback() {
    document.addEventListener("click", function (e) {
      var b = e.target.closest("button, .btn, .btn-primary, .btn-ghost");
      if (!b || b.classList.contains("fs-theme") || b.closest(".fs-dial")) return;
      if (b.dataset.fsBusy) return;
      if (!b.getAttribute("href") && b.tagName !== "A" && b.type === "submit") {
        b.dataset.fsBusy = "1";
        b.classList.add("is-loading");
        setTimeout(function () {
          b.classList.remove("is-loading");
          b.classList.add("is-success");
          setTimeout(function () { b.classList.remove("is-success"); delete b.dataset.fsBusy; }, 1600);
        }, 500);
      }
    });
  }


  /* ---- scroll: keep anchored headings clear of the sticky header ----
     The header height changes with viewport and with the collapse below,
     so it is measured rather than assumed. ---- */
  function stickyStack() {
    var h = 0;
    var bars = document.querySelectorAll(
      "#top-fixed-group, .site-switcher-group, .site-nav, .topbar, .tabnav"
    );
    Array.prototype.forEach.call(bars, function (el) {
      var cs = getComputedStyle(el);
      if (cs.position !== "sticky" && cs.position !== "fixed") return;
      var r = el.getBoundingClientRect();
      if (r.top <= 4 && r.height > 0) h = Math.max(h, r.top + r.height);
    });
    return Math.round(h);
  }

  function syncScrollPadding() {
    var h = stickyStack();
    document.documentElement.style.setProperty("--sticky-h", (h + 12) + "px");
  }

  /* On a phone the network strip scrolls away once you are reading, giving
     back roughly a fifth of the screen. It comes straight back at the top. */
  function wireCollapse() {
    var group = document.querySelector(".site-switcher-group, #top-fixed-group");
    var last = 0, ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY || 0;
        if (group) group.classList.toggle("is-scrolled", y > 90);
        document.body.classList.toggle("fs-scrolled", y > 90);
        if (Math.abs(y - last) > 40) { syncScrollPadding(); last = y; }
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncScrollPadding);
    window.addEventListener("orientationchange", function () {
      setTimeout(syncScrollPadding, 250);
    });
    onScroll();
  }

  function init() {
    mountSwitch();
    wireFeedback();
    wireCollapse();
    syncScrollPadding();
    setTimeout(syncScrollPadding, 400);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
