
chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({url: "https://luiisp.github.io/wts-web/thanks.html"});
});