import React, { useState } from 'react'
import { formStore } from './../../state/form'
const InputEmail = ({ login }) => {
    const { email, updateEmail} = formStore(state => state)
    const [validEmail, setValidEmail] = useState(null)
    const [emailMsg, setEmailMsg] = useState('')

    const checkEmail = (e) => {
        updateEmail(e.target.value)
        if (login) { return null }
        if (e.target.value.trim() === '') {
            setValidEmail(false)
            setEmailMsg('The email should not be empty')
        } else if (e.target.value.includes(' ')) {
            setEmailMsg('The email should not have spaces')
        } else {
            setEmailMsg('The email is okay')
            setValidEmail(true)
        }

    }
    return (
        <div className="flex flex-col">
            <input placeholder='Email' value={email} name='user-name' onChange={checkEmail} type="text" className={`w-full outline-none border-2 rounded pl-3 p-3 border-gray-500 bg-black ${validEmail == null ? '' : (!validEmail ? "border-red-600" : ' border-blue-600')}`} />
            <span className='text-red-600 text-sm'>{validEmail || emailMsg}</span>
        </div>
    )
}

export default InputEmail