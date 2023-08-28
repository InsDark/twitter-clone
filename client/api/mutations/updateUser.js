export const updateUser = async ({  profilePicture, coverPicture, userName, name, token }) => {
    const req = await fetch(import.meta.env.VITE_SERVER_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            query: `
        mutation {
            updateUser (userData : { name: "${name}", profilePicture: "${profilePicture}" , coverPicture: "${coverPicture}" }) {
                message
            }
        }`})
    })
    const res = await req.json()
}