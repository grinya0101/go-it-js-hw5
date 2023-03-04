import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const formEL = document.querySelector('.search-form');
const btnEl = document.querySelector('.load-more');
const divEl = document.querySelector('.gallery');
console.log(btnEl);

const API_KEY = '29209271-716f3ea82b952e36eef48fa19';

formEL.addEventListener('submit', onSearch);
btnEl.addEventListener('click', feachLoadMoreMurkup);

let searchQuery = '';
let page = 1;

function onSearch(e) {
  e.preventDefault();

  searchQuery = e.currentTarget.elements.searchQuery.value;
  if (searchQuery === '') {
    return Notiflix.Notify.failure('Enter the correct name');
  }

  clearHitsAndUpdate();
}

function clearHitsAndUpdate() {
  try {
    fetchHits().then(hits => {
      clearHitsContainer();
      onHitsMarkup(hits);
    });
  } catch (error) {
    console.log(error);
  }
}

async function fetchHits() {
  const respons = await fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=20&page=1`
  );
  const newHits = await respons.json();

  console.log(newHits);
  if (newHits.total === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
  }
  page = 1;

  if (newHits.total > 1) {
    onHiddenLoadMore();
  }

  return newHits.hits;
}

function onHiddenLoadMore() {
  btnEl.hidden = false;
}

function feachLoadMoreMurkup() {
  try {
    onLoadMore().then(onHitsMarkup);
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  page += 1;
  const respons = await fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=20&page=${page}`
  );

  const newHits = await respons.json();

  return newHits.hits;
}

// Пример с then

// function onLoadMore() {
//   page += 1;
//   return fetch(
//     `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=20&page=${page}`
//   )
//     .then(r => r.json())
//     .then(data => {
//       return data.hits;
//     });
// }


function onHitsMarkup(hits) {
  const result = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `

    <div class="photo-card">
    <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
    <b>Likes</b>
    ${likes}
    </p>
    <p class="info-item">
    <b>Views</b>
                ${views}
    </p>
    <p class="info-item">
    <b>Comments</b>
    ${comments}
    </p>
    <p class="info-item">
    <b>Downloads</b>
                ${downloads}
    </p>
  </div>
</div>

`;}).join('');

  createMarkup(result);
  new SimpleLightbox('.gallery a', {
   
  });
}

function createMarkup(result) {
  divEl.insertAdjacentHTML('beforeend', result);
}

function clearHitsContainer() {
  divEl.innerHTML = '';
}
