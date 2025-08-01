chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === 'complete' &&
    (tab.url.includes('riseintime.com') || tab.url.includes('dominion-frontend.vercel.app'))
  ) {
    setTimeout(() => {
      chrome.action.openPopup(() => {
        chrome.runtime.sendMessage({ closePopup: true });
      });
    }, 300); // Delay in milliseconds
  }
});

