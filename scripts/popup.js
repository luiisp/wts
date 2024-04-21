const input = document.querySelector('.k-or-p');
const resultDiv = document.querySelector('.result');
const foundedTerms = document.querySelector('.founded-terms');
const urlRealSearch = document.querySelector('.url-real-search');
const downBtn = document.querySelector('.down');
const upBtn = document.querySelector('.up');
let cEmphasis = 0;

const arrowChange = async (direction) => {
    if (!direction) return;
    cEmphasis += (direction === 'down') ? 1 : -1;

    await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'arrowChange' , data: {countEmphasis:cEmphasis} }, (response) => {
            //if (response.stopPlaceholder) {
            //    return;
            //}
            console.log(response);
        });
    });
    
};
downBtn.addEventListener('click', async () => arrowChange('down'));
upBtn.addEventListener('click', async () => arrowChange('up'))
input.addEventListener('input', async () => {
    await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'analyzeDom' , data: {term: input.value} }, (response) => {
            if (response.stopPlaceholder) {
                resultDiv.style.display = 'none';
                chrome.action.setBadgeText({
                    text: '',
                  });
                return;
            }

            if (response.count) {
                let count = response.count;
                let lessTwo = count < 2;
                if (resultDiv.style.display === 'none') {
                    resultDiv.style.display = '';
                }
                cEmphasis = response.countEmphasis || 0;
                foundedTerms.textContent = `${count} ${ lessTwo ? 'result' : 'results' } found`;
                urlRealSearch.textContent = `Search for ${input.value} on internet`;
                urlRealSearch.href = `https://www.google.com/search?q=${input.value}`;
                chrome.action.setBadgeText({
                    text: count.toString(),
                  });
            }
        });
    });
});
