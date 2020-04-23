const searchButton = document.querySelector("#search-btn");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchTerm = document.querySelector("#keyWord").value;
  if (!searchTerm.length) {
    return;
  }
  const newsCards = document.querySelector("#loadedNews");
  const newsTitlesZone = document.querySelector(".row.mt-4.mb-4");
  if (newsTitlesZone.children.length === 3) {
    newsTitlesZone.removeChild(newsTitlesZone.lastElementChild);
  }
  newsCards.innerHTML = "";
  generateLoaders(cardLoaderTemplate, 6, newsCards);

  axios
    .get(`/news/search?keyword=${searchTerm}`)
    .then((res) => {
      newsCards.innerHTML = "";
      newsTitlesZone.insertAdjacentHTML(
        "beforeend",
        `<div class="col-sm-12" style="text-align:start">
          <p>
            ${res.data.length > 0 ? res.data.length : "Aucun"} résultats
          </p>
        </div>`
      );
      loadNews(res.data, newsCards);
    })
    .catch((err) => console.log(err));
});
