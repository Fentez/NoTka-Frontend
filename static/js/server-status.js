document.addEventListener("DOMContentLoaded", () => {
  const playerCountElem = document.getElementById("player-count");
  const playerListElem = document.getElementById("player-list");
  const onlineDisplay = document.getElementById("online-display");

  function setOffline() {
    if (playerCountElem) playerCountElem.textContent = "Офлайн";
    if (onlineDisplay) {
      onlineDisplay.classList.add("offline");
      const icon = onlineDisplay.querySelector("i");
      if (icon) icon.className = "fa-solid fa-power-off";
    }
    if (playerListElem) {
      playerListElem.innerHTML = '<span class="tooltip-error"><i class="fa-solid fa-circle-exclamation" style="margin-right: 6px;"></i>Сервер офлайн</span>';
    }
  }

  function setOnline(onlineCount, maxCount, playerList) {
    if (playerCountElem) playerCountElem.textContent = `${onlineCount} / ${maxCount}`;
    if (onlineDisplay) {
      onlineDisplay.classList.remove("offline");
      const icon = onlineDisplay.querySelector("i");
      if (icon) icon.className = "fa-solid fa-users";
    }
    if (playerListElem) {
      if (Array.isArray(playerList) && playerList.length > 0) {
        playerListElem.innerHTML = playerList
          .map(
            (p) =>
              `<div class="player-row tooltip-player-link">
                 <img src="https://mc-heads.net/avatar/${encodeURIComponent(p)}/24" class="player-head" alt="${p}">
                 <span class="player-name">${p}</span>
               </div>`
          )
          .join("");
      } else {
        playerListElem.innerHTML = '<span class="tooltip-empty">Гравців зараз немає</span>';
      }
    }
  }

  if (playerCountElem) {
    // Start with offline display
    setOffline();

    async function fetchServerData() {
      if (document.hidden) return;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        const res = await fetch("https://api.mcsrvstat.us/2/mc.notka.pp.ua", {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          setOffline();
          return;
        }

        const data = await res.json();
        if (data && data.online) {
          setOnline(data.players.online || 0, data.players.max || 0, data.players.list || []);
        } else {
          setOffline();
        }
      } catch (err) {
        setOffline();
      }
    }

    fetchServerData();
    setInterval(fetchServerData, 60000);
  }
});
