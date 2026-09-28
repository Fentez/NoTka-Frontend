document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");

  if (themeBtn) {
    const themeIcon = themeBtn.querySelector("i");

    function applyTheme(isDark) {
      if (isDark) {
        html.setAttribute("data-theme", "dark");
        themeIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "dark");
      } else {
        html.removeAttribute("data-theme");
        themeIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "light");
      }
    }

    if (html.getAttribute("data-theme") === "dark") {
      themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    themeBtn.addEventListener("click", () => {
      themeIcon.style.transform = "rotate(180deg) scale(0.5)";
      themeIcon.style.opacity = "0";

      setTimeout(() => {
        const isCurrentDark = html.getAttribute("data-theme") === "dark";
        applyTheme(!isCurrentDark);
        themeIcon.style.transform = "rotate(0deg) scale(1)";
        themeIcon.style.opacity = "1";
      }, 150);
    });
  }
});
