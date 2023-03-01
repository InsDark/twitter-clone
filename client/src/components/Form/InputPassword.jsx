import React, { useState } from 'react'
import { formStore } from './../../state/form'
const InputPassword = ({login}) => {
    const { password, isValidPassword, validPassword, updatePassword } = formStore(state => state)
    const[display, setDisplay] = useState(false)
    const [passwordMsg, setPasswordMsg] = useState('')
    const checkPassword = (e) => {
        updatePassword(e.target.value)
        if(login) return null
        setDisplay(true)
        if(e.target.value.includes('     ')) {
            setPasswordMsg('The password should not contains space')
            validPassword(false)
        } else if(e.target.value.length < 10) {
            validPassword(false)
            setPasswordMsg('The password should have at least 10 characters')
        } else {
            setPasswordMsg('The password is okay')
            validPassword(true)
        }
    }
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center justify-between'>
                <label htmlFor="user-name">Password: </label> <input value={password} name='user-name' onChange={checkPassword} type="password" className='outline-none rounded pl-3 bg-slate-700 p-1' />
            </div>
            {!display ? null : <h2 className={isValidPassword ? 'bg-green-700 p-2 text-center' : ' bg-red-800 p-2 text-center '}>{passwordMsg}</h2>}

        </div>
    )
}

export default InputPassword