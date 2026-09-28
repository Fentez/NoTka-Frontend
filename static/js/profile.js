document.addEventListener('DOMContentLoaded', async () => {
  const hash = window.location.hash.substring(1);
  const searchParams = new URLSearchParams(window.location.search);
  const rawNick = searchParams.get('user') || searchParams.get('player') || window.PLAYER_USERNAME || (hash ? decodeURIComponent(hash) : 'Steve');

  document.title = `NoTka | ${rawNick}`;

  setText('bread-nick', rawNick);
  setText('player-nick', rawNick);
  setText('error-nick', rawNick);

  const breadHead = document.getElementById('bread-head');
  if (breadHead) {
    breadHead.src = `https://mc-heads.net/avatar/${encodeURIComponent(rawNick)}/22`;
    breadHead.style.display = 'block';
  }

  const dlBtn = document.getElementById('dl-btn');
  if (dlBtn) dlBtn.href = `https://mc-heads.net/download/${encodeURIComponent(rawNick)}`;

  if (typeof initSkinViewer === 'function') {
    initSkinViewer(rawNick);
  }

  // Remove skeleton loaders
  removeSkeleton('player-nick');
  removeSkeleton('bread-nick');
  const sw = document.querySelector('.skin-wrapper');
  if (sw) sw.classList.remove('skeleton');

  // Set offline/default states
  setText('val-join-date', 'Невідомо');
  setText('val-play-time', 'Сервер офлайн');
  setText('sub-play-days', 'Немає даних');
  setText('val-status', 'Офлайн');
  setText('sub-status', 'Сервер офлайн');

  setText('val-sessions', '0');
  setText('val-killed-by', '0');
  setText('val-deaths', '0');
  setText('val-mob-kills', '0');
  setText('val-aviate', '0 км');
  setText('val-sprint', '0 км');
  setText('val-walk', '0 км');
  setText('val-swim', '0 км');

  [
    'val-join-date', 'val-play-time', 'sub-play-days', 'val-status', 'sub-status',
    'val-sessions', 'val-killed-by', 'val-deaths', 'val-mob-kills',
    'val-aviate', 'val-sprint', 'val-walk', 'val-swim'
  ].forEach(removeSkeleton);

  const sponsorBox = document.getElementById('sponsor-big-box');
  if (sponsorBox) {
    sponsorBox.classList.remove('skeleton');
    sponsorBox.className = 'sponsor-big-card not-sponsor';
    sponsorBox.innerHTML = `
      <div class="sp-icon"><i class="fa-regular fa-star"></i></div>
      <div class="sp-title">Спонсорство</div>
      <div class="sp-text" style="font-size: 0.9rem; color: var(--text-muted);">Дані недоступні</div>
      <a href="https://wiki.notka.pp.ua/info/donate" target="_blank" rel="noopener noreferrer" class="gift-link">Підтримати проєкт</a>
    `;
  }
});

function removeSkeleton(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('skeleton', 'skeleton-text');
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}