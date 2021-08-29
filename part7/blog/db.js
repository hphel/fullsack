const mongoose = require('mongoose')
const Blog = require('./models/blog')
const User = require('./models/user')

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')  
    })  
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)  
    })


exports.getAllBlogs = function () {
    return Blog.find({}).populate('user')
}

exports.addBlog = function (data, userId) { 
    return new Blog({...data, user: mongoose.Types.ObjectId(userId)}).save()
}

exports.deleteBlog = async function (id, userId) {
    const result = await Blog.deleteOne({ _id: id, user: userId })
    if (result.deletedCount === 0) {
        throw {
            _message: `Blog not found`
        }
    }
}

exports.updateBlog = function (id, newBlog) {
    return Blog.findOneAndUpdate({ _id: id }, newBlog, { runValidators: true })
}

exports.saveUser =  function (user) {
    return new User(user).save()
}

exports.getAllUsers = function () {
    return User.find({}).populate('blogs')
}

exports.getUser = function(username) {
    return User.findOne({ username: username })
}

exports.reset = function () {
    return Blog.deleteMany({})
}