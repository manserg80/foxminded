"use strict";

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const weatherData = document.getElementById("weather-data");

const getIconUrl = iconCode => `https://openweathermap.org/img/w/${iconCode}.png`;

searchBtn.addEventListener("click", function() {
  const location = searchInput.value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f3ee347f30e6a8f4477cce6f410b31e5&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      const weather = data.weather[0].description;
      const temp = data.main.temp;
      const feelsLike = data.main.feels_like;
      const tempMin = data.main.temp_min;
      const tempMax = data.main.temp_max;
      const iconCode = data.weather[0].icon;
      const iconUrl = getIconUrl(iconCode);

      weatherData.innerHTML = `
        <h2>Location: ${location}</h2>
        <h4 class="weather">Weather: ${weather}</h4>
        <h1>Temp: ${Math.round(temp)} &#8451;</h1>
        <p>Feels Like: ${Math.round(feelsLike)} &#8451;</p>
        <div class="temp-container">
            <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${Math.round(tempMin)} &#8451;</h4>
            </div>
            <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${Math.round(tempMax)} &#8451;</h4>
            </div>
            <img src="${iconUrl}" alt="${weather}" />
        </div>
      `;
    })
    .catch(error => {
      weatherData.innerHTML = `
        <p>There was an error retrieving the weather data for ${location}.</p>
      `;
      console.error("Error fetching weather data:", error);
    });

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=f3ee347f30e6a8f4477cce6f410b31e5&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network problem, please check your connection!");
      }
      return response.json();
    })
    .then(data => {
      const forecastData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

      let forecastHtml = "<h2>5 Day Forecast:</h2>";
      forecastData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });
        const weather = item.weather[0].description;
        const tempMin = item.main.temp_min;
        const tempMax = item.main.temp_max;
        const iconCode = item.weather[0].icon;
        const iconUrl = getIconUrl(iconCode);

        forecastHtml += `
          <div class="day-forecast">
            <div class="forecast">
              <p>${day}</p>
            </div>
            <div class="forecast">
            <img src="${iconUrl}" alt="${weather}" />
            </div>
            <div class="forecast">
              <p>${weather}</p>
            </div>
            <div class="forecast">
              <p>min: ${Math.round(tempMin)} &#8451;</p>
              <p>max: ${Math.round(tempMax)} &#8451;</p>
            </div>
          </div>
        `;
      });

      weatherData.innerHTML += forecastHtml;
    })
    .catch(error => {
      weatherData.innerHTML = `
        <p>There was an error retrieving the forecast data for ${location}.</p>
      `;
      console.error("Error fetching forecast data:", error);
    });
});