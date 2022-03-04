/* exported clearEntryList */
/* global populateEntryList */

document.addEventListener('DOMContentLoaded', handleLoad);
const elNavHeader = document.querySelector('.nav-header');
elNavHeader.addEventListener('click', handleClickNav);
const elEntryList = document.querySelector('ul');
elEntryList.addEventListener('click', handleClickEntryList);
const elAddButton = document.querySelector('.add-button');
elAddButton.addEventListener('click', handleClickAddButton);
const elModalButtons = document.querySelector('.modal-button-wrapper');
elModalButtons.addEventListener('click', handleClickAddModalButton);
const elReviewForm = document.querySelector('#review-form');
elReviewForm.addEventListener('submit', handleReviewSubmit);

function handleLoad() { // Runs when content loaded
  populateEntryList(data.view);
  switchView(data.view);
}

function handleClickNav(e) {
  const dataNav = e.target.getAttribute('data-nav');
  if (dataNav !== data.view && dataNav !== null) {
    switchView(dataNav);
  }
}

function handleClickEntryList(e) { // this is listening to all buttons
  const elEntryItem = e.target.closest('.entry-item');
  const elButton = e.target.closest('button');
  const node = parseInt(elEntryItem.getAttribute('data-node'));
  const listType = viewToList(data.view);
  const entryData = data[listType][node];
  if (elButton !== null) {
    handleClickEntryButton(elButton, entryData);
    return;
  }
  switch (data.view) {
    case 'search':
      if (data.editing === 'review-list') {
        populateDetail(entryData);
        switchView('edit-review');
      } else {
        populateDetail(entryData);
        switchView('edit-series');
      }
      break;
    case 'watch-list':
      data.inList = true;
      data.editing = data.view;
      populateDetail(entryData);
      switchView('view-series');
      break;
    case 'queue-list':
      data.inList = true;
      data.editing = data.view;
      populateDetail(entryData);
      switchView('view-series');
      break;
    case 'review-list':
      data.inList = true;
      data.editing = data.view;
      populateDetail(entryData);
      switchView('review');
      break;
  }
  populateEntryList(data.view); // TODO this is inefficient
}

function handleClickEntryButton(buttonElement, dataObject) {
  const elEntry = buttonElement.closest('.entry-item');
  for (const x of buttonElement.classList) {
    if (x === 'ep-up-btn') {
      if (dataObject.current_episode === dataObject.episodes) {
        break;
      }
      dataObject.current_episode++;
      break;
    } else if (x === 'ep-down-btn') {
      if (dataObject.current_episode === 1) {
        break;
      }
      dataObject.current_episode--;
      break;
    } else if (x === 'move-up-btn') {
      moveEntry(elEntry, 'up');
    } else if (x === 'move-down-btn') {
      moveEntry(elEntry, 'down');
    } else if (x === 'entry-edit-button') {
      populateDetail(dataObject);
    }
  }
}

function handleClickAddButton() {
  data.editing = data.view;
  switchView('search');
}

function handleClickAddModalButton(e) {
  const buttonType = e.target.getAttribute('data-button');
  const editedList = viewToList(data.editing);
  switch (buttonType) {
    case 'back':
      if (data.inList === true) {
        data.inList = false;
        switchView(data.editing);
      } else {
        switchView('search');
      }
      if (data.editing === 'review-list') {
        data.editing = null;
      }
      data.loadedEntry = null;
      break;
    case 'add':
      addEntry(editedList, data.loadedEntry);
      switchView(data.editing);
      data.editing = null;
      data.loadedEntry = null;
      break;
    case 'details':
      switchView('view-series');
      break;
    case 'edit-review':
      switchView('edit-review');
      fillReviewForm();
      break;
  }
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const inputs = e.target.elements;
  const editedList = viewToList(data.editing);
  if (inputs.thoughts.value === '') {
    data.loadedEntry.thoughts = 'No thoughts yet!';
  } else {
    data.loadedEntry.thoughts = inputs.thoughts.value;
  }
  if (inputs.score.value === '') {
    data.loadedEntry.personal_score = '-';
  } else {
    data.loadedEntry.personal_score = inputs.score.value;
  }
  if (inputs.review.value === '') {
    data.loadedEntry.review = 'No reviews yet!';
  } else {
    data.loadedEntry.review = inputs.review.value;
  }
  addEntry(editedList, data.loadedEntry);
  switchView(data.editing);
  clearInputs();
  e.target.reset();
  data.editing = null;
  data.loadedEntry = null;
}

