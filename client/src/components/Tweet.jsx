import React, { useEffect, useState } from 'react'
import moment from 'moment'
import BookmarkBtn from '../components/Buttons/BookmarkBtn'
import {authStore} from '../state/auth'
import LikeBtn from './Buttons/LikeBtn'
import { Link } from 'react-router-dom'
const Tweet = ({ content : {content, date, maker, likes, _id, bookmarks} }) => {
    const {credentials : {userName}} = authStore(state => state.auth)
    return (
        <div  className="flex flex-col m-2 bg-slate-900  gap-2">
            <div className='border-b border-gray-500 pb-2 p-3'><Link to={`/${maker}` } className='font-bold  text-xl'>@{maker}</Link> | <span>{moment(parseInt(date)).fromNow()}</span></div>
            <p className='px-3'>{content}</p>
            <div className='bg-slate-700 p-2 flex justify-around'>
                <LikeBtn info={[likes, userName, _id]}/>
                <BookmarkBtn info={[userName, _id, bookmarks]}/>
            </div>
        </div>
    )
}

export default Tweet