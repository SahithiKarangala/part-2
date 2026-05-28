const DisplayOneCountry = (props) => {
    const countryDetails = props.country
    const iconCode = props.iconCodeImg
    const temp = props.temperature
    const wind = props.wind
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    console.log(`temp and wind are ${temp} and ${wind}`)

    //console.log(`props in display one country is ${props.country.name.common}`)
    return (
        <div>
            <h1>{countryDetails.name.common}</h1>
            <p>Capital {countryDetails.capital[0]}</p>
            <p>Area {countryDetails.area}</p>
            <h1>Languages</h1>
            <ul>
                {Object.values(countryDetails.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={countryDetails.flags.png} alt={countryDetails.flags.alt}/>
            <h1>Weather in {countryDetails.name.common}</h1>
            <p>Temperature {temp} Celsius</p>
            <img src={iconUrl} alt="weather-icon"/>
            <p>Wind {wind} m/s</p>
        </div>
    )
}

export default DisplayOneCountry