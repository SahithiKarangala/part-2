import { useState } from 'react'
import { useEffect } from 'react'
import countriesData from './services/countriesData'
import SearchCountry from './components/SearchCountry'
import DisplayCountries from './components/DisplayCountries'
import DisplayOneCountry from './components/DisplayOneCountry'

function App() {
  const [countryList,setCountryList] = useState(null) 
  const [searchCountry, setSearchCountry] = useState('') 
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(()=>{
    countriesData
    .getAllCountries()
    .then(allCountries => {
      console.log(`promise fulfilled-getAllCountries`)
      console.log(`fetching the countirs initially ${allCountries}`)
      setCountryList(allCountries)
    })
  },[])

  
  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value)

    let filteredListOfCountries  = countryList ? countryList.filter(country => 
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())) : []

    setFilteredCountries(filteredListOfCountries)
    console.log(`filtered list of countries is ${filteredListOfCountries}`)

  }

  const handleShowButton = (event) => {
    event.preventDefault()
    const countryName = event.target.parentNode.firstChild.textContent 
    const countryToBeShown = countryList.find(country => country.name.common === countryName)
    setFilteredCountries([countryToBeShown])
  }


  return (
    <div>
      <SearchCountry searchValue={searchCountry} onChange={handleSearchCountry}/>
      {filteredCountries.length === 1 ? 
       <DisplayOneCountry country={filteredCountries[0]}/> : 
       <DisplayCountries countryList = {filteredCountries} searchValue={searchCountry} onClickShow={handleShowButton}/>} 
    </div>
  )
}

export default App
