/* exported elementEntryItem, elementImage, elementInfo, elementTitle, elementVibes, elementAddButton, elementEpisodeButtons */

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
  elButton.className = 'plus-button radius';
  const elIcon = document.createElement('i');
  elIcon.className = 'fas fa-th-list fa-2x';
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
  elUpButton.className = 'list-arrow-button radius';
  const elDownButton = document.createElement('button');
  elDownButton.className = 'list-arrow-button radius';
  const elUpIcon = document.createElement('i');
  elUpIcon.className = 'fas fa-chevron-up fa-2x color-dgray';
  const elDownIcon = document.createElement('i');
  elDownIcon.className = 'fas fa-chevron-down fa-2x color-dgray';
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