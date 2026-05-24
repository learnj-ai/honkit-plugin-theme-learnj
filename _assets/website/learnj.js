(function () {
  "use strict";

  var STORAGE_SIDEBAR = "learnj-sidebar-open";
  var STORAGE_THEME = "learnj-theme";

  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  function getSidebarOpen() {
    try {
      var stored = localStorage.getItem(STORAGE_SIDEBAR);
      if (stored !== null) return stored === "true";
    } catch (e) {}
    return window.matchMedia("(min-width: 1024px)").matches;
  }

  function setSidebarOpen(open) {
    var sidebar = document.getElementById("learnj-sidebar");
    var backdrop = document.getElementById("learnj-sidebar-backdrop");
    if (!sidebar) return;

    if (open) {
      sidebar.classList.remove("-translate-x-full");
      sidebar.classList.add("translate-x-0");
      if (backdrop) {
        backdrop.classList.remove("hidden");
        backdrop.setAttribute("aria-hidden", "false");
      }
    } else {
      sidebar.classList.add("-translate-x-full");
      sidebar.classList.remove("translate-x-0");
      if (backdrop) {
        backdrop.classList.add("hidden");
        backdrop.setAttribute("aria-hidden", "true");
      }
    }

    try {
      localStorage.setItem(STORAGE_SIDEBAR, String(open));
    } catch (e) {}
  }

  function toggleSidebar() {
    var sidebar = document.getElementById("learnj-sidebar");
    if (!sidebar) return;
    var isOpen = !sidebar.classList.contains("-translate-x-full");
    setSidebarOpen(!isOpen);
  }

  function setTheme(dark) {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem(STORAGE_THEME, dark ? "dark" : "light");
    } catch (e) {}
  }

  function toggleTheme() {
    setTheme(!document.documentElement.classList.contains("dark"));
  }

  ready(function () {
    var app = document.getElementById("learnj-app");
    if (app) {
      app.classList.add("learnj-ready");
      app.classList.remove("learnj-cloak");
    }

    var isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(getSidebarOpen() && !window.matchMedia("(max-width: 1023px)").matches);
      setSidebarOpen(false);
    }

    var toggleBtn = document.getElementById("learnj-sidebar-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", toggleSidebar);
    }

    var backdrop = document.getElementById("learnj-sidebar-backdrop");
    if (backdrop) {
      backdrop.addEventListener("click", function () {
        setSidebarOpen(false);
      });
    }

    var themeBtn = document.getElementById("learnj-theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", toggleTheme);
    }

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setSidebarOpen(true);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
    });
  });
})();
