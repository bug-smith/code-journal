const $photoURL = document.querySelector('#photo-url');
const $photo = document.querySelector('.img');
const $form = document.querySelector('form');
const $a = document.querySelector('a');
const $entryForm = document.querySelector("[data-view='entry-form']");
const $entries = document.querySelector("[data-view='entries']");
const $noEntries = document.querySelector('.p1');
const $ul = document.querySelector('ul');
const $newBTN = document.querySelector('.new-btn');
const $img = document.querySelector('.img');
const $titleInput = document.querySelector('#title');
const $photoUrlLabel = document.querySelector('#photo-url');
const $notes = document.querySelector('#notes');
const $h2 = document.querySelector('h2');
const $modalBTN = document.querySelector('#modal-btn');
const $saveBTNDIV = document.querySelector('#div-save-btn');
const $containerTwo = document.querySelector('#r5');
const $cancel = document.querySelector('#cancel');
const $confirm = document.querySelector('#confirm');
// assigns image URL to produce the IMAGE

// update for pull request

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

  if (data.editing === null) {
    data.entries.unshift(obj);

    data.nextEntryId++;

    const $newDOM = renderEntry(obj);

    $ul.prepend($newDOM);
  } else if (data.editing !== null) {
    obj.entryId = data.editing.entryId;

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i] = obj;
      }
    }

    const $liNode = document.querySelectorAll('li');

    for (let i = 0; i < $liNode.length; i++) {
      const $liGetAtt = $liNode[i].getAttribute('data-entry-id');
      if ($liGetAtt === data.editing.nextEntryId) {
        $liNode.replaceWith(renderEntry(obj));
      }
    }
    $h2.textContent = 'New Entry';
    data.editing = null;
  }

  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  viewSwap('entries');
  toggleNoEntrires();
  $form.reset();
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
  $li.setAttribute('data-entry-id', entry.entryId);

  const $divHalfOne = document.createElement('div');
  $divHalfOne.setAttribute('class', 'column-half');

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.url);
  $img.setAttribute('alt', 'image');

  const $divHalfTwo = document.createElement('div');
  $divHalfTwo.setAttribute('class', 'column-half');

  const $h4 = document.createElement('h4');
  $h4.textContent += entry.title;

  const $p = document.createElement('p');
  $p.textContent += entry.notes;

  const $iPencil = document.createElement('i');
  $iPencil.setAttribute('class', 'fas fa-pencil');

  $li.append($divHalfOne, $divHalfTwo);
  $divHalfOne.append($img);
  $divHalfTwo.append($h4, $p);
  $h4.append($iPencil);

  return $li;
}

// pushes data into list

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $finalDOM = renderEntry(data.entries[i]);
    $ul.appendChild($finalDOM);
  }

  viewSwap(data.view);

  toggleNoEntrires();
});

function toggleNoEntrires() {
  if (data.entries.length <= 0) {
    $noEntries.setAttribute('class', 'no-entries p1');
  } else {
    $noEntries.setAttribute('class', 'no-entries hidden p1');
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
    $saveBTNDIV.setAttribute('class', 'column-full end');
  }
}

$a.addEventListener('click', function (event) {
  viewSwap('entries');
});

$newBTN.addEventListener('click', function (event) {
  viewSwap('entry-form');
});

$ul.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');

    const $number = Number(
      event.target.closest('li').getAttribute('data-entry-id')
    );

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $number) {
        data.editing = data.entries[i];
      }
    }
    $img.setAttribute('src', data.editing.url);
    $titleInput.setAttribute('value', data.editing.title);
    $photoUrlLabel.setAttribute('value', data.editing.url);
    $notes.textContent = data.editing.notes;
    $h2.textContent = 'Edit Entry';
    $modalBTN.setAttribute('class', '');
    $saveBTNDIV.setAttribute('class', 'column-full space');
  }
});

$modalBTN.addEventListener('click', function (event) {
  $containerTwo.setAttribute('class', 'container2');
});

$cancel.addEventListener('click', function (event) {
  $containerTwo.setAttribute('class', 'container2 hidden');
});

$confirm.addEventListener('click', function (event) {
  const $li = document.querySelector('li');

  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);
      $ul.removeChild($li);
      toggleNoEntrires();
      $containerTwo.setAttribute('class', 'container2 hidden');
      viewSwap('entries');
    }
  }
});
