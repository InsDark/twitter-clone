import React, { useEffect, useState } from 'react'
import {authStore} from '../state/auth'
import FollowBtn from './Buttons/FollowBtn'
import {usersToFollowStore} from '../state/usersToFollow'
import { getWhoToFollow } from '../../api/queries/getUserToFollow'
const SideBar = () => {
  const {toFollow, setToFollow} = usersToFollowStore(state => state)
  const {auth: {credentials}} = authStore(state => state)
  const {userName} = credentials
  useEffect( () => {
    (async( )=> {
      const {data : {randomUsers} } = await getWhoToFollow(userName)
      setToFollow(randomUsers)
    })()
  }, [])
  return (
    <aside className='m-10 sticky top-3 h-fit'>
      <div className='bg-gray-900 p-4 rounded-2xl'>
        <h2 className='text-xl font-bold pb-4'>Who to follow</h2>
        <div className='gap-3 flex flex-col'>
          {toFollow.map((user => (
            <div key={user.userName} className='flex gap-2 justify-between items-center'>
              <div className='flex  gap-2 items-center'>
                <img className='w-20 h-20 rounded-full' src="https://placeimg.com/200/200/animals" alt="" />
                <div>
                  <h3 className='font-semibold'>{user.name}</h3>
                  <span className='text-gray-500'>@{user.userName}</span>
                </div>
              </div>
              <FollowBtn followTo={user.userName}/>
            </div>
          )))}
        </div>
      </div>
    </aside>
  )
}

export default SideBar