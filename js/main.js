/* exported clearEntryList */
/* global populateSearch */
document.addEventListener('DOMContentLoaded', handleLoad);
const navViewList = ['review-list', 'watch-list', 'queue-list', 'recommend', 'sommelier'];

function handleLoad() {
  populateEntries(data.view);
  switchView(data.view);
}

function clearEntryList() {
  const elEntryList = document.querySelector('ul');
  elEntryList.innerHTML = '';
}

function switchView(viewString) { // Changes UI to view
  const elView = document.querySelectorAll('[data-view]');
  const elViewType = document.querySelectorAll('[data-view-type]');
  const elDetailHeader = document.querySelector('.detail-header > h2');
  let viewType = 'detail';
  if (navViewList.includes(viewString)) {
    viewType = 'nav';
  }
  for (let i = 0; i < elView.length; i++) { // Show/hide elements with data-view
    const dataView = elView[i].getAttribute('data-view');
    if (dataView.includes(viewString)) {
      elView[i].classList.remove('hidden');
    } else {
      elView[i].classList.add('hidden');
    }
  }
  for (let j = 0; j < elViewType.length; j++) { // Show/hide elements with data-view-type
    const dataViewType = elViewType[j].getAttribute('data-view-type');
    if (dataViewType.includes(viewType)) {
      elViewType[j].classList.remove('hidden');
    } else {
      elViewType[j].classList.add('hidden');
    }
  }
  switch (viewString) { // Change headings based on view
    case 'review-edit':
      elDetailHeader.textContent = 'Edit Review';
      break;
    case 'review-view':
      elDetailHeader.textContent = 'Review';
      break;
    case 'add-entry':
      elDetailHeader.textContent = 'Add Series';
      break;
    case 'search':
      elDetailHeader.textContent = 'Search';
      break;
  }
}

function populateEntries(viewString) {
  switch (viewString) {
    case 'search':
      populateSearch(data.searchResults);
      break;
    case 'review-list':
      // add function
      break;
    case 'watch-list':
      // add function
      break;
    case 'queue-list':
      // add function
      break;
    case 'sommelier':
      // add function
      break;
  }
}
