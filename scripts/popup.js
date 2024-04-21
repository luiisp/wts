const input = document.querySelector(".k-or-p");
const resultDiv = document.querySelector(".result");
const foundedTerms = document.querySelector(".founded-terms");
const urlRealSearch = document.querySelector(".url-real-search");
const downBtn = document.querySelector(".down");
const upBtn = document.querySelector(".up");
const btns = document.querySelector(".btns-i");
const resultsExplorer = document.querySelector(".results-explorer");
let emphasisObj = {};

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

  await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: "arrowChange", data: { newEmphasis: emphasisObj.actualMatch } },
      (response) => {
        //if (response.stopPlaceholder) {
        //    return;
        //}
        resultsExplorer.textContent = `Result ${
          emphasisObj.actualMatch + 1
        } of ${emphasisObj.maxMatchs + 1}`;
        console.log(response);
      }
    );
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
            resultsExplorer.textContent = `Result ${
              emphasisObj.actualMatch + 1
            } of ${emphasisObj.maxMatchs + 1}`;
          }
          foundedTerms.textContent = `${count} ${
            lessTwo ? "result" : "results"
          } found`;
          urlRealSearch.textContent = `Search for ${input.value} on internet`;
          urlRealSearch.href = `https://www.google.com/search?q=${input.value}`;
          chrome.action.setBadgeText({
            text: count.toString(),
          });
        }
      }
    );
  });
});
