import {MongoClient} from 'mongodb'
const connectDB = async( ) => {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    await client.connect()
    console.log('The db connection is established')
    const db = client.db('twitter')
    return db
}
export const db = await connectDB()

