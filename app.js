// access to elements
const inputSearchElem = document.getElementById("input-search");
const cityTextElem = document.getElementById("city-text");
const dateTextElem = document.getElementById("date");
const tempTextElem = document.getElementById("temp");
const tempMaxTextElem = document.getElementById("temp-max");
const tempMinTextElem = document.getElementById("temp-min");
const humidityTextElem = document.getElementById("humitidy");
const cloudyTextElem = document.getElementById("cloudy");
const windTextElem = document.getElementById("wind");
const bgCoverElem = document.getElementById("bgCover");
const moduleElem = document.getElementById("module");
const bntCloseModuleElem = document.getElementById("btn-close-module");
let cityName = "iran";

const loadPage = () => {
  if (cityName) {
    getDataWeather();
    resizePage();
  }
};

const getDataWeather = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=81721fee3d7a9e75a4fe9ed4e0f4b170`
  )
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        moduleElem.classList.remove("module__close");
        moduleElem.classList.add("module__open");
        bntCloseModuleElem.style.visibility = "visible";
      } else {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      if (data) {
        console.log("yes");
        allDataWeather = data;
        setValueElements(data);
      }
    });
};

const onKeyDownHandlerPage = (event) => {
  if (event.key == "Enter") {
    cityName = event.target.value;
    getDataWeather();
  }
};

const setValueElements = (data) => {
  cityTextElem.innerHTML = data.name;

  const kelvinToCelsius = Number(data.main.temp - 273.15);
  tempTextElem.innerHTML = kelvinToCelsius.toFixed(2);

  const date = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const formatted = date.toLocaleString("en-GB", options);
  dateTextElem.innerHTML = formatted;

  const tempMaxeValue = Number(data.main.temp_max) - 273.15;
  tempMaxTextElem.innerHTML = tempMaxeValue.toFixed(2) + "°";

  const tempMinValue = Number(data.main.temp_min) - 273.15;
  tempMinTextElem.innerHTML = tempMinValue.toFixed(2) + "°";

  humidityTextElem.innerHTML = data.main.humidity + "%";

  cloudyTextElem.innerHTML = data.clouds.all + "%";

  const wind = Number(data.wind.speed) * 3.6;
  windTextElem.innerHTML = wind.toFixed(1) + " km/h";
};

const resizePage = () => {
  console.log();
  if (window.innerWidth > 768) {
    bgCoverElem.setAttribute("src", "./images/bg-weather.png");
  } else if (window.innerWidth > 576) {
    bgCoverElem.setAttribute("src", "./images/bg-weather-tablet.png");
  } else {
    bgCoverElem.setAttribute("src", "./images/bg-weather-mobile.png");
  }
};

const closeModule = () => {
  moduleElem.classList.remove("module__open");
  moduleElem.classList.add("module__close");
  bntCloseModuleElem.style.visibility = "hidden";
};

window.addEventListener("load", loadPage);
window.addEventListener("resize", resizePage);
bntCloseModuleElem.addEventListener("click", closeModule);
window.addEventListener("keyup", onKeyDownHandlerPage);
