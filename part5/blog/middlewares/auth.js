const jwt = require('jsonwebtoken')

const getToken = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

module.exports = async function (req, res, next) {
    const token = getToken(req)
    if (!token) {
        return res.status(401).json({
            error: 'token missing'
        })
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({
            error: 'token invalid'
        })
    }
    req.user = decodedToken
    await next()
}