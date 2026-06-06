// Background service worker — toggles the panel when the extension icon is clicked.
// Content scripts auto-inject via manifest content_scripts declaration, so no manual
// injection is needed here. Message failures (chrome://, extension pages) are silent.
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_PANEL' }).catch(() => {})
  }
})
