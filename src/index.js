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
console.log(currentCity);
let myUrl = `https://api.shecodes.io/weather/v1/current?query=${currentCity}&key=${myApiKey}&units=${units}`;
console.log(myUrl);

function changeWeatherInfo(response) {
  let currentWeather = document.querySelector("#forecast");
  currentWeather.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let myIcon = document.querySelector("#icon");
  console.log(myIcon);
  let temp = document.querySelector("#currTemp");
  console.log(temp);
  myIcon.src = response.data.condition.icon_url;
  temp.innerHTML = response.data.temperature.current;
  console.log(myIcon);
  console.log(temp);
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
findCity();
