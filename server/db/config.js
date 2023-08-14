import {MongoClient, ServerApiVersion} from 'mongodb'
const connectDB = async( ) => {
    try {
        const client = new MongoClient(process.env.MONGODB_URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            }
        })
        await client.connect()
        console.log('The db connection is established')
        const db = client.db('twitter')
        return db
    } catch (e)  {
        return e
    }
}
export const db = await connectDB()

