const blogsRouter = require('express').Router()
const db = require('../db')

blogsRouter.get('/', async (request, response) => {
    const blogs = await db.getAllBlogs()
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const result = await db.addBlog(request.body, request.user.id)
        response.status(201).json(result)
    } catch(e) {
        await next(e)
    }  
})

blogsRouter.post('/:blogId/comments', async (request, response, next) => { 
    try {
        const result = await db.addComment(request.params.blogId, request.body)
        response.status(201).json(result)
    } catch(e) {
        console.error(e)
        await next(e)
    }
})

blogsRouter.delete('/:blogId', async (request, response, next) => {
    try {
        const result = await db.deleteBlog(request.params.blogId, request.user.id)
        response.status(200).json(result)
    } catch(e) {
        await next(e)
    }  
})

blogsRouter.put('/:blogId', async (request, response, next) => {
    try {
        const result = await db.updateBlog(request.params.blogId, request.body)
        response.status(200).json(result)
    } catch(e) {
        await next(e)
    }  
})


module.exports = blogsRouter