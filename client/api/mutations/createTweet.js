export const createTweet = async ({ tweetInput, token }) => {
    const { content, date, maker } = tweetInput

    const req = await fetch(import.meta.env.VITE_SERVER_URL, {
        method: 'POST',

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify({
            query: ` mutation ($content : String, $date: String, $maker: String)  {
                createTweet (tweetInput: {content: $content, date: $date, maker: $maker}) {
                    message,
                    status
                }
            }`,
            variables: { content, date, maker },
        })
    })
    const res = await req.json()
    return res
}