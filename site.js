/* ==========================================================
   QUALIO SITE.JS — shared logic for every page
   (sidebar, language toggle, auth, inspections, AQL engine)
   ========================================================== */

/* -----------------------------
   LOADER + STICKY HEADER
------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  var loader = document.getElementById("loader");
  if (loader) {
    setTimeout(function () {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
      setTimeout(function () { loader.remove(); }, 400);
    }, 400);
  }

  var header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (!header) return;
    header.classList.toggle("sticky", window.scrollY > 40);
  });

  renderAuthState();
  highlightActiveNav();
});

/* -----------------------------
   SIDEBAR TOGGLE
------------------------------ */
function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  if (!sidebar) return;
  sidebar.classList.toggle("open");
}

function highlightActiveNav() {
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#sidebar a").forEach(function (a) {
    if (a.getAttribute("href") === here) a.classList.add("active");
  });
}

/* -----------------------------
   LANGUAGE TOGGLE (data-en / data-ar)
------------------------------ */
var currentLang = localStorage.getItem("qualio_lang") || "en";

function applyLanguage(lang) {
  document.querySelectorAll("[data-en]").forEach(function (el) {
    el.textContent = lang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
  });
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  currentLang = lang;
  localStorage.setItem("qualio_lang", lang);
}

function toggleLanguage() {
  applyLanguage(currentLang === "en" ? "ar" : "en");
}

document.addEventListener("DOMContentLoaded", function () {
  applyLanguage(currentLang);
});

