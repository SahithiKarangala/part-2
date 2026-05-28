import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const API_Key = import.meta.env.VITE_WEATHER_API_KEY


const getAllCountries = () =>{
    const request = axios.get(baseUrl + 'api/all')
    return request.then(response=> response.data)
}

const getWeatherData = (lat,long) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_Key}&units=metric`
    const request = axios.get(weatherUrl)
    return request.then(response => response.data)
}

export default{ getAllCountries, getWeatherData} 
 