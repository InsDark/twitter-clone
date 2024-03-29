import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import {likeTweet} from '../../../api/mutations/likeTweet'
import {authStore} from '../../state/auth'
const LikeBtn = ({info : [likes, userName, _id]}) => {
    const [isLiked, setIsLiked] = useState(false)
    const auth = authStore(state => state.auth)
    const {credentials : {token}} = auth
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
            likeTweet({type: 'dislike', userName, _id, token})
            return setIsLiked(false)
        }
        setIsLiked(true)
        likes.push(userName)
        likeTweet({type: 'like', userName, _id, token})
    }
  return (
<button onClick={handleLike} className={`hover:text-red-600 flex items-center gap-2 ${isLiked ? 'text-red-600' : ""}`}><FaHeart />{likes.length}</button>
  )
}

export default LikeBtn