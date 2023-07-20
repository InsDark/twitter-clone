import React from 'react'
import InputEmail from '../components/Form/InputEmail'
import InputPassword from '../components/Form/InputPassword'
import { formStore } from '../state/form'
import { authStore } from '../state/auth'
import { useNavigate } from 'react-router-dom'
import { getAuth } from '../../api/queries/getAuth'
import { FaTwitter } from 'react-icons/fa'
const Login = () => {
  const { email, password } = formStore(state => state)
  const { setAuth } = authStore(state => state)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await getAuth(email, password)
    if (!res.getAuth)  return alert('The credentials are not correct') 
    const { getAuth: userCred } = res
    setAuth(userCred)
    localStorage.setItem('credentials', JSON.stringify(userCred))
    navigate('/home')
  }
  return (
    <div className="bg-gray-700 text-white h-screen flex items-center justify-center">
      <main className=' w-[25rem] items-center flex flex-col bg-black text-white p-5 rounded gap-5' >
        <FaTwitter size={30} className='m-auto' />
        <h1 className='text-2xl font-bold text-center'>Sign in to Twitter</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
          <InputEmail login={true} />
          <InputPassword login={true} />
          <input type="submit" value="Log In" className=' cursor-pointer  border-blue-600 rounded-full border-2 p-2' />
        </form>
      </main>
    </div>
  )
}

export default Login