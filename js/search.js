/* exported renderSearch */
/* global clearEntryList, populateEntryList, data */

const elSearchInput = document.querySelector('#search');
elSearchInput.addEventListener('input', handleInputSearch);
const elSearchNotification = document.querySelector('.search-notification');
const searchTimer = {
  timerID: null,
  startTimer: function () {
    clearTimeout(this.timerID);
    this.timerID = setTimeout(searchAnime, 300);
  }
};

function searchAnime() {
  const searchString = elSearchInput.value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/anime?q=' + searchString +
    '&page=1&sfw=true');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.response.data.length === 0) {
      elSearchNotification.textContent = 'No results.';
    } else {
      elSearchNotification.classList.add('hidden');
      dataUpdateSearchResults(xhr.response.data);
      populateEntryList('search-list');
    }
  });
  xhr.send();
}

function handleInputSearch(e) {
  clearEntryList(); // From main.js
  elSearchNotification.textContent = 'Searching...';
  elSearchNotification.classList.remove('hidden');
  searchTimer.startTimer();
}

function dataUpdateSearchResults(dataArray) {
  data.searchResults = dataArray;
}
