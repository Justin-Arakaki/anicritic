/* exported populateEntryList, populateDetail */
/* global elementEntryItem, elementImage, elementInfo, elementTitle, elementEpisodeButtons, elementThoughts, elementReview, elementScoreCard, elementRightSide */
/* global data, elEntryList, clearEntryList */

function populateEntryList(viewString) {
  const elEmpty = document.querySelector('.empty-message');
  let entries = null;
  let renderer = null;
  clearEntryList();
  switch (viewString) {
    case 'search':
      entries = data.searchResults;
      renderer = renderSearch;
      break;
    case 'search-list':
      entries = data.searchResults;
      renderer = renderSearch;
      break;
    case 'review-list':
      entries = data.reviewList;
      renderer = renderReviewList;
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
  if (entries.length === 0) {
    elEmpty.classList.remove('hidden');
  } else {
    elEmpty.classList.add('hidden');
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

function renderReviewList(dataObject) {
  const elEntryItem = elementEntryItem();
  const elInfo = elementInfo();
  const elRightSide = elementRightSide();
  elInfo.appendChild(elementTitle(dataObject));
  elInfo.appendChild(elementThoughts(dataObject));
  elInfo.appendChild(elementReview(dataObject));
  elRightSide.appendChild(elementScoreCard(dataObject));
  elEntryItem.appendChild(elementImage(dataObject));
  elEntryItem.appendChild(elInfo);
  elEntryItem.appendChild(elRightSide);
  return elEntryItem;
}

function populateDetail(dataObject) {
  data.loadedEntry = dataObject;
  const elTitle = document.querySelector('[data-modal-detail="title"]');
  const elPreviewPic = document.querySelector('.modal-preview > img');
  const elScore = document.querySelector('[data-modal-detail="score"]');
  const elSynopsis = document.querySelector('[data-modal-detail="synopsis"]');
  const elEpisodes = document.querySelector('[data-modal-detail="episodes"]');
  const elStudio = document.querySelector('[data-modal-detail="studio"]');
  const elGenres = document.querySelector('[data-modal-detail="genres"]');
  const elDemographic = document.querySelector('[data-modal-detail="demographic"]');
  const elTrailer = document.querySelector('[data-modal-detail="trailer"]');
  const elMAL = document.querySelector('[data-modal-detail="MAL"]');
  const elMyRating = document.querySelector('[data-modal-detail="my-rating"]');
  const elThoughts = document.querySelector('[data-modal-detail="my-thoughts"]');
  const elReview = document.querySelector('[data-modal-detail="my-review"]');
  elReview.textContent = data.loadedEntry.review;
  elThoughts.textContent = data.loadedEntry.thoughts;
  elMyRating.textContent = data.loadedEntry.personal_score;
  elMAL.setAttribute('href', data.loadedEntry.url);
  elTrailer.setAttribute('href', data.loadedEntry.trailer.url);
  if (data.loadedEntry.demographics.length === 0) {
    elDemographic.textContent = 'Unknown';
  } else {
    elDemographic.textContent = data.loadedEntry.demographics[0].name;
  }
  let genreList = '';
  for (let i = 0; i < Math.min(data.loadedEntry.genres.length, 2); i++) {
    genreList += data.loadedEntry.genres[i].name + ' ';
  }
  elGenres.textContent = genreList;
  if (data.loadedEntry.studios.length === 0) {
    elStudio.textContent = 'Unknown';
  } else {
    elStudio.textContent = data.loadedEntry.studios[0].name;
  }
  elTitle.textContent = data.loadedEntry.title;
  elPreviewPic.setAttribute('src', data.loadedEntry.images.jpg.image_url);
  elScore.textContent = data.loadedEntry.score;
  if (data.loadedEntry.episodes === null || data.loadedEntry.episodes === 1) {
    elEpisodes.textContent = 'Movie';
  } else {
    elEpisodes.textContent = data.loadedEntry.episodes;
  }
  elSynopsis.textContent = data.loadedEntry.synopsis;
}
