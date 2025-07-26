import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const displayPersons = () => {
    let display
    if (filter.length > 0) {
      display = persons.filter(ppl => ppl.name.toLowerCase().includes(filter.toLowerCase()))
    }
    else display = [...persons]

    return (
      <>
     { display.map(ppl =>
        <p key={ppl.name}>{ppl.name} {ppl.number}</p>
      )}
      </>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          filter shown with <input value={filter} onChange={(event) => setFilter(event.target.value)} />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {displayPersons()}
    </div>
  )
}

export default App