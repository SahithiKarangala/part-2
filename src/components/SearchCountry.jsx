const SearchCountry = (props) => {
    return (
    <div>
        find countries <input value={props.SearchValue} onChange={props.onChange}/>
    </div>
    )
}

export default SearchCountry