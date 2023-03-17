import React from 'react'
import { Link } from 'react-router-dom'
import {authStore} from '../state/auth'
import {FaHome, FaBookmark, FaUser, FaTwitter, FaEllipsisH, FaHashtag} from 'react-icons/fa'
import userDataStore from '../state/userData'
const UserBar = () => {
    const {auth : {credentials : {userName}}} = authStore(state => state)
    const {name} = userDataStore(state => state)
    return (
        <section className='flex text-2xl flex-col text-center h-screen sticky top-0   justify-around mx-auto '>
            <Link to='/home' className='py-2 px-5'><FaTwitter /></Link>
            <Link to='/home' className=' hover:bg-gray-800 w-fit py-2 px-5 rounded-full flex items-center gap-4'><FaHome />Home</Link>
            <Link to='/bookmarks' className=' hover:bg-gray-800 py-2 px-5 w-fit rounded-full flex items-center gap-4'><FaBookmark />Bookmars</Link>
            <Link to={`/${userName}`} className=' hover:bg-gray-800 py-2 px-5 w-fit rounded-full flex items-center gap-4'><FaUser />Profile</Link>
            <button className='bg-blue-500 rounded-full text-xl p-2'>Tweet</button>
            <div className='flex gap-3 hover:bg-gray-900 cursor-pointer rounded-full min-w-fit  items-center p-2'>
                <img className='w-12 h-12 rounded-full' src="https://placeimg.com/200/200/animals" alt="" />
                <div className='w-fit'>
                    <p className='text-base'> {name}</p>
                    <p className='text-base text-gray-500'>@{userName}</p>
                </div>
                <FaEllipsisH className=''/>
            </div>
        </section>
    )
}

export default UserBar