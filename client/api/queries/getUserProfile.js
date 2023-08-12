export const getUserProfile = async (userName) => {
    const req = await fetch(import.meta.env.VITE_SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `
                query {
                    user (userName: "${userName}") {
                        name,
                        followers,
                        following
                }
            }`})

    })
    const res = await req.json()
    return res
}