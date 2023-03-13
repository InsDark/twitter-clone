import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import {likeTweet} from '../../../api/mutations/likeTweet'
const LikeBtn = ({info : [likes, userName, _id]}) => {
    const [isLiked, setIsLiked] = useState(false)
    useEffect( () => {
        const res = likes.find( getIsLiked)
        if(!res) return 
        setIsLiked(true)
    }, [])
    const getIsLiked = (liker) => {
        return liker == userName
    }  
    const handleLike = () => {
        if(isLiked) {
            const i = likes.indexOf(userName)
            likes.splice(i, 1)
            likeTweet({type: 'dislike', userName, _id})
            return setIsLiked(false)
        }
        setIsLiked(true)
        likes.push(userName)
        likeTweet({type: 'like', userName, _id})
    }
  return (
<button onClick={handleLike} className={`flex items-center gap-2 ${isLiked ? 'text-red-600' : ""}`}><FaHeart />{likes.length}</button>
  )
}

export default LikeBtn