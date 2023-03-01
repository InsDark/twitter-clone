import React from 'react'
import InputEmail from '../components/Form/InputEmail'
import InputPassword from '../components/Form/InputPassword'
import { formStore } from '../state/form'
import { authStore } from '../state/auth'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const { email, password } = formStore(state => state)
  const { setAuth } = authStore(state => state)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query {
            loginUser (email : "${email}", password : "${password}") {
              token,
              expiration,
              name,
              userName
            }
          }`
      })
    })
    const { data: { loginUser: { token, expiration, name, userName } } } = await req.json()
    if (!token) {
      return alert('Invalid login credentials')
    }
    setAuth([{ name, userName, email, token, expiration }])
    localStorage.setItem('credentials', JSON.stringify([{ name, userName, email, token, expiration }]))
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