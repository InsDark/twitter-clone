export const getAuth = async (email, password) => {
    const req = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: ` query {
                getAuth (email: "${email}", password: "${password}")  {
                token,
                expiration,
                userName
            }
        }`})
    })
    const {data} = await req.json()
    return data
}