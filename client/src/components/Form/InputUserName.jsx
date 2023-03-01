import React, { useState } from 'react'
import { formStore } from './../../state/form'
const InputUserName = () => {
    const { userName, updateUserName, validUserName, isValidUserName } = formStore(state => state)
    const [userNameMsg, setUserNameMsg] = useState('')
    const [display, setDisplay] = useState('')
    const checkUserName = async (e) => {
        setDisplay(true)
        updateUserName(e.target.value)
        if (e.target.value.match(' ')) {
            validUserName(false)
            return setUserNameMsg('The userName shoud not contain blank spaces')
        }
        if (!e.target.value.trim()) {
            setUserNameMsg('The Password should not be empty')
            return validUserName(false)
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
            return validUserName(true)
        }
        setUserNameMsg('The userName is already in use')
        return validUserName(false)
    }
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center justify-between'>
                <label htmlFor="user-userName" >UserName:  </label> <input type="text" value={userName} onChange={checkUserName} name='user-userName' className='outline-none rounded pl-3 bg-slate-700 p-1' />
            </div>
            {!display ? null : <h2 className={isValidUserName ? 'bg-green-700 p-2 text-center' : ' bg-red-800 p-2 text-center '}>{userNameMsg}</h2> }
            
        </div>
    )
}

export default InputUserName