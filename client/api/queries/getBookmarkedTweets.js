export const getBookmarkedTweets = async (userName ) => {
    const req = await fetch('https://twitter-clone-ujkp.onrender.com/graphql', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query: `
        query {
            getBookmarkedTweets (userName: "${userName}") {
                content,
                maker,
                date,
                likes,
                _id,
                bookmarks
            }
        }`})
    })
    const res = await req.json()
    return res
}