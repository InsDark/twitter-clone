import React, { useState } from 'react'
import { formStore } from './../../state/form'
const InputName = () => {
    const { name, updateName, validName, isValidName } = formStore(state => state)
    const [display, setDisplay] = useState(false)
    const [nameMsg, setNameMsg] = useState('')
    const checkName = (e) => {
        setDisplay(true)
        updateName(e.target.value)
    if(e.target.value.startsWith(' ')) {
        setNameMsg('The name should not start with space')
        validName(false)
    } else if (e.target.value.length == 0) {
        setNameMsg('The name should not be empty')
        validName(false)

    } else if (e.target.value.length < 10) {
        setNameMsg('The name should be at least 10 characters')
        validName(false)

    } else {
        setNameMsg('The name is okay')
        validName(true)
    }
        
    }
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center justify-between'>
                <label htmlFor="user-name">Name: </label> <input value={name} name='user-name' onChange={checkName} type="text" className='outline-none rounded pl-3 bg-slate-700 p-1' />
            </div>
            {!display ? null : <h2 className={isValidName ? 'bg-green-700 p-2 text-center' : ' bg-red-800 p-2 text-center '}>{nameMsg}</h2> }
            
        </div>
    )
}

export default InputName