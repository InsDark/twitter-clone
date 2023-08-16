import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import UserInfo from '../UserInfo'
import UserTweets from '../Tweets/UserTweets'
import { useNavigate } from 'react-router-dom'
import { profileStore } from '../../state/profileInfo'
const UserProfile = ({ userID }) => {
    const navigate = useNavigate()
    const { userExists } = profileStore(state => state)
    return (
        <section className='border border-gray-700 w-full'>
            <div className='flex bg-black items-center gap-10 px-5 py-1 sticky top-0'>
                <FaArrowLeft className='cursor-pointer' onClick={() => {
                    navigate('/home')
                }} />
                {userExists ?
                    <div>
                        <h2 className='font-bold text-xl max-h-fit'>{userID}</h2>
                        <h2 className='text-gray-500 max-h-fit text-sm'>0 Tweets</h2>
                    </div> :
                        <h2 className='font-bold text-xl max-h-fit p-2'>Profile</h2>
                    }
            </div>
            <UserInfo />
            <hr className='border-gray-700' />
            <UserTweets userName={userID} />
        </section>
    )
}

export default UserProfile