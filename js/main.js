const $photoURL = document.querySelector('#photo-url');
const $photo = document.querySelector('.img');
const $form = document.querySelector('form');

$photoURL.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const obj = {
    title: $form.elements.title.value,
    url: $form.elements.photourl.value,
    notes: $form.elements.notes.value,
  };

  obj.entryID = data.nextEntryId;
  // nextEntryId++

  for (let i = 0; i < data.length; i++) {
    data.entries = obj.push(obj[i]);
  }
});
