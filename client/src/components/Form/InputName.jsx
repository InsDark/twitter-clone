import React, { useState } from 'react'
import { formStore } from './../../state/form'
const InputName = () => {
    const { name, updateName } = formStore(state => state)

    const [validName, setValidName] = useState(null)
    const [nameMsg, setNameMsg] = useState('')
    const checkName = (e) => {
        updateName(e.target.value)
        setValidName(false)
        if (e.target.value.startsWith(' ')) {
            setNameMsg('The name should not start with space')
        } else if (e.target.value.length == 0) {
            setNameMsg('The name should not be empty')

        } else if (e.target.value.length < 10) {
            setNameMsg('The name should be at least 10 characters')
        } else {
            setNameMsg('The name is okay')
            setValidName(true)
        }

    }
    return (
        <div className='flex flex-col '>
            <input placeholder='Name' value={name} name='user-name' onChange={checkName} type="text" className={`w-full outline-none border-2 rounded pl-3 p-3 border-gray-500 bg-black ${validName == null ? '' : (!validName ? "border-red-600": ' border-blue-600')  }`} />
            <span className='text-red-600 text-sm'>{validName || nameMsg}</span>
        </div>
    )
}

export default InputName