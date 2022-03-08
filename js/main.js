/* exported clearEntryList, removeEntry, addEntry */
/* global populateEntryList, resetFab, populateFab, clearData, fillReviewForm, populateDetail */

document.addEventListener('DOMContentLoaded', handleLoad);
const elNavHeader = document.querySelector('.nav-header');
elNavHeader.addEventListener('click', handleClickNav);
const elEntryList = document.querySelector('ul');
elEntryList.addEventListener('click', handleClickEntryList);

// TEMPORARY BUTTON
const elDevButton = document.querySelector('.dev-button');
elDevButton.addEventListener('click', clearData);

function handleLoad() { // Runs when content loaded
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
  data.editing.node = node;
  if (elButton !== null) {
    handleClickEntryButton(elButton, entryData);
  } else {
    switch (data.view) {
      case 'search-list':
        data.editing.list = data.view;
        populateDetail(entryData);
        switchView('edit-series');
        break;
      case 'watch-list':
        data.editing.list = data.view;
        populateDetail(entryData);
        switchView('view-series');
        break;
      case 'queue-list':
        data.editing.list = data.view;
        populateDetail(entryData);
        switchView('view-series');
        break;
      case 'review-list':
        data.editing.list = data.view;
        populateDetail(entryData);
        switchView('review');
        break;
    }
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

function switchView(viewString) { // Changes UI to view
  const elDetailHeader = document.querySelector('.detail-header > h1');
  clearEntryList();
  populateEntryList(viewString);
  updateViewHistory(viewString);
  htmlViewChange(viewString);
  switch (viewString) { // Change headings based on view
    case 'edit-review':
      elDetailHeader.textContent = 'Edit Review';
      fillReviewForm();
      resetFab();
      populateFab();
      break;
    case 'review':
      elDetailHeader.textContent = 'Review';
      resetFab();
      populateFab();
      break;
    case 'edit-series':
      elDetailHeader.textContent = 'Add Series';
      resetFab();
      populateFab();
      break;
    case 'view-series':
      elDetailHeader.textContent = 'Series Details';
      resetFab();
      populateFab();
      break;
    case 'review-list':
      clearEditing();
      switchNavHighlight(0);
      break;
    case 'watch-list':
      clearEditing();
      switchNavHighlight(1);
      break;
    case 'queue-list':
      clearEditing();
      switchNavHighlight(2);
      break;
    case 'search-list':
      clearEditing();
      switchNavHighlight(3);
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

function htmlViewChange(viewString) { // Hides or shows all data-view
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

function addEntry(listString, entryObject) {
  for (const x of data[listString]) {
    if (x.mal_id === entryObject.mal_id) {
      return false;
    }
  }
  data[listString].push(entryObject);
  return true;
}

function removeEntry(listString, nodeNum) {
  data[listString].splice(nodeNum, 1);
}

function viewToList(viewString) {
  switch (viewString) {
    case 'search-list':
      return 'searchResults';
    case 'review-list':
      return 'reviewList';
    case 'watch-list':
      return 'watchList';
    case 'queue-list':
      return 'queueList';
  }
  return null;
}

function clearEditing() {
  data.editing.list = null;
  data.editing.node = null;
  data.loadedEntry = null;
}

function updateViewHistory(viewString) {
  if (viewString.includes('list')) {
    clearViewHistory();
  }
  if (data.viewHistory.length === 0) {
    data.viewHistory.push({ view: viewString, editing: { view: null, node: null } });
  } else {
    const lastView = data.viewHistory[data.viewHistory.length - 1];
    if (lastView.view !== data.view && lastView.view !== viewString) {
      data.viewHistory.push({ view: data.view, editing: JSON.parse(JSON.stringify(data.editing)) });
    }
  }
}

function clearViewHistory() {
  data.viewHistory = [];
}
