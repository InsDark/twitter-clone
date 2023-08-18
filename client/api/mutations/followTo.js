export const followTo = async ({  userToFollow, type, token }) => {
    const req = await fetch(import.meta.env.VITE_SERVER_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            query:
                ` mutation {
                followTo( to: "${userToFollow}", type: "${type}") {
                    message,
                    status
                }
            }
            `})
    })
    const res = await req.json()
    return res
}