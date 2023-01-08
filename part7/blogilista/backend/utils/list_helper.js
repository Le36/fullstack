const {countBy, map, maxBy, sumBy, groupBy} = require('lodash')

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
	const authorCounts = map(countBy(blogs, 'author'), (val, key) => ({
		author: key,
		blogs: val,
	}))

	return authorCounts.reduce((mostBlogs, current) => {
		if (current.blogs > mostBlogs.blogs) {
			return current
		}
		return mostBlogs
	})
}

const mostLikes = (blogs) => {
	const authors = groupBy(blogs, 'author')

	const authorLikes = map(authors, (articles, author) => ({
		author,
		likes: sumBy(articles, 'likes'),
	}))
	return maxBy(authorLikes, 'likes')
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}
