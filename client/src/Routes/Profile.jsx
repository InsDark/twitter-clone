import React, { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import SideBar from '../components/SideBar'
import UserBar from '../components/UserBar'
import UserInfo from '../components/UserInfo'
import UserTweets from '../components/Tweets/UserTweets'
const Profile = () => {
    const {userID} = useParams()
    const navigate = useNavigate()
    return (
        <main className='card bg-black text-white min-h-screen'>
            <UserBar />
            <section className='border border-gray-700 w-full'>
                <div className='flex bg-black items-center gap-10 px-5 py-1 sticky top-0'>
                    <FaArrowLeft className='cursor-pointer' onClick={() => {
                        navigate('/home')
                    }} />
                    <div>
                        <h2 className='font-bold text-xl max-h-fit'>{userID}</h2>
                        <h2 className='text-gray-500 max-h-fit text-sm'>0 Tweets</h2>
                    </div>
                </div>
                <UserInfo />
                <hr className='border-gray-700' />
                <UserTweets userName={userID} />
            </section>
            <SideBar />
        </main>
    )
}

export default Profile