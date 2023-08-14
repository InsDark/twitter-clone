import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaBookmark, FaUser, FaTwitter, FaEllipsisH, FaPlus } from 'react-icons/fa'
const UserBar = () => {
    const {userName, name}  = JSON.parse( localStorage.getItem('credentials'))
    return (
        <section className='flex text-2xl flex-col text-center h-screen sticky top-0 justify-around mx-auto '>

            <span className='py-2 px-5'><FaTwitter /></span>

            <Link to='/home' className=' hover:bg-gray-800 w-fit py-2 px-5 rounded-full flex items-center gap-4'>
                <FaHome />
                <span className='hidden md:flex'>Home</span>
            </Link>

            <Link to='/bookmarks' className=' hover:bg-gray-800 py-2 px-5 w-fit rounded-full flex items-center gap-4'><FaBookmark />                <span className='hidden md:flex'>Bookmarks</span>
            </Link>
            <Link to={`/${userName}`} className='  hover:bg-gray-800 py-2 px-5 w-fit rounded-full flex items-center gap-4'>
                <FaUser />                
                <span className='hidden md:flex'>Profile</span>
            </Link>
            <button className='bg-blue-500 justify-center flex rounded-full text-xl p-2'><span className='hidden md:block'>Tweet</span><span className='md:hidden'><FaPlus/></span></button>
            <div className='flex gap-3 hover:bg-gray-900 cursor-pointer rounded-full min-w-fit  items-center p-2'>
                <img className=' w-10 h-15 ' src={`https://api.dicebear.com/6.x/bottts/svg?seed=${userName}`} alt={`${userName}-profile-picture`} />
                <div className='w-fit hidden md:block'>
                    <p className='text-base'> {name}</p>
                    <p className='text-base text-gray-500'>@{userName}</p>
                </div>
                <FaEllipsisH className='hidden md:block' />
            </div>
        </section>
    )
}

export default UserBar