import { Navigate } from 'react-router-dom'
import { getToken } from '../../api/queries/getToken'

export const CheckAuth = ({ element }) => {
    const localAuth = JSON.parse(localStorage.getItem('credentials'))
    const { expiration, token } = localAuth

    if(!expiration || !token) return element

    if (Date.now() > parseInt(expiration)) {
        localStorage.removeItem('credentials')
        return element
    }

    getToken({ token })
        .then(res => {
            if (!res.getToken.token) {
                return element
            }
        })


    return <Navigate to={'/home'}/>
}
