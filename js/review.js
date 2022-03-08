/* global data, addEntry, switchView */
/* exported fillReviewForm */

const elReviewForm = document.querySelector('#review-form');
elReviewForm.addEventListener('submit', handleReviewSubmit);

function handleReviewSubmit(e) {
  e.preventDefault();
  const inputs = e.target.elements;
  data.loadedEntry.thoughts = inputs.thoughts.value;
  data.loadedEntry.personal_score = inputs.score.value;
  data.loadedEntry.review = inputs.review.value;
  addEntry('reviewList', data.loadedEntry);
  switchView('review-list');
  clearInputs();
  e.target.reset();
  data.editing.list = null;
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

function fillReviewForm() {
  const elThoughtsInput = document.querySelector('#thoughts');
  const elScoreInput = document.querySelector('#score');
  const elReviewInput = document.querySelector('#review');
  if (data.loadedEntry.thoughts !== undefined) {
    elThoughtsInput.value = data.loadedEntry.thoughts;
  }
  if (data.loadedEntry.personal_score !== undefined) {
    elScoreInput.value = data.loadedEntry.personal_score;
  }
  if (data.loadedEntry.review !== undefined) {
    elReviewInput.value = data.loadedEntry.review;
  }
}
