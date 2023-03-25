
const apiKey = "1efdb0fc02bf4fbdc89bb8f2ec21d848";
const form = document.querySelector(".search-container");
const cityInput = document.querySelector('.inputBar');
const imageDisplay = document.querySelector(".icons");
const weatherHeadingDisplay = document.querySelector(".heading-display");
const mainTempDisplay = document.querySelector(".Weather-temp");
const feelsLikeDisplay = document.querySelector(".feels-like-display");
const humidityDisplay = document.querySelector(".humidity-display");
const windDisplay = document.querySelector(".wind-display");
const visibilityDisplay = document.querySelector(".visibility-display");


const tomIconDisplay = document.querySelector(".tomIconDisplay")
const monIconDisplay = document.querySelector(".monIconDisplay")
const tuesIconDisplay = document.querySelector(".tuesIconDisplay")


// const tomDataDisplay = document.querySelector(".tomTemp")
// const monDataDisplay = document.querySelector(".monTemp")
// const tuesDataDisplay = document.querySelector(".tuesTemp")


form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();
  const location = cityInput.value;
  const [latitude, longitude] = await getLocation(location);
  await getWeatherData(latitude, longitude, apiKey);
  await getForecast(latitude, longitude, apiKey);
}

async function getLocation(location) {
  const baseURL = 'http://api.openweathermap.org/geo/1.0';
  const locationReq = `${baseURL}/direct?q=${location}&appid=${apiKey}`;
    try{
      const res = await axios.get(locationReq);
      return [res.data[0].lat, res.data[0].lon];
    } catch(error){
      console.log("Error fetching location", error);
    };
}

async function getForecast(lat, long, apiKey){
  const baseURL = `http://api.openweathermap.org/data/2.5/forecast`;
  const units = 'metric';
  const forecastReq = `${baseURL}?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
    try {
      const res = await axios.get(forecastReq)
      const tempTom = res.data.list[7].main.temp;
      const tempMon = res.data.list[15].main.temp;
      const tempTues = res.data.list[23].main.temp;
      const condTom = res.data.list[7].weather[0].main;
      const condMon = res.data.list[15].weather[0].main;
      const condTues =  res.data.list[23].weather[0].main;
      // forecastDataDisplay(tempTom, tempMon, tempTues)
      await forecastIconDisplay(condTom, condMon, condTues)
    } catch (error) {
      console.log("Error fetching forecast data", error)
    };
}

// function forecastDataDisplay(tempTom, tempMon, tempTues){
//   tomDataDisplay.textContent = tempTom
//   monDataDisplay.textContent = tempMon
//   tuesDataDisplay.textContent = tempTues
// }

function forecastIconDisplay(condTom, condMon, condTues) {
  const weatherIcons = {
    Clear: "/WeatherIcons/Sunny.svg",
    Clouds: "/WeatherIcons/Clouds.svg",
    Thunderstorm: "/WeatherIcons/Storm.svg",
    Rain: "/WeatherIcons/Rain.svg",
  };

  const icons = [condTom, condMon, condTues].map(cond => weatherIcons[cond]);
  [tomIconDisplay, monIconDisplay, tuesIconDisplay].forEach((display, index) => {
    display.setAttribute("src", icons[index]);
  });
}

async function getWeatherData(lat, long, apiKey) {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const units = 'metric';
  const weatherReq = `${baseUrl}?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}` ;
    try {
      const res = await axios.get(weatherReq);
      const temp = res.data.main.temp;
      const feelsLike = res.data.main.feels_like;
      const humidity = res.data.main.humidity;
      const wind = res.data.wind.speed;
      const visibility = res.data.visibility / 1000;
      const weatherCondition = res.data.weather[0].main;
      weatherIconDisplay(weatherCondition);
      weatherDataDisplay(temp, feelsLike, humidity, wind, visibility);
    } catch (error) {
      console.log("Error fetching weather data", error);
    };
}

function weatherDataDisplay(maintemp, feelslike, humidity, wind, visibility){
  mainTempDisplay.textContent = Math.floor(maintemp);
  feelsLikeDisplay.textContent = Math.floor(feelslike);
  humidityDisplay.textContent = humidity;
  windDisplay.textContent = wind;
  visibilityDisplay.textContent = Math.floor(visibility);
}


function weatherIconDisplay(condition) {
  const weatherIcons = {
    Clear: "/WeatherIcons/Sunny.svg",
    Clouds: "/WeatherIcons/Clouds.svg",
    Thunderstorm: "/WeatherIcons/Storm.svg",
    Rain: "/WeatherIcons/Rain.svg",
  };

  const icon = weatherIcons[condition];

  imageDisplay.setAttribute("src", icon);
  weatherHeadingDisplay.textContent = condition;
}

