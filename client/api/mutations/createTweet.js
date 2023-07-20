export const createTweet = async (tweetInput) => {
    const {content, date, maker} = tweetInput
    const req = await fetch(`http://localhost:8000/graphql`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query :  ` mutation ($content : String, $date: String, $maker: String)  {
                createTweet (tweetInput: {content: $content, date: $date, maker: $maker}) {
                    message,
                    status
                }
            }
            `, variables: {content, date, maker} ,} )
    })
    const res = await req.json()
    return res
}