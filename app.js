const root = document.getElementById("root");
const spinner = document.getElementById("spinner-container");
const noResultsMessage = document.querySelector(".no-results");

const allPages = document.getElementById("all-pages");
const currentPage = document.getElementById("current-page");
const firstPage = document.getElementById("first-page");
const lastPage = document.getElementById("last-page");
const nextPage = document.getElementById("next-page");
const previusPage = document.getElementById("previus-page");

const charactersList = document.getElementById("characters");
const menCharacters = document.getElementById("male-characters");
const womenCharacters = document.getElementById("female-characters");
const unknownCharacters = document.getElementById("unknown-characters");
const genderlessCharacters = document.getElementById("genderless-characters");

let data = {};
let pages = 1;
let total = 0;

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const fetchCharactersData = async () => {
  const url = `https://rickandmortyapi.com/api/character?page=${pages}`;
  const response = await fetch(url);
  const json = await response.json();

  total = json.info.pages;
  currentPage.innerHTML = pages;
  allPages.innerHTML = total;
  data = json;

  const printPromise = new Promise((resolve) => {
    requestAnimationFrame(() => {
      renderCharacterCards(json.results);
      resolve();
    });
  });

  await Promise.all([printPromise]);

  updatePaginationButtons();

  root.classList.remove("hide__spinner");
  spinner.classList.add("hide__spinner");

  return json;
};

const renderCharacterCards = (arr) => {
  const cards = arr.map(
    (character) => `
    <div class="card">
      <div class="card-image">
        <img src=${character.image}>
      </div>
      <div class="card-content">
        <p><strong>Nombre:</strong> ${character.name}</p>
        <p><strong>Género:</strong> ${character.gender}</p>
        <p><strong>Especie:</strong> ${character.species}</p>
        <p><strong>Estado:</strong> ${character.status}</p>
        <p><strong>Origen:</strong> ${character.origin.name}</p>
        <p><strong>Ubicación:</strong> ${character.location.name}</p>
      </div>
    </div>
  `
  );

  root.innerHTML = cards.join("");
};

const managePageNavigation = async (promise) => {
  const result = await promise;

  nextPage.addEventListener("click", () => {
    if (pages < result.info.pages) {
      pages += 1;
      fetchCharactersData();
      noResultsMessage.style.display = "none";
      scrollToTop();
    }
  });

  previusPage.addEventListener("click", () => {
    if (pages > 1) {
      pages -= 1;
      fetchCharactersData();
      noResultsMessage.style.display = "none";
      scrollToTop();
    }
  });

  lastPage.addEventListener("click", () => {
    if (pages < result.info.pages) {
      pages = result.info.pages;
      fetchCharactersData();
      noResultsMessage.style.display = "none";
      scrollToTop();
    }
  });

  firstPage.addEventListener("click", () => {
    if (pages > 1) {
      pages = 1;
      fetchCharactersData();
      noResultsMessage.style.display = "none";
      scrollToTop();
    }
  });
};

const updatePaginationButtons = () => {
  previusPage.disabled = firstPage.disabled = pages <= 1;
  nextPage.disabled = lastPage.disabled = pages === total;
};

const filterAndPrintCharacters = (gender) => {
  const arr = data.results;
  const filteredCharacters = gender
    ? arr.filter((character) => character.gender === gender)
    : arr;

  root.innerHTML = "";

  if (filteredCharacters.length === 0) {
    noResultsMessage.style.display = "block";
  } else {
    noResultsMessage.style.display = "none";
    renderCharacterCards(filteredCharacters);
  }
};

womenCharacters.addEventListener("click", () => {
  filterAndPrintCharacters("Female");
});

menCharacters.addEventListener("click", () => {
  filterAndPrintCharacters("Male");
});

charactersList.addEventListener("click", () => {
  filterAndPrintCharacters(null);
});

unknownCharacters.addEventListener("click", () => {
  filterAndPrintCharacters("unknown");
});

genderlessCharacters.addEventListener("click", () => {
  filterAndPrintCharacters("Genderless");
});

managePageNavigation(fetchCharactersData());
