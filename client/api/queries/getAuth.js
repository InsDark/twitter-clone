export const getAuth = async (email, password) => {
    const req = await fetch('https://twitter-clone-ujkp.onrender.com/graphql', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: ` query {
                getAuth (email: "${email}", password: "${password}")  {
                token,
                expiration,
                userName,
                message
            }
        }`})
    })
    const {data} = await req.json()
    return data
}