function formatDate(date) {
  let now = new Date();
  let days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

let displayDate = document.querySelector("#date");
let currentTime = new Date();
displayDate.innerHTML = formatDate(currentTime);

function getForecast(coordinates) {
  let apiKey = "215576bab28022db35e6e64f040e1b56";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = `${response.data.name}`;
  document.querySelector(
    "#weatherDescription"
  ).innerHTML = `${response.data.weather[0].description}`;

  document
    .querySelector("#tempIcon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#minTemp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("#maxTemp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#precipitationData").innerHTML =
    response.data.main.humidity;
  document.querySelector("#windData").innerHTML = `${Math.round(
    response.data.wind.speed
  )}kmh`;

  celsiusTemp = response.data.main.temp;
  celsiusMin = response.data.main.temp_min;
  celsiusMax = response.data.main.temp_max;
  windMetric = response.data.wind.speed;

  getForecast(response.data.coord);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 3) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-9" id="forecastDay">${formatDay(forecastDay.dt)}</div>
        <div class="col-3" id="forecastTemp">
          <span class="forecast-min-tomorrow">${Math.round(
            forecastDay.temp.min
          )}°</span>
           | 
          <span class="forecast-max-tomorrow">${Math.round(
            forecastDay.temp.max
          )}°</span>
          
        </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchCity(city) {
  let apiKey = "215576bab28022db35e6e64f040e1b56";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getData(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-icon");
searchForm.addEventListener("click", getData);

let celsiusTemp = null;
let celsiusMin = null;
let celsiusMax = null;
let windMetric = null;

searchCity("Dublin");
