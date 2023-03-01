import React, { useState } from 'react'
import { formStore } from './../../state/form'
const InputEmail = ({login}) => {
    const { email, updateEmail, validEmail, isValidEmail } = formStore(state => state)
    const [emailMsg, setEmailMsg] = useState('')
    const [display, setDisplay] = useState(false)
    const checkEmail = (e) => {
        updateEmail(e.target.value)
        if(login) {return null}
        setDisplay(true)
        if(e.target.value.trim() === '') {
            validEmail(false)
            setEmailMsg('The email should not be empty')
        } else if (e.target.value.includes(' ')) {
            setEmailMsg('The email should not have spaces')
        } else {
            setEmailMsg('The email is okay')
            validEmail(true)
        }
    
    }
    return (
        <div className="flex flex-col gap-2 ">
            <div className='flex gap-2 justify-between items-center'>
                <label htmlFor="user-email" >Email: </label> <input onChange={checkEmail} type="email" value={email} name="user-email" className='outline-none rounded pl-3 bg-slate-700 p-1' />
            </div>
            {!display ? null : <h2 className={isValidEmail ? 'bg-green-700 p-2 text-center' : ' bg-red-800 p-2 text-center '}>{emailMsg}</h2> } 
        </div>
    )
}

export default InputEmail