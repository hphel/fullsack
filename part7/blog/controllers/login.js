const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../db')
const tokens = require('../utils/tokens')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await db.getUserByName(body.username)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const token = tokens.getJWTToken(user.username, user._id)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter