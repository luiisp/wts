const input = document.querySelector('.k-or-p');



input.addEventListener('input', async () => {
    //if (!input.value.trim() || input.value.length < 2) {
    //    return;
    //}

    await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log('sending', input.value);
        chrome.tabs.sendMessage(tabs[0].id, { term: input.value }, (response) => {
            if (response.count){
                console.log('response', response.count);
            }
        });
    });
});
