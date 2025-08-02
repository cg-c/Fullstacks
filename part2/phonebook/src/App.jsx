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
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

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
            setMessageType(true)
            setMessage(
              `${found.name}'s number changed`
            )
            setTimeout(() => {
              setMessageType(null)
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessageType(false)
            setMessage(
              `${Object.values(error.response.data)}`
            )
            setTimeout(() => {
              setMessageType(null)
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== found.id))
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
          setMessageType(true)
          setMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setMessageType(null)
            setMessage(null)
          }, 5000)          
        })
        .catch(error => {
          setMessageType(false)
          console.log(Object.values(error.response))
          setMessage(
            `${Object.values(error.response.data)}`
          )
          setTimeout(() => {
            setMessageType(null)
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== found.id))
        })
    }
    setNewName("")
    setNewNumber("")
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
        .catch(error => {
          setMessageType(false)
          setMessage(
            `Information on ${ppl.name} has already been removed from the server`
          )
          setTimeout(() => {
            setMessageType(null)
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== found.id))
      })
    }
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} success={messageType} />
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} onNameChange={handleNameChange} onNumberChange={(event) => setNewNumber(event.target.value)} />
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} onClick={(deletePerson)} />
    </div>
  )
}

export default App