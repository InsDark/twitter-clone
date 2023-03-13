export const getWhoToFollow = async (userName) => {
    const req = await fetch('http://localhost:8000/graphql', {
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