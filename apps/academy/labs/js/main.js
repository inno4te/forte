/* ============================================================
   Innov8te Labs4Africa — UI helpers (main.js)
   ============================================================ */
(function () {
  "use strict";

  /* --- Mobile nav toggle --- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* --- Footer year --- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --- Lazy YouTube (click-to-load facade) ---
     Saves big bandwidth: nothing from YouTube loads until clicked. */
  document.querySelectorAll(".yt[data-yt]").forEach(function (box) {
    var id = box.getAttribute("data-yt");
    var thumb = box.querySelector("img");
    if (thumb && !thumb.src) {
      // mqdefault is small (~13KB) — friendly to slow networks
      thumb.src = "https://i.ytimg.com/vi/" + id + "/mqdefault.jpg";
      thumb.loading = "lazy";
      thumb.alt = box.getAttribute("data-title") || "Video thumbnail";
    }
    box.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      f.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      f.allowFullscreen = true;
      f.title = box.getAttribute("data-title") || "Video";
      box.innerHTML = "";
      box.appendChild(f);
      if (window.Analytics) window.Analytics.track("video", id);
    });
  });

  /* --- Catalog filtering on home page --- */
  var chips = document.querySelectorAll("[data-filter]");
  var cards = document.querySelectorAll("[data-cat]");
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var f = chip.getAttribute("data-filter");
        cards.forEach(function (card) {
          var show = f === "all" || card.getAttribute("data-cat").indexOf(f) > -1;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* --- Track resource link clicks --- */
  document.querySelectorAll("[data-res]").forEach(function (a) {
    a.addEventListener("click", function () {
      if (window.Analytics) window.Analytics.track("resource", a.getAttribute("data-res"));
    });
  });
})();

/* ============================================================
   LabDnD — shared drag & drop for labs.
   Works with BOTH mouse and touch (Pointer Events) and ALSO
   supports tap-to-select + tap-slot-to-place as a fallback,
   which is the most reliable interaction on phones.
   ------------------------------------------------------------
   LabDnD.init({
     container:  element that holds draggables and zones,
     dragSel:    CSS selector for draggable items,
     dropSel:    CSS selector for drop zones,
     onDrop:     function(dragEl, dropEl) -> return true if accepted
   });
   ============================================================ */
window.LabDnD = (function () {
  function init(opts) {
    var container = opts.container;
    if (!container) return;
    var dragEl = null, clone = null, selected = null;
    var startX = 0, startY = 0, dragging = false, lastZone = null;

    function clearSel() {
      if (selected) selected.classList.remove("dragging");
      selected = null;
    }
    function zoneFrom(x, y) {
      if (clone) clone.style.display = "none";
      var t = document.elementFromPoint(x, y);
      if (clone) clone.style.display = "";
      return t ? t.closest(opts.dropSel) : null;
    }

    container.addEventListener("pointerdown", function (e) {
      var d = e.target.closest(opts.dragSel);
      if (!d || d.classList.contains("placed")) return;
      dragEl = d; startX = e.clientX; startY = e.clientY; dragging = false;
      try { d.setPointerCapture(e.pointerId); } catch (er) {}
    });

    container.addEventListener("pointermove", function (e) {
      if (!dragEl) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      if (!dragging && Math.sqrt(dx * dx + dy * dy) < 7) return;
      if (!dragging) {
        dragging = true;
        dragEl.classList.add("dragging");
        clone = dragEl.cloneNode(true);
        clone.classList.remove("dragging");
        clone.style.position = "fixed";
        clone.style.pointerEvents = "none";
        clone.style.zIndex = "9999";
        clone.style.opacity = ".95";
        clone.style.width = dragEl.offsetWidth + "px";
        clone.style.boxShadow = "0 14px 30px -10px rgba(0,0,0,.4)";
        document.body.appendChild(clone);
      }
      clone.style.left = (e.clientX - dragEl.offsetWidth / 2) + "px";
      clone.style.top = (e.clientY - 22) + "px";
      var z = zoneFrom(e.clientX, e.clientY);
      if (z !== lastZone) {
        if (lastZone) lastZone.classList.remove("over");
        if (z) z.classList.add("over");
        lastZone = z;
      }
    });

    container.addEventListener("pointerup", function (e) {
      if (!dragEl) return;
      if (dragging) {
        var z = zoneFrom(e.clientX, e.clientY);
        if (z) { z.classList.remove("over"); opts.onDrop(dragEl, z); }
        if (lastZone) lastZone.classList.remove("over");
        lastZone = null;
        if (clone) { clone.remove(); clone = null; }
        dragEl.classList.remove("dragging");
      } else {
        /* tap = select / deselect */
        if (selected === dragEl) { clearSel(); }
        else { clearSel(); selected = dragEl; selected.classList.add("dragging"); }
      }
      dragEl = null; dragging = false;
    });

    container.addEventListener("pointercancel", function () {
      if (clone) { clone.remove(); clone = null; }
      if (dragEl) dragEl.classList.remove("dragging");
      if (lastZone) lastZone.classList.remove("over");
      dragEl = null; dragging = false; lastZone = null;
    });

    /* tap a zone to place the currently selected item */
    container.addEventListener("click", function (e) {
      var z = e.target.closest(opts.dropSel);
      if (z && selected) { opts.onDrop(selected, z); clearSel(); }
    });

    return { deselect: clearSel };
  }
  return { init: init };
})();
