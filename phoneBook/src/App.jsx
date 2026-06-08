import { useState, useEffect } from 'react'
import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import phoneDirectory from './services/phoneDirectory'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  

  useEffect(() => {
    console.log('effect')
    phoneDirectory
    .getAll()
    .then(InitialData => {
      console.log('promise fulfilled-getAll')
      setPersons(InitialData)
    })
  },[])

  const notificationTimeOut = () => {
    setTimeout(() => {
      setNotificationMessage('')
    }, 5000)
  }

  const addName = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }
    
    if (persons.some(person=> person.name ===newName)){
      if(window.confirm(`${newName} is already added to the phonebook, replace old number with a new one?`)){
        const personToBeUpdated = persons.find(person => person.name === newName)
        phoneDirectory
        .updateEntry(personToBeUpdated.id, newObject)
        .then(updatedEntry => {
          setPersons(persons.map(person=> person.id !== personToBeUpdated.id ? person : updatedEntry))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Updated ${updatedEntry.name}'s number successfully!`)
          notificationTimeOut()
        })
        .catch(error => {
          console.log(`Error occurred while updating entry: ${error}`)
          if(error.name === 'ValidationError'){
            setNotificationMessage(`Validation error: ${error.message}`)
          }else{
            setNotificationMessage(`Information of ${newObject.name} has already been removed from the server!`)
          }
          
          setPersons(persons.filter(person => person.id !== personToBeUpdated.id))
          notificationTimeOut()
          setNewName('')
          setNewNumber('')
        })  
      }
    }else{
    phoneDirectory
    .create(newObject)
    .then(NewEntry =>{
      setPersons(persons.concat(NewEntry))
      setNewName('')
      setNewNumber('')
      setNotificationMessage(`Added ${NewEntry.name} successfully!`)
      notificationTimeOut()
      })
    }
  }

  const onDelete = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      phoneDirectory
      .deleteEntry(personToDelete.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== personToDelete.id))
        setNotificationMessage(`Deleted ${personToDelete.name} successfully!`)
        notificationTimeOut()
      })
    }
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
      <Notification message={notificationMessage}/>

      <Filter searchValue={searchName} onChange={handleSearchName}/>
      
      <h2>add a new</h2>
      <PersonForm onSubmit={addName} nameValue={newName} numberValue={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Person contactList={filteredContacts} onDelete={onDelete}/>

    </div>
  )
}

export default App