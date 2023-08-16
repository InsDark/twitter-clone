export const getUserTweets = async ({userName}) => {
    const req = await fetch(import.meta.env.VITE_SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        query {
          userTweets (userName: "${userName}") {
            content,
            _id,
            date, likes, maker, bookmarks
          }
        }`
      })
    })
    const { data: { userTweets } } = await req.json()
    return userTweets
  }