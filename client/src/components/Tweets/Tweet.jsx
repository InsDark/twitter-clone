import React, { useEffect, useState } from 'react'
import moment from 'moment'
import BookmarkBtn from '../Buttons/BookmarkBtn'
import { authStore } from '../../state/auth'
import LikeBtn from '../Buttons/LikeBtn'
import { Link } from 'react-router-dom'
import { profileStore } from '../../state/profileInfo'
const Tweet = ({ content: { content, date, maker, likes, _id, bookmarks } }) => {
    const { credentials: { userName } } = authStore(state => state.auth)
    const {userInfo} = profileStore(state => state)
    
    return (
        <div className="flex flex-col border-b border-gray-600 gap-2 p-4">
            <div className=' flex gap-4 items-center pb-2 p-3'>
                <img src={ userInfo.profilePicture || `https://api.dicebear.com/6.x/bottts/svg?seed=${maker}`} className='w-10 h-auto rounded-full' alt="" />
                <Link to={`/${maker}`} className='font-bold hover:underline text-xl'>{maker}</Link> | <span className='text-gray-400'>{moment(parseInt(date)).fromNow()}</span>
            </div>
            <p className='px-3'>{content}</p>
            <div className=' flex justify-around'>
                <LikeBtn info={[likes, userName, _id]} />
                <BookmarkBtn info={[userName, _id, bookmarks]} />
            </div>
        </div>
    )
}

export default Tweet