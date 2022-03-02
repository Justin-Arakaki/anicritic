/* exported populateEntryList */
/* global elementEntryItem, elementImage, elementInfo, elementTitle, elementVibes, elementAddButton, elementEpisodeButtons */
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
      // renderer
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
  const THING = { vibes: ['Chill', 'Fun', 'Tacos'] }; // REMOVE!!!
  const elWatchItem = elementEntryItem();
  const elInfo = elementInfo();
  elInfo.appendChild(elementTitle(dataObject));
  elInfo.appendChild(elementVibes(THING));
  elWatchItem.appendChild(elementImage(dataObject));
  elWatchItem.appendChild(elInfo);
  elWatchItem.appendChild(elementEpisodeButtons(dataObject));
  return elWatchItem;
}

function renderSearch(dataObject) {
  const elSearchEntry = elementEntryItem();
  const elInfo = elementInfo();
  elInfo.appendChild(elementTitle(dataObject));
  elSearchEntry.appendChild(elementImage(dataObject));
  elSearchEntry.appendChild(elInfo);
  elSearchEntry.appendChild(elementAddButton());
  return elSearchEntry;
}
