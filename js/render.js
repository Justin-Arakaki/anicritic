/* exported populateEntryList */
/* global elementEntryItem, elementImage, elementInfo, elementTitle, elementAddButton, elementEpisodeButtons */
/* global data, elEntryList, clearEntryList */

function populateEntryList(viewString) {
  let entries = null;
  let renderer = null;
  clearEntryList();
  switch (viewString) {
    case 'search':
      entries = data.searchResults;
      renderer = renderSearch;
      break;
    case 'review-list':
      entries = data.reviewList;
      // renderer
      break;
    case 'watch-list':
      entries = data.watchList;
      renderer = renderWatchList;
      break;
    case 'queue-list':
      entries = data.queueList;
      renderer = renderQueueList;
      break;
    case 'sommelier':
      entries = data.recommendResults;
      // renderer
      break;
  }
  if (renderer === null) { // REMOVE WHEN COMPLETED
    return;
  }
  for (let i = 0; i < entries.length; i++) {
    const elEntry = renderer(entries[i]);
    elEntry.setAttribute('data-node', i);
    elEntryList.appendChild(elEntry);
  }
}

function renderWatchList(dataObject) { // REMOVE TESTER!!!
  // const THING = { vibes: ['Chill', 'Fun', 'Tacos'] }; // REMOVE!!!
  const elEntryItem = elementEntryItem();
  const elInfo = elementInfo();
  elInfo.appendChild(elementTitle(dataObject));
  // elInfo.appendChild(elementVibes(THING)); // Remove for now
  elEntryItem.appendChild(elementImage(dataObject));
  elEntryItem.appendChild(elInfo);
  elEntryItem.appendChild(elementEpisodeButtons(dataObject, 0));
  return elEntryItem;
}

function renderSearch(dataObject) {
  const elEntryItem = elementEntryItem();
  const elInfo = elementInfo();
  elInfo.appendChild(elementTitle(dataObject));
  elEntryItem.appendChild(elementImage(dataObject));
  elEntryItem.appendChild(elInfo);
  elEntryItem.appendChild(elementAddButton());
  return elEntryItem;
}

function renderQueueList(dataObject) {
  const elEntryItem = elementEntryItem();
  const elInfo = elementInfo();
  elInfo.appendChild(elementTitle(dataObject));
  elEntryItem.appendChild(elementImage(dataObject));
  elEntryItem.appendChild(elInfo);
  elEntryItem.appendChild(elementEpisodeButtons(dataObject, 1));
  return elEntryItem;
}
