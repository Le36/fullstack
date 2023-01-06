const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_api_helper');
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog has field id and not _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
})

test('if likes is empty, it will be given 0', async () => {
    const response = await api
        .post('/api/blogs')
        .send(helper.withoutLikes)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes.toString()).toBe('0')
})

test('a valid blog can be added ', async () => {
    await api
        .post('/api/blogs')
        .send(helper.singleBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain('test_blog_can_be_added')
})

test('without url and title cannot be added', async () => {
    await api
        .post('/api/blogs')
        .send(helper.withoutUrlAndTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog can be removed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .send(helper.withoutUrlAndTitle)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
})

test('single blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogBeforeUpdate = blogsAtStart[0]
    const blogToUpdate = {
        title: 'newTitle',
        author: 'andNewAuthor',
        url: blogBeforeUpdate.url,
        likes: blogBeforeUpdate.likes,
        _id: blogBeforeUpdate.id
    }

    const response = await api
        .put(`/api/blogs/${blogBeforeUpdate.id}`)
        .send(blogToUpdate)


    expect(response.body.title).toBe('newTitle')
    expect(response.body.url).toBe(blogBeforeUpdate.url)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).toContain(blogToUpdate.title)
    expect(contents).not.toContain(blogBeforeUpdate.title)
})

afterAll(() => {
    mongoose.connection.close()
})