const statusMessage = document.querySelector('#copy-status');
let hideStatus;

function reportCopy(message) {
  statusMessage.textContent = message;
  statusMessage.hidden = false;
  clearTimeout(hideStatus);
  hideStatus = setTimeout(() => { statusMessage.hidden = true; }, 3200);
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const source = document.getElementById(button.dataset.copy);
    try {
      await navigator.clipboard.writeText(source.textContent);
      reportCopy('コピーしました。');
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(source);
      selection.removeAllRanges();
      selection.addRange(range);
      reportCopy('選択した文章を端末のコピー操作で保存してください。');
    }
  });
});
