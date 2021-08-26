exports.errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).json({ error: 'malformatted id' })
    } else if (error.errors && error.errors.number && error.errors.number.name === 'ValidatorError') {
        return response.status(400).json({
            error: error.errors.number.message
        })
    } else if (error.errors && error.errors.name && error.errors.name.name === 'ValidatorError') {
        return response.status(400).json({
            error: error.errors.name.message
        })
    }  else {
        return response.status(500).json(error)
    }
  
    next(error)
}