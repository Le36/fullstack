const Book = require("./models/book");
const Author = require("./models/author");
const {UserInputError} = require("apollo-server");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET

const {PubSub} = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.genre) {
                return Book.find({genres: args.genre}).populate('author')
            }
            return Book.find({}).populate('author')
        },
        allAuthors: async () => Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
        bookCount: async (message, args, {loaders}) => loaders.count.load(message.id)
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new UserInputError("not authenticated")
            }
            let author = await Author.findOne({name: args.author})
            if (!author) {
                author = new Author({name: args.author})
                await author.save()
            }
            const book = new Book({...args, author: author.id})
            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            await pubsub.publish('BOOK_ADDED', {bookAdded: book.populate('author')})
            return await book.populate('author')
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new UserInputError("not authenticated")
            }
            const author = await Author.findOne({name: args.name})
            author.born = args.setBornTo
            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return author
        },
        createUser: async (root, args) => {
            const user = new User({...args})
            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({username: args.username})
            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials")
            }
            const userForToken = {
                username: user.username,
                id: user._id,
            }
            return {value: jwt.sign(userForToken, JWT_SECRET)}
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    },
}

module.exports = resolvers