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

let displayDate = document.querySelector("#date");
let currentTime = new Date();
displayDate.innerHTML = formatDate(currentTime);

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

function convertToF(event) {
  event.preventDefault();
  cConvert.classList.remove("active");
  fConvert.classList.add("active");

  let degF = Math.round(celsiusTemp * 1.8 + 32);
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = degF;

  let minTemp = Math.round(celsiusMin * 1.8 + 32);
  let cMin = document.querySelector("#minTemp");
  cMin.innerHTML = `${minTemp}°`;

  let maxTemp = Math.round(celsiusMax * 1.8 + 32);
  let cMax = document.querySelector("#maxTemp");
  cMax.innerHTML = `${maxTemp}°`;

  let windImperial = Math.round(windMetric / 1.60934);
  let windImp = document.querySelector("#windData");
  windImp.innerHTML = `${windImperial}mph`;
}

let fConvert = document.querySelector("#fUnit");
fConvert.addEventListener("click", convertToF);

function convertToC(event) {
  event.preventDefault();
  fConvert.classList.remove("active");
  cConvert.classList.add("active");

  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = `${Math.round(celsiusTemp)}`;

  let cMin = document.querySelector("#minTemp");
  cMin.innerHTML = `${Math.round(celsiusMin)}°`;

  let cMax = document.querySelector("#maxTemp");
  cMax.innerHTML = `${Math.round(celsiusMax)}°`;

  let windImp = document.querySelector("#windData");
  windImp.innerHTML = `${Math.round(windMetric)}kmh`;
}

let cConvert = document.querySelector("#cUnit");
cConvert.addEventListener("click", convertToC);
