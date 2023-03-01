import { db } from "../db/config.js"
import { hashSync, genSaltSync, compare, compareSync } from 'bcrypt'
import { request } from 'express'
export const resolvers = {
    Query: {
        user: async (_, args) => {
            const userResponse = await db.collection('users').find({ userName: args.userName }).toArray()
            return userResponse[0]
        },
        randomUsers: async () => {
            const response = await db.collection('users').find({ $nor: [{ userName: 'Dieres' }, { followers: { $in: ['Dieres'] } }] }).limit(3).toArray()
            return response
        },
        loginUser: async (_, { email, password }) => {
            const user = await db.collection('users').findOne({ email })
            if(!user) {
                return {email: 'There is no user with that email'}
            }
            const {passwordHash, userName, name} = user
            const passwordVerify = await compareSync(password, passwordHash)
            if (!passwordVerify) return { email: email }
            const token = hashSync(`${userName}${email}`, 12)
            const expiration = Date.now() + 43200000
            const access_token = { token, expiration }
            await db.collection('access_tokens').insertOne(access_token)
            return { email: email, ...access_token, name, userName }

        }

    },
    Mutation: {
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
                return { ...newUser, access_token}
            }
            return { userName: `The userName ${userName} already exists` }

        },
        async deleteUser(_, { userName }) {
            const res = await db.collection('users').findOneAndDelete({ userName })
            if (res.value) {
                return 'The user was deleted successfully'
            }
            return 'The user was not found'

        }
    }
}