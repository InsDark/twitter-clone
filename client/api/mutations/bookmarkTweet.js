export const bookmarkTweet = async ({  _id, type, token }) => {
    const req = await fetch(import.meta.env.VITE_SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            query: `
        mutation {
            bookmarkTweet (bookmarkInfo : { _id : "${_id}", type: "${type}"}) {
                message
            }
        }`})
    })
    const res = await req.json()
    return res
}