/* -----------------------------
   AUTH (demo-level, client-side only)
   Username: admin   Password: 1234
------------------------------ */
function login(username, password) {
  if (username === "admin" && password === "1234") {
    localStorage.setItem("qualio_user", JSON.stringify({ name: username, role: "manager" }));
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem("qualio_user");
  window.location.href = "login.html";
}

function currentUser() {
  try {
    return JSON.parse(localStorage.getItem("qualio_user"));
  } catch (e) {
    return null;
  }
}

function requireLogin() {
  if (!currentUser()) {
    window.location.href = "login.html";
  }
}

function renderAuthState() {
  var user = currentUser();
  var slot = document.getElementById("authSlot");
  if (!slot) return;
  if (user) {
    slot.innerHTML =
      '<span class="auth-name">👤 ' + user.name + '</span> ' +
      '<button class="ghost-btn" onclick="logout()">خروج</button>';
  } else {
    slot.innerHTML = '<a class="ghost-btn" href="login.html">دخول</a>';
  }
}

/* -----------------------------
   AQL ENGINE — ANSI/ASQ Z1.4, General Level II, Normal Inspection
------------------------------ */
var LOT_RANGES = [
  { min: 2, max: 8, code: "A" }, { min: 9, max: 15, code: "B" },
  { min: 16, max: 25, code: "C" }, { min: 26, max: 50, code: "D" },
  { min: 51, max: 90, code: "E" }, { min: 91, max: 150, code: "F" },
  { min: 151, max: 280, code: "G" }, { min: 281, max: 500, code: "H" },
  { min: 501, max: 1200, code: "J" }, { min: 1201, max: 3200, code: "K" },
  { min: 3201, max: 10000, code: "L" }, { min: 10001, max: 35000, code: "M" },
  { min: 35001, max: 150000, code: "N" }, { min: 150001, max: 500000, code: "P" },
  { min: 500001, max: Infinity, code: "Q" },
];

var SAMPLE_SIZE_BY_CODE = {
  A: 2, B: 3, C: 5, D: 8, E: 13, F: 20, G: 32, H: 50,
  J: 80, K: 125, L: 200, M: 315, N: 500, P: 800, Q: 1250,
};

var AC_RE_TABLE = {
  A: { 1.0: [0, 1], 1.5: [0, 1], 2.5: [0, 1], 4.0: [0, 1] },
  B: { 1.0: [0, 1], 1.5: [0, 1], 2.5: [0, 1], 4.0: [0, 1] },
  C: { 1.0: [0, 1], 1.5: [0, 1], 2.5: [1, 2], 4.0: [1, 2] },
  D: { 1.0: [0, 1], 1.5: [1, 2], 2.5: [1, 2], 4.0: [2, 3] },
  E: { 1.0: [1, 2], 1.5: [1, 2], 2.5: [2, 3], 4.0: [3, 4] },
  F: { 1.0: [1, 2], 1.5: [2, 3], 2.5: [3, 4], 4.0: [5, 6] },
  G: { 1.0: [2, 3], 1.5: [3, 4], 2.5: [5, 6], 4.0: [7, 8] },
  H: { 1.0: [3, 4], 1.5: [5, 6], 2.5: [7, 8], 4.0: [10, 11] },
  J: { 1.0: [5, 6], 1.5: [7, 8], 2.5: [10, 11], 4.0: [14, 15] },
  K: { 1.0: [7, 8], 1.5: [10, 11], 2.5: [14, 15], 4.0: [21, 22] },
  L: { 1.0: [10, 11], 1.5: [14, 15], 2.5: [21, 22], 4.0: [21, 22] },
  M: { 1.0: [14, 15], 1.5: [21, 22], 2.5: [21, 22], 4.0: [21, 22] },
  N: { 1.0: [21, 22], 1.5: [21, 22], 2.5: [21, 22], 4.0: [21, 22] },
  P: { 1.0: [21, 22], 1.5: [21, 22], 2.5: [21, 22], 4.0: [21, 22] },
  Q: { 1.0: [21, 22], 1.5: [21, 22], 2.5: [21, 22], 4.0: [21, 22] },
};

function getSampleCode(lotSize) {
  for (var i = 0; i < LOT_RANGES.length; i++) {
    var r = LOT_RANGES[i];
    if (lotSize >= r.min && lotSize <= r.max) return r.code;
  }
  return null;
}

function calcAQL(lotSize, aqlLevel) {
  var code = getSampleCode(lotSize);
  if (!code) return null;
  var pair = AC_RE_TABLE[code][aqlLevel] || [0, 1];
  return {
    code: code,
    sampleSize: SAMPLE_SIZE_BY_CODE[code],
    accept: pair[0],
    reject: pair[1],
  };
}

/* -----------------------------
   INSPECTIONS (shared storage across dashboard + inspection pages)
------------------------------ */
function getInspections() {
  try {
    return JSON.parse(localStorage.getItem("qualio_inspections")) || [];
  } catch (e) {
    return [];
  }
}

function saveInspection(record) {
  var list = getInspections();
  list.unshift(record);
  localStorage.setItem("qualio_inspections", JSON.stringify(list));
  return list;
}

function deleteInspection(id) {
  var list = getInspections().filter(function (i) { return i.id !== id; });
  localStorage.setItem("qualio_inspections", JSON.stringify(list));
  return list;
}

function computeDashboardStats() {
  var list = getInspections();
  var total = list.length;
  var openDefects = list.reduce(function (sum, i) {
    return sum + (i.found.critical || 0) + (i.found.major || 0) + (i.found.minor || 0);
  }, 0);
  var factories = new Set(list.map(function (i) { return i.factory.trim().toLowerCase(); }).filter(Boolean));
  var passed = list.filter(function (i) { return i.verdict === "pass"; }).length;
  var score = total ? Math.round((passed / total) * 100) : 100;
  return { total: total, openDefects: openDefects, factories: factories.size, score: score, list: list };
}

/* -----------------------------
   MEMBERS
------------------------------ */
function getMembers() {
  try {
    return JSON.parse(localStorage.getItem("qualio_members")) || [];
  } catch (e) {
    return [];
  }
}

function saveMember(member) {
  var list = getMembers();
  list.push(member);
  localStorage.setItem("qualio_members", JSON.stringify(list));
  return list;
}

/* -----------------------------
   SUGGESTIONS
------------------------------ */
function getSuggestions() {
  try {
    return JSON.parse(localStorage.getItem("qualio_suggestions")) || [];
  } catch (e) {
    return [];
  }
}

function saveSuggestion(text) {
  var user = currentUser();
  var list = getSuggestions();
  list.push({ user: user ? user.name : "عضو مجهول", text: text, date: new Date().toISOString() });
  localStorage.setItem("qualio_suggestions", JSON.stringify(list));
  return list;
}
