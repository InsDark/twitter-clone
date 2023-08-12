export const getToken = async({token}) => {
    const req = await fetch(import.meta.env.VITE_SERVER_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: ` query {
                getToken (token: "${token}")  {
                token
            }
        }`})
    })
    const {data} = await req.json()
    return data
} 