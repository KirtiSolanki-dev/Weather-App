// ========================================
// DOM ELEMENTS
// ========================================

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const cityName = document.getElementById("city-name");
const temprature = document.getElementById("temp");
const description = document.getElementById("description");

const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

const weatherIcon = document.getElementById("weather-icon");


// ========================================
// SEARCH BUTTON EVENT
// ========================================

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    // Check if user entered a city
    if (city === "") {
        alert("Please enter your city name");
        return;
    }

    // Fetch weather data
    weather(city);

});


// ========================================
// FETCH WEATHER DATA FROM API
// ========================================

async function weather(city) {

    // OpenWeather API Key
    const apiKey = "f2b4553add4e83993de3b0c58d60e077";

    // API URL
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Send request to API
    const response = await fetch(url);

    // Convert response into JavaScript object
    const data = await response.json();

    console.log(data);


    // ========================================
    // ERROR HANDLING
    // ========================================

    if (data.cod === "404") {
        alert("City not found");
        return;
    }


    // ========================================
    // UPDATE WEATHER INFORMATION
    // ========================================

    cityName.textContent = data.name;

    temprature.textContent =
        `${Math.round(data.main.temp)}°C`;

    description.textContent =
        data.weather[0].description;

    humidity.textContent =
        `${data.main.humidity}%`;

    windSpeed.textContent =
        `${data.wind.speed} km/h`;


    // ========================================
    // UPDATE WEATHER ICON
    // ========================================

    const iconCode = data.weather[0].icon;

    const iconUrl =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherIcon.src = iconUrl;

    console.log(iconUrl);

}


// ========================================
// DEFAULT WEATHER ON PAGE LOAD
// ========================================

 weather("Delhi");