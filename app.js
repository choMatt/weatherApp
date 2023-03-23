
const apiKey = "1efdb0fc02bf4fbdc89bb8f2ec21d848"
const form = document.querySelector(".search-bar");
const cityInput = document.querySelector('.inputBar')
const mainTempDisplay = document.querySelector(".Weather-temp")
const feelsLikeDisplay = document.querySelector(".feels-like-display")
const humidityDisplay = document.querySelector(".humidity-display")
const windDisplay = document.querySelector(".wind-display")
const visibilityDisplay = document.querySelector(".visibility-display")
const weatherHeadingDisplay = document.querySelector(".heading-display")

form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();
  const location = cityInput.value
  const [latitude, longitude] = await getLocation(location)
  await getWeatherData(latitude, longitude)
}


async function getLocation(location) {
    try{  
        const baseURL = 'http://api.openweathermap.org/geo/1.0';
        const locationReq = `${baseURL}/direct?q=${location}&appid=${apiKey}`;
        const res = await axios.get(locationReq)
        return [res.data[0].lat, res.data[0].lon]
    } catch(error){
        console.log("Error", error)
    }    
}

  async function getWeatherData(latitude, longitude) {
    try {
          const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
          const units = 'metric'
          const weatherReq = `${baseUrl}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}` 
          const res = await axios.get(weatherReq)
          const temp = res.data.main.temp
          const feelsLike = res.data.main.feels_like
          const humidity = res.data.main.humidity
          const wind = res.data.wind.speed
          const visibility = res.data.visibility / 1000;
          const weatherCondition = res.data.weather[0].main
          weatherDataDisplay(temp, feelsLike, humidity, wind, visibility)
    } catch (error) {
          console.log("Error", error)
    }
  }

  function weatherDataDisplay(maintemp, feelslike, humidity, wind, visibility){
    mainTempDisplay.textContent = Math.floor(maintemp);
    feelsLikeDisplay.textContent = Math.floor(feelslike);
    humidityDisplay.textContent = humidity;
    windDisplay.textContent = wind;
    visibilityDisplay.textContent = Math.floor(visibility);
  }


  function weatherIconDisplay(){

  }