const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const PORT = process.env.PORT || 3001

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/info', (req, res) => {
    res.send(`
        Phonebook has info for ${persons.length} peolpe
        <br>
        <br>
        ${(new Date()).toString()}
    `).end()
})

app.post('/api/persons', (req, res) => {
    const newPerson = req.body
    if (req.body.name && req.body.number) {
        const foundPerson =  persons.find(p => p.name === req.body.name)
        if (foundPerson) {
            res.status(400).json({
                error: `name must be unique`
            })
        } else {
            persons = [...persons, {
                id: req.body.id ? parseInt(req.body.id, 10) : (Math.max(...persons.map(p => p.id)) + 1),
                name: req.body.name,
                number: req.body.number
            }]
            return res.status(201).end()
        }
    } else {
        return res.status(400).json({
            error: `Name or number is missing`
        })
    }
    return res.status(200).json(persons)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:personId', function (req, res) {
    const foundPerson =  persons.find(p => p.id === parseInt(req.params.personId, 10))
    if (foundPerson) {
        res.status(200).json(foundPerson)
    } else {
        res.status(404).json({
            error: `Id ${req.params.personId} not found`
        })
    }
})

app.delete('/api/persons/:personId', function (req, res) {
    const deleteId = parseInt(req.params.personId, 10)
    const foundPerson =  persons.find(p => p.id === deleteId)
    if (foundPerson) {
        persons = persons.filter(p => p.id !== deleteId)
        res.status(200).end()
    } else {
        res.status(404).json({
            error: `Id ${req.params.personId} not found`
        })
    }
})

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`)
})
