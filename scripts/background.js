
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "On",
  });
});
