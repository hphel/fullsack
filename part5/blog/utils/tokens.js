const jwt = require('jsonwebtoken')

function getJWTToken(username, id) {

    const userForToken = {
        username: username,
        id: id,
    }

    return jwt.sign(userForToken, process.env.SECRET)
}

module.exports = {
    getJWTToken
}