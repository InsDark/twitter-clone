export const validateToken = async({ context, db }) => {
    const token = context.headers.authorization.slice(7)
    const res = await db.collection('tokens').findOne({ token })
    return res
}