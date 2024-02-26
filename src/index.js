let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// my api key, need the url
let myApiKey = "48bf6of5134a63ab203acfc50316tbd4";
let units = "metric";
let currentCity = document.querySelector("#cityName").innerHTML;

let myUrl = `https://api.shecodes.io/weather/v1/current?query=${currentCity}&key=${myApiKey}&units=${units}`;

function changeWeatherInfo(response) {
  let currentWeather = document.querySelector("#forecast");
  currentWeather.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let myIcon = document.querySelector("#icon");
  let temp = document.querySelector("#currTemp");
  myIcon.src = response.data.condition.icon_url;
  temp.innerHTML = Math.round(response.data.temperature.current);
  getData(response.data.city);
}
axios.get(myUrl).then(changeWeatherInfo);

function dateCreation(date) {
  date = new Date();
  let day = date.getDay();
  day = days[day];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formatted = `${day} ${hours}:${minutes}`;
  let dateTime = document.querySelector("#dateTime");
  dateTime.innerHTML = formatted;
}

function updateInfo(event) {
  event.preventDefault(); //preventing reload
  let city = document.querySelector("#cityName"); //fetching city name
  let searchValue = document.querySelector("#searchBar"); //targeting value put in searchbar
  city.innerHTML = searchValue.value; //changing our city to the element inside the search bar
  myUrl = `https://api.shecodes.io/weather/v1/current?query=${city.innerHTML}&key=${myApiKey}&units=${units}`;
  console.log(myUrl);
  axios.get(myUrl).then(changeWeatherInfo);
}

let searchBox = document.querySelector("#searchForm");
searchBox = addEventListener("submit", updateInfo);
dateCreation();

function getData(city) {
  let apiKey = "48bf6of5134a63ab203acfc50316tbd4";
  let myUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  axios(myUrl).then(forecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let forecastD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function forecast(response) {
  let forecast = document.querySelector("#forecastDays");
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div id = "forecast">
    <span id="day">${formatDay(day.time)}</span> <br>
    <span  id="icon"> <img src="${day.condition.icon_url}"></span><br>
    <span id="temp"><span id="minTemp">${Math.round(
      day.temperature.maximum
    )}</span>°<span id="maxTemp"> ${Math.round(
          day.temperature.minimum
        )}</span>°</div> 
        </div>`;
    }
  });

  forecast.innerHTML = forecastHtml;
}
