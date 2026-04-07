const Filter = (props) =>{
    return (
        <div>
            filter shown with<input value={props.searchValue} onChange={props.onChange}/>
        </div>
      )
}

export default Filter