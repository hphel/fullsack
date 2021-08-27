const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const db = require('../db')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    try {
        if (body.password.length < 3) {
            throw {
                _message: "Password validation failed"
            }
        }
        const savedUser = await db.saveUser({
            username: body.username,
            name: body.name,
            passwordHash,
        })
        response.json(savedUser)
    } catch (e) {
        await next(e)
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await db.getAllUsers()
    response.json(users)
})

module.exports = usersRouter