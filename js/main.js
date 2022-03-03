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
  const tag = e.target.tagName;
  if (tag !== 'I' && tag !== 'BUTTON') {
    return;
  }
  const elEntryItem = e.target.closest('.entry-item');
  const elButton = e.target.closest('button');
  const node = parseInt(elEntryItem.getAttribute('data-node'));
  const listType = viewToList(data.view);
  const entryData = data[listType][node];
  for (const x of elButton.classList) {
    if (x === 'plus-button') { // TODO may want to use data-button
      openSearchDetail(entryData);
      break;
    } else if (x === 'ep-up-btn') {
      if (entryData.current_episode === entryData.episodes) {
        break;
      }
      entryData.current_episode++;
      break;
    } else if (x === 'ep-down-btn') {
      if (entryData.current_episode === 1) {
        break;
      }
      entryData.current_episode--;
      break;
    } else if (x === 'move-up-btn') {
      moveEntry(elEntryItem, 'up');
    } else if (x === 'move-down-btn') {
      moveEntry(elEntryItem, 'down');
    }
  }
  populateEntryList(data.view); // TODO this is inefficient
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
      switchView('search');
      break;
    case 'add':
      addEntry(editedList, data.loadedEntry);
      switchView(data.editing);
      data.editing = null;
      break;
  }
}

function switchView(viewString) { // Changes UI to view
  const elDetailHeader = document.querySelector('.detail-header > h1');
  populateEntryList(viewString);
  switchAllDataView(viewString);
  switch (viewString) { // Change headings based on view
    case 'review-edit':
      elDetailHeader.textContent = 'Edit Review';
      break;
    case 'review-view':
      elDetailHeader.textContent = 'Review';
      break;
    case 'edit-series':
      elDetailHeader.textContent = 'Add Series';
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
    if (dataView.includes(viewString)) {
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

function openSearchDetail(dataObject) {
  data.loadedEntry = dataObject;
  const elTitle = document.querySelector('[data-modal-detail="title"]');
  const elPreviewPic = document.querySelector('.modal-preview > img');
  const elScore = document.querySelector('[data-modal-detail="score"]');
  const elSynopsis = document.querySelector('[data-modal-detail="synopsis"]');
  const elEpisodes = document.querySelector('[data-modal-detail="episodes"]');
  elTitle.textContent = data.loadedEntry.title;
  elPreviewPic.setAttribute('src', data.loadedEntry.images.jpg.image_url);
  elScore.textContent = data.loadedEntry.score;
  if (data.loadedEntry.episodes === null || data.loadedEntry.episodes === 1) {
    elEpisodes.textContent = 'Movie';
  } else {
    elEpisodes.textContent = data.loadedEntry.episodes;
  }
  elSynopsis.textContent = data.loadedEntry.synopsis;
  switchView('edit-series');
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

// TODO this is far more efficient than repopulating whole list
// function updateIncrementButton(entryItemElement, dataObject) {
//   const elButton = entryItemElement.querySelector('.episode-counter');
//   elButton.textContent = dataObject.current_episode + ' / ' +
//     dataObject.episodes;
// }
