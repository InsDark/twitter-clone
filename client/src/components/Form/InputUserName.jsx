import React, { useState } from 'react'
import { formStore } from './../../state/form'
import { getUser } from '../../../api/queries/getUser'
import { useDebouncedCallback } from 'use-debounce'

const InputUserName = ({ value, showLabel }) => {
    const { updateUserName } = formStore(state => state)
    const [validUserName, setValidUserName] = useState(null)
    const [userNameMsg, setUserNameMsg] = useState('')
    const checkUserName = useDebouncedCallback(async (e) => {
        setValidUserName(false)
        updateUserName(e.target.value)
        if (e.target.value.match(' ')) {
            return setUserNameMsg('The userName shoud not contain blank spaces')
        }
        if (!e.target.value.trim()) {
            setUserNameMsg('The userName should not be empty')
            return
        }

        const res = await getUser({ get: ['userName'], userName: e.target.value.trim() })
        const { data: { user } } = res
        if (!user) {
            setUserNameMsg('The userName is okay')
            return setValidUserName(true)
        }
        setUserNameMsg('The userName is already in use')
        return setValidUserName(false)
    }, 1000)
    
    return (
        <div className='flex flex-col'>
            {showLabel ? <label className='text-gray-500 text-sm' htmlFor="">User Name</label> : ''}
            
            <input defaultValue={value}  placeholder='UserName' name='user-name' onChange={(e) => checkUserName(e)} type="text" className={`w-full outline-none border-2 rounded pl-3 p-3 border-gray-500 bg-black ${validUserName == null ? '' : (!validUserName ? "border-red-600" : ' border-blue-600')}`} />
            <span className='text-red-600 text-sm'>{validUserName || userNameMsg}</span>

        </div>
    )
}

export default InputUserName