const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {userExtractor} = require("../utils/middleware");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})

    response.json(blogs)
})


blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = request.user

    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({error: 'you are not correct user'})
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = new Blog(request.body)

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
})

module.exports = blogsRouter