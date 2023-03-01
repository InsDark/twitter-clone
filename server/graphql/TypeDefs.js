import {gql} from 'apollo-server-express'

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

type Query {
    user (userName: String): User,
    randomUsers: [User],
    loginUser (email: String, password: String): User
}

type Mutation {
    createUser(name: String, email: String, userName: String, password: String) : User
    deleteUser(userName: String) : String
}

` 


