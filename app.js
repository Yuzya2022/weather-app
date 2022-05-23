function formatDate() {
  let now = new Date();
  let pageDate = document.querySelector("p.date");
  let hour = now.getHours();
  if (hour<10) {
    hour=`0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute<10) {
    minute=`0${minute}`
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return (pageDate.innerHTML = `${day} ${hour}:${minute}`);
}
console.log(formatDate());

function dispayWeather(response){
  console.log(response.data);
  document.querySelector("#city").innerHTML=response.data.name;
  let temp=Math.round(response.data.main.temp); 
  document.querySelector("#temperature").innerHTML= `${temp}°C`
  let humidity = Math.round(response.data.main.humidity);
  document.querySelector("#humidity").innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `Wind is: ${wind} km/hour`;
  let description = response.data.weather[0].main;
document.querySelector("#description").innerHTML =` ${description}`;
}
function searchLocation(position) {
  let apiKey ="ae90fe1370b958ce3e09241e935b028f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(dispayWeather);
}

function go(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
 
}

function searchCity(city) {
let apiKey ="ae90fe1370b958ce3e09241e935b028f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(dispayWeather);
}
let form = document.querySelector("#form");
form.addEventListener("submit", go);

searchCity("Kyiv");


function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);
