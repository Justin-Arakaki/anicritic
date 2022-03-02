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
  elInfoWrapper.className = 'col-60';
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
  elButtonWrapper.className = 'flex flex-grow-1 just-right align-center';
  const elButton = document.createElement('button');
  elButton.className = 'plus-button radius';
  const elIcon = document.createElement('i');
  elIcon.className = 'fas fa-plus fa-2x color-dgray';
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

function elementEpisodeButtons(dataObject) {
  const elContainer = document.createElement('div');
  elContainer.className = 'flex flex-grow-1 just-right align-center';
  const elWrapper = document.createElement('div');
  elWrapper.className = 'episode-track';
  const elEpisodeCount = document.createElement('h3');
  elEpisodeCount.className = 'episode-counter';
  // If movie prevent adding buttons
  elContainer.appendChild(elWrapper);
  if (dataObject.episodes === null || dataObject.episodes === 1) {
    elWrapper.classList.add('just-center');
    elEpisodeCount.textContent = 'Movie';
    elWrapper.appendChild(elEpisodeCount);
    return elContainer; // Returns before adding buttons
  }
  if (dataObject.current_episode === undefined) {
    dataObject.current_episode = 1;
  }
  elEpisodeCount.textContent = dataObject.current_episode + ' / ' +
    dataObject.episodes;
  // Add buttons
  const elUpButton = document.createElement('button');
  elUpButton.className = 'increment-button up-btn radius';
  const elDownButton = document.createElement('button');
  elDownButton.className = 'increment-button down-btn radius';
  const elUpIcon = document.createElement('i');
  elUpIcon.className = 'fas fa-chevron-up fa-2x color-dgray';
  const elDownIcon = document.createElement('i');
  elDownIcon.className = 'fas fa-chevron-down fa-2x color-dgray';
  elWrapper.appendChild(elUpButton);
  elWrapper.appendChild(elEpisodeCount);
  elWrapper.appendChild(elDownButton);
  elUpButton.appendChild(elUpIcon);
  elDownButton.appendChild(elDownIcon);
  return elContainer;
}
