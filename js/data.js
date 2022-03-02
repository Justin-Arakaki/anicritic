/* exported data, clearData */

let data = {
  view: 'review-list',
  lastView: null,
  searchResults: [],
  reviewList: [],
  watchList: [],
  queueList: [],
  recommendResults: []
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
    view: 'review-list',
    lastView: null,
    searchResults: [],
    reviewList: [],
    watchList: [],
    queueList: [],
    recommendResults: []
  };
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
  location.reload();
}
