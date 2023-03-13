export const getTweets  = async (except) => {
    const req = await fetch('http://localhost:8000/graphql', {
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