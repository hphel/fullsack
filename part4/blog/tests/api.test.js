const mongoose = require('mongoose')
const MockMongoose = require('mock-mongoose').MockMongoose;
const mockMongoose = new MockMongoose(mongoose);
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const tokens = require('../utils/tokens')
let api = null

const blogs = [{
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Go To Statement Considered Harmful 2',
        author: 'Edsger W. Dijkstra 2',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
    }
]
let token = ""

beforeAll(async () => {
    await mockMongoose.prepareStorage()
    const app = require('../app')
    api = supertest(app)
})

beforeEach(async () => {
    await Blog.deleteMany()
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({
        username: 'root',
        passwordHash
    })

    const savedUser = await user.save()
    token = tokens.getJWTToken(savedUser.username, savedUser._id)
    await Promise.all(blogs.map(b => new Blog({
        ...b,
        user: savedUser._id
    }).save()))
})

test('return 401 for blogs request if no token in header', async () => {
    await api
        .get('/api/blogs')
        .expect(401)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/blogs')
        .expect(401)
        .expect('Content-Type', /application\/json/)
    await api
        .delete('/api/blogs/21312')
        .expect(401)
        .expect('Content-Type', /application\/json/)
    await api
        .put('/api/blogs/231321')
        .expect(401)
        .expect('Content-Type', /application\/json/)
})

test('blogs are returned as json with id field', async () => {
    const response = await api
        .get('/api/blogs')
        .set({
            Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(2)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('user')
    expect(response.body[1]).toHaveProperty('id')
    expect(response.body[1]).toHaveProperty('user')
})

test('blog is created on post', async () => {
    const response = await api
        .get('/api/blogs')
        .set({
            Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(2)

    await api
        .post('/api/blogs')
        .set({
            Authorization: `Bearer ${token}`
        })
        .send(blogs[0])
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const responseAfterPost = await api
        .get('/api/blogs')
        .set({
            Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(responseAfterPost.body).toHaveLength(3)
})

test('blog is created with default likes 0', async () => {
    await api
        .post('/api/blogs')
        .set({
            Authorization: `Bearer ${token}`
        })
        .send({
            title: 'No like at all',
            author: 'No like',
            url: 'http://www.nolike.html'
        })
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const responseAfterPost = await api
        .get('/api/blogs')
        .set({
            Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const noLikeBlog = responseAfterPost.body.find(b => b.author === 'No like')
    expect(noLikeBlog.likes).toBe(0)
})

test('400 if title or url is missing', async () => {
    await api
        .post('/api/blogs')
        .set({
            Authorization: `Bearer ${token}`
        })
        .send({
            author: 'No like',
            url: 'http://www.nolike.html'
        })
        .expect(400)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/blogs')
        .set({
            Authorization: `Bearer ${token}`
        })
        .send({
            title: 'Title',
            author: 'No like'
        })
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

test('blog is removed on DELETE with correct user', async () => {
    const response = await api
        .get('/api/blogs')
        .set({
            Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(2)

    await api
        .delete(`/api/blogs/${response.body[0].id}`)
        .set({
            Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const responseAfterDelete = await api
        .get('/api/blogs')
        .set({
            Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(responseAfterDelete.body).toHaveLength(1)
})

test('blog is NOT removed on DELETE with wrong user', async () => {
    const passwordHash = await bcrypt.hash('something', 10)

    const savedUser = await new User({
        username: 'someOne',
        passwordHash
    }).save()
    const differentToken = tokens.getJWTToken(savedUser.username, savedUser._id)
    const response = await api
        .get('/api/blogs')
        .set({
            Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    await api
        .delete(`/api/blogs/${response.body[0].id}`)
        .set({
            Authorization: `Bearer ${differentToken}`
        })
        .expect(404)
        .expect('Content-Type', /application\/json/)
})

test('blog is updated on PUT', async () => {
    const response = await api
        .get('/api/blogs')
        .set({
            Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body[0].likes).not.toBe(9999)
    const blogId = response.body[0].id
    await api
        .put(`/api/blogs/${blogId}`)
        .set({
            Authorization: `Bearer ${token}`
        })
        .expect(200)
        .send({
            likes: 9999
        })
        .expect('Content-Type', /application\/json/)
    const responseAfterDelete = await api
        .get('/api/blogs')
        .set({
            Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const modifiedBlog = responseAfterDelete.body.find(b => b.id === blogId)
    expect(modifiedBlog.likes).toBe(9999)
})

test('creation succeeds with a fresh username', async () => {
    const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const users = await User.find({})
    expect(users).toHaveLength(2)

    const usernames = users.map(u => u.username)
    expect(usernames).toContain(newUser.username)
})

test('creation failed with invalid username password', async () => {

    await api
        .post('/api/users')
        .send({
            username: '3c',
            name: 'whoami',
            password: 'long pass',
        })
        .expect(400)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/users')
        .send({
            username: 'long name',
            name: 'whoami',
            password: '3c',
        })
        .expect(400)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/users')
        .send({
            username: 'root',
            name: 'already created',
            password: 'already created',
        })
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

test('get users return all users', async () => {

    const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(1)
})

afterAll(async () => {
    mongoose.connection.close()
    await mockMongoose.killMongo()
})