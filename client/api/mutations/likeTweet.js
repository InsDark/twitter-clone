export const likeTweet = async ({ type, userName, _id, token }) => {
    const req = await fetch(import.meta.env.VITE_SERVER_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            query: `
        mutation {
            likeTweet (tweetInfo : {type:"${type}", _id: "${_id}", userName: "${userName}"}) {
                message
            }
        }`})
    })
    const res = await req.json()
}