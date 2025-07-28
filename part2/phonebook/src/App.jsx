import { useState, useEffect } from 'react'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

    useEffect(() => {
      personsService
        .getAll()
        .then(initialPpl => {
          setPersons(initialPpl)
        })
    }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.some(ppl => ppl.name === newName)

    if (found) {
      alert(`${newName} is already added to phonebook`)
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
          setNewName("")
          setNewNumber("")
        })
    }
  }

  const deletePerson = (id) => {
    const ppl = persons.find(n => n.id === id)
    confirm(`Delete ${ppl.name}`)

    personsService
      .update(id)
      .then(
        returnedPpl => {
          setPersons(persons.filter(p => p.id !== id))
        }
      )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} onNameChange={handleNameChange} onNumberChange={(event) => setNewNumber(event.target.value)} />
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} onClick={(deletePerson)} />
    </div>
  )
}

export default App