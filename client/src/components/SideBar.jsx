import React, { useEffect, useState } from 'react'
import {authStore} from '../state/auth'
import FollowBtn from './Buttons/FollowBtn'
const SideBar = () => {
  const [toFollow, setToFollow] = useState([])
  const {auth: {credentials}} = authStore(state => state)
  const {userName} = credentials
  useEffect(() => {
    const getWhoToFollow = async () => {
      const req = await fetch('http://localhost:8000/graphql', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query:
            `
          query {
              randomUsers (except: "${userName}") {
                name,
                userName
              }
          }
          `
        })
      })
      const { data: { randomUsers } } = await req.json()
      if(!randomUsers) return 
      setToFollow(randomUsers)
    }
    getWhoToFollow()
  }, [])
  return (
    <aside className='m-10'>
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