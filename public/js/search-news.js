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
      document.bgColor = 'red';
      loadNews(res.data.news, newsCards);
    })
    .catch((err) => console.log(err));
});
