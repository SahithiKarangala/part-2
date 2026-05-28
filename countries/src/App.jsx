import { useState } from 'react'
import { useEffect } from 'react'
import countriesServices from './services/countriesServices'
import SearchCountry from './components/SearchCountry'
import DisplayCountries from './components/DisplayCountries'
import DisplayOneCountry from './components/DisplayOneCountry'

function App() {
  const [countryList,setCountryList] = useState([]) 
  const [searchCountry, setSearchCountry] = useState('') 
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weatherData, setWeatherData] = useState(null)
  const [windSpeed, setWindSpeed] = useState(null)
  const [iconCode, setIconCode] = useState(null)

  useEffect(()=>{
    countriesServices
    .getAllCountries()
    .then(allCountries => {
      console.log(`promise fulfilled-getAllCountries`)
      console.log(`fetching the countirs initially ${allCountries}`)
      setCountryList(allCountries)
    })
  },[])

  const computeWeatherData = (lat,long) => {
    countriesServices
    .getWeatherData(lat,long)
    .then(data => {
      console.log(`promise fulfilled-getWeatherData`)
      console.log(`weather data is ${data.main.temp} and wind speed is ${data.wind.speed}`)
      setWeatherData(data.main.temp)
      setWindSpeed(data.wind.speed)
      setIconCode(data.weather[0].icon)
    }).catch(error => console.log(`Error occurred while fetching weather data: ${error}`))
  }

  const handleSearchCountry = (event) => {
    const searchValue = event.target.value
    setSearchCountry(searchValue)

    let filteredListOfCountries  = countryList.filter(country => 
    country.name.common.toLowerCase().includes(searchValue.toLowerCase()))

    setFilteredCountries(filteredListOfCountries)
    console.log(`filtered list of countries is ${filteredListOfCountries}`)
    if(filteredListOfCountries.length === 1){
      const lat = filteredListOfCountries[0].latlng[0]
      const lon = filteredListOfCountries[0].latlng[1]
      console.log(`lat is ${lat} and lon is ${lon}`)
      computeWeatherData(lat,lon)
    }else{
      setWeatherData(null)
      setWindSpeed(null)  
    }

  }

  const handleShowButton = (event) => {
    event.preventDefault()
    const countryName = event.target.parentNode.firstChild.textContent 
    const countryToBeShown = countryList.find(country => country.name.common === countryName)
    setFilteredCountries([countryToBeShown])
    const lat = countryToBeShown.latlng[0]
    const lon = countryToBeShown.latlng[1]
    console.log(`lat is ${lat} and lon is ${lon}`)
    computeWeatherData(lat,lon)
  }


  return (
    <div>
      <SearchCountry searchValue={searchCountry} onChange={handleSearchCountry}/>
      {filteredCountries.length === 1 ? 
       <DisplayOneCountry country={filteredCountries[0]} temperature={weatherData} wind={windSpeed} iconCodeImg={iconCode}/> : 
       <DisplayCountries countryList = {filteredCountries} searchValue={searchCountry} onClickShow={handleShowButton}/>} 
    </div>
  )
}

export default App
