export const bookmarkTweet = async ({userName, _id, type}) => {
    const req = await fetch('https://twitter-clone-ujkp.onrender.com/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query : `
        mutation {
            bookmarkTweet (bookmarkInfo : {userName: "${userName}", _id : "${_id}", type: "${type}"}) {
                message
            }
        }`})
    })
    const res = await req.json()
    return res
}