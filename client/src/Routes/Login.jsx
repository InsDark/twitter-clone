import React from 'react'
import InputEmail from '../components/Form/InputEmail'
import InputPassword from '../components/Form/InputPassword'
import { formStore } from '../state/form'
import { authStore } from '../state/auth'
import { useNavigate } from 'react-router-dom'
import { getAuth } from '../../api/queries/getAuth'
const Login = () => {
  const { email, password } = formStore(state => state)
  const { setAuth } = authStore(state => state)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res =  await getAuth(email, password)
    if(!res) {alert('Something went wrong try again')}
    const {getAuth : userCred}  = res
    setAuth(userCred)
    localStorage.setItem('credentials', JSON.stringify(userCred))
    navigate('/home')
  }
  return (
    <main className="bg-gray-700 text-white h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className='flex flex-col bg-gray-900 p-5 rounded gap-4 w-fit min-w-fit' >
        <h1 className='text-2xl font-bold text-center'>Log In</h1>
        <InputEmail login={true} />
        <InputPassword login={true} />
        <input type="submit" value="Log In" className=' cursor-pointer bg-slate-700 p-2 rounded' />
      </form>
    </main>
  )
}

export default Login