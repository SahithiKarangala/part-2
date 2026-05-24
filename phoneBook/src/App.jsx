import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  },[])

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