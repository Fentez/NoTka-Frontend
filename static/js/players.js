document.addEventListener("DOMContentLoaded", () => {
  const playersList = document.getElementById("players-list");
  const searchInput = document.getElementById("player-search");
  const countTotal = document.getElementById("total-players-count");
  const countSponsors = document.getElementById("total-sponsors-count");
  const lastUpdatedEl = document.getElementById("last-updated");

  const filterDefault = document.getElementById("filter-default");
  const filterOwner = document.getElementById("filter-owner");
  const filterSponsor = document.getElementById("filter-sponsor");
  const filterOnline = document.getElementById("filter-online");

  const customSelect = document.getElementById("sort-select");
  const selectTrigger = customSelect ? customSelect.querySelector(".select-trigger") : null;
  const selectValueSpan = customSelect ? customSelect.querySelector(".select-value") : null;
  const selectOptions = customSelect ? customSelect.querySelectorAll(".select-option") : [];
  const currentSortInput = document.getElementById("current-sort-value");

  // Custom Select Dropdown logic
  if (customSelect && selectTrigger) {
    selectTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      customSelect.classList.toggle("open");
    });

    selectOptions.forEach((option) => {
      option.addEventListener("click", () => {
        selectOptions.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");
        if (selectValueSpan) selectValueSpan.textContent = option.textContent;
        if (currentSortInput) currentSortInput.value = option.dataset.value;
        customSelect.classList.remove("open");
        renderOfflineNotice();
      });
    });

    document.addEventListener("click", (e) => {
      if (!customSelect.contains(e.target)) {
        customSelect.classList.remove("open");
      }
    });
  }

  function renderOfflineNotice() {
    if (countTotal) countTotal.textContent = "0";
    if (countSponsors) countSponsors.textContent = "0";
    if (lastUpdatedEl) lastUpdatedEl.textContent = "Сервер офлайн";

    if (playersList) {
      playersList.innerHTML = `
        <div class="offline-state-card" style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60px 20px; background: var(--card-bg); border: var(--glass-border); border-radius: 20px; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: var(--shadow); margin: 20px 0;">
          <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(239, 68, 68, 0.15); display: flex; align-items: center; justify-content: center; color: #ef4444; font-size: 2rem; margin-bottom: 20px;">
            <i class="fa-solid fa-server"></i>
          </div>
          <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 10px; color: var(--text-color);">Сервер офлайн</h3>
          <p style="color: var(--text-muted); max-width: 480px; font-size: 1rem; line-height: 1.6; margin-bottom: 25px;">
            Дані гравців наразі недоступні, оскільки ігровий сервер вимкнено або тривають технічні роботи.
          </p>
          <a href="https://discord.gg/y4vEfn7qS9" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">
            <i class="fa-brands fa-discord"></i> Дізнатися статус у Discord
          </a>
        </div>
      `;
    }
  }

  if (searchInput) searchInput.addEventListener("input", renderOfflineNotice);
  if (filterDefault) filterDefault.addEventListener("change", renderOfflineNotice);
  if (filterOwner) filterOwner.addEventListener("change", renderOfflineNotice);
  if (filterSponsor) filterSponsor.addEventListener("change", renderOfflineNotice);
  if (filterOnline) filterOnline.addEventListener("change", renderOfflineNotice);

  renderOfflineNotice();
});