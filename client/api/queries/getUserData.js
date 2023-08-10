export const getUserData = async (userName) => {
    const req = await fetch(`https://twitter-clone-ujkp.onrender.com/graphql`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `
                query {
                    user (userName: "${userName}") {
                        name, following, followers
                    }
                }
            `})
    })
    const res = await req.json()
    return res
}