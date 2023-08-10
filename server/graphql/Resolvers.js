import { db } from "../db/config.js"
import { hashSync, compareSync } from 'bcrypt'
import { ObjectId } from "mongodb"
export const resolvers = {
    Query: {
        getAuth: async (_, { email, password }) => {
            try{

                const userDB = await db.collection('users').findOne({ email })
                if (!userDB) return {message: 'The user doesnt exist'}
                const { passwordHash, userName } = userDB
                const validPass = compareSync(password, passwordHash)
                if (!validPass) return {message: 'The credentials are not valid'}
                const token = hashSync(`${passwordHash}${email}`, 10)
                const expiration = Date.now() + 43200000
                await db.collection('tokens').insertOne({ token, expiration })
                return { token, expiration, userName }
            } catch (e) {
                console.log(e)
                return {error: e}
            }
        },
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
                            { followers: {$not : { $eq: except } }}
                        ]
                    }
                }
            ]).toArray()
            return res
        },
        getTweets: async(_, {except}) => {
            const tweets = await db.collection('tweets').find({maker : {$not : {$eq: except}}}).toArray()
            return tweets
        }, 
        loginUser: async (_, { email, password }) => {
            const user = await db.collection('users').findOne({ email })
            if (!user) {
                return { email: 'There is no user with that email' }
            }
            const { passwordHash, userName, name } = user
            const passwordVerify = await compareSync(password, passwordHash)
            if (!passwordVerify) return { email: email }
            const token = hashSync(`${userName}${email}`, 12)
            const expiration = Date.now() + 43200000
            const access_token = { token, expiration }
            await db.collection('access_tokens').insertOne(access_token)
            return { email: email, ...access_token, name, userName }

        },
        userTweets: async (_, { userName }) => {
            const Tweets = await db.collection('tweets').find({ maker: userName }).limit(10).toArray()
            return Tweets
        },
        getBookmarkedTweets: async (_, { userName }) => {
            const res = await db.collection('tweets').find({bookmarks: userName}).toArray()
            return res
        }

    },
    Mutation: {
        followTo: async (_, { from, to, type }) => {
            if(type == 'unfollow') {
                const [{following}]= await db.collection('users').find({userName: from}).toArray()
                const newFollowing = following.filter(follow => follow !== to)
                await db.collection('users').updateOne({userName: from}, {$set : {following : newFollowing}})
                const [{followers}] = await db.collection('users').find({userName: from}).toArray()
                const newFollowers = followers.filter(follow => follow !== from)
                await db.collection('users').updateOne({userName: to}, {$set : {followers : newFollowers}})
                return { status: '200', message: "Unfollow okay" }
            }
            await db.collection('users').updateOne({ userName: from }, { $push: { following: to } })
            await db.collection('users').updateOne({ userName: to }, { $push: { followers: from } })
            return { status: '200', message: "Following okay" }
        },
        createUser: async (_, args) => {
            const { name, userName, password, email } = args
            const passwordHash = hashSync(password, 10)
            const res = await db.collection('users').findOne({ userName })
            if (!res) {
                const token = hashSync(`${userName}${email}`, 12)
                const expiration = Date.now() + 43200000
                const access_token = { token, expiration }
                const newUser = { name, userName, passwordHash, email, following: [], followers: [] }
                await db.collection('users').insertOne(newUser)
                await db.collection('access_tokens').insertOne(access_token)
                return { ...newUser, ...access_token }
            }
            return { error: `The userName ${userName} already exists` }

        },
        async deleteUser(_, { userName }) {
            const res = await db.collection('users').findOneAndDelete({ userName })
            if (res.value) {
                return 'The user was deleted successfully'
            }
            return 'The user was not found'

        },
        createTweet: async(_, {tweetInput}) => {
            await db.collection('tweets').insertOne({...tweetInput, likes: []})
            return {message: "The tweet was created successfully"}   
        },
        likeTweet : async (_, {tweetInfo : {_id, userName, type}}) => {
            const mongoID = new ObjectId(_id)
            const res = await db.collection('tweets').findOne({_id : mongoID})

            if(!res) return {message: `The tweet was not found with the _id : ${_id}`}

            if(type == 'like') {
                await db.collection('tweets').findOneAndUpdate({_id : mongoID},{$push: {likes : userName} })
                return{message: 'You like this tweet'}
            }
            let {likes} = res
            likes = likes.filter(liker => liker !== userName )
            await db.collection('tweets').findOneAndUpdate({_id: mongoID}, {$set: {likes}})
            return {message: "You dislike this tweet"}
        },
        bookmarkTweet: async(_, {bookmarkInfo : {userName, _id, type}}) => {
            const mongoID = new ObjectId(_id)
            if(type =='bookmark') {
                await db.collection('tweets').findOneAndUpdate({_id: mongoID }, {$push : {bookmarks : userName}})
                return {message : "You bookmarked this tweet"}
            }
            const {bookmarks } = await db.collection('tweets').findOne({_id: mongoID})
            const newBookmarks = bookmarks.filter(bookmark => bookmark !== userName)
            await db.collection('tweets').updateOne({_id: mongoID} , {$set : {bookmarks : newBookmarks}})
            return {message : "UnBookmarked this tweet"}
        }
    }
}