function clearInputs() {
  const elThoughts = document.querySelector('#thoughts');
  const elScore = document.querySelector('#score');
  const elReview = document.querySelector('#review');
  elThoughts.setAttribute('value', '');
  elScore.setAttribute('value', '');
  elReview.textContent = '';
}

function switchView(viewString) { // Changes UI to view
  const elDetailHeader = document.querySelector('.detail-header > h1');
  populateEntryList(viewString);
  switchAllDataView(viewString);
  switch (viewString) { // Change headings based on view
    case 'edit-review':
      elDetailHeader.textContent = 'Edit Review';
      break;
    case 'review':
      elDetailHeader.textContent = 'Review';
      break;
    case 'edit-series':
      elDetailHeader.textContent = 'Add Series';
      break;
    case 'view-series':
      elDetailHeader.textContent = 'Series Details';
      break;
    case 'search':
      elDetailHeader.textContent = 'Search';
      break;
    case 'review-list':
      switchNavHighlight(0);
      break;
    case 'watch-list':
      switchNavHighlight(1);
      break;
    case 'queue-list':
      switchNavHighlight(2);
      break;
    case 'recommend':
      switchNavHighlight(3);
      break;
    case 'sommelier':
      switchNavHighlight(3);
      break;
  }
  data.view = viewString;
}

function switchNavHighlight(navNodeNum) { // Switches nav header blue highlight
  const elNavChildren = elNavHeader.children;
  for (const x of elNavChildren) {
    x.classList.remove('color-lblue');
  }
  elNavChildren[navNodeNum].classList.add('color-lblue');
}

function switchAllDataView(viewString) { // Hides or shows all data-view
  const elView = document.querySelectorAll('[data-view]');
  for (let i = 0; i < elView.length; i++) { // Show/hide elements with data-view
    const dataView = elView[i].getAttribute('data-view');
    const dataViewList = dataView.split(' ');
    if (dataViewList.includes(viewString)) {
      elView[i].classList.remove('hidden');
    } else {
      elView[i].classList.add('hidden');
    }
  }
}

function clearEntryList() { // Clears ul element of all li
  elEntryList.innerHTML = '';
}

function addEntry(listString, entryObject) {
  for (const x of data[listString]) {
    if (x.mal_id === entryObject.mal_id) {
      return false;
    }
  }
  data[listString].push(entryObject);
  return true;
}

function viewToList(viewString) {
  switch (viewString) {
    case 'search':
      return 'searchResults';
    case 'review-list':
      return 'reviewList';
    case 'watch-list':
      return 'watchList';
    case 'queue-list':
      return 'queueList';
    case 'sommelier':
      return 'recommendResults';
  }
  return null;
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
  elDemographic.textContent = data.loadedEntry.demographics[0].name;
  let genreList = '';
  for (let i = 0; i < Math.min(data.loadedEntry.genres.length, 2); i++) {
    genreList += data.loadedEntry.genres[i].name + ' ';
  }
  elGenres.textContent = genreList;
  elStudio.textContent = data.loadedEntry.studios[0].name;
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

function moveEntry(entryItemElement, directionString) {
  const node = parseInt(entryItemElement.getAttribute('data-node'));
  const listType = viewToList(data.view);
  const entryData = data[listType][node];
  let siblingNode = node;
  if (directionString === 'up') {
    siblingNode--;
  } else {
    siblingNode++;
  }
  const siblingEntryData = data[listType][siblingNode];
  if (siblingEntryData === undefined) {
    return false;
  }
  if (directionString === 'up') {
    data[listType].splice(siblingNode, 2, entryData, siblingEntryData);
  } else {
    data[listType].splice(node, 2, siblingEntryData, entryData);
  }
}

function fillReviewForm() {
  const elThoughtsInput = document.querySelector('#thoughts');
  const elScoreInput = document.querySelector('#score');
  const elReviewInput = document.querySelector('#review');
  elThoughtsInput.value = data.loadedEntry.thoughts;
  elScoreInput.value = data.loadedEntry.personal_score;
  elReviewInput.value = data.loadedEntry.review;
}

// TODO this is far more efficient than repopulating whole list
// function updateIncrementButton(entryItemElement, dataObject) {
//   const elButton = entryItemElement.querySelector('.episode-counter');
//   elButton.textContent = dataObject.current_episode + ' / ' +
//     dataObject.episodes;
// }
