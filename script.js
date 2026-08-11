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

const errorMessage = document.getElementById("error-message");
const loading = document.getElementById("loading");

// ========================================
// SEARCH BUTTON EVENT
// ========================================

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    // Check if user entered a city
    if (city === "") {
        errorMessage.textContent = "Please enter your city name";
        return;
    }

    errorMessage.textContent = "";

    // Fetch weather data
    weather(city);
});

// ========================================
// FETCH WEATHER DATA FROM API
// ========================================

async function weather(city) {

    loading.textContent = "Loading...";

    try {

        // ========================================
        // OPENWEATHER API
        // ========================================

        const apiKey = "f2b4553add4e83993de3b0c58d60e077";

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        // ========================================
        // ERROR HANDLING
        // ========================================

        if (data.cod == 404) {
            errorMessage.textContent = "City not found";
            return;
        }

        errorMessage.textContent = "";

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
            `${Math.round(data.wind.speed * 3.6)} km/h`;

        // ========================================
        // UPDATE WEATHER ICON
        // ========================================

        const iconCode = data.weather[0].icon;

        const iconUrl =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        weatherIcon.src = iconUrl;

        // ========================================
        // UPDATE BACKGROUND IMAGE
        // ========================================

        const weatherCondition = data.weather[0].main;

        const backgrounds = {
            Clouds: "assets/cloudy.webp.webp",
            Haze: "assets/haze.png.webp",
            Mist: "assets/mist.png.webp",
            Rain: "assets/rain.png.webp",
            Snow: "assets/snow.webp.webp",
            Clear: "assets/sunny.webp.webp",
            Thunderstorm: "assets/thunder.webp.webp"
        };

        document.body.style.backgroundImage =
            `url('${backgrounds[weatherCondition] || "assets/default.png.webp"}')`;

        console.log(weatherCondition);

    } catch (error) {

        errorMessage.textContent =
            "Something went wrong. Please try again.";

        console.error(error);

    } finally {

        loading.textContent = "";

    }
}

// ========================================
// DEFAULT WEATHER ON PAGE LOAD
// ========================================

weather("Delhi");