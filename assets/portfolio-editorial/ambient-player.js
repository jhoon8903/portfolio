(() => {
  if (window.__portfolioAmbientPlayer) return;
  window.__portfolioAmbientPlayer = true;
  const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const prefersPause = () => motion?.matches || navigator.connection?.saveData;
  const prepare = (video, button, onEnded) => {
    if (video.dataset.ambientReady) return;
    video.dataset.ambientReady = 'true';
    let manualPause = false; let manualPlay = false;
    const buttonState = (paused) => { if (button) { button.textContent = paused ? '영상 재생' : '영상 일시정지'; button.setAttribute('aria-pressed', String(paused)); } };
    const pause = () => { video.pause(); buttonState(true); };
    const play = (force = false) => { if (video.isConnected && !manualPause && (!prefersPause() || force || manualPlay) && !document.hidden) video.play().then(() => buttonState(false)).catch(() => buttonState(true)); };
    if (prefersPause()) pause(); else play();
    button?.addEventListener('click', () => { if (video.paused) { manualPause = false; manualPlay = true; play(true); } else { manualPause = true; manualPlay = false; pause(); } });
    video.addEventListener('ended', () => onEnded ? onEnded(play) : play());
    document.addEventListener('visibilitychange', () => document.hidden ? pause() : play());
    motion?.addEventListener('change', () => prefersPause() && !manualPlay ? pause() : play());
  };
  const home = () => document.querySelectorAll('[data-ambient-player]').forEach((video) => {
    if (video.dataset.ambientReady) return;
    const page = video.closest('.page-ambient-surface'); const label = page?.querySelector('[data-ambient-label]'); const button = page?.querySelector('[data-ambient-toggle]'); const container = page?.querySelector('[data-ambient-container]');
    const list = [
      { src: video.dataset.ambientNeonSrc, poster: video.poster, label: 'BACKGROUND GAMEPLAY · NEON REFLECTOR' },
      { src: video.dataset.ambientBounceSrc, label: 'BACKGROUND GAMEPLAY · BOUNCE FIT (후속)' },
      { src: video.dataset.ambientCapsuleCombatSrc, poster: video.dataset.ambientCapsuleCombatPoster, label: 'BACKGROUND GAMEPLAY · 고양이 캡슐 디펜스 · 전투' },
      { src: video.dataset.ambientCapsuleUpgradeSrc, poster: video.dataset.ambientCapsuleUpgradePoster, label: 'BACKGROUND GAMEPLAY · 고양이 캡슐 디펜스 · 강화' },
    ].filter((item) => item.src); let index = 0;
    video.setAttribute('aria-label', list[0]?.label || '게임 플레이 영상 배경');
    prepare(video, button, (play) => { index = (index + 1) % list.length; const next = list[index]; video.src = next.src; if (next.poster) video.poster = next.poster; else video.removeAttribute('poster'); video.load(); video.setAttribute('aria-label', next.label); container?.setAttribute('aria-label', `${next.label} 실제 플레이 영상 배경`); if (label) label.textContent = next.label; play(); });
  });
  const project = () => document.querySelectorAll('[data-project-ambient]').forEach((backdrop) => {
    const host = backdrop.closest('.page-ambient-surface');
    const video = backdrop.querySelector('video');
    const control = host?.querySelector('[data-project-ambient-control]');
    if (video) prepare(video, control);
  });
  const initialize = () => { home(); project(); };
  let pending = false; const schedule = () => { if (!pending) { pending = true; queueMicrotask(() => { pending = false; initialize(); }); } };
  const observe = () => new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  const start = () => { initialize(); observe(); };
  if (document.readyState === 'complete') start(); else addEventListener('load', start, { once: true });
  addEventListener('pageshow', schedule);
})();
