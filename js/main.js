/* global data */
/* exported data */
var photoURL = document.getElementById('photoURL');
photoURL.addEventListener('input', handleInput);

var form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

var imgURL = '';

function handleInput(event) {
  // imgURL += event.target
  if (/\.(jpg|png|gif)$/.test(event.target.value)) {
    imgURL = event.target.value;
    // console.log(imgURL)
    // console.log(document.getElementById('journalCoverImage').getAttribute('src'))
    document.getElementById('journalCoverImage').setAttribute('src', imgURL);
  }
}

function handleSubmit(event) {
  // event.preventDefault();
  var journalEntry = makeJournalEntry(form.elements.title.value, form.elements.photoURL.value, form.elements.notes.value, data.nextEntryId - 1, data.nextEntryId);
  data.entries[data.nextEntryId - 1] = journalEntry;
  data.nextEntryId++;
}

function makeJournalEntry(title, url, text, entryId, nextEntryId) {
  return { title: title, imageURL: url, text: text, entryId: entryId, nextEntryId: nextEntryId };
}
