(() => {
  if (window.portfolioEvidenceDialog) return;
  window.portfolioEvidenceDialog = true;
  let dialog;
  let request;
  const createDialog = () => {
    dialog = document.createElement('dialog');
    dialog.className = 'portfolio-evidence-dialog';
    dialog.setAttribute('aria-labelledby', 'portfolio-evidence-title');
    dialog.innerHTML = '<header><div><span>원본 자료</span><h2 id="portfolio-evidence-title"></h2></div><button type="button" aria-label="원본 자료 닫기">닫기 ×</button></header><p class="evidence-status" role="status"></p><pre tabindex="0"><code></code></pre><footer><a target="_blank" rel="noopener">원본 파일 열기 ↗</a><a download>다운로드 ↓</a></footer>';
    document.body.append(dialog);
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => request?.abort());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    return dialog;
  };
  document.addEventListener('click', async event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || link.closest('dialog') || link.hasAttribute('download') || link.hasAttribute('data-json-modal')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || !/\.(?:json|cs|py|tsx?|js)(?:\.txt)?$/i.test(url.pathname)) return;
    if (!('HTMLDialogElement' in window) || location.protocol === 'file:') return;
    event.preventDefault();
    const panel = dialog || createDialog();
    request?.abort();
    request = new AbortController();
    const activeRequest = request;
    const status = panel.querySelector('.evidence-status');
    panel.querySelector('h2').textContent = decodeURIComponent(url.pathname.split('/').pop());
    panel.querySelector('code').textContent = '';
    for (const anchor of panel.querySelectorAll('footer a')) anchor.href = url.href;
    status.textContent = '자료를 불러오고 있습니다.';
    panel.showModal();
    try {
      const response = await fetch(url.href, {signal:activeRequest.signal});
      if (!response.ok) throw new Error('Unavailable');
      let text = await response.text();
      if (/\.json$/i.test(url.pathname)) {
        try { text = JSON.stringify(JSON.parse(text), null, 2); } catch { /* Preserve source text. */ }
      }
      if (request !== activeRequest || !panel.open) return;
      panel.querySelector('code').textContent = text;
      status.textContent = '프로젝트의 원본 기록입니다.';
    } catch (error) {
      if (error.name === 'AbortError') return;
      status.textContent = '자료를 불러오지 못했습니다. 아래 원본 파일 링크로 확인해 주세요.';
    }
  });
})();
