import { gql } from 'apollo-server-express'

export const typeDefs = gql`
scalar Follows,
scalar Likes,
input  TweetInput {
    content: String,
    date: String,
    maker: String,
}

input BookmarkInfo {
    userName : String,
    _id : String,
    type: String
}
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
    maker: String,
    date: String,
    _id: String,
    likes: [Likes],
    bookmarks : [Likes]
}
type AuthCred {
    token: String,
    expiration: String,
    userName: String
}
input TweetInfo {
    _id: ID!,
    userName: String,
    type: String
}
type Notification {
    status: String,
    message: String
}

type Query {
    getAuth (email: String, password: String): AuthCred,
    getTweets (except : String) : [Tweet],
    user (userName: String): User,
    randomUsers (except: String): [User],
    loginUser (email: String, password: String): User,
    userTweets (userName: String): [Tweet]
}

type Mutation {
    followTo (from : String, to: String, type : String) : Notification
    createUser(name: String, email: String, userName: String, password: String) : User
    deleteUser(userName: String) : String,
    createTweet (tweetInput : TweetInput ) : Notification,
    likeTweet (tweetInfo : TweetInfo) : Notification,
    bookmarkTweet (bookmarkInfo : BookmarkInfo) : Notification
}

`


