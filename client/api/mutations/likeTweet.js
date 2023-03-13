export const likeTweet = async({type, userName, _id}) => {
    const req = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query: `
        mutation {
            likeTweet (tweetInfo : {type:"${type}", _id: "${_id}", userName: "${userName}"}) {
                message
            }
        }`})
    })
    const res = await req.json()
    console.log(res)
}