const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const middleware = require('./middleware')
const app = express()
const PORT = process.env.PORT || 3001


app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/info', (req, res, next) => {
    db.getAll().then(persons => {
        res.send(`
            Phonebook has info for ${persons.length} peolpe
            <br>
            <br>
            ${(new Date()).toString()}
        `).end()
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const newPerson = req.body
    if (newPerson.name && newPerson.number) {
        return db.add(newPerson.name, newPerson.number)
            .then(() => {
                return res.status(201).end()
            })
            .catch(error => next(error))
    } else {
        return res.status(400).json({
            error: 'Name or number is missing'
        })
    }
})

app.get('/api/persons', (req, res, next) => {
    db.getAll().then(persons => {
        res.status(200).json(persons)
    }).catch(error => next(error))
})

app.get('/api/persons/:personId', function (req, res, next) {
    db.get(parseInt(req.params.personId, 10)).then(person => {
        if (person) {
            res.status(200).json(person)
        } else {
            res.status(404).json({
                error: `Id ${req.params.personId} not found`
            })
        }
    }).catch(error => next(error))
})

app.delete('/api/persons/:personId', function (req, res, next) {
    const deleteId = parseInt(req.params.personId, 10)
    db.remove(deleteId).then(() => {
        res.status(200).end()
    }).catch(error => next(error))
})

app.put('/api/persons/:personId', function (req, res, next) {
    const newPerson = req.body
    const personId = parseInt(req.params.personId, 10)
    db.update(personId, newPerson).then(() => {
        res.status(200).end()
    }).catch(error => next(error))
})

// last middleware
app.use(middleware.errorHandler)


app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})
