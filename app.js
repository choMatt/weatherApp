
const apiKey = "1efdb0fc02bf4fbdc89bb8f2ec21d848";
const form = document.querySelector(".search-container"); 

form.addEventListener('submit', handleFormSubmit);


// todo: Add more weather condition icon
// todo: redesign the input area in css
// todo: refactor a bit 

// - handle the users input request and process all the data back.
async function handleFormSubmit(event) { 
  const cityInput = document.querySelector('.inputBar'); 
  event.preventDefault(); 
  const location = cityInput.value; 
  try { 
    const [latitude, longitude] = await getLocation(location); 
    await getWeatherData(latitude, longitude, apiKey); 
    await getForecast(latitude, longitude, apiKey); 
  } catch (error) { 
    console.log("Error:", error.message); 
  } 
}  

// - Take the location of what the user has entered on the form.
async function getLocation(location) { 
  const baseURL = 'http://api.openweathermap.org/geo/1.0'; 
  const locationReq = `${baseURL}/direct?q=${location}&appid=${apiKey}`; 
   
  try { 
    const res = await axios.get(locationReq); 
    return [res.data[0].lat, res.data[0].lon]; 
  } catch (error) { 
    console.log("Error fetching location", error); 
    if (error.response) { 
      console.log(error.response.data); 
      console.log(error.response.status); 
      console.log(error.response.headers); 
    } else if (error.request) { 
      console.log(error.request); 
    } else { 
      console.log('Error', error.message); 
    } 
    console.log(error.config); 
  } 
}

// - Receive the weather details/data from OpenWeather.
async function getWeatherData(lat, long, apiKey) { 
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather"; 
  const units = "metric"; 
  const weatherReq = `${baseUrl}?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`; 
   
  try { 
    const res = await axios.get(weatherReq); 
    console.log(res)
    if (res.status !== 200){
      throw new Error(`Error fetching weather data. Status code: ${res.status}`); 
    } 
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
    if (error.response) { 
      console.log(error.response.data); 
      console.log(error.response.status); 
      console.log(error.response.headers); 
    } else if (error.request) { 
      console.log(error.request); 
    } else { 
      console.log('Error', error.message); 
    } 
    console.log(error.config); 
  } 

}  

// - Recieve the Forecast temp and weather conditon data from OpenWeather.
async function getForecast(lat, long, apiKey){ 
  const baseURL = `http://api.openweathermap.org/data/2.5/forecast`; 
  const units = 'metric'; 
  const forecastReq = `${baseURL}?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`; 

  try { 
    const res = await axios.get(forecastReq); 
    if (res.status !== 200) { 
      throw new Error(`Error fetching forecast data. Status code: ${res.status}`); 
      return; 
    } 
    const tempTomorrow = res.data.list[7].main.temp; 
    const tempMonday = res.data.list[15].main.temp; 
    const tempTuesday = res.data.list[23].main.temp; 
    const condTomorrow = res.data.list[7].weather[0].main; 
    const condMonday = res.data.list[15].weather[0].main; 
    const condTuesday =  res.data.list[23].weather[0].main; 
    forecastTempDisplay(tempTomorrow, tempMonday, tempTuesday); 
    forecastIconDisplay(condTomorrow, condMonday, condTuesday); 
  } catch (error) { 
    console.log("Error fetching forecast data", error); 
    if (error.response) { 
      console.log(error.response.data); 
      console.log(error.response.status); 
      console.log(error.response.headers); 
    } else if (error.request) { 
      console.log(error.request); 
    } else { 
      console.log('Error', error.message); 
    } 
    console.log(error.config); 
  }; 

}

// - Get the data on getWeatherData() and display it.
function weatherDataDisplay(maintemp, feelslike, humidity, wind, visibility){
  const mainTempDisplay = document.querySelector(".Weather-temp");
  const feelsLikeDisplay = document.querySelector(".feels-like-display");
  const humidityDisplay = document.querySelector(".humidity-display");
  const windDisplay = document.querySelector(".wind-display");
  const visibilityDisplay = document.querySelector(".visibility-display");

  mainTempDisplay.textContent = Math.floor(maintemp);
  feelsLikeDisplay.textContent = Math.floor(feelslike);
  humidityDisplay.textContent = humidity;
  windDisplay.textContent = wind;
  visibilityDisplay.textContent = Math.floor(visibility);
}

// - Get the weather condition from getWeatherData() and display it.
function weatherIconDisplay(condition) {
  const weatherHeadingDisplay = document.querySelector(".heading-display");
  const imageDisplay = document.querySelector(".icons");

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

// - Get the weather condition on getForecast() and display it.
function forecastIconDisplay(tomorrow, monday, tuesday) {
  const tomorrowIcon = document.querySelector(".tomorrow-icon");
  const mondayIcon = document.querySelector(".monday-icon");
  const tuesdayIcon = document.querySelector(".tuesday-icon");

  const weatherIcons = {
    Clear: "/WeatherIcons/Sunny.svg",
    Clouds: "/WeatherIcons/Clouds.svg",
    Thunderstorm: "/WeatherIcons/Storm.svg",
    Rain: "/WeatherIcons/Rain.svg"
  };
 
  tomorrowIcon.setAttribute("src", `${weatherIcons[tomorrow]}`);
  mondayIcon.setAttribute("src", `${weatherIcons[monday]}`);
  tuesdayIcon.setAttribute("src", `${weatherIcons[tuesday]}`);
}

// - Get the forecast condition from the getForecast() and display it
function forecastTempDisplay(tom, mon, tues){
  const tomTemp = document.querySelector(".tomorrow-temperature")
  const monTemp = document.querySelector(".monday-temperature")
  const tuesTemp = document.querySelector(".tuesday-temperature")

  tomTemp.textContent = Math.floor(tom);
  monTemp.textContent = Math.floor(mon);
  tuesTemp.textContent = Math.floor(tues);
}

