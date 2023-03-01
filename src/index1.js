const formEL = document.querySelector('.search-form');
const btnEl = document.querySelector('.load-more');
const divEl = document.querySelector('.gallery');
console.log(divEl);

const API_KEY = '29209271-716f3ea82b952e36eef48fa19';

formEL.addEventListener('submit', onSearch);
btnEl.addEventListener('click', dada);

let searchQuery = '';
let page = 1;

function onSearch(e) {
  e.preventDefault();
  clearHitsContainer();
  searchQuery = e.currentTarget.elements.searchQuery.value;
  fatchHits().then(onHitsMarkup);
}

function fatchHits() {
  return fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3&page=1`
  )
    .then(r => r.json())
    .then(data => {
      page = 1;

      return data.hits;
    });
}

function dada() {
  onLoadMore().then(onHitsMarkup);
}

function onLoadMore() {
  page += 1;
  return fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3&page=${page}`
  )
    .then(r => r.json())
    .then(data => {
      return data.hits;
    });
}

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
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>
`;
      }
    )

    .join('');

  divEl.insertAdjacentHTML('beforeend', result);
}


function clearHitsContainer() {
  divEl.innerHTML = '';
}
