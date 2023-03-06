import { gql } from 'apollo-server-express'

export const typeDefs = gql`
scalar Follows 
type User { 
    name: String,
    email: String,
    userName: String,
    token: String,
    expiration: String,
    followers: [Follows],
    following: [Follows]
    }
type Tweet {
    content: String,
    owner: String,
    date: String,
    likes: String
}
type AuthCred {
    token: String,
    expiration: String,
    userName: String
}
type Query {
    getAuth (email: String, password: String): AuthCred,
    user (userName: String): User,
    randomUsers (except: String): [User],
    loginUser (email: String, password: String): User,
    userTweets (userName: String): [Tweet]
}

type Mutation {
    followTo (from : String, to: String) : User,
    createUser(name: String, email: String, userName: String, password: String) : User
    deleteUser(userName: String) : String
}

`


