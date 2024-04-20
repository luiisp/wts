chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    console.log('received', request.term); 

});


