let now = new Date();

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());
  let currentFormatDate = `${day} ${hours}:${minutes}`;
  return currentFormatDate;
}
let currentDate = document.querySelector(".current-date");
currentDate.innerHTML = formatDate(now);

function displayWeatherCondition(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#temp-day").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidityCurrent = response.data.main.humidity;
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: ${humidityCurrent}%`;
  let windCurrent = Math.round(response.data.wind.speed);

  document.querySelector(".wind").innerHTML = `Wind: ${windCurrent}km/h`;
  document.querySelector(".weather-desc").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".input-search").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchForm = document.querySelector(".form-search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(".btn-current");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Dnipro");
