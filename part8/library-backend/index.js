const {ApolloServer} = require('apollo-server-express')
const {ApolloServerPluginDrainHttpServer} = require("apollo-server-core");
const {makeExecutableSchema} = require("@graphql-tools/schema");
const express = require("express");
const http = require("http");
const {useServer} = require("graphql-ws/lib/use/ws");
const {WebSocketServer} = require("ws");

const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('./models/user')
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET
const DataLoader = require("dataloader");
const loader = require('./loaders/authorCount');
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)

    const schema = makeExecutableSchema({typeDefs, resolvers})

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/',
    })
    const serverCleanup = useServer({schema}, wsServer)

    const server = new ApolloServer({
        schema,
        context: async ({req}) => {
            const auth = req ? req.headers.authorization : null
            if (auth && auth.toLowerCase().startsWith('bearer ')) {
                const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
                const currentUser = await User.findById(decodedToken.id)
                return {
                    currentUser, loaders: {
                        count: new DataLoader(keys => loader(keys))
                    }
                }
            }
            return {
                loaders: {
                    count: new DataLoader(keys => loader(keys))
                }
            }
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer}),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        },
                    }
                },
            },
        ],
    })

    await server.start()

    server.applyMiddleware({
        app,
        path: '/',
    })

    const PORT = 4000

    httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${PORT}`)
    )
}

start()