const DisplayOneCountry = (props) => {
    const countryDetails = props.country

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
        </div>
    )
}

export default DisplayOneCountry