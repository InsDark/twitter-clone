import React, { useState } from 'react'
import { formStore } from './../../state/form'
const InputUserName = () => {
    const { userName, updateUserName } = formStore(state => state)
    const [validUserName, setValidUserName] = useState(null)
    const [userNameMsg, setUserNameMsg] = useState('')
    const checkUserName = async (e) => {
        setValidUserName(false)
        updateUserName(e.target.value)
        if (e.target.value.match(' ')) {
            return setUserNameMsg('The userName shoud not contain blank spaces')
        }
        if (!e.target.value.trim()) {
            setUserNameMsg('The Password should not be empty')
            return
        }
        const req = await fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query:
                    `
                query {
                    user (userName: "${e.target.value.trim()}") {
                        userName
                    }
                }
                `
            })
        })
        const { data: { user } } = await req.json()
        if (!user) {
            setUserNameMsg('The userName is okay')
            return setValidUserName(true)
        }
        setUserNameMsg('The userName is already in use')
        return setValidUserName(false)
    }
    return (
        <div className='flex flex-col'>
            <input placeholder='UserName' value={userName} name='user-name' onChange={checkUserName} type="text" className={`w-full outline-none border-2 rounded pl-3 p-3 border-gray-500 bg-black ${validUserName == null ? '' : (!validUserName ? "border-red-600" : ' border-blue-600')}`} />
            <span className='text-red-600 text-sm'>{validUserName || userNameMsg}</span>

        </div>
    )
}

export default InputUserName