/* global data, switchView, addEntry, clearEditing, removeEntry, viewToList, updateViewHistory */
/* exported resetFab, populateFab */

const elFabButton = document.querySelector('#fab-button');
elFabButton.addEventListener('click', handleClickFabButton);
const elFabMenu = document.querySelector('#fab-menu');
elFabMenu.addEventListener('click', handleClickFabMenu);
const elBackButton = document.querySelector('#back-button');
elBackButton.addEventListener('click', handleClickBackButton);

function handleClickBackButton() { // TODO
  const lastView = data.viewHistory[data.viewHistory.length - 1];
  if (lastView !== data.view && lastView !== undefined) {
    data.editing = lastView.editing;
    switchView(lastView.view);
    data.viewHistory.pop();
  } else {
    switchView('search-list');
  }
}

function handleClickFabButton(e) {
  const elFabMenu = document.querySelector('#fab-menu');
  const elFabIcon = elFabButton.children;
  elFabMenu.classList.toggle('hidden');
  elFabIcon[0].classList.toggle('hidden');
  elFabIcon[1].classList.toggle('hidden');
}

function handleClickFabMenu(e) {
  const optionID = e.target.getAttribute('id');
  const editedList = viewToList(data.editing.list);
  switch (optionID) {
    case 'fab-add-queue':
      addEntry('queueList', data.loadedEntry);
      switchView('search-list');
      clearEditing();
      break;
    case 'fab-add-watch':
      addEntry('watchList', data.loadedEntry);
      switchView('search-list');
      clearEditing();
      break;
    case 'fab-add-review':
      updateViewHistory('edit-review'); // Grab it before it changes
      data.editing.list = 'review-list';
      switchView('edit-review');
      break;
    case 'fab-move-review':
      updateViewHistory('edit-review'); // Grab it before it changes
      data.editing.list = 'review-list';
      removeEntry(editedList, data.editing.node);
      switchView('edit-review');
      break;
    case 'fab-move-watch':
      addEntry('watchList', data.loadedEntry);
      removeEntry(editedList, data.editing.node);
      switchView('watch-list');
      clearEditing();
      break;
    case 'fab-move-queue':
      addEntry('queueList', data.loadedEntry);
      removeEntry(editedList, data.editing.node);
      switchView('queue-list');
      clearEditing();
      break;
    case 'fab-edit':
      switchView('edit-review');
      break;
    case 'fab-delete':
      removeEntry(editedList, data.editing.node);
      switchView(data.editing.list);
      clearEditing();
      break;
  }
}

function resetFab() {
  const elFabMenu = document.querySelector('#fab-menu');
  const elFabIcon = elFabButton.children;
  elFabMenu.classList.add('hidden');
  elFabIcon[0].classList.remove('hidden');
  elFabIcon[1].classList.add('hidden');
  for (let i = 0; i < elFabMenu.children.length; i++) {
    elFabMenu.children[i].classList.add('hidden');
  }
}

function populateFab() {
  const elMenuItems = elFabMenu.children;
  switch (data.editing.list) {
    case 'review-list':
      elMenuItems['fab-edit'].classList.remove('hidden');
      elMenuItems['fab-delete'].classList.remove('hidden');
      break;
    case 'watch-list':
      elMenuItems['fab-move-review'].classList.remove('hidden');
      elMenuItems['fab-move-queue'].classList.remove('hidden');
      elMenuItems['fab-delete'].classList.remove('hidden');
      break;
    case 'queue-list':
      elMenuItems['fab-move-review'].classList.remove('hidden');
      elMenuItems['fab-move-watch'].classList.remove('hidden');
      elMenuItems['fab-delete'].classList.remove('hidden');
      break;
    case 'search-list':
      elMenuItems['fab-add-review'].classList.remove('hidden');
      elMenuItems['fab-add-watch'].classList.remove('hidden');
      elMenuItems['fab-add-queue'].classList.remove('hidden');
  }
}
