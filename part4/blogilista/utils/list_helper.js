const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((mostLikes, current) => {
        if (current.likes > mostLikes.likes) {
            return current
        }
        return mostLikes
    })
}

const mostBlogs = (blogs) => {
    const authorCounts = lodash.map(lodash.countBy(blogs, 'author'),
        (val, key) => ({author: key, blogs: val}))

    return authorCounts.reduce((mostBlogs, current) => {
        if (current.blogs > mostBlogs.blogs) {
            return current
        }
        return mostBlogs
    })
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}