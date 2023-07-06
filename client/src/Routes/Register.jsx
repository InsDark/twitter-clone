import React from 'react'
import { useState } from 'react'
import InputEmail from '../components/Form/InputEmail'
import InputName from '../components/Form/InputName'
import InputPassword from '../components/Form/InputPassword'
import InputUserName from '../components/Form/InputUserName'
import { formStore } from '../state/form'
import { authStore } from '../state/auth'
import { FaTwitter } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate()
    const setAuth = authStore(state => state.setAuth)
    const { name, password, email, userName } = formStore(state => state)
    const [validateMsg, setValidateMsg] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !userName || !password || !name) {
            setValidateMsg('You should check all the required fields to continue')
            return
        }
        setValidateMsg('')
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
                        expiration,
                        error
                    }
                }`

            })
        })
        const res = await req.json()
        console.log(res)
        const {data : {createUser: {error, token, expiration}}} = res 
        if (!token) {
            return setValidateMsg(error)
        }
        setAuth([{ name, userName, email, token, expiration }])
        localStorage.setItem('credentials', JSON.stringify([{ name, userName, email, token, expiration }]))
        navigate('/home')

    }
    return (
        <div className="bg-gray-700 text-white h-screen flex items-center justify-center">
            <main className=' w-[25rem] items-center flex flex-col bg-black p-5 rounded gap-4' >
                <FaTwitter size={40} className='m-auto' />
                <h1 className='text-2xl font-bold text-center'>Sign up in to Twitter</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <InputName />
                    <InputUserName />
                    <InputEmail />
                    <InputPassword />
                    <input type="submit" value="Sign Up" className='bg-blue-500 cursor-pointer font-bold rounded-full p-2' />
                </form>
                <span className='text-red-600 text-sm'>{validateMsg}</span>
            </main>
        </div>
    )
}

export default Register