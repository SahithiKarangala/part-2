import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person=> person.name ===newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) =>{
    setSearchName(event.target.value)
  }

  let filteredContacts = (searchName==='') ? persons : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={searchName} onChange={handleSearchName}/>
      
      <h2>add a new</h2>
      <PersonForm onSubmit={addName} nameValue={newName} numberValue={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Person contactList={filteredContacts}/>

    </div>
  )
}

export default App