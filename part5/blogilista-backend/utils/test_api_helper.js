const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class __tests__",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    }
]

const singleBlog = {
    _id: "5a422b331b54a476434d17fa",
    title: 'test_blog_can_be_added',
    author: 'Michael_Scarn',
    url: 'https://testpatterns.com/',
    likes: 2
}

const withoutLikes = {
    _id: "5a422ba31b54a476434d17ca",
    title: 'test_blog_without_likes',
    author: 'no_likeys',
    url: 'https://nolikes.com/'
}

const withoutUrlAndTitle = {
    _id: "1a122ba31b54a413534d17ca",
    author: 'not_much_info',
    likes: 2
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, singleBlog, blogsInDb, withoutLikes, withoutUrlAndTitle, usersInDb
}