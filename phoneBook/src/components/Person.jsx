const Person = (props) =>{
    const filteredList = props.contactList
    return (
        <div>
            <ul style={{listStyleType: 'none', padding: 0}}>
                {filteredList.map(contact =>
                    <li key={contact.id}>{contact.name} {contact.number} <button onClick={() => props.onDelete(contact)}>Delete</button></li>
                )}
            </ul>
        </div>
    )
}

export default Person