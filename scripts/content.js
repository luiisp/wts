const emphasis = (e) => {
  e.scrollIntoView({ block: "center" });
  e.style.border = "1.2px solid #100E15 ";
  e.style.backgroundColor = "#00d876";
  e.style.color = "#100E15";
};

const searchInPage = (term) => {
  matches = [];

  if (!term) return;
  const range = document.createRange();
  const walker = document.createNodeIterator(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  let firstHighlight = null;
  let count = 0;
  while ((node = walker.nextNode())) {
    const nodeText = node.nodeValue;
    const startIndex = nodeText.toLowerCase().indexOf(term.toLowerCase());

    if (startIndex >= 0) {
      count++;
      const highlightSpan = document.createElement("mark");
      highlightSpan.style.backgroundColor = "#100E15";
      highlightSpan.style.color = "#00d876";
      highlightSpan.style.fontWeight = "bold";
      highlightSpan.textContent = nodeText.substring(
        startIndex,
        startIndex + term.length
      );

      const beforeText = document.createTextNode(
        nodeText.substring(0, startIndex)
      );

      const afterText = document.createTextNode(
        nodeText.substring(startIndex + term.length)
      );

      const parentNode = node.parentNode;
      parentNode.insertBefore(beforeText, node);
      parentNode.insertBefore(highlightSpan, node);
      parentNode.insertBefore(afterText, node);

      parentNode.removeChild(node);
      matches.push(highlightSpan);
    }
  }
  emphasis(matches[0]);

  return {
    count: count,
    emphasisObj: {
      actualMatch: 0,
      maxMatchs: matches.length - 1,
      minMatchs: 0,
    },
  };
};

const removeAllHighlights = () => {
  const highlighted = document.querySelectorAll("mark");
  highlighted.forEach((mark) => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  switch (request.type) {
    case "analyzeDom":
      removeAllHighlights();
      if (request.data.term == "")
        return sendResponse({ count: false, stopPlaceholder: true });

      let result = searchInPage(request.data.term);
      sendResponse({
        count: result.count,
        stopPlaceholder: false,
        emphasisObj: result.emphasisObj,
      });
      break;
    case "arrowChange":
      console.log(matches);
      console.log(request.data.newEmphasis);
      for (let i of [
        request.data.newEmphasis - 1,
        request.data.newEmphasis + 1,
      ]) {
        if (matches[i]) {
          matches[i].style.border = "none";
          matches[i].style.color = "#00d876";
          matches[i].style.backgroundColor = "#100E15";
        }
      }
      emphasis(matches[request.data.newEmphasis]);

      break;
    default:
      break;
  }
});
