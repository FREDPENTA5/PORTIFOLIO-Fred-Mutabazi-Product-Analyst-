/**
 * Product Analyst Portfolio — interactivity and charts
 * Chart.js for visualizations; expand/collapse; form; Prism for SQL
 */

(function () {
  "use strict";

  // --- Year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Mobile nav toggle
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !open);
      navLinks.classList.toggle("is-open", !open);
    });
  }

  // --- Project card expand/collapse
  var toggles = document.querySelectorAll(".project-toggle");
  toggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-project");
      var body = document.querySelector('.project-card-body[data-project-body="' + id + '"]');
      if (!body) return;
      var isOpen = body.classList.contains("is-open");
      body.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", !isOpen);
    });
  });

  // --- Contact form: prevent default, open mailto (or you can hook to a backend)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (document.getElementById("name") || {}).value || "";
      var email = (document.getElementById("email") || {}).value || "";
      var message = (document.getElementById("message") || {}).value || "";
      var subject = encodeURIComponent("Portfolio contact from " + name);
      var body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message
      );
      window.location.href = "mailto:your.email@example.com?subject=" + subject + "&body=" + body;
    });
  }

  // --- Resume button: in HTML, set href to your PDF URL (e.g. /resume.pdf or external link)

  // --- Chart.js default config
  var chartColors = {
    blue: "rgb(37, 99, 235)",
    blueLight: "rgba(37, 99, 235, 0.7)",
    navy: "rgb(26, 39, 68)",
    gray: "rgb(107, 114, 128)",
    green: "rgb(34, 197, 94)",
    amber: "rgb(245, 158, 11)",
    teal: "rgb(20, 184, 166)",
    purple: "rgb(139, 92, 246)",
  };

  var defaultOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(0,0,0,0.06)" } },
    },
  };

  // --- Chart 1: Job postings by sector (bar)
  var sectorCtx = document.getElementById("chart-sector");
  if (sectorCtx) {
    new Chart(sectorCtx, {
      type: "bar",
      data: {
        labels: [
          "Software Development",
          "Sales & Marketing",
          "Finance",
          "Customer Service",
          "Healthcare",
          "Education",
        ],
        datasets: [
          {
            label: "Job postings (000s)",
            data: [4.2, 3.3, 2.7, 1.8, 1.6, 1.4],
            backgroundColor: chartColors.blueLight,
            borderColor: chartColors.blue,
            borderWidth: 1,
          },
        ],
      },
      options: {
        ...defaultOptions,
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
            grid: { display: true, color: "rgba(0,0,0,0.06)" },
          },
          y: { grid: { display: false } },
        },
      },
    });
  }

  // --- Chart 2: Geographic distribution (doughnut)
  var geoCtx = document.getElementById("chart-geo");
  if (geoCtx) {
    new Chart(geoCtx, {
      type: "doughnut",
      data: {
        labels: ["Kenya", "Uganda", "Tanzania", "Rwanda"],
        datasets: [
          {
            data: [45, 25, 22, 8],
            backgroundColor: [
              chartColors.blue,
              chartColors.teal,
              chartColors.amber,
              chartColors.gray,
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  }

  // --- Chart 3: Funnel (horizontal bar – stages as categories)
  var funnelCtx = document.getElementById("chart-funnel");
  if (funnelCtx) {
    new Chart(funnelCtx, {
      type: "bar",
      data: {
        labels: ["Landing", "Job search", "Job view", "Application", "Completion"],
        datasets: [
          {
            label: "Users",
            data: [10000, 7200, 5800, 3400, 2800],
            backgroundColor: [
              chartColors.navy,
              chartColors.blue,
              chartColors.blueLight,
              "rgba(37, 99, 235, 0.5)",
              "rgba(37, 99, 235, 0.35)",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        ...defaultOptions,
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: "rgba(0,0,0,0.06)" },
          },
          y: { grid: { display: false } },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              afterLabel: function (ctx) {
                var val = ctx.raw;
                var pct = ctx.dataIndex === 0 ? 100 : ((val / 10000) * 100).toFixed(1);
                return "(" + pct + "% of landing)";
              },
            },
          },
        },
      },
    });
  }

  // --- Chart 4: A/B test (grouped bar)
  var abCtx = document.getElementById("chart-ab");
  if (abCtx) {
    new Chart(abCtx, {
      type: "bar",
      data: {
        labels: ["Control (no salary)", "Treatment (salary shown)"],
        datasets: [
          {
            label: "Application rate (%)",
            data: [12.0, 17.2],
            backgroundColor: [chartColors.gray, chartColors.green],
            borderWidth: 0,
          },
        ],
      },
      options: {
        ...defaultOptions,
        scales: {
          y: {
            beginAtZero: true,
            max: 25,
            ticks: { callback: function (v) { return v + "%"; } },
          },
        },
      },
    });
  }

  // --- Prism: highlight all SQL blocks on load
  if (typeof Prism !== "undefined") {
    Prism.highlightAll();
  }
})();
