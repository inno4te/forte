/* ============================================================
   inno4te Networking Academy — auth.js
   Client-side authentication + per-student progress tracking
   Users: ndezo1–ndezo100 / pango1–pango100
   Admin: forteh / f0rteh
   ============================================================ */
(function () {
  "use strict";

  /* ── credential store ── */
  var CREDS = {};
  for (var i = 1; i <= 100; i++) { CREDS["ndezo" + i] = "pango" + i; }
  CREDS["forteh"] = "f0rteh";

  var ADMIN_USER = "forteh";
  var SESSION_KEY = "i4n_session";
  var DATA_PREFIX = "i4n_u_";

  /* ── path helpers ── */
  function inSubdir() {
    return window.location.pathname.indexOf("/labs/") !== -1;
  }
  function loginPath() { return inSubdir() ? "../login.html" : "login.html"; }
  function rootPath(p) { return inSubdir() ? "../" + p : p; }

  /* ── session ── */
  function getSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch (e) { return null; }
  }
  function setSession(username) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username: username, ts: Date.now() }));
  }
  function clearSession() { sessionStorage.removeItem(SESSION_KEY); }
  function currentUser() { var s = getSession(); return s ? s.username : null; }
  function isAdmin() { return currentUser() === ADMIN_USER; }

  /* ── user progress data ── */
  function loadData(username) {
    try {
      var raw = localStorage.getItem(DATA_PREFIX + username);
      return raw ? JSON.parse(raw) : defaultData(username);
    } catch (e) { return defaultData(username); }
  }
  function saveData(username, data) {
    try { localStorage.setItem(DATA_PREFIX + username, JSON.stringify(data)); } catch (e) {}
  }
  function defaultData(username) {
    return { username: username, loginCount: 0, firstLogin: null, lastLogin: null, exams: [], labs: {}, cliSessions: 0 };
  }
  function getAllProgress() {
    var all = [];
    for (var i = 1; i <= 100; i++) {
      var u = "ndezo" + i;
      var raw = localStorage.getItem(DATA_PREFIX + u);
      if (raw) { try { all.push(JSON.parse(raw)); } catch (e) {} }
    }
    return all;
  }

  /* ── login / logout ── */
  function login(username, password) {
    username = (username || "").trim().toLowerCase();
    password = (password || "").trim();
    if (!CREDS[username] || CREDS[username] !== password) return false;
    setSession(username);
    // record login
    var data = loadData(username);
    data.loginCount++;
    if (!data.firstLogin) data.firstLogin = Date.now();
    data.lastLogin = Date.now();
    saveData(username, data);
    return true;
  }
  function logout() {
    clearSession();
    window.location.href = loginPath();
  }

  /* ── guard (redirect if not logged in) ── */
  function guard() {
    if (!currentUser()) {
      window.location.replace(loginPath());
      return false;
    }
    return true;
  }

  /* ── track exam completion ── */
  function trackExam(payload) {
    // payload: {track, trackName, pct, correct, total, passed, mode, domains}
    var user = currentUser();
    if (!user || user === ADMIN_USER) return;
    var data = loadData(user);
    data.exams = data.exams || [];
    data.exams.push({
      track: payload.track, trackName: payload.trackName,
      pct: payload.pct, correct: payload.correct, total: payload.total,
      passed: payload.passed, mode: payload.mode || "practice",
      domains: payload.domains || {}, date: Date.now()
    });
    if (data.exams.length > 200) data.exams = data.exams.slice(-200);
    saveData(user, data);
  }

  /* ── track lab visits ── */
  function trackLab(labId) {
    var user = currentUser();
    if (!user || user === ADMIN_USER) return;
    var data = loadData(user);
    data.labs = data.labs || {};
    data.labs[labId] = (data.labs[labId] || 0) + 1;
    saveData(user, data);
  }
  function trackCLI() {
    var user = currentUser();
    if (!user || user === ADMIN_USER) return;
    var data = loadData(user);
    data.cliSessions = (data.cliSessions || 0) + 1;
    saveData(user, data);
  }

  /* ── inject user bar into every page ── */
  function injectUserBar() {
    var user = currentUser();
    if (!user) return;
    var bar = document.createElement("div");
    bar.id = "userBar";
    bar.style.cssText = "background:#0D1F52;border-bottom:1px solid #1a3a7a;padding:6px 0;";
    var admin = user === ADMIN_USER;
    bar.innerHTML = '<div style="max-width:1220px;margin:auto;padding:0 24px;display:flex;align-items:center;gap:14px;font-size:.82rem;font-weight:600;">'
      + '<span style="color:rgba(255,255,255,.6)">👤 <span style="color:#58a6ff">' + (admin ? "🔑 Admin: " : "") + user + '</span></span>'
      + (admin
        ? '<a href="' + rootPath("admin-progress.html") + '" style="color:#7dd3fc;text-decoration:none;padding:4px 10px;background:rgba(255,255,255,.08);border-radius:6px;">📊 Student progress</a>'
        : '<a href="' + rootPath("my-progress.html") + '" style="color:#7dd3fc;text-decoration:none;padding:4px 10px;background:rgba(255,255,255,.08);border-radius:6px;">📊 My progress</a>')
      + '<button onclick="Auth.logout()" style="margin-left:auto;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#ccc;padding:4px 12px;border-radius:6px;cursor:pointer;font-size:.8rem;font-weight:700;">🚪 Logout</button>'
      + '</div>';
    var header = document.querySelector(".site-header");
    if (header) { header.parentNode.insertBefore(bar, header.nextSibling); }
    else { document.body.insertBefore(bar, document.body.firstChild); }
  }

  /* ── auto-track page/lab visits ── */
  function autoTrack() {
    var path = window.location.pathname;
    if (path.includes("simulator")) trackLab("simulator");
    else if (path.includes("cli")) { trackLab("cli"); trackCLI(); }
    else if (path.includes("subnetting")) trackLab("subnetting");
    else if (path.includes("guided-labs")) trackLab("guided-labs");
    else if (path.includes("exams")) trackLab("exams");
  }

  /* ── expose API ── */
  window.Auth = {
    login: login, logout: logout, guard: guard,
    currentUser: currentUser, isAdmin: isAdmin,
    trackExam: trackExam, trackLab: trackLab, trackCLI: trackCLI,
    loadData: loadData, saveData: saveData, getAllProgress: getAllProgress,
    exportJSON: function () {
      var user = currentUser();
      if (!user) return;
      var data = isAdmin() ? getAllProgress() : loadData(user);
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
      a.download = (isAdmin() ? "all-students" : user) + "-progress.json";
      a.click();
    }
  };

  /* ── init: guard + inject + track ── */
  document.addEventListener("DOMContentLoaded", function () {
    var path = window.location.pathname;
    var isLoginPage = path.includes("login.html");
    var isProgressPage = path.includes("my-progress.html") || path.includes("admin-progress.html");
    if (!isLoginPage) {
      if (!guard()) return;
      // Admin accessing student pages: allow but don't track
      injectUserBar();
      autoTrack();
      // If admin lands on index.html, redirect to progress
      if (isAdmin() && (path.endsWith("/") || path.includes("index.html"))) {
        window.location.replace(rootPath("admin-progress.html"));
        return;
      }
    }
  });
})();
