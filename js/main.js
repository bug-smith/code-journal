const $photoURL = document.querySelector('#photo-url');
const $photo = document.querySelector('.img');

$photoURL.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
});
