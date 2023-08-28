export const loginUser = async ({email, password}) => {

    const req = await fetch(import.meta.env.VITE_SERVER_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: ` query {
                loginUser (email: "${email}", password: "${password}")  {
                token,
                expiration,
                userName,
                error,
                name,
                profilePicture,
                coverPicture            
            }
        }`})
    })
    const {data : {loginUser}} = await req.json()
    return loginUser
}