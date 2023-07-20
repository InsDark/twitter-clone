import React, { useEffect, useState } from 'react'
import {FaBookmark} from 'react-icons/fa'
import {bookmarkTweet} from '../../../api/mutations/bookmarkTweet'
const BookmarkBtn = ({info: [userName, _id, bookmarks]}) => {
    if(!bookmarks) bookmarks = []
    const [isBookmarked, setIsBookmarked] = useState(false)
    const getIsBookmarked = (liker) => {
        return liker == userName
    }  
    useEffect( () => {
        const res = bookmarks.find( getIsBookmarked)
        if(!res) return 
        setIsBookmarked(true)
    }, [])
    const bookmark = async () => {
        if(isBookmarked) {
            const i = bookmarks.indexOf(userName)
            bookmarks.splice(i, 1)
            bookmarkTweet({type: 'disbookmark', userName, _id})
            return setIsBookmarked(false)
        }
        setIsBookmarked(true)
        bookmarks.push(userName)
        bookmarkTweet({type: 'bookmark', userName, _id})
    }
  return (
    <button onClick={bookmark} className={`hover:text-green-600 flex items-center gap-2 ${isBookmarked && "text-green-600" }`}><FaBookmark />{bookmarks.length}</button>
  )
}

export default BookmarkBtn