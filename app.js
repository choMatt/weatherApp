
const apiKey = "1efdb0fc02bf4fbdc89bb8f2ec21d848"



const form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();
  const location = document.querySelector('.inputBar').value
  const [latitude, longitude] = await getLocation(location)
  await getWeatherData(latitude, longitude)
}

async function getLocation(location) {
    try{
        const req = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`
        const res = await axios.get(req)
        return [res.data[0].lat, res.data[0].lon]
    } catch(error){
        console.log("Error", error)
    }
}

async function getWeatherData(latitude, longitude) {
  try {
        const req = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        const res = await axios.get(req)
        const temp = res.data.main.temp
        const feelsLike = res.data.main.feels_like
        const humidity = res.data.main.humidity
        const wind = res.data.wind.speed
        const visibility = res.data.visibility
  } catch (error) {
        console.log("Error", error)
  }
}



