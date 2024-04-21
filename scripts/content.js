const searchInPage = (term) => {
    
    removeAllHighlights();
    if (!term) return;
    const range = document.createRange();
    const walker = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT, null, false);

    let node;
    let count = 0;
    while (node = walker.nextNode()) {
        const nodeText = node.nodeValue;
        const startIndex = nodeText.toLowerCase().indexOf(term.toLowerCase());

        if (startIndex >= 0) {
            count++;
            const highlightSpan = document.createElement('mark');
            highlightSpan.style.backgroundColor = '#100E15';
            highlightSpan.style.color = '#00d876';
            highlightSpan.textContent = nodeText.substring(startIndex, startIndex + term.length);


            const beforeText = document.createTextNode(nodeText.substring(0, startIndex));

            const afterText = document.createTextNode(nodeText.substring(startIndex + term.length));

            const parentNode = node.parentNode;
            parentNode.insertBefore(beforeText, node);
            parentNode.insertBefore(highlightSpan, node);
            parentNode.insertBefore(afterText, node);


            parentNode.removeChild(node);
        }
        
    }
    return count;
}

const removeAllHighlights = () => {
    const highlighted = document.querySelectorAll('mark');
    highlighted.forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
    });
}


chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    let re = searchInPage(request.term);
    sendResponse({count: re});
});


