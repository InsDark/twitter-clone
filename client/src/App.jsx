import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Bookmarks from './Routes/Bookmarks'
import Home from './Routes/Home'
import Login from './Routes/Login'
import Profile from './Routes/Profile'
import Register from './Routes/Register'
import { authStore } from './state/auth'
import Main from './Routes/Main'
const ProtectRoute = ({ element }) => {
  const setAuth = authStore(state => state.setAuth)
  const localAuth = JSON.parse(localStorage.getItem('credentials'))
  if (!localAuth) return <Navigate to={'/login'} />
  const {expiration} = localAuth
  if(expiration <= Date.now()) {
    localStorage.removeItem('credentials')
    return <Navigate to={'/login'} />
  }
  setAuth(localAuth) 
  return element
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<ProtectRoute element={<Home />} />} />
        <Route path='/bookmarks' element={< ProtectRoute element={<Bookmarks />} />} />
        <Route path='/' element={<Main/>}/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/:userID' element={< ProtectRoute element={<Profile />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
