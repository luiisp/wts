const input = document.querySelector('.k-or-p');
const resultDiv = document.querySelector('.result');
const foundedTerms = document.querySelector('.founded-terms');
const urlRealSearch = document.querySelector('.url-real-search');


input.addEventListener('input', async () => {
    await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log('sending', input.value);
        chrome.tabs.sendMessage(tabs[0].id, { term: input.value }, (response) => {
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
