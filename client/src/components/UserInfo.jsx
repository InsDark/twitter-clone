import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserProfile } from '../../api/queries/getUserProfile'
import { authStore } from '../state/auth'
import { profileStore } from '../state/profileInfo'
import FollowBtn from './Buttons/FollowBtn'
const UserInfo = () => {
    const {credentials: {userName}} = authStore(state => state.auth)
    const { userID } = useParams()
    const { setUserInfo, userInfo, userExists, setUserExist } = profileStore(state => state)
    const { name, followers, following } = userInfo
    useEffect(() => {
        (async () => {
            const { data: { user } } = await getUserProfile(userID)
            if (!user) return setUserExist(false)
            setUserInfo(user)
            setUserExist(true)
        })()
    }, [userID])
    return (
        <div className='max-w-full'>
            {userExists ?
                <><img className='w-full h-auto' src="http://placeimg.com/600/200/animals" />
                    <div className='flex p-4 items-center justify-between'>
                        <img src="http://placeimg.com/200/200/animals" alt="" className='-mt-20 rounded-full border w-1/4 h-auto ' />
                        {
                            userName == userID ? <button className=' hover:bg-slate-900 text-white border h-fit rounded-full py-2 px-5 font-semibold'>Edit Profile</button> :
                                <FollowBtn followTo={{userID, userName}} style={'border text-white h-fit rounded-full py-2 px-5 font-semibold'} />
                        }
                    </div>
                    <div className='px-3 pt-1 pb-3'>
                        <h1 className='text-xl font-bold'>{name}</h1>
                        <h2 className='text-gray-500'>@{userID}</h2>
                        <div className='flex gap-3'>
                            <h3>{followers.length} <span className='text-gray-500'>Followers</span> </h3>
                            <h3>{following.length} <span className='text-gray-500'>Following</span></h3>
                        </div>
                    </div></> :
                <>            <div className='w-full h-[200px] over bg-slate-600' ></div>
                    <div className='flex p-4 items-center justify-between'>
                        <div  alt="" className='-mt-20 rounded-full h-[150px] border w-[150px] bg-gray-600 '></div>
                       
                    </div>
                    <div className='px-3 pt-1 pb-3'>
                        <h2 className='text-white text-xl'>@{userID}</h2>
                    </div> </>}

        </div>
    )
}

export default UserInfo