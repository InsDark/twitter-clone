import React, { useState } from 'react'
import InputEmail from '../components/Form/InputEmail'
import InputPassword from '../components/Form/InputPassword'
import { formStore } from '../state/form'
import { authStore } from '../state/auth'
import { useNavigate } from 'react-router-dom'
import { FaTwitter } from 'react-icons/fa'
import { loginUser } from '../../api/queries/loginUser'

const Login = () => {
  document.title = 'Login'
  const { email, password } = formStore(state => state)
  const { setAuth } = authStore(state => state)
  const [error, setError] = useState()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser({ email, password })
    const { error, token, expiration, userName, name } = res
    if (error) return setError(error)
    const userCredentials = { token, expiration, userName, name }
    setAuth(userCredentials)
    localStorage.setItem('credentials', JSON.stringify(userCredentials))
    navigate('/home')
  }
  return (
    <div className="bg-gray-700 text-white h-screen flex items-center justify-center">
      <main className=' w-[25rem] items-center flex flex-col bg-black text-white p-5 rounded gap-5' >
        <FaTwitter size={30} className='m-auto' />
        <h1 className='text-2xl font-bold text-center'>Sign in to Twitter</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
          <InputEmail login={true} />
          <InputPassword validate={false}  />
          <input type="submit" value="Log In" className=' cursor-pointer  border-blue-600 rounded-full border-2 p-2' />
          <span className='text-red-600 text-sm text-center'>{error || ''}</span>
        </form>
      </main>
    </div>
  )
}

export default Login