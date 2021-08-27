const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')
const errorHandler = require('./middlewares/error_handler')
const auth = require('./middlewares/auth')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')


app.use(cors())
app.use(express.json())

app.use('/api/login', loginRouter)

app.use('/api/users', usersRouter)
app.use('/api/blogs', auth, blogsRouter)

app.use(errorHandler)

module.exports = app