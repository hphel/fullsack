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
    const createBlog = new Blog({...data, user: mongoose.Types.ObjectId(userId)}).save()
    
    return createBlog.then(newBlog => {
        return User.updateOne({ _id: userId }, 
            { $push: { blogs: newBlog._id } })
    }).then(_ => createBlog)
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
    return Blog.findOneAndUpdate({ _id: id }, newBlog, { runValidators: true }).populate('user')
}

exports.addComment = function(id, { comment }) {
    return Blog.findOneAndUpdate(
        { _id: id }, 
        { $push: { comments: comment } }
    ).populate('user');
}

exports.saveUser =  function (user) {
    return new User(user).save()
}

exports.getAllUsers = function () {
    return User.find({}).populate('blogs')
}

exports.getUserByName = function(username) {
    return User.findOne({ username: username })
}

exports.reset = function () {
    return Blog.deleteMany({})
}