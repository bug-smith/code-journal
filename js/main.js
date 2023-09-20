const $photoURL = document.querySelector('#photo-url');
const $photo = document.querySelector('.img');
const $form = document.querySelector('form');
const $a = document.querySelector('a');
const $entryForm = document.querySelector("[data-view='entry-form']");
const $entries = document.querySelector("[data-view='entries']");
const $noEntries = document.querySelector('.p1');
const $ul = document.querySelector('ul');
const $newBTN = document.querySelector('.new-btn');

// assigns image URL to produce the IMAGE

$photoURL.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
});

// assigns entry to new obj stored in data

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

  const $newDOM = renderEntry(obj);

  $ul.prepend($newDOM);

  viewSwap('entries');

  if (data.entries.length <= 0) {
    toggleNoEntrires();
  }
});

// assigns DOM tree

function renderEntry(entry) {
  // <li class='row'>
  // <div class='column-half'>
  //   <img src='$photoURL' alt="image"/>
  // </div>
  // <div class='column-half'>
  //   <h4>A newer image</h4>
  //   <p>A very nice lake</p>
  // </div>
  // </li>

  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');

  const $divHalfOne = document.createElement('div');
  $divHalfOne.setAttribute('class', 'column-half');

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.url);

  const $divHalfTwo = document.createElement('div');
  $divHalfTwo.setAttribute('class', 'column-half');

  const $h4 = document.createElement('h4');
  $h4.textContent += entry.title;

  const $p = document.createElement('p');
  $p.textContent += entry.notes;

  $li.append($divHalfOne, $divHalfTwo);
  $divHalfOne.append($img);
  $divHalfTwo.append($h4, $p);

  return $li;
}

// pushes data into list

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $finalDOM = renderEntry(data.entries[i]);
    $ul.appendChild($finalDOM);
  }

  viewSwap(data.view);

  if (data.entries.length > 0) {
    toggleNoEntrires();
  }
});

function toggleNoEntrires() {
  if (data.entries.length <= 0) {
    $noEntries.setAttribute('class', 'no-entries p1');
  }
}

function viewSwap(string) {
  data.view = string;
  if (string === 'entries') {
    $entryForm.setAttribute('class', 'hidden');
    $entries.setAttribute('class', '');
  } else if (string === 'entry-form') {
    $entries.setAttribute('class', 'hidden');
    $entryForm.setAttribute('class', '');
  }
}

$a.addEventListener('click', function (event) {
  viewSwap('entries');
});

$newBTN.addEventListener('click', function (event) {
  viewSwap('entry-form');
});
