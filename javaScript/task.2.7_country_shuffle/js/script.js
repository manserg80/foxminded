const countriesContainer = document.getElementById("countries-container");
const searchInput = document.getElementById("search-input");
const regionSelect = document.getElementById("region-select");
const loader = document.getElementById("loader");
const modeToggle = document.getElementById("mode-toggle");
const refreshButton = document.getElementById("refresh-button");

let countriesData = [];
let filteredCountries = [];

// Fetch data from API and store in array
function fetchData() {
  showLoader();
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      // Select 20 random countries using slice()
      const randomCountries = data.slice().sort(() => 0.5 - Math.random()).slice(0, 20);
      countriesData = randomCountries;
      filteredCountries = randomCountries;
      displayCountries(filteredCountries);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      hideLoader();
    });
}

// Display countries on page
function displayCountries(countries) {
  countriesContainer.innerHTML = "";
  if (countries.length === 0) {
    countriesContainer.innerHTML = "<p>No matches found.</p>";
  } else {
    [...countries].map((country) => {
      const countryCard = document.createElement("div");
      countryCard.classList.add("country-card");
      countryCard.innerHTML = `
        <img src="${country.flags.png}" alt="${country.name.common}" />
        <h2>${country.name.common}</h2>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
      `;
      countriesContainer.appendChild(countryCard);
    });
  }
}

//Refreshing displayed countries
refreshButton.addEventListener("click", () => {
    fetchData();
});

// Filter countries by search input
searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  filteredCountries = countriesData.filter((country) => {
    return country.name.common.toLowerCase().includes(searchTerm);
  });
  displayCountries(filteredCountries);
});

// Filter countries by region select
regionSelect.addEventListener("change", (event) => {
  const region = event.target.value;
  if (region === "") {
    filteredCountries = countriesData;
  } else {
    filteredCountries = countriesData.filter((country) => {
      return country.region === region;
    });
  }
  displayCountries(filteredCountries);
});

// Toggle dark/light mode
modeToggle.addEventListener("click", () => {
  const body = document.body;
  body.classList.toggle("dark-mode");
  modeToggle.textContent = body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});

// Show loader while fetching data
function showLoader() {
  loader.style.display = "block";
}

// Hide loader after data is fetched
function hideLoader() {
  loader.style.display = "none";
}

// Load data on page load
fetchData();