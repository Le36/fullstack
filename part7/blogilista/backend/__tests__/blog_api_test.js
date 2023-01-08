const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_api_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there is initially one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({username: 'root', passwordHash})
		await user.save()
	})

	test('creation fails with non unique username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Mr.Roboto',
			password: 'r00t',
		}

		await api.post('/api/users').send(newUser).expect(400)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails with too short username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'ro',
			name: 'Mr.Roboto',
			password: 'r00t',
		}

		await api.post('/api/users').send(newUser).expect(400)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails with too short password', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'iAmUniqueName',
			name: 'Mr.Roboto',
			password: 'pw',
		}

		await api.post('/api/users').send(newUser).expect(400)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
})

describe('without token cannot add blog', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(helper.initialBlogs)
	})

	test('blog cnanot be added', async () => {
		await api
			.post('/api/blogs')
			.send(helper.singleBlog)
			.expect(401)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

		const contents = blogsAtEnd.map((n) => n.title)
		expect(contents).not.toContain('test_blog_can_be_added')
	})
})

describe('when there is initially 6 blogs at db', () => {
	let token = null

	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(helper.initialBlogs)
		await User.deleteMany({})

		const newUser = {
			username: 'root',
			name: 'Mr.Roboto',
			password: 'r00t',
		}

		const login = {
			username: 'root',
			password: 'r00t',
		}

		await api.post('/api/users').send(newUser).expect(201)

		const response = await api.post('/api/login').send(login).expect(200)

		token = response.body.token
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
			.set({Authorization: `Bearer ${token}`})
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(response.body.likes).toBeDefined()
		expect(response.body.likes.toString()).toBe('0')
	})

	test('a valid blog can be added ', async () => {
		await api
			.post('/api/blogs')
			.send(helper.singleBlog)
			.set({Authorization: `Bearer ${token}`})
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const contents = blogsAtEnd.map((n) => n.title)
		expect(contents).toContain('test_blog_can_be_added')
	})

	test('without url and title cannot be added', async () => {
		await api
			.post('/api/blogs')
			.send(helper.withoutUrlAndTitle)
			.set({Authorization: `Bearer ${token}`})
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})

	test('blog can be removed', async () => {
		const newBlog = {
			title: 'new',
			url: 'newer',
		}
		const response = await api
			.post('/api/blogs')
			.send(newBlog)
			.set({Authorization: `Bearer ${token}`})
			.expect(200)

		const blog = response.body

		await api
			.delete(`/api/blogs/${blog.id}`)
			.send(helper.withoutUrlAndTitle)
			.set({Authorization: `Bearer ${token}`})
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
		const contents = blogsAtEnd.map((r) => r.title)
		expect(contents).not.toContain(blog.title)
	})

	test('single blog can be updated', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogBeforeUpdate = blogsAtStart[0]
		const blogToUpdate = {
			title: 'newTitle',
			author: 'andNewAuthor',
			url: blogBeforeUpdate.url,
			likes: blogBeforeUpdate.likes,
			_id: blogBeforeUpdate.id,
		}

		const response = await api.put(`/api/blogs/${blogBeforeUpdate.id}`).send(blogToUpdate)

		expect(response.body.title).toBe('newTitle')
		expect(response.body.url).toBe(blogBeforeUpdate.url)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

		const contents = blogsAtEnd.map((r) => r.title)

		expect(contents).toContain(blogToUpdate.title)
		expect(contents).not.toContain(blogBeforeUpdate.title)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
