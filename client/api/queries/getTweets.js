export const getTweets  = async (except) => {
    const req = await fetch(import.meta.env.VITE_SERVER_URL, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query :`query { 
            getTweets (except : "${except}") {
                maker, date, likes, content, _id, bookmarks
            }
        }`})
    })
    const res = await req.json()
    return res
}