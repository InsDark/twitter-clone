import {  Navigate, useNavigate } from 'react-router-dom'
import { authStore } from './../state/auth'
import { getToken } from '../../api/queries/getToken'

export const ProtectRoute = ({ element }) => {
    const setAuth = authStore(state => state.setAuth)
    const localAuth = JSON.parse(localStorage.getItem('credentials'))
    const navigate = useNavigate()
    
    if (!localAuth) return <Navigate to={'/login'} />
  
    const { token, expiration } = localAuth
    
    if (expiration <= Date.now()) {
      localStorage.removeItem('credentials')
      return <Navigate to={'/login'} />
    }
  
    getToken({token})
      .then(res => {
        if(!res.getToken.token) {
          return navigate('/login')
        }
      })
    
    
    setAuth(localAuth)
    return element
  }
  