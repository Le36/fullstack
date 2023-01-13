const {ApolloServer, gql} = require('apollo-server')
const mongoose = require("mongoose");
require('dotenv').config()

const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int
        id: ID!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.genre) {
                return books.filter(b => b.genres.includes(args.genre))
            }
            return Book.find({})
        },
        allAuthors: async () => Author.find({})
    },
    Author: {
        bookCount: ({name}) => {
            return books.map(b => b.author.includes(name)).reduce((a, b) => a + b, 0)
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            let author = await Author.findOne({name: args.author})
            if (!author) {
                author = new Author({name: args.author})
                console.log(author)
                await author.save()
            }
            const book = new Book({...args, author: author.id})
            return book.save()
        },
        editAuthor: (root, args) => {
            const author = authors.find(a => a.name === args.name)
            if (!author) return null

            const updatedAuthor = {...author, born: args.setBornTo}
            authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
            return updatedAuthor
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})