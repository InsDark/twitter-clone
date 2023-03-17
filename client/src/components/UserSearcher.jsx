import React, { useState } from 'react'
import { getUsers } from '../../api/queries/getUsers'
import {Link} from 'react-router-dom'
const UserSearcher = () => {
    const [userResults, setUserResults] = useState([])
    const [visible, setVisible] = useState(false)
    const handleChange = async(e) => {
        const userName = e.target.value
        const {data : {user}} = await getUsers(userName)
        if(!user) {
            setVisible(false)
            return
        }
        setVisible(true)
        setUserResults(user)
    }
  return (
    <div className="bg-gray-900 p-4 rounded-2xl flex flex-col gap-3">
        <input onChange={handleChange}  onFocus={() => {setVisible(true)}} type="text" placeholder="UserName" className=' p-2 rounded bg-gray-800 outline-none' />
        {visible ? userResults.length == 0 ? "There is no results" : 
        <div className='flex items-center gap-3'>
            <img src="http://placeimg.com/300/300/animals" alt="" className='rounded-full w-20 h-auto' />
            <div className='flex flex-col'>

            <h2>{userResults.name}</h2>
            <Link className='text-sm text-gray-500' to={`/${userResults.userName}`}>@{userResults.userName}</Link>
            </div>
            </div>: null}

    </div>
  )
}

export default UserSearcher