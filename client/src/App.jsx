import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Bookmarks from './Routes/Bookmarks'
import {ProtectRoute} from './middleware/ProtectRoute'
import {CheckAuth} from './middleware/CheckAuth'
import Home from './Routes/Home'
import Login from './Routes/Login'
import Profile from './Routes/Profile'
import Register from './Routes/Register'
import Main from './Routes/Main'
import 'dotenv'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<ProtectRoute element={<Home />} />} />
        <Route path='/bookmarks' element={< ProtectRoute element={<Bookmarks />} />} />
        <Route path='/' element={<CheckAuth element={ <Main />}/>} />
        <Route path='/register' element={<CheckAuth element={<Register />} /> } />
        <Route path='/login' element={ <CheckAuth  element={<Login />} /> } />
        <Route path='/:userID' element={< ProtectRoute element={<Profile />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
