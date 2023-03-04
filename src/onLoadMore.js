import {page, searchQuery, API_KEY} from './index'

export default async function onLoadMore() {
    page += 1;
    const respons = await fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=20&page=${page}`
    );
  
    const newHits = await respons.json();
  
    return newHits.hits;
  }

  // async function onLoadMore() {
//   page += 1;
//   const respons = await fetch(
//     `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=20&page=${page}`
//   );

//   const newHits = await respons.json();

//   return newHits.hits;
// }
