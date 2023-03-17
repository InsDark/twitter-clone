export const getUsers =  async(userName) => {
    const req = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query: `
        query {
            user(userName : "${userName}") {
                name,
                userName
            }
        }`})
    })
    const res = await req.json()
    return res
}