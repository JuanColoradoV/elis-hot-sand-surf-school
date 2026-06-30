/* ============================================================
   Eli's Hot Sand Surf School — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- header scroll state ---- */
  var header = document.getElementById("header");
  var onScroll = function () {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- mobile menu ---- */
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");
  var closeMenu = function () {
    nav.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  };
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* ---- language toggle (EN / ES) ---- */
  var STORE = "ehs-lang";
  var langToggle = document.getElementById("langToggle");

  function applyLang(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-en]").forEach(function (el) {
      var val = el.getAttribute("data-" + lang);
      if (val != null) el.innerHTML = val;
    });
    document.querySelectorAll("[data-en-ph]").forEach(function (el) {
      var ph = el.getAttribute("data-" + lang + "-ph");
      if (ph != null) el.setAttribute("placeholder", ph);
    });

    langToggle.querySelectorAll(".lang-opt").forEach(function (opt) {
      opt.classList.toggle("active", opt.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem(STORE, lang); } catch (e) {}
  }

  var saved = "en";
  try { saved = localStorage.getItem(STORE) || "en"; } catch (e) {}
  applyLang(saved);

  langToggle.addEventListener("click", function () {
    var next = document.documentElement.lang === "en" ? "es" : "en";
    applyLang(next);
  });

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- land on the right section when arriving with a #hash (cold load) ---- */
  if (window.location.hash.length > 1) {
    var target = document.querySelector(window.location.hash);
    if (target) {
      window.addEventListener("load", function () {
        requestAnimationFrame(function () { target.scrollIntoView(); });
      });
    }
  }

  /* ---- footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    var y = new Date().getFullYear();
    if (!isNaN(y)) yearEl.textContent = y;
  }

  /* ---- back-to-top button ---- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    var toggleTop = function () { toTop.classList.toggle("show", window.scrollY >= 700); };
    toggleTop();
    window.addEventListener("scroll", toggleTop, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---- booking: lazy-load Cal.com inline embed when scrolled near ---- */
  var calEl = document.getElementById("cal-embed");
  if (calEl) {
    var calLink = calEl.getAttribute("data-cal-link") || "";
    var connected = calLink && calLink.indexOf("YOUR-CAL-USERNAME") === -1;

    var loadCal = function (link) {
      (function (C, A, L) {
        var p = function (a, ar) { a.q.push(ar); };
        var d = C.document;
        C.Cal = C.Cal || function () {
          var cal = C.Cal, ar = arguments;
          if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
          if (ar[0] === L) {
            var api = function () { p(api, arguments); };
            var ns = ar[1]; api.q = api.q || [];
            if (typeof ns === "string") { cal.ns[ns] = cal.ns[ns] || api; p(cal.ns[ns], ar); p(cal, ["initNamespace", ns]); }
            else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
      window.Cal("init", { origin: "https://cal.com" });
      window.Cal("inline", { elementOrSelector: "#cal-embed", calLink: link, layout: "month_view" });
    };

    var showCalFallback = function () {
      var es = document.documentElement.lang === "es";
      calEl.innerHTML =
        '<div class="cal-placeholder">' +
        '<span class="cal-ph-icon" aria-hidden="true"></span>' +
        '<p>' + (es
          ? "La reserva en línea se está activando. Por ahora, reserva al instante por WhatsApp y te confirmamos el horario."
          : "Online booking is being switched on. For now, book instantly on WhatsApp and we'll confirm your time.") +
        '</p>' +
        '<a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/50688007880?text=Hi%20Eli!%20I\'d%20like%20to%20book%20a%20surf%20lesson.">' +
        (es ? "Reservar por WhatsApp" : "Book on WhatsApp") + '</a>' +
        '</div>';
    };

    var calStarted = false;
    var startCal = function () {
      if (calStarted) return;
      calStarted = true;
      if (connected) loadCal(calLink); else showCalFallback();
    };

    if ("IntersectionObserver" in window) {
      var calIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { calIO.disconnect(); startCal(); } });
      }, { rootMargin: "300px" });
      calIO.observe(calEl);
    } else {
      startCal();
    }
  }

  /* ---- contact form: validation + AJAX submit with full state set ---- */
  var form = document.getElementById("bookForm");
  if (form) {
    var submitBtn = document.getElementById("bookSubmit");
    var labelEl = submitBtn.querySelector(".btn-label");
    var alertEl = document.getElementById("formAlert");
    var successEl = document.getElementById("formSuccess");

    var MSG = {
      en: {
        required: "Please fill this in.",
        email: "Please enter a valid email address.",
        sending: "Sending…",
        send: "Send inquiry",
        error: "Something went wrong sending your message. Please try again, or reach us on WhatsApp."
      },
      es: {
        required: "Completa este campo.",
        email: "Ingresa un correo electrónico válido.",
        sending: "Enviando…",
        send: "Enviar consulta",
        error: "Algo salió mal al enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp."
      }
    };
    var curLang = function () { return document.documentElement.lang === "es" ? "es" : "en"; };

    var fields = {
      name: {
        input: form.querySelector("#name"),
        err: document.getElementById("name-error"),
        check: function (v) { return v.trim() ? "" : "required"; }
      },
      email: {
        input: form.querySelector("#email"),
        err: document.getElementById("email-error"),
        check: function (v) {
          if (!v.trim()) return "required";
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "email";
        }
      }
    };

    function showError(f, code) {
      f.input.closest(".field").classList.add("invalid");
      f.input.setAttribute("aria-invalid", "true");
      f.err.dataset.en = MSG.en[code];
      f.err.dataset.es = MSG.es[code];
      f.err.textContent = MSG[curLang()][code];
      f.err.hidden = false;
    }
    function clearError(f) {
      f.input.closest(".field").classList.remove("invalid");
      f.input.removeAttribute("aria-invalid");
      f.err.hidden = true;
      f.err.textContent = "";
      delete f.err.dataset.en;
      delete f.err.dataset.es;
    }
    function validate(key) {
      var f = fields[key];
      var code = f.check(f.input.value);
      if (code) { showError(f, code); return false; }
      clearError(f);
      return true;
    }

    Object.keys(fields).forEach(function (k) {
      fields[k].input.addEventListener("blur", function () { validate(k); });
      fields[k].input.addEventListener("input", function () {
        if (fields[k].input.closest(".field").classList.contains("invalid")) validate(k);
      });
    });

    function setLoading(on) {
      if (on) {
        submitBtn.classList.add("is-loading");
        submitBtn.setAttribute("aria-disabled", "true");
        labelEl.textContent = MSG[curLang()].sending;
        form.setAttribute("aria-busy", "true");
      } else {
        submitBtn.classList.remove("is-loading");
        submitBtn.removeAttribute("aria-disabled");
        labelEl.textContent = MSG[curLang()].send;
        form.removeAttribute("aria-busy");
      }
    }
    function showAlert() {
      alertEl.dataset.en = MSG.en.error;
      alertEl.dataset.es = MSG.es.error;
      alertEl.textContent = MSG[curLang()].error;
      alertEl.hidden = false;
      alertEl.setAttribute("tabindex", "-1");
      alertEl.focus();
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alertEl.hidden = true;

      var ok = true, firstInvalid = null;
      Object.keys(fields).forEach(function (k) {
        if (!validate(k)) { ok = false; if (!firstInvalid) firstInvalid = fields[k].input; }
      });
      if (!ok) { if (firstInvalid) firstInvalid.focus(); return; }

      setLoading(true);
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (r) { return r.json().catch(function () { return { success: false }; }); })
        .then(function (json) {
          if (json && json.success) {
            form.classList.add("is-sent");
            successEl.hidden = false;
            successEl.focus();
          } else {
            setLoading(false);
            showAlert();
          }
        })
        .catch(function () { setLoading(false); showAlert(); });
    });
  }
})();
