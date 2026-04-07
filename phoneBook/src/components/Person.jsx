const Person = (props) =>{
    const filteredList = props.contactList
    return (
        <div>
            <ul style={{listStyleType: 'none', padding: 0}}>
                {filteredList.map(contact => <li key={contact.name}>{contact.name} {contact.number}</li>)}
            </ul>
        </div>
    )
}

export default Person