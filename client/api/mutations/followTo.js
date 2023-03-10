export const followTo = async ( from, userToFollow, type) => {
    const req = await fetch(`http://localhost:8000/graphql`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query :  
            ` mutation {
                followTo(from: "${from}", to: "${userToFollow}", type: "${type}") {
                    message,
                    status
                }
            }
            `})
    })
    const res = await req.json()
    return res
}