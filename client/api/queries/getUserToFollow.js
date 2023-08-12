export const getWhoToFollow = async (userName) => {
    const req = await fetch(import.meta.env.VITE_SERVER_URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query:
                `
            query {
                randomUsers (except: "${userName}") {
                    name,
                    userName
                }
            }
            `
        })
    })
    const res = req.json()
    return res
}