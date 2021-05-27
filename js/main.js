/* global data */
/* exported data */
var photoURL = document.getElementById('photoURL');
photoURL.addEventListener('input', handleInput);

var form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

var entryList = document.getElementById('entries');
entryList.addEventListener('click', handleDeleteClick);

var modalYes = document.querySelector('.modalYes');
modalYes.addEventListener('click', executeDelete);

var modalCancel = document.querySelector('.modalCancel');
modalCancel.addEventListener('click', handleModalCancel);

var modal = document.querySelector('.modal');
var deleteEvent;

var imgURL = '';

function handleModalCancel(event) {
  // console.log
  modal.style.display = 'none';
  // console.log('Entry Not deleted')
}

function handleInput(event) {
  if (/\.(jpg|png|gif)$/.test(event.target.value)) {
    imgURL = event.target.value;
    document.getElementById('journalCoverImage').setAttribute('src', imgURL);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  var journalEntry = makeJournalEntry(form.elements.title.value, form.elements.photoURL.value, form.elements.notes.value, data.nextEntryId - 1);
  data.entries[data.nextEntryId - 1] = journalEntry;
  data.nextEntryId++;
}

function makeJournalEntry(title, url, text, entryId) {
  return { title: title, imageURL: url, text: text, entryId: entryId };
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
    if (data.entries[i]) {
      entries.append(createEntryHTML(data.entries[i]));
    }
  }
}

function createEntryHTML(object) {
  var container = document.createElement('div');
  var imgDiv = document.createElement('div');
  var img = document.createElement('img');
  var textContent = document.createElement('div');
  var titleBox = document.createElement('div');
  var title = document.createElement('div');
  var editButton = document.createElement('button');
  var deleteButton = document.createElement('button');
  var text = document.createElement('div');

  container.className = 'entry flex';
  container.id = object.entryId;
  img.setAttribute('src', object.imageURL);
  img.className = 'entryImg';
  textContent.className = 'journalTextBox';
  titleBox.className = 'flexLeft';
  title.className = 'journalHeaderText';
  title.textContent = object.title;
  editButton.textContent = 'Edit';
  editButton.className = 'buttonMargin';
  editButton.id = 'edit';
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'buttonMargin';
  deleteButton.id = 'delete';
  text.className = 'journalText';
  text.textContent = object.text;

  // console.log('adding Edit Button')
  titleBox.append(title, editButton, deleteButton);
  textContent.append(titleBox, text);
  imgDiv.append(img);
  container.append(imgDiv, textContent);

  return container;
}

function executeDelete(event) {
  modal.style.display = 'none';

  if (deleteEvent.target.id === 'delete') {
    var entryClickedId = deleteEvent.target.closest('.entry').id;
    deleteEvent.target.closest('.entry').remove();
    // console.log(data.entries)

    var entryIndexToDelete;
    // console.log('Entry length: ' + data.entries.length)
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i]) {
        // console.log('data.entries['+i+'].entryId: '+data.entries[i].entryId)
        // console.log('entryClickedId: '+entryClickedId)
        if (Number(data.entries[i].entryId) === entryClickedId) {
          entryIndexToDelete = i;
          break;
        }
        if (i === data.entries.length) {
          // console.log('No entries found that match id')
        }
      }
    }
    data.entries.splice(entryIndexToDelete, 1);

    // console.log('entryIndexToDelete: '+entryIndexToDelete)
    // console.log(data.entries.splice(entryIndexToDelete, 1))
    // console.log('entryClickedId: '+entryClickedId)
    // console.log(data.entries)
  }
}

function handleDeleteClick(event) {
  modal.style.display = 'block';
  // console.log(modal.style.display)
  deleteEvent = event;
}
