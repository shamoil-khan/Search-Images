const accesKey = "fxHih7MrsvTIOlOdhxUlZN2u2GAF641NO19_Sy1fWD4";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

// applicationID = 532731;
// secretKey = QXy7T9iPwQC0btZrxY2ViyVQjIQydmPlCA9Bg1BBf8o;

let keyWord = "";
let page = 1;

async function searchImages() {
  keyWord = searchBox.value;
  try {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWord}&client_id=${accesKey}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();

    if (page == 1) {
      searchResult.innerHTML = "";
    }

    const results = data.results;

    results.map((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";

      imageLink.appendChild(image);
      searchResult.appendChild(imageLink);
    });
    searchResult.style.display = "grid";
    showMoreBtn.style.display = "block";
  } catch (error) {
    searchResult.innerHTML =
      "<h1 style='font-weight:500; font-size:22px;'>No Internet</h1>";
    searchResult.style.display = "flex";
    showMoreBtn.style.display = "none";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
