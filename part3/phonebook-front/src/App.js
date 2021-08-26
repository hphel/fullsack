import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import api from './persons'


const App = () => {
  
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)

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
            setMessage({
              content: `Updated ${newPerson.name}`,
              status: "success"
            })
          }
        }).catch(e => {
          if (e.response.data && e.response.data.error) {
            setMessage({
              content: e.response.data.error,
              status: "error"
            })
          } else if (e.response.status === 404) {
            setMessage({
              content: `Information of ${newPerson.name} has already been removed from the server`,
              status: "error"
            })
          } else {
            setMessage({
              content: `Failed to update ${newPerson.name}`,
              status: "error"
            })
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
          setMessage({
            content: `Added ${newPerson.name}`,
            status: "success"
          })
        }
      }).catch(e => {
        if (e.response.data && e.response.data.error) {
          setMessage({
            content: e.response.data.error,
            status: "error"
          })
        } else {
          setMessage({
            content: `Failed to add ${newPerson.name}`,
            status: "error"
          })
        }
      })
    }
  }
  const onDelete = (id) => {
    const target = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${target.name} ?`)) {
      api.remove(id).then(response => {
        if (response.status === 200) {
          const newPersons = persons.filter(p => p.id !== id)
          setPersons(newPersons)
          setMessage({
            content: `Removed ${target.name}`,
            status: "success"
          })
        } 
      }).catch(e => {
        if (e.response.data && e.response.data.error) {
          setMessage({
            content: e.response.data.error,
            status: "error"
          })
        } else if (e.response.status === 404) {
          setMessage({
            content: `Information of ${target.name} has already been removed from the server`,
            status: "error"
          })
        } else {
          setMessage({
            content: `Failed to remove ${target.name}`,
            status: "error"
          })
        }
      })
    }
  }
  
  const filteredPersons = persons.filter(p => p.name.indexOf(newFilter) !== -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
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