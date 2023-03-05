import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import onHitsMarkup from './onHitsMarkup'



const formEL = document.querySelector('.search-form');
const btnEl = document.querySelector('.load-more');
const divEl = document.querySelector('.gallery');
console.log(btnEl);

export const API_KEY = '29209271-716f3ea82b952e36eef48fa19';

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
      onHiddenLoadMore()
  }

  return newHits.hits;
}

 async function onLoadMore() {
   page += 1;
 
  const respons = await fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=20&page=${page}`
  );
    
  const newHits = await respons.json();
    console.log(newHits);
  return newHits.hits;
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


export default function onHiddenLoadMore() {
  btnEl.hidden = false;
}     

function feachLoadMoreMurkup() {
  try {
    onLoadMore().then(onHitsMarkup);
  } catch (error) {
    console.log(error);
  }
}


export default function createMarkup(result) {
  divEl.insertAdjacentHTML('beforeend', result);
}

function clearHitsContainer() {
  divEl.innerHTML = '';
}


