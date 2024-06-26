const input = document.querySelector(".k-or-p");
const resultDiv = document.querySelector(".result");
const foundedTerms = document.querySelector(".founded-terms");
const urlRealSearch = document.querySelector(".url-real-search");
const downBtn = document.querySelector(".down");
const upBtn = document.querySelector(".up");
const btns = document.querySelector(".btns-i");
const resultsExplorer = document.querySelector(".results-explorer");
let emphasisObj = {};

const fixDisplayText = {
  "search-ph":chrome.i18n.getMessage("searchFor"),
  "dev-by":chrome.i18n.getMessage("devBy"),
  "open-source":chrome.i18n.getMessage("openSource"),
  "for-t-search":chrome.i18n.getMessage("forTSearch"),
  "open-source-url":chrome.i18n.getMessage("openSourceUrl"),
}
const displayText = {
  "keyOrPhrase":chrome.i18n.getMessage("keyOrPhrase"),
  "result":chrome.i18n.getMessage("result"),
  "results":chrome.i18n.getMessage("results"),
  "found":chrome.i18n.getMessage("found"),
  "searchFor":chrome.i18n.getMessage("searchForUrl"),
  "onInternet":chrome.i18n.getMessage("onInternet"),
  "of":chrome.i18n.getMessage("of"),
}

const langTranslate = () => {
  for ( k in fixDisplayText){
    document.querySelector(`.${k}`).textContent = fixDisplayText[k];
  }
  input.placeholder = displayText.keyOrPhrase;

};

const saveState = () => {
  chrome.storage.local.set({
    term: input.value,
    emphasisObj: emphasisObj,
  });
};

const arrowChange = async (direction) => {
  const isunique =
    emphasisObj.actualMatch === emphasisObj.maxMatchs &&
    emphasisObj.actualMatch === emphasisObj.minMatchs;
  if (!direction || !emphasisObj || isunique) return;
  emphasisObj.actualMatch += direction === "down" ? 1 : -1;
  if (emphasisObj.actualMatch < emphasisObj.minMatchs) {
    emphasisObj.actualMatch = emphasisObj.maxMatchs;
  } else if (emphasisObj.actualMatch > emphasisObj.maxMatchs) {
    emphasisObj.actualMatch = emphasisObj.minMatchs;
  }
  resultsExplorer.textContent = `${displayText.result} ${emphasisObj.actualMatch + 1} ${displayText.of} ${
    emphasisObj.maxMatchs + 1
  }`;
  await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "arrowChange",
      data: { newEmphasis: emphasisObj.actualMatch },
    });
  });
};
downBtn.addEventListener("click", async () => arrowChange("down"));
upBtn.addEventListener("click", async () => arrowChange("up"));
input.addEventListener("input", async () => {
  await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: "analyzeDom", data: { term: input.value } },
      (response) => {
        if (response.stopPlaceholder) {
          resultDiv.style.display = "none";
          chrome.action.setBadgeText({
            text: "",
          });
          return;
        }

        if (response.count) {
          let count = response.count;
          let lessTwo = count < 2;
          if (resultDiv.style.display === "none") {
            resultDiv.style.display = "";
          }
          emphasisObj = response.emphasisObj;
          if (emphasisObj.actualMatch === emphasisObj.maxMatchs) {
            resultsExplorer.style.display = "none";
            btns.style.display = "none";
          } else {
            resultsExplorer.style.display = "";
            btns.style.display = "";
            resultsExplorer.textContent = `${displayText.result} ${
              emphasisObj.actualMatch + 1
            } ${displayText.of} ${emphasisObj.maxMatchs + 1}`;
          }
          foundedTerms.textContent = `${count} ${
            lessTwo ? displayText.result : displayText.results
          } ${displayText.found}`;
          urlRealSearch.textContent = `${displayText.searchFor} ${input.value} ${displayText.onInternet}`;
          urlRealSearch.href = `https://www.google.com/search?q=${input.value}`;
          chrome.action.setBadgeText({
            text: count.toString(),
          });
        }
      }
    );
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  langTranslate();
  await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: "recoverContext", data: { term: input.value } },
      (response) => {
        if (response.stopPlaceholder) {
          return;
        }
        input.value = response.term;
        if (response.count) {
          let count = response.count;
          let lessTwo = count < 2;
          if (resultDiv.style.display === "none") {
            resultDiv.style.display = "";
          }
          emphasisObj = response.emphasisObj;
          if (emphasisObj.actualMatch === emphasisObj.maxMatchs) {
            resultsExplorer.style.display = "none";
            btns.style.display = "none";
          } else {
            resultsExplorer.style.display = "";
            btns.style.display = "";
            resultsExplorer.textContent = `${displayText.result} ${
              emphasisObj.actualMatch + 1
            } ${displayText.of} ${emphasisObj.maxMatchs + 1}`;
          }
          foundedTerms.textContent = `${count} ${
            lessTwo ? displayText.result : displayText.results
          } ${displayText.found}`;
          urlRealSearch.textContent = `${displayText.searchFor} ${input.value} ${displayText.onInternet}`;
          urlRealSearch.href = `https://www.google.com/search?q=${input.value}`;
          chrome.action.setBadgeText({
            text: count.toString(),
          });
        }
      }
    );
  });
});
