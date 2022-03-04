/* exported elementEntryItem, elementImage, elementInfo, elementTitle, elementVibes, elementAddButton, elementEpisodeButtons, elementThoughts, elementReview, elementScoreCard, elementEditButton, elementRightSide, elementDetailButton */

function elementEntryItem() {
  const elEntry = document.createElement('li');
  elEntry.className = 'entry-item radius';
  return elEntry;
}

function elementImage(dataObject) {
  const img = dataObject.images.jpg.image_url;
  const title = dataObject.title;
  const elImgWrapper = document.createElement('div');
  elImgWrapper.className = 'flex col-sixth align-center';
  const elImgPreview = document.createElement('img');
  elImgPreview.className = 'radius';
  elImgPreview.setAttribute('src', img);
  elImgPreview.setAttribute('alt', title + ' Preview Picture');
  elImgWrapper.appendChild(elImgPreview);
  return elImgWrapper;
}

function elementInfo() {
  const elInfoWrapper = document.createElement('div');
  elInfoWrapper.className = 'entry-info';
  return elInfoWrapper;
}

function elementTitle(dataObject) {
  const title = dataObject.title;
  const elTitle = document.createElement('h3');
  elTitle.className = 'color-lblue overflow';
  elTitle.textContent = title;
  return elTitle;
}

function elementAddButton() {
  const elButtonWrapper = document.createElement('div');
  elButtonWrapper.className = 'flex just-right align-center';
  const elButton = document.createElement('button');
  elButton.className = 'plus-button background-transparent radius';
  const elIcon = document.createElement('i');
  elIcon.className = 'fas fa-list fa-2x color-lblue';
  elButtonWrapper.appendChild(elButton);
  elButton.appendChild(elIcon);
  return elButtonWrapper;
}

function elementVibes(dataObject) {
  const vibes = dataObject.vibes;
  let vibeList = '';
  for (let i = 0; i < vibes.length; i++) {
    vibeList += vibes[i] + ' ';
  }
  const elVibeBox = document.createElement('div');
  elVibeBox.className = 'flex gap';
  const elHeading = document.createElement('h3');
  elHeading.className = 'color-lblue proza';
  elHeading.innerHTML = '<i>Vibes</i>';
  const elVibeList = document.createElement('h3');
  elVibeList.textContent = vibeList;
  elVibeBox.appendChild(elHeading);
  elVibeBox.appendChild(elVibeList);
  return elVibeBox;
}

function elementEpisodeButtons(dataObject, buttonTypeNum) {
  const elContainer = document.createElement('div');
  elContainer.className = 'flex just-right align-center';
  const elWrapper = document.createElement('div');
  elWrapper.className = 'episode-track';
  const elButtonText = document.createElement('h3');
  elButtonText.className = 'episode-counter';
  const elUpButton = document.createElement('button');
  elUpButton.className = 'list-arrow-button background-transparent';
  const elDownButton = document.createElement('button');
  elDownButton.className = 'list-arrow-button background-transparent';
  const elUpIcon = document.createElement('i');
  elUpIcon.className = 'fas fa-chevron-up fa-2x color-lblue';
  const elDownIcon = document.createElement('i');
  elDownIcon.className = 'fas fa-chevron-down fa-2x color-lblue';
  // If movie prevent adding buttons
  elContainer.appendChild(elWrapper);
  if (buttonTypeNum === 0) { // Episode Tracker Type
    // Movies Case
    if (dataObject.episodes === null || dataObject.episodes === 1) {
      elWrapper.classList.add('just-center');
      elButtonText.textContent = 'Movie';
      elWrapper.appendChild(elButtonText);
      return elContainer; // Returns before adding buttons
    }
    // Initialize current_episode property
    if (dataObject.current_episode === undefined) {
      dataObject.current_episode = 1;
    }
    elUpButton.classList.add('ep-up-btn');
    elDownButton.classList.add('ep-down-btn');
    elButtonText.textContent = dataObject.current_episode + ' / ' +
      dataObject.episodes;
  } else if (buttonTypeNum === 1) { // Series Mover Type
    elUpButton.classList.add('move-up-btn');
    elDownButton.classList.add('move-down-btn');
    elButtonText.textContent = 'MOVE';
  }
  // Add buttons
  elWrapper.appendChild(elUpButton);
  elWrapper.appendChild(elButtonText);
  elWrapper.appendChild(elDownButton);
  elUpButton.appendChild(elUpIcon);
  elDownButton.appendChild(elDownIcon);
  return elContainer;
}

function elementThoughts(dataObject) {
  let thoughts;
  const elThoughts = document.createElement('h3');
  if (dataObject.thoughts === undefined) {
    thoughts = 'No thoughts yet!';
  } else {
    thoughts = 'Thoughts: ' + dataObject.thoughts;
  }
  elThoughts.classList.add('overflow');
  elThoughts.textContent = thoughts;
  return elThoughts;
}

function elementReview(dataObject) {
  let review;
  const elReview = document.createElement('p');
  if (dataObject.review === undefined) {
    review = 'No review yet!';
  } else {
    review = dataObject.review;
  }
  elReview.textContent = 'Review: ' + review;
  elReview.classList.add('overflow');
  return elReview;
}

function elementScoreCard(dataObject) {
  const elContainer = document.createElement('div');
  elContainer.classList.add('entry-score-card', 'radius');
  const elHeading = document.createElement('h2');
  elHeading.classList.add('color-lblue', 'entry-score-head', 'proza');
  elHeading.textContent = 'SCORE';
  const elScore = document.createElement('h3');
  elScore.classList.add('color-lblue', 'entry-score', 'proza');
  elScore.textContent = dataObject.personal_score;
  elContainer.appendChild(elHeading);
  elContainer.appendChild(elScore);
  return elContainer;
}

function elementEditButton() {
  const elButton = document.createElement('button');
  elButton.classList.add('entry-edit-button', 'background-transparent');
  const elIcon = document.createElement('i');
  elIcon.className = 'far fa-edit fa-2x color-lblue';
  elButton.appendChild(elIcon);
  return elButton;
}

function elementDetailButton() {
  const elButton = document.createElement('button');
  elButton.classList.add('entry-detail-button', 'background-transparent');
  const elIcon = document.createElement('i');
  elIcon.className = 'fas fa-book fa-2x color-lblue';
  elButton.appendChild(elIcon);
  return elButton;
}

function elementRightSide() {
  const elDiv = document.createElement('div');
  elDiv.classList.add('flex', 'flex-col', 'just-space', 'align-center');
  return elDiv;
}
