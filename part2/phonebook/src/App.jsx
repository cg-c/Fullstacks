import { useState, useEffect } from 'react'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'
import Notification from '../components/Notification'
import personsService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

    useEffect(() => {
      personsService
        .getAll()
        .then(initialPpl => {
          setPersons(initialPpl)
        })
    }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.find(ppl => ppl.name === newName)

    if (found) {
      if (confirm(`${found.name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPpl = {...found, number: newNumber}

        personsService
          .update(found.id, changedPpl)
          .then(returnedPpl => {
            setPersons(persons.map(p => p.id === found.id ? returnedPpl : p))
            setSuccessMessage(
              `${found.name}'s number changed`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
        })
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personsService
        .create(newPerson)
        .then(returnedPpl => {
          setPersons(persons.concat(returnedPpl))
          setSuccessMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)          
          setNewName("")
          setNewNumber("")
        })
    }
  }

  const deletePerson = (id) => {
    const ppl = persons.find(p => p.id === id)
    if (confirm(`Delete ${ppl.name}`)) {
      personsService
        .remove(id)
        .then(
          returnedPpl => {
            setPersons(persons.filter(p => p.id !== id))
          }
      )
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} onNameChange={handleNameChange} onNumberChange={(event) => setNewNumber(event.target.value)} />
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} onClick={(deletePerson)} />
    </div>
  )
}

export default App