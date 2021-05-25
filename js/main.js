/* global data */
/* exported data */
var photoURL = document.getElementById('photoURL');
photoURL.addEventListener('input', handleInput);

var form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

var imgURL = '';

function handleInput(event) {
  if (/\.(jpg|png|gif)$/.test(event.target.value)) {
    imgURL = event.target.value;
    document.getElementById('journalCoverImage').setAttribute('src', imgURL);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  var journalEntry = makeJournalEntry(form.elements.title.value, form.elements.photoURL.value, form.elements.notes.value, data.nextEntryId - 1, data.nextEntryId);
  data.entries[data.nextEntryId - 1] = journalEntry;
  data.nextEntryId++;
}

function makeJournalEntry(title, url, text, entryId, nextEntryId) {
  return { title: title, imageURL: url, text: text, entryId: entryId, nextEntryId: nextEntryId };
}

var tabContainer = document.querySelector('.tab-container');
var tabNodeList = document.querySelectorAll('.tab');
var viewNodeList = document.querySelectorAll('.view');

tabContainer.addEventListener('click', handleClick);
window.addEventListener('DOMContentLoaded', handleDomLoaded);

function handleClick(event) {
  if (event.target.matches('.tab')) {
    tabNodeList.forEach(
      function (currentValue) {
        if (currentValue === event.target) {
          currentValue.className = 'tab active';
        } else {
          currentValue.className = 'tab';
        }
      }
    );

    var dataView = event.target.getAttribute('data-view');
    viewNodeList.forEach(
      function (currentValue) {
        if (currentValue.getAttribute('data-view') === dataView) {
          currentValue.className = 'view';
        } else {
          currentValue.className = 'view hidden';
        }
      }
    );
  }
}

function handleDomLoaded(event) {
  var entries = document.getElementById('entries');

  for (var i = 0; i < data.entries.length; i++) {
    entries.append(createEntryHTML(i));
  }
}

function createEntryHTML(index) {
  var container = document.createElement('div');
  var imgDiv = document.createElement('div');
  var img = document.createElement('img');
  var textContent = document.createElement('div');
  var title = document.createElement('div');
  var text = document.createElement('div');

  container.className = 'entry flex';
  img.setAttribute('src', data.entries[index].imageURL);
  img.className = 'entryImg';
  textContent.className = 'journalTextBox';
  title.className = 'journalHeaderText';
  title.textContent = data.entries[index].title;
  text.className = 'journalText';
  text.textContent = data.entries[index].text;

  textContent.append(title, text);
  imgDiv.append(img);
  container.append(imgDiv, textContent);

  return container;
}
