const searchButton = document.querySelector('#search-btn');

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const newsCards = this.document.querySelector('#loadedNews');
  newsCards.innerHTML = '';
  generateLoaders(cardLoaderTemplate, 6, newsCards);
  const searchTerm = document.querySelector('#keyWord').value;
  axios
    .get(`http://localhost:3000/news/search?keyword=${searchTerm}`)
    .then((res) => {
      newsCards.innerHTML = '';

       
    //   if(res.data.news.lenfth){
         loadNews(res.data.news, newsCards);
    //   }else{
    //       newsCards.innerHTML=`<div class="alert alert-light" role="alert">Aucun resultat!</div>`;
    //   }
     
    
    })
    .catch((err) => console.log(err));
});
