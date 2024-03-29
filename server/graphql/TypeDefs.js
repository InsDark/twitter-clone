import { gql } from 'apollo-server-express'

export const typeDefs = gql`
scalar Follows,
scalar Likes,

input  TweetInput {
    content: String,
    date: String
}

input BookmarkInfo {
    _id : String,
    type: String
}
input UserData {
    name: String,
    profilePicture: String,
    coverPicture: String
}
type User { 
    error: String,
    name: String,
    email: String,
    userName: String,
    token: String,
    expiration: String,
    followers: [Follows],
    following: [Follows],
    profilePicture: String, 
    coverPicture: String
    },

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
    userName: String,
    message: String
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
    getTweets (except : String) : [Tweet],
    getBookmarkedTweets (userName: String) : [Tweet],
    user (userName: String): User,
    randomUsers (except: String): [User],
    loginUser (email: String, password: String): User,
    userTweets (userName: String): [Tweet],
    getToken (token: String) : AuthCred
}

type Mutation {
    followTo ( to: String, type : String) : Notification
    createUser(name: String, email: String, userName: String, password: String) : User
    deleteUser(userName: String) : String,
    createTweet (tweetInput : TweetInput ) : Notification,
    likeTweet (tweetInfo : TweetInfo) : Notification,
    bookmarkTweet (bookmarkInfo : BookmarkInfo) : Notification,
    updateUser (userData: UserData) : Notification
}

`


