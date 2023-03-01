import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { authStore } from '../state/auth'
import { profileStore } from '../state/profileInfo'
const UserInfo = () => {
    const userCred = authStore(state => state.auth)
    const {userName} = userCred[0]

    const { userID  } = useParams()
    const { setUserInfo, userInfo } = profileStore(state => state)
    const { name, followers, following } = userInfo
    const getUserInfo = async (userName) => {
        const req = await fetch('http://localhost:8000/graphql', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
            query {
                user (userName: "${userName}") {
                    name,
                    followers,
                    following
                }
            }`})
        })
        const { data: { user } } = await req.json()
        setUserInfo(user)
    }
    useEffect(() => {
        getUserInfo(userID)

    }, [])
    return (
        <div >
            <img className='w-full h-auto' src="http://placeimg.com/600/200/any" />
            <div className='flex p-4 items-center justify-between'>
                <img src="http://placeimg.com/200/200/any" alt="" className='-mt-20 rounded-full border w-1/4 h-auto ' />
                {
                    userName == userID ? <button className=' hover:bg-slate-900 text-white border h-fit rounded-full py-2 px-5 font-semibold'>Edit Profile</button> :
                    <button className='border text-white h-fit rounded-full py-2 px-5 font-semibold'>Follow</button>
                }
            </div>
            <div className='px-3 pt-1 pb-3'>
                <h1 className='text-xl font-bold'>{name}</h1>
                <h2 className='text-gray-500'>@{userName}</h2>
                <div className='flex gap-3'>
                    <h3>{followers ? followers.length : '' } <span className='text-gray-500'>Followers</span> </h3>
                    <h3>{following ? following.length : ''} <span className='text-gray-500'>Following</span></h3>
                </div>
            </div>
        </div>
    )
}

export default UserInfo