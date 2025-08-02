require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const app = express()
app.use(express.static('dist'))
app.use(express.json())

morgan.token('data', (request, response) => {
    if (request.body) {
        return JSON.stringify(request.body)
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


app.get('/', (request, response) => {
    response.send('<h1>Persons</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(p => {
        response.json(p)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(p => {
        if (!p) {
            response.status(404).end()
        }
        response.json(p)
    })
    .catch(error => next(error))
})


app.get('/info', (request, response, next) => {
    Person.countDocuments()
    .then(count => {
        response.send(
            `<p>Phonebook has info for ${count} people </p>
            <p>${new Date()}</p>
            `
        )
    })
    .catch(error => next(error))
    
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// const generateId = () => {
//   let randID = Math.ceil(Math.random() * (10000 - 1))
  
//   while (persons.find(p => p.id == randID)) {
//     randID = Math.ceil(Math.random() * (10000 - 1))
//   }
//   return String(randID)
// }

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    Person.find({}).then(ppl => {
        if (ppl.find(p => p.number === body.number)) {
            return response.status(400).send({
                error: 'duplicate number'
            })
        }
    })
    .catch(error => next(error))

    const person = new Person({
        // id: generateId(),
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})