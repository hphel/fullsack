module.exports = async function (error, req, res, _) {
    if (error._message && error._message.indexOf('validation') > -1 || error.code === 11000) {
        res.status(400).json(error)
    } else if (error._message && error._message.indexOf('not found') > -1) {
        res.status(404).json(error)
    } 
    else {
        res.status(500).json(error)
    }
}