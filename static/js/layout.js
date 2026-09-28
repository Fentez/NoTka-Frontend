document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navbar = document.getElementById("navbar");
  const backToTopBtn = document.getElementById("back-to-top");

  if (mobileMenuBtn && mobileMenu) {
    const menuIcon = mobileMenuBtn.querySelector("i");

    const toggleMenu = (isOpen) => {
      const willOpen = typeof isOpen === "boolean" ? isOpen : !mobileMenu.classList.contains("active");
      if (willOpen === mobileMenu.classList.contains("active")) return;

      mobileMenu.classList.toggle("active", willOpen);
      document.body.style.overflow = willOpen ? "hidden" : "";

      menuIcon.style.transform = "rotate(90deg) scale(0.5)";
      menuIcon.style.opacity = "0";

      setTimeout(() => {
        if (willOpen) {
          menuIcon.classList.replace("fa-bars", "fa-xmark");
        } else {
          menuIcon.classList.replace("fa-xmark", "fa-bars");
        }
        menuIcon.style.transform = "rotate(0deg) scale(1)";
        menuIcon.style.opacity = "1";
      }, 150);
    };

    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    document.addEventListener("click", (e) => {
      const isLink = e.target.classList.contains("mobile-link");
      const isOutside = !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target);

      if (isLink || isOutside) {
        toggleMenu(false);
      }
    });
  }

  if (navbar && backToTopBtn) {
    let lastScrollY = window.scrollY;
    let scrollTicking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTicking) {
          requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
              navbar.classList.toggle("hidden", currentScrollY > lastScrollY);
            } else {
              navbar.classList.remove("hidden");
            }

            backToTopBtn.classList.toggle("visible", currentScrollY > 300);
            lastScrollY = currentScrollY;
            scrollTicking = false;
          });
          scrollTicking = true;
        }
      },
      { passive: true },
    );

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const toastMsg = urlParams.get('toast');
  const errorMsg = urlParams.get('error');

  if (toastMsg) {
    if (toastMsg === 'profile_saved') showToast('success', 'Зміни успішно збережено!');
    if (toastMsg === 'login_success') showToast('success', 'Успішний вхід!');
    
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({path: newUrl}, '', newUrl);
  }

  if (errorMsg) {
    if (errorMsg === 'invalid_youtube') showToast('error', 'Неправильне посилання на YouTube канал!');
    if (errorMsg === 'invalid_twitch') showToast('error', 'Неправильне посилання на Twitch!');
    if (errorMsg === 'invalid_telegram') showToast('error', 'Неправильне посилання на Telegram!');
    if (errorMsg === 'not_registered') showToast('error', 'Ви не зареєстровані на сервері!');
    
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({path: newUrl}, '', newUrl);
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest('.open-filter-info')) {
      e.preventDefault();
      const modal = document.getElementById('global-filter-info-modal');
      if (modal) modal.style.display = 'flex';
    }
    if (e.target.closest('.close-filter-info')) {
      e.preventDefault();
      const modal = document.getElementById('global-filter-info-modal');
      if (modal) modal.style.display = 'none';
    }
    if (e.target.id === 'global-filter-info-modal') {
      e.target.style.display = 'none';
    }
  });
});

window.applyTextFilter = function(inputId) {
  const inputEl = document.getElementById(inputId);
  if (inputEl) {
    const allowedRegex = /[^a-zA-Zа-щА-ЩьЬюЮяЯіІїЇєЄґҐ0-9\s.,!?:;()[\]{}"'\+\-=_@#$%^&*\/\\|<>~’₴№€£¥\p{Emoji}]/gu;
    
    inputEl.addEventListener("beforeinput", function(e) {
      if (e.inputType === "insertText" && e.data && e.data.match(allowedRegex)) {
        e.preventDefault();
      }
    });

    inputEl.addEventListener("input", function() {
      if (this.value.match(allowedRegex)) {
        this.value = this.value.replace(allowedRegex, '');
      }
    });
  }
};

function showToast(type, message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icon = document.createElement('i');
  if (type === 'success') {
    icon.className = 'fa-solid fa-check-circle';
    icon.style.color = '#22c55e';
    toast.style.borderLeftColor = '#22c55e';
  } else {
    icon.className = 'fa-solid fa-circle-exclamation';
    icon.style.color = '#ef4444';
    toast.style.borderLeftColor = '#ef4444';
  }

  const text = document.createElement('span');
  text.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(text);
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 5000);
}

