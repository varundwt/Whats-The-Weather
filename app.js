const apiKey = "8237cab4faabbc43f64c9a1cdf207a6a";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather_icon");

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector("footer").innerHTML =
      "Copyright © " + currentYear + ", By Varun Pandey";
  } else {
    var data = await response.json();

    const descriptionShow = data.weather[0].description;
    const descriptionOutput =
      descriptionShow.charAt(0).toUpperCase() + descriptionShow.slice(1);
    const visibilityShow = data.visibility;
    const visibilityOutput = visibilityShow * 0.001;
    const currentYear = new Date().getFullYear();

    document.querySelector(".city").innerHTML =
      data.name + ", " + data.sys.country;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".description").innerHTML = descriptionOutput;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".visibility").innerHTML = visibilityOutput + " km";
    document.querySelector(".coordinates_data").innerHTML =
      "" + data.coord.lon + "," + data.coord.lat;
    document.querySelector("footer").innerHTML =
      "Copyright © " + currentYear + ", By Varun Pandey";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "/Source Files/Weather SVG/cloudy.svg";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "/Source Files/Weather SVG/clear.svg";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "/Source Files/Weather SVG/heavy_rain.svg";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "/Source Files/Weather SVG/snow.svg";
    } else if (
      data.weather[0].main == "Mist" ||
      "Smoke" ||
      "haze" ||
      "Dust" ||
      "Fog" ||
      "Sand" ||
      "Ash" ||
      "Squall" ||
      "Tornado"
    ) {
      weatherIcon.src = "/Source Files/Weather SVG/mist.svg";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "/Source Files/Weather SVG/drizzle.svg";
    } else if (data.weather[0].main == "Thunderstorm") {
      weatherIcon.src = "/Source Files/Weather SVG/thunderstorm.svg";
    }

    const speechButtonSpeak = document.getElementById("speechButton");
    speechButtonSpeak.addEventListener("click", () => {
      var message =
        "The weather for ..." +
        data.name +
        "...is..." +
        descriptionOutput +
        "...today..." +
        "and The temperature is ..." +
        Math.round(data.main.temp) +
        "°Celcius" +
        ".";
      const speakWeather = new SpeechSynthesisUtterance(message);
      speakWeather.rate = 0.8;
      speechSynthesis.speak(speakWeather);
    });

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

var mode = document.getElementById("mode");
mode.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    mode.src = "/Source Files/Weather SVG/light_mode.svg";
  } else {
    mode.src = "/Source Files/Weather SVG/dark_mode.svg";
  }
};

searchButton.addEventListener("click", () => {
  window.scrollTo(0, 335);
  checkWeather(searchBox.value);
});

searchBox.addEventListener(
  ("keydown",
  function (e) {
    if (e.key === "Enter") {
      window.scrollTo(0, 200);
      checkWeather(searchBox.value);
    }
  })
);
