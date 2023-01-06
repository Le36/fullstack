const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const listWithManyBlogs = [
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
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('most liked out of multiple', () => {
    test('with single list', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        })
    })

    test('with many lists', () => {
        const result = listHelper.favoriteBlog(listWithManyBlogs)
        expect(result).toEqual({
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        })
    })
})

describe('most blogs from one author', () => {
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({author: 'Edsger W. Dijkstra', blogs: 1})
    })

    test('correct when many blogs', () => {
        const result = listHelper.mostBlogs(listWithManyBlogs)
        expect(result).toEqual({author: 'Robert C. Martin', blogs: 3})
    })
})

describe('most likes from one author', () => {
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({author: 'Edsger W. Dijkstra', likes: 5})
    })

    test('correct when many blogs', () => {
        const result = listHelper.mostLikes(listWithManyBlogs)
        expect(result).toEqual({author: 'Edsger W. Dijkstra', likes: 17})
    })
})

describe('total likes', () => {
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('total correct when many lists', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        expect(result).toBe(36)
    })

    test('zero when empty list', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
})