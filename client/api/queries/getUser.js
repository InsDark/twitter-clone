export const getUser = async ({ userName, get }) => {
    let itemsToGet = ''
    get.forEach(itemToGet => itemsToGet += `${itemToGet}, `)

    const req = await fetch(import.meta.env.VITE_SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query:
                `
                query {
                    user (userName: "${userName}") {
                        ${itemsToGet}
                    }
                }
                `
        })
    })
    const res = await req.json()
    return res
}