const DisplayCountries = (props)=>{
    const countryList = props.countryList

    if(countryList.length > 10){
        const renderComponent = props.searchValue !== '' ?  
        (
            <div>
                Too many macthes, specify another filter
            </div>
        ) : null 
        return renderComponent
    }else if(countryList.length === 0){
        return null
    }else{
        return (
            <ul>
                {countryList.map(country => 
                    console.log(`country name is ${country.name.common}`) ||
                    <li key={country.altSpellings}>{country.name.common}</li>
                )}
            </ul>
        )
    }
}

export default DisplayCountries