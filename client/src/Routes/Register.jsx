import React from 'react'
import { useState } from 'react'
import InputEmail from '../components/Form/InputEmail'
import InputName from '../components/Form/InputName'
import InputPassword from '../components/Form/InputPassword'
import InputUserName from '../components/Form/InputUserName'
import { formStore } from '../state/form'
import { authStore } from '../state/auth'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate()
    const setAuth = authStore(state => state.setAuth)
    const { isValidName, isValidPassword, isValidUserName, isValidEmail, name, password, email, userName } = formStore(state => state)
    const [validateMsg, setValidateMsg] = useState('')
    const [display, setDisplay] = useState(false)
    const handleSubmit = async (e) => {
        setDisplay(true)
        e.preventDefault();
        if (!isValidEmail || !isValidUserName || !isValidPassword || !isValidName) {
            setValidateMsg('You should check all the required fields to continue')
            return
        }
        setValidateMsg('')
        setDisplay(false)
        const req = await fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query:
                    `mutation {
                    createUser(name:" ${name}", email: "${email}", password: "${password}", userName: "${userName}"){
                        name,
                        email,
                        userName,
                        token,
                        expiration
                    }
                }`

            })
        })
        const { data: { createUser: { token, expiration } } } = await req.json()
        if (!token) {
            return alert('something went wrong try again')
        }
        setAuth([{ name, userName, email, token, expiration }])
        localStorage.setItem('credentials', JSON.stringify([{ name, userName, email, token, expiration }]))
        navigate('/home')

    }
    return (
        <main className="bg-gray-700 text-white h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className='flex flex-col bg-gray-900 p-5 rounded gap-4 w-fit min-w-fit' >
                <h1 className='text-2xl font-bold text-center'>Sign up</h1>
                <InputName />
                <InputUserName />
                <InputEmail />
                <InputPassword />
                <input type="submit" value="Sign Up" className=' cursor-pointer bg-slate-700 p-2 rounded' />
                {!display ? null : <h2 className={!display ? null : 'bg-red-700 text-white p-2'}>{validateMsg}</h2>}
            </form>
        </main>
    )
}

export default Register