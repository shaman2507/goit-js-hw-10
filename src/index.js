import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const load = document.querySelector('.loader');
const error = document.querySelector('.error');

function errorN() {
  error.style.display = 'none';
}

function showLoader() {
  load.style.display = 'block';
}

function hideLoader() {
  load.style.display = 'none';
}

function hideElements() {
  select.style.display = 'none';
  catInfo.style.display = 'none';
}

function showElements() {
  select.style.display = 'block';
  catInfo.style.display = 'block';
}
reloadF();
function reloadF() {
  Notiflix.Loading.standard(`${load.textContent}`);
}
Notiflix.Loading.remove(1000);
const timeout = setTimeout(() => {
  fetch();
  showElements();
}, 1200);

async function fetch() {
  try {
  const data = await fetchBreeds();
  const markup = createMarkup(data);
  select.innerHTML = markup;
  } catch (error) {
  hideElements();
  Notiflix.Report.failure('Oops! Something went wrong! Try reloading the page!');
  }
  }

  
select.addEventListener('change', () => {
  const selectedOption = select.options[select.selectedIndex];
  const selectedValue = selectedOption.value;
  showLoader();
  hideElements();
  fetchCatByBreed(selectedValue)
    .then(data => {
      const markupInfo = createMarkupInfo(data);
      catInfo.innerHTML = markupInfo;
      if (data.length === 0) {
        alert('Oops! Something went wrong! Try reloading the page!')
        return hideLoader();
      }
      hideLoader();
      showElements();
    })
    .catch(err => {
      Notiflix.Report.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      showElements();
      hideLoader();
    })
    .finally(() => {
      if (!fetchCatByBreed().catch) {
        errorN();
        showElements();
      }
    });
});



function createMarkup(arr) {
  console.log(arr);
  return arr
    .map(
      breed => `<option value="${breed.id}">${breed.name}</option>
    `
    )
    .join('');
}


function createMarkupInfo(ar) {
  return ar
    .map(
      breed => `<img class ="img" src="${breed.url}" alt="${breed.name}">
    <ul class = "item">
    <li class= "item-breed"><span class = "span">Name:</span> ${breed.breeds[0].name}</li>
    <li class= "item-breed"><span class = "span">Description:</span> ${breed.breeds[0].description}</li>
    <li class= "item-breed"><span class = "span">Temperament:</span>${breed.breeds[0].temperament}</li>
    </ul>`
    )
    .join('');
}
