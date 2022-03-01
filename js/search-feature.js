/* global clearEntryList */
/* global data */
const elSearchInput = document.querySelector('#search');
elSearchInput.addEventListener('input', handleInputSearch);
const elSearchNotification = document.querySelector('.search-notification');
const searchTimer = {
  timerID: null,
  startTimer: function () {
    clearTimeout(this.timerID);
    this.timerID = setTimeout(searchAnime, 1000);
  }
};

function searchAnime() {
  const searchString = elSearchInput.value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/anime?q=' + searchString + '&page=1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.response.data.length === 0) {
      elSearchNotification.textContent = 'No results.';
    } else {
      elSearchNotification.classList.add('hidden');
      populateSearch(xhr.response.data);
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

function populateSearch(dataObj) {
  const elEntryList = document.querySelector('ul');
  dataUpdateSearchResults(dataObj);
  for (let i = 0; i < dataObj.length; i++) {
    const imgUrl = dataObj[i].images.jpg.image_url;
    const title = dataObj[i].title;
    elEntryList.appendChild(renderSearch(imgUrl, title));
  }
}

function renderSearch(imgString, titleString) {
  const elEntry = document.createElement('li');
  elEntry.className = 'entry-item radius';
  const elImgWrapper = document.createElement('div');
  elImgWrapper.className = 'flex col-sixth align-center';
  const elImgPreview = document.createElement('img');
  elImgPreview.className = 'radius';
  elImgPreview.setAttribute('src', imgString);
  elImgPreview.setAttribute('alt', titleString + ' Preview Picture');
  const elInfoWrapper = document.createElement('div');
  elInfoWrapper.className = 'col-60';
  const elTitle = document.createElement('h2');
  elTitle.className = 'color-lblue overflow';
  elTitle.textContent = titleString;
  elEntry.appendChild(elImgWrapper);
  elImgWrapper.appendChild(elImgPreview);
  elEntry.appendChild(elInfoWrapper);
  elInfoWrapper.appendChild(elTitle);
  return elEntry;
}

function dataUpdateSearchResults(dataArr) {
  data.searchResults = dataArr;
}
