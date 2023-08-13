import 'dotenv/config.js'
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {typeDefs} from './graphql/TypeDefs.js'
import {resolvers} from './graphql/Resolvers.js'
const app = express()

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers, 
    context: ({req}) => {
        return req
    }
})

await apolloServer.start()
apolloServer.applyMiddleware({app})

app.listen(8080)
