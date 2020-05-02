const form = document.getElementById("searchFactChecksForm");
form.addEventListener("submit", (event) => {
  let valid = true;
  const keyword = form.elements["keyword"];
  console.log(keyword.value);
  if (keyword.value.trim() === "") {
    event.preventDefault();
    document.getElementById("keyword").setAttribute("disabled", "");
    window.location.href = "/";
  }
});

function error(input, message) {
  input.className = "error";
  const error = input.previousElementSibling;
  error.innerText = message;
  return false;
}

function success(input) {
  input.className = "success";
  const error = input.previousElementSibling;
  error.innerText = "";
  return true;
}

function requireValue(input, message) {
  return input.value.trim() === "" ? error(input, message) : success(input);
}

// const searchButton = document.querySelector("#search-btn");
// searchButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   const searchTerm = document.querySelector("#keyword").value;
//   if (!searchTerm.length) {
//     return;
//   }
//   const newsCards = document.querySelector("#loadedNews");
//   const newsTitlesZone = document.querySelector(".row.mt-4.mb-4");
//   if (newsTitlesZone.children.length === 3) {
//     newsTitlesZone.removeChild(newsTitlesZone.lastElementChild);
//   }
//   newsCards.innerHTML = "";
//   generateLoaders(cardLoaderTemplate, 6, newsCards);

//   axios
//     .get(`/factchecks/search?keyword=${searchTerm}`)
//     .then((res) => {
//       newsCards.innerHTML = "";
//       newsTitlesZone.insertAdjacentHTML(
//         "beforeend",
//         `<div class="col-sm-12" style="text-align:start">
//           <p>
//             ${res.data.length > 0 ? res.data.length : "Aucun"} résultats
//           </p>
//         </div>`
//       );
//       loadNews(res.data, newsCards);
//     })
//     .catch((err) => console.log(err));
// });
