import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import authRoutes from './routes/Auth.js'
import {typeDefs} from './graphql/TypeDefs.js'
import {resolvers} from './graphql/Resolvers.js'
const app = express()

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})

await apolloServer.start()
apolloServer.applyMiddleware({app})

app.use(authRoutes)
app.listen(8000)
