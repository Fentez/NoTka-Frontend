document.addEventListener("DOMContentLoaded", () => {
  const words = ["Ванільний", "Український", "Креативний", "Затишний"];
  const typingSpan = document.querySelector(".typing-text");

  if (typingSpan) {
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    function type() {
      const currentWord = words[wordIndex];
      const shouldDelete = isDeleting;
      typingSpan.textContent = currentWord.substring(0, shouldDelete ? charIndex - 1 : charIndex + 1);
      charIndex = shouldDelete ? charIndex - 1 : charIndex + 1;
      let typeSpeed = shouldDelete ? 50 : 150;
      if (!shouldDelete && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000;
      } else if (shouldDelete && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }
      setTimeout(type, typeSpeed);
    }
    type();
  }

  const iconContainer = document.getElementById("floating-icons-container");
  if (iconContainer) {
    const icons = [
      "fa-sun", "fa-cloud", "fa-heart", "fa-star", "fa-feather", 
      "fa-bolt", "fa-moon", "fa-snowflake", "fa-fire", "fa-leaf", 
      "fa-ghost", "fa-dragon"
    ];
    for (let i = 0; i < 15; i++) {
      const div = document.createElement("div");
      div.classList.add("icon-container");
      div.innerHTML = `<i class="fa-solid ${icons[Math.floor(Math.random() * icons.length)]}"></i>`;
      const size = Math.random() * 30 + 20;
      const duration = Math.random() * 20 + 25;
      Object.assign(div.style, {
        width: `${size}px`, height: `${size}px`, fontSize: `${size * 0.8}px`,
        left: `${(100 / 15) * i + Math.random() * 5}%`,
        animationDuration: `${duration}s`, animationDelay: `-${Math.random() * duration}s`,
        opacity: Math.random() * 0.3 + 0.1,
      });
      iconContainer.appendChild(div);
    }
  }

  const heroImg = document.getElementById("hero-img");
  if (heroImg) {
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX - window.innerWidth / 2) / 30;
      const y = (e.clientY - window.innerHeight / 2) / 30;
      heroImg.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  document.querySelectorAll(".card").forEach((card) => {
    let cachedRect = null;
    card.addEventListener("mouseenter", () => {
      cachedRect = card.getBoundingClientRect();
    });
    card.addEventListener("mousemove", (e) => {
      if (!cachedRect) cachedRect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - cachedRect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - cachedRect.top}px`);
    });
    card.addEventListener("mouseleave", () => {
      cachedRect = null;
    });
  });

  const mainImage = document.getElementById("gallery-main");
  const thumbs = document.querySelectorAll(".thumb");
  const prevBtn = document.querySelector(".gallery-btn.prev");
  const nextBtn = document.querySelector(".gallery-btn.next");
  let currentIdx = 0;

  if (mainImage && thumbs.length > 0) {
    let autoPlayInterval;

    function updateGallery(idx) {
      thumbs.forEach((t) => t.classList.remove("active"));
      thumbs[idx].classList.add("active");
      mainImage.style.opacity = "0.5";
      setTimeout(() => {
        mainImage.src = thumbs[idx].getAttribute("data-src");
        mainImage.style.opacity = "1";
      }, 150);
      currentIdx = idx;
    }

    function autoAdvance() {
      let newIdx = currentIdx + 1;
      if (newIdx >= thumbs.length) newIdx = 0;
      updateGallery(newIdx);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(autoAdvance, 5000);
    }

    thumbs.forEach((thumb, idx) => {
      thumb.addEventListener("click", () => {
        updateGallery(idx);
        resetAutoPlay();
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        let newIdx = currentIdx - 1;
        if (newIdx < 0) newIdx = thumbs.length - 1;
        updateGallery(newIdx);
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        let newIdx = currentIdx + 1;
        if (newIdx >= thumbs.length) newIdx = 0;
        updateGallery(newIdx);
        resetAutoPlay();
      });
    }

    autoPlayInterval = setInterval(autoAdvance, 5000);
  }

  document.querySelectorAll(".faq-item").forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      document.querySelectorAll(".faq-item").forEach((el) => {
        el.classList.remove("active");
        el.querySelector(".faq-answer").style.maxHeight = null;
      });
      if (!isActive) {
        item.classList.add("active");
        const ans = item.querySelector(".faq-answer");
        ans.style.maxHeight = ans.scrollHeight + "px";
      }
    });
  });
});
