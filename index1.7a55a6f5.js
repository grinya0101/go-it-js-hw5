const e=document.querySelector(".search-form"),n=document.querySelector(".load-more"),t=document.querySelector(".gallery");console.log(t);e.addEventListener("submit",(function(e){e.preventDefault(),t.innerHTML="",a=e.currentTarget.elements.searchQuery.value,fetch(`https://pixabay.com/api/?key=29209271-716f3ea82b952e36eef48fa19&q=${a}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3&page=1`).then((e=>e.json())).then((e=>(o=1,e.hits))).then(i)})),n.addEventListener("click",(function(){(o+=1,fetch(`https://pixabay.com/api/?key=29209271-716f3ea82b952e36eef48fa19&q=${a}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3&page=${o}`).then((e=>e.json())).then((e=>e.hits))).then(i)}));let a="",o=1;function i(e){const n=e.map((({webformatURL:e,largeImageURL:n,tags:t,likes:a,views:o,comments:i,downloads:s})=>`\n    <div class="photo-card">\n  <img src="${e}" alt="${t}" loading="lazy" />\n  <div class="info">\n    <p class="info-item">\n      <b>${a}</b>\n    </p>\n    <p class="info-item">\n      <b>${o}</b>\n    </p>\n    <p class="info-item">\n      <b>${i}</b>\n    </p>\n    <p class="info-item">\n      <b>${s}</b>\n    </p>\n  </div>\n</div>\n`)).join("");t.insertAdjacentHTML("beforeend",n)}
//# sourceMappingURL=index1.7a55a6f5.js.map