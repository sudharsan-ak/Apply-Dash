chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_PANEL" }).catch(() => {
    });
  }
});
//# sourceMappingURL=index.ts-jQ9o1JJj.js.map
