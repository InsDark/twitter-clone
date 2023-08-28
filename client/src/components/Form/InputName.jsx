import React, { useState } from 'react'
import { formStore } from './../../state/form'
import { useDebouncedCallback } from 'use-debounce'
const InputName = ({ value, showLabel }) => {
    const {  updateName } = formStore(state => state)
    const [validName, setValidName] = useState(null)
    const [nameMsg, setNameMsg] = useState('')
    const checkName = useDebouncedCallback((e) => {
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
    }, 1000)

    return (
        <div className='flex flex-col '>
            {showLabel ? <label className='text-gray-500 text-sm' htmlFor="">Name</label> : ""}
            <input defaultValue={value} placeholder='Name' name='user-name'
                onChange={(e) => checkName(e) }
                type="text" className={`w-full outline-none border-2 rounded pl-3 p-3 border-gray-500 bg-black ${validName == null ? '' : (!validName ? "border-red-600" : ' border-blue-600')}`} />
            <span className='text-red-600 text-sm'>{validName || nameMsg}</span>
        </div>
    )
}

export default InputName