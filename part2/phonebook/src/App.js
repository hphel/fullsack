import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')

  useEffect(() => {    
    axios.get('http://localhost:3001/persons').then((response) => setPersons(response.data));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault()
    const nameAlreadyExist = persons.some(p => p.name === newName)
    if (nameAlreadyExist) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersons = [
        ...persons, 
        {
          name: newName,
          number: newNumber,
          id: persons.length + 1
        }
      ]
      setPersons(newPersons)
    }
  }
  
  const filteredPersons = persons.filter(p => p.name.indexOf(newFilter) !== -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={(e) => setFilter(e.target.value)}/>
      <PersonForm 
        onSubmit={onSubmit} 
        onNameChange={(e) => setNewName(e.target.value)} 
        onNumberChange={(e) => setNewNumber(e.target.value)}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App