/* exported data, clearData */

let data = {
  view: 'search-list',
  viewHistory: [],
  loadedEntry: null,
  editing: {
    list: null,
    node: null
  },
  searchResults: [],
  reviewList: [],
  watchList: [],
  queueList: []
};
const $previousData = localStorage.getItem('data-local-storage');
if ($previousData !== null) {
  data = JSON.parse($previousData);
}
window.addEventListener('beforeunload', function () {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
});

function clearData() { // resets EVERYTHING (console use only)
  data = {
    view: 'search-list',
    viewHistory: [],
    loadedEntry: null,
    editing: {
      list: null,
      node: null
    },
    searchResults: [],
    reviewList: [],
    watchList: [],
    queueList: []
  };
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
  location.reload();
}
