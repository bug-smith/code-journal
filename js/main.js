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
    entryId: data.nextEntryId,
  };

  data.entries.unshift(obj);

  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');

  data.nextEntryId++;

  $form.reset();
});
