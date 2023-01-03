// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

const weatherApi = {
  key: "bab281d79e5f1e9755a68d754cc313e7",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

const searchInputBox = document.getElementById("input-box");

// Event Listener Function on keypress
searchInputBox.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    document.querySelector(".weather-body").style.display = "block";
  }
});

// Get Weather Report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather) {
  console.log(weather);

  let city = document.getElementById("city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let minMaxTemp = document.getElementById("min-max");
  minMaxTemp.innerHTML = `${Math.floor(
    weather.main.temp_min
  )}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

  let weatherType = document.getElementById("weather");
  weatherType.innerText = `${weather.weather[0].main}`;

  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);

  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage =
      "url('http://maharlika.tv/wp-content/uploads/2020/11/1553828584-Fair-weather-expected-in-most-parts-of-the-island-3.jpg')";
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage =
      "url('https://images.indianexpress.com/2014/07/weather-m.jpg?w=389')";
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage =
      "url('https://www.gannett-cdn.com/authoring/2020/01/14/NSAJ/ghows-KS-9c1c6764-dc32-5196-e053-0100007ffdaf-9242f86b.jpeg')";
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage =
      "url('https://images.livemint.com/img/2022/01/22/1600x900/imd_forecast_1642842568539_1642842568713.jpg')";
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage =
      "url('https://quatr.us/wp-content/uploads/2017/08/snowing-300x168.jpg')";
  } else if (weatherType.textContent == "Thunderstorm") {
    document.body.style.backgroundImage =
      "url('https://www.skymetweather.com/content/wp-content/uploads/2019/04/Lightning-and-rain-in-Patna_The-Quint-600.jpg')";
  } else {
    document.body.style.backgroundImage =
      "https://favbulous.com/wp-content/uploads/2013/08/646.jpg')";
  }
}

// Date manage
function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}
