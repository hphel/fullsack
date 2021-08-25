import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import api from './persons'


const App = () => {
  
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')

  useEffect(() => {    
    api.getAll().then((response) => setPersons(response.data));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault()
    const existPerson = persons.find(p => p.name === newName)
    if (existPerson && existPerson.number === newNumber) {
      alert(`${newName} is already added to phonebook`)
    } else if (existPerson) {
      if(window.confirm(`${existPerson.name} is already added to the phonebook, replace the old number with a new one ?`)) {
        const newPerson = { ...existPerson, number: newNumber }
        api.update(existPerson.id, newPerson).then(response => {
          if (response.status === 200) {
            const newPersons = [
              ...persons.filter(p => p.id !== newPerson.id),
              newPerson
            ]
            setPersons(newPersons)
          }
        })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: Math.max(...persons.map(p => p.id)) + 1
      }
      api.create(newPerson).then((response) => {
        if (response.status === 201) {
          const newPersons = [
            ...persons, 
            newPerson
          ]
          setPersons(newPersons)
        }
      })
    }
  }
  const onDelete = (id) => {
    const target = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${target.name} ?`)) {
      api.remove(id).then(response => {
        if (response.status === 200) {
          const newPersons =  persons.filter(p => p.id !== id)
          setPersons(newPersons)
        }
      })
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
      <Persons 
        persons={filteredPersons}
        onDelete={onDelete}
      />
    </div>
  )
}

export default App