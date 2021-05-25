/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', handleBeforeUnload);

if (localStorage.getItem('javascript-local-storage') !== null) {
  data = JSON.parse(localStorage.getItem('javascript-local-storage'));
}

function handleBeforeUnload() {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}
