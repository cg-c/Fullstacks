import { useState } from "react"
import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Select from 'react-select'

const BirthYear = ({ authors }) => {
  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: (data) => {
      if (data.editAuthor) {
        console.log(data.editAuthor)
      }
    }
  })

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo }})

    setName('')
    setSetBornTo('')
  }

  return (
    <div>
      <h3>Set birth year</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select 
            value={name}
            onChange={({ target }) => setName(target.value)} >
              {authors.map(a => (
                <option key={a.name} value={a.name}>{a.name}</option>
              ))}
          </select>
        </div>
        <div>
          born
          <input 
            type="number"
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(target.valueAsNumber)} 
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

const Authors = ({ authors, show }) => {
  if (!show) {
    return null
  }
  else if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYear authors={authors.data.allAuthors} />
    </div>
  )
}

export default Authors
