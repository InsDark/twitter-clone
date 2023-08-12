export const createUser = async ({ name, email, userName, password }) => {

    const req = await fetch(import.meta.env.VITE_SERVER_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            query:
                `mutation {
                    createUser(name:" ${name}", email: "${email}", password: "${password}", userName: "${userName}"){
                        name,
                        email,
                        userName,
                        token,
                        expiration,
                        error
                    }
                }`

        })
    })
    const res = await req.json()
    return res
}