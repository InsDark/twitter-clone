import React, { useState } from 'react'
import { getUsers } from '../../api/queries/getUsers'
import {Link} from 'react-router-dom'
import {useDebouncedCallback} from 'use-debounce'

const UserSearcher = () => {
    const [userResults, setUserResults] = useState([])
    const [visible, setVisible] = useState(false)
    const [userName, setUserName] = useState('')

    const handleChange = useDebouncedCallback(async(e) => {
      const userName = e.target.value
      if(!userName) return 
      setUserName(userName)
      const {data : {user}} = await getUsers(userName)
      if(!user) {
          setVisible(false)
          return
      }
      setVisible(true)
      setUserResults(user)
  }, 1000)

  return (
    <div className="bg-gray-900 p-4 rounded-2xl flex flex-col gap-3">
        <input onChange={ (e) => handleChange(e)}  type="text" placeholder="type a userName ..." className=' p-2 rounded bg-gray-800 outline-none' />
        {visible ? userResults.length == 0 ? "There is no results" : 
        <div className='flex items-center gap-3'>
            <img src={`https://api.dicebear.com/6.x/bottts/svg?seed=${userName}`} alt="" className='w-10 h-auto' />
            <div className='flex flex-col'>

            <h2>{userResults.name}</h2>
            <Link className='text-sm text-gray-500' to={`/${userResults.userName}`}>@{userResults.userName}</Link>
            </div>
            </div>: null}

    </div>
  )
}

export default UserSearcher