(function() {
  var banner = [
    '',
    '  %c-=%c  01001110 01010100  00100000  01010011 01001001 01010100 01000101  %c=-',
    '',
    '  %c\u2588\u2588\u2588\u2557   \u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557    \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557',
    '  \u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551\u255a\u2550\u2550\u2588\u2588\u2554\u2550\u2550\u255d    \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d\u2588\u2588\u2551\u255a\u2550\u2550\u2588\u2588\u2554\u2550\u2550\u255d\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d',
    '  \u2588\u2588\u2554\u2588\u2588\u2557 \u2588\u2588\u2551   \u2588\u2588\u2551       \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2588\u2588\u2588\u2557  ',
    '  \u2588\u2588\u2551\u255a\u2588\u2588\u2557\u2588\u2588\u2551   \u2588\u2588\u2551       \u255a\u2550\u2550\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2554\u2550\u2550\u255d  ',
    '  \u2588\u2588\u2551 \u255a\u2588\u2588\u2588\u2588\u2551   \u2588\u2588\u2551       \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557',
    '  \u255a\u2550\u255d  \u255a\u2550\u2550\u2550\u255d   \u255a\u2550\u255d       \u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d\u255a\u2550\u255d   \u255a\u2550\u255d   \u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d',
    '',
    '  %c-=%c  01001110 01010100  00100000  01010011 01001001 01010100 01000101  %c=-',
    '',
  ].join('\n');

  var warning = [
    '%c\u26a0\ufe0f  \u0423\u0432\u0430\u0433\u0430!',
    '%c\u0412\u0438 \u0437\u043d\u0430\u0445\u043e\u0434\u0438\u0442\u0435\u0441\u044c \u0443 \u0440\u0435\u0436\u0438\u043c\u0456 \u0440\u043e\u0437\u0440\u043e\u0431\u043d\u0438\u043a\u0430.',
    '\u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430, \u043d\u0435 \u0432\u0441\u0442\u0430\u0432\u043b\u044f\u0439\u0442\u0435 \u0441\u044e\u0434\u0438 \u043a\u043e\u0434,',
    '\u044f\u043a\u0449\u043e \u0432\u0438 \u043d\u0435 \u0440\u043e\u0437\u0443\u043c\u0456\u0454\u0442\u0435, \u0449\u043e \u0440\u043e\u0431\u0438\u0442\u0435.',
    '',
    '\u0412\u0438\u043a\u043e\u043d\u0430\u043d\u043d\u044f \u0441\u0442\u043e\u0440\u043e\u043d\u043d\u044c\u043e\u0433\u043e \u043a\u043e\u0434\u0443 \u0442\u0443\u0442 \u043c\u043e\u0436\u0435',
    '\u043f\u0440\u0438\u0437\u0432\u0435\u0441\u0442\u0438 \u0434\u043e \u043a\u043e\u043c\u043f\u0440\u043e\u043c\u0435\u0442\u0430\u0446\u0456\u0457 \u0432\u0430\u0448\u0438\u0445 \u0434\u0430\u043d\u0438\u0445',
    '\u0442\u0430 \u0431\u0435\u0437\u043f\u0435\u043a\u0438 \u0432\u0430\u0448\u043e\u0433\u043e \u0430\u043a\u0430\u0443\u043d\u0442\u0443.',
  ].join('\n');

  var binStyle = 'color: #a855f7; font-size: 11px; font-family: monospace;';
  var dashStyle = 'color: #6b21a8; font-size: 11px; font-family: monospace;';
  var artStyle = 'color: #c084fc; font-size: 14px; font-weight: bold; font-family: monospace; text-shadow: 0 0 10px rgba(168,85,247,0.5);';
  var titleStyle = 'color: #ef4444; font-size: 16px; font-weight: bold; font-family: system-ui;';
  var textStyle = 'color: #94a3b8; font-size: 13px; font-family: system-ui; line-height: 1.6;';

  console.log(
    banner,
    dashStyle, binStyle, dashStyle,
    artStyle,
    dashStyle, binStyle, dashStyle
  );
  console.log(warning, titleStyle, textStyle);
  console.log('%cNoTka \u00a9 ' + new Date().getFullYear() + ' | mc.notka.pp.ua', 'color: #6b7280; font-size: 11px; font-family: system-ui;');
})();
