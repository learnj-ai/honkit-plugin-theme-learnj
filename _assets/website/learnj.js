(function () {
  "use strict";

  var STORAGE_SIDEBAR = "learnj-sidebar-open";
  var STORAGE_THEME = "learnj-theme";

  var ICON_COPY =
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
  var ICON_CHECK =
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

  var LANG_LABELS = {
    bash: "Bash",
    sh: "Shell",
    shell: "Shell",
    zsh: "Zsh",
    javascript: "JavaScript",
    js: "JavaScript",
    typescript: "TypeScript",
    ts: "TypeScript",
    json: "JSON",
    html: "HTML",
    xml: "XML",
    css: "CSS",
    scss: "SCSS",
    python: "Python",
    py: "Python",
    java: "Java",
    kotlin: "Kotlin",
    go: "Go",
    rust: "Rust",
    rs: "Rust",
    sql: "SQL",
    yaml: "YAML",
    yml: "YAML",
    markdown: "Markdown",
    md: "Markdown",
    dockerfile: "Dockerfile",
    docker: "Docker",
    nginx: "Nginx",
    graphql: "GraphQL",
  };

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

  function formatLanguage(lang) {
    if (!lang) return "Code";
    var key = lang.toLowerCase().replace(/^lang-/, "");
    if (LANG_LABELS[key]) return LANG_LABELS[key];
    return key
      .split(/[-_]+/)
      .map(function (part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(" ");
  }

  function getLanguageFromPre(pre) {
    var code = pre.querySelector("code");
    if (!code || !code.className) return "";
    var match = code.className.match(/\blang(?:uage)?-([^\s]+)/i);
    if (match) return match[1];
    var hljsMatch = code.className.match(/\bhljs-([^\s]+)/);
    return hljsMatch ? hljsMatch[1] : "";
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        document.body.removeChild(textarea);
        resolve();
      } catch (err) {
        document.body.removeChild(textarea);
        reject(err);
      }
    });
  }

  function setCopyButtonState(btn, copied) {
    var label = btn.querySelector(".learnj-codeblock-copy-label");
    var icon = btn.querySelector(".learnj-codeblock-copy-icon");
    if (copied) {
      btn.classList.add("is-copied");
      if (icon) icon.innerHTML = ICON_CHECK;
      if (label) label.textContent = "Copied";
      btn.setAttribute("aria-label", "Copied");
    } else {
      btn.classList.remove("is-copied");
      if (icon) icon.innerHTML = ICON_COPY;
      if (label) label.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy code");
    }
  }

  function isMermaidElement(el) {
    if (!el) return false;
    if (el.classList && el.classList.contains("mermaid")) return true;
    if (el.closest && el.closest(".mermaid, .learnj-mermaid")) return true;
    var code = el.querySelector ? el.querySelector("code") : null;
    if (!code || !code.className) return false;
    return /\b(lang-mermaid|language-mermaid|mermaid)\b/i.test(code.className);
  }

  function closeMermaidLightbox() {
    var existing = document.querySelector(".learnj-mermaid-lightbox");
    if (existing) existing.remove();
    document.body.classList.remove("learnj-mermaid-lightbox-open");
  }

  function openMermaidLightbox(diagramEl) {
    closeMermaidLightbox();
    var overlay = document.createElement("div");
    overlay.className = "learnj-mermaid-lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Diagram full size view");

    var inner = document.createElement("div");
    inner.className = "learnj-mermaid-lightbox-inner";

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "learnj-mermaid-lightbox-close learnj-btn-ghost";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.innerHTML = "&times;";

    var clone = diagramEl.cloneNode(true);
    clone.classList.remove("learnj-mermaid-expandable");
    var svg = clone.querySelector("svg");
    if (svg) {
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.style.maxWidth = "none";
      svg.style.width = "auto";
      svg.style.height = "auto";
    }

    closeBtn.addEventListener("click", closeMermaidLightbox);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeMermaidLightbox();
    });

    inner.appendChild(closeBtn);
    inner.appendChild(clone);
    overlay.appendChild(inner);
    document.body.appendChild(overlay);
    document.body.classList.add("learnj-mermaid-lightbox-open");
    closeBtn.focus();
  }

  function enhanceMermaidDiagrams(root) {
    root = root || document;
    var sections = root.querySelectorAll(".markdown-section");
    sections.forEach(function (section) {
      section.querySelectorAll(".mermaid").forEach(function (diagram) {
        if (diagram.closest(".learnj-mermaid")) return;
        if (diagram.closest(".learnj-codeblock")) return;

        var figure = document.createElement("figure");
        figure.className = "learnj-mermaid";
        figure.setAttribute("role", "figure");

        var toolbar = document.createElement("div");
        toolbar.className = "learnj-mermaid-toolbar";

        var expandBtn = document.createElement("button");
        expandBtn.type = "button";
        expandBtn.className = "learnj-mermaid-expand learnj-btn-outline";
        expandBtn.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg><span>View full size</span>';

        var canvas = document.createElement("div");
        canvas.className = "learnj-mermaid-canvas";

        var parent = diagram.parentNode;
        parent.insertBefore(figure, diagram);
        toolbar.appendChild(expandBtn);
        figure.appendChild(toolbar);
        canvas.appendChild(diagram);
        figure.appendChild(canvas);

        diagram.classList.add("learnj-mermaid-expandable");
        expandBtn.addEventListener("click", function () {
          openMermaidLightbox(diagram);
        });
        diagram.addEventListener("click", function (e) {
          if (e.target.closest("a")) return;
          openMermaidLightbox(diagram);
        });
      });
    });
  }

  function observeMermaidDiagrams() {
    document.querySelectorAll(".markdown-section").forEach(function (section) {
      if (section.dataset.learnjMermaidObs) return;
      section.dataset.learnjMermaidObs = "1";
      enhanceMermaidDiagrams(section);
      if (typeof MutationObserver !== "undefined") {
        var obs = new MutationObserver(function () {
          enhanceMermaidDiagrams(section);
        });
        obs.observe(section, { childList: true, subtree: true });
      }
    });
  }

  function enhanceCodeBlocks(root) {
    root = root || document;
    var sections = root.querySelectorAll(".markdown-section");
    sections.forEach(function (section) {
      section.querySelectorAll("pre").forEach(function (pre) {
        if (pre.closest(".learnj-codeblock")) return;
        if (isMermaidElement(pre)) return;

        var code = pre.querySelector("code");
        var lang = getLanguageFromPre(pre);

        var block = document.createElement("div");
        block.className = "learnj-codeblock";

        var header = document.createElement("div");
        header.className = "learnj-codeblock-header";

        var langLabel = document.createElement("span");
        langLabel.className = "learnj-codeblock-label";
        langLabel.textContent = formatLanguage(lang);

        var copyBtn = document.createElement("button");
        copyBtn.type = "button";
        copyBtn.className = "learnj-codeblock-copy";
        copyBtn.setAttribute("aria-label", "Copy code");
        copyBtn.innerHTML =
          '<span class="learnj-codeblock-copy-icon" aria-hidden="true">' +
          ICON_COPY +
          '</span><span class="learnj-codeblock-copy-label">Copy</span>';

        var body = document.createElement("div");
        body.className = "learnj-codeblock-body";

        var parent = pre.parentNode;
        parent.insertBefore(block, pre);
        header.appendChild(langLabel);
        header.appendChild(copyBtn);
        block.appendChild(header);
        body.appendChild(pre);
        block.appendChild(body);

        copyBtn.addEventListener("click", function () {
          var text = code ? code.textContent : pre.textContent;
          copyText(text)
            .then(function () {
              setCopyButtonState(copyBtn, true);
              window.setTimeout(function () {
                setCopyButtonState(copyBtn, false);
              }, 2000);
            })
            .catch(function () {});
        });
      });
    });
  }

  function initContentEnhancements() {
    observeMermaidDiagrams();
    enhanceCodeBlocks(document);
    if (typeof gitbook !== "undefined") {
      gitbook.push(function () {
        gitbook.events.bind("page.change", function () {
          observeMermaidDiagrams();
          enhanceCodeBlocks(document);
        });
      });
    }
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
        if (document.querySelector(".learnj-mermaid-lightbox")) {
          closeMermaidLightbox();
          return;
        }
        setSidebarOpen(false);
      }
    });

    initContentEnhancements();
  });
})();
