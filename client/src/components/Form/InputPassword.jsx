import React, { useState } from 'react'
import { formStore } from './../../state/form'
const InputPassword = () => {
    const { password,  updatePassword } = formStore(state => state)
    const [validPassword, setValidPassword] = useState(null)
    const [passwordMsg, setPasswordMsg] = useState('')
    const checkPassword = (e) => {
        updatePassword(e.target.value)
        setValidPassword(false)
        if(e.target.value.includes('     ')) {
            setPasswordMsg('The password should not contains space')
        } else if(e.target.value.length < 10) {
            setValidPassword(false)
            setPasswordMsg('The password should have at least 10 characters')
        } else {
            setPasswordMsg('The password is okay')
            setValidPassword(true)
        }
    }
    return (
        <div className='flex flex-col'>
               <input placeholder='Password' value={password} name='user-name' onChange={checkPassword} type="password" className={`w-full outline-none border-2 rounded pl-3 p-3 bg-black ${validPassword == null ? 'border-gray-500' : (!validPassword ? "border-red-600" : ' border-blue-600')}`} />
               <span className='text-red-600 text-sm'>{validPassword || passwordMsg}</span>

        </div>
    )
}

export default InputPassword