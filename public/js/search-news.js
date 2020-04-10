const searchButton = document.querySelector('#search-btn');

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const searchTerm = document.querySelector('#keyWord').value;
  if(!searchTerm.length){
      return;
  }
  const newsCards = document.querySelector('#loadedNews');
  const newsTitlesZone=document.querySelector('.row.mt-4.mb-4');
  if(newsTitlesZone.children.length===3){
      newsTitlesZone.removeChild(newsTitlesZone.lastElementChild);
  }
  newsCards.innerHTML = '';
  generateLoaders(cardLoaderTemplate, 6, newsCards);
  
  axios
    .get(`http://localhost:3000/news/search?keyword=${searchTerm}`)
    .then((res) => {
      newsCards.innerHTML = '';
    newsTitlesZone.insertAdjacentHTML('beforeend',`<div class="col-sm-12" style="text-align:start">
        <h4 class="alert alert-light" role="alert">
            ${res.data.news.length} résultats
       </h4>
    </div>  `);
       
    //   if(res.data.news.lenfth){
         loadNews(res.data.news, newsCards);
    //   }else{
    //       newsCards.innerHTML=`<div class="alert alert-light" role="alert">Aucun resultat!</div>`;
    //   }
     
    
    })
    .catch((err) => console.log(err));
});
