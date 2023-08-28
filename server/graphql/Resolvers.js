import { db } from "../db/config.js"
import { hashSync, compareSync } from 'bcrypt'
import { ObjectId } from "mongodb"
import { validateToken } from "../helpers/validateToken.js"
export const resolvers = {
    Query: {
        user: async (_, args) => {
            const userResponse = await db.collection('users').find({ userName: args.userName }).toArray()
            return userResponse[0]
        },
        randomUsers: async (_, { except }) => {
            const res = await db.collection('users').aggregate([
                { $sample: { size: 3 } },
                {
                    $match: {
                        $and: [
                            { userName: { $not: { $eq: except } } },
                            { followers: { $not: { $eq: except } } }
                        ]
                    }
                }
            ]).toArray()
            return res
        },
        getTweets: async (_, { except }) => {
            const tweets = await db.collection('tweets').find({ maker: { $not: { $eq: except } } }).toArray()
            return tweets
        },
        loginUser: async (_, { email, password }) => {
            try {
                const user = await db.collection('users').findOne({ email })
                if (!user) {
                    return { error: 'Credentials are not correct' }
                }
                const { passwordHash, userName, name } = user
                const passwordVerify = compareSync(password, passwordHash)
                if (!passwordVerify) return { error: "The credentials are not correct" }
                const token = hashSync(`${userName}${email}`, 12)
                const expiration = Date.now() + 43200000
                const access_token = { token, expiration, userName }
                await db.collection('tokens').insertOne(access_token)
                return { email: email, ...access_token, name, userName }
            } catch (e) {
                return { error: e.message }
            }


        },
        userTweets: async (_, { userName }) => {
            const Tweets = await db.collection('tweets').find({ maker: userName }).limit(10).toArray()
            return Tweets
        },
        getBookmarkedTweets: async (_, { userName }) => {
            const res = await db.collection('tweets').find({ bookmarks: userName }).toArray()
            return res
        },
        getToken: async (_, { token }) => {
            const res = await db.collection('tokens').findOne({ token })
            return res
        }

    },
    Mutation: {
        followTo: async (_, { to, type }, context) => {
            const validToken = await validateToken({ context, db })
            if (!validToken) return { message: "You are not allowed" }

            const { userName } = validToken

            if (type == 'unfollow') {
                const [{ following }] = await db.collection('users').find({ userName }).toArray()
                const newFollowing = following.filter(follow => follow !== to)
                await db.collection('users').updateOne({ userName }, { $set: { following: newFollowing } })
                const [{ followers }] = await db.collection('users').find({ userName }).toArray()
                const newFollowers = followers.filter(follow => follow !== userName)
                await db.collection('users').updateOne({ userName: to }, { $set: { followers: newFollowers } })
                return { status: '200', message: "Unfollow okay" }
            }
            await db.collection('users').updateOne({ userName }, { $push: { following: to } })
            await db.collection('users').updateOne({ userName: to }, { $push: { followers: userName } })
            return { status: '200', message: "Following okay" }
        },
        createUser: async (_, args) => {
            const { name, userName, password, email } = args
            const passwordHash = hashSync(password, 10)

            const [emailExist, userNameExist] = await Promise.allSettled([db.collection('users').findOne({ email }), db.collection('users').findOne({ userName })])

            if (emailExist.value) return { error: `The  ${email} already exist` }
            if (userNameExist.value) return { error: `The ${userName} already exist` }

            const token = hashSync(`${userName}${email}`, 12)
            const expiration = Date.now() + 43200000
            const access_token = { token, expiration, userName }
            const newUser = { name, userName, passwordHash, email, following: [], followers: [] }
            await db.collection('users').insertOne(newUser)
            await db.collection('tokens').insertOne(access_token)
            return { ...newUser, ...access_token, userName, name }

        },
        async deleteUser(_, { userName }) {
            const res = await db.collection('users').findOneAndDelete({ userName })
            if (res.value) {
                return 'The user was deleted successfully'
            }
            return 'The user was not found'

        },
        createTweet: async (_, { tweetInput }, context) => {
            try {
                const isTokenValid = await validateToken({ context, db })
                if (!isTokenValid) return { message: 'You are not allowed to create a tweet' }
                const { userName } = isTokenValid
                const isTweetMaked = await db.collection('tweets').insertOne({ ...tweetInput, maker: userName, likes: [] })

                return { message: "The tweet was created successfully" }

            } catch (e) {
                return { message: e.message }
            }
        },
        likeTweet: async (_, { tweetInfo: { _id, userName, type } }, context) => {
            const validToken = await validateToken({ context, db })
            if (!validToken) return { message: "You are not allowed to do this action" }
            const mongoID = new ObjectId(_id)
            const res = await db.collection('tweets').findOne({ _id: mongoID })

            if (!res) return { message: `The tweet was not found with the _id : ${_id}` }

            if (type == 'like') {
                await db.collection('tweets').findOneAndUpdate({ _id: mongoID }, { $push: { likes: userName } })
                return { message: 'You like this tweet' }
            }
            let { likes } = res
            likes = likes.filter(liker => liker !== userName)
            await db.collection('tweets').findOneAndUpdate({ _id: mongoID }, { $set: { likes } })
            return { message: "You dislike this tweet" }
        },
        bookmarkTweet: async (_, { bookmarkInfo: { _id, type } }, context) => {
            const validToken = await validateToken({ context, db })
            if (!validToken) return { message: "You are not allowed" }
            const { userName } = validToken
            const mongoID = new ObjectId(_id)
            if (type == 'bookmark') {
                await db.collection('tweets').findOneAndUpdate({ _id: mongoID }, { $push: { bookmarks: userName } })
                return { message: "You bookmarked this tweet" }
            }
            const { bookmarks } = await db.collection('tweets').findOne({ _id: mongoID })
            const newBookmarks = bookmarks.filter(bookmark => bookmark !== userName)
            await db.collection('tweets').updateOne({ _id: mongoID }, { $set: { bookmarks: newBookmarks } })
            return { message: "UnBookmarked this tweet" }
        },
        updateUser: async (_, {userData: {name, profilePicture, coverPicture}}, context) => {
            console.log(profilePicture, coverPicture)
            if(!profilePicture || !coverPicture || !name) return {message: 'There was an error'}
            const validToken = await validateToken({ context, db })
            if(!validToken) return {message: 'Error'}
            const res = await db.collection('users').updateOne({userName: validToken.userName}, {$set: {name, profilePicture, coverPicture}})
            if(!res)return  {message: 'Something happened try again later'}
            return {message : 'The user info was updated successfully'}
        }
    }
}