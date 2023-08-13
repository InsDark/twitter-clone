import React, { useEffect, useState } from 'react'
import { followTo } from '../../../api/mutations/followTo'
import { profileStore } from '../../state/profileInfo'
import {authStore} from '../../state/auth'

const FollowBtn = ({ userID, style = 'bg-white text-black h-fit rounded-full py-2 px-5 fonXt-semibold' }) => {
    const auth = authStore(state => state.auth)
    const {credentials : {token, userName}} = auth
    const [isFollowed, setisFollowed] = useState(false)
    const {userInfo : {followers}, setFollowers} = profileStore(state => state)
    useEffect(() => {
        const res = followers.indexOf(userName)
        if(res >= 0) {
            setisFollowed(true)
        }
    }, [followers])
    const follow = async () => {
        if(isFollowed) {
            await followTo({from: userName, userToFollow: userID, type: 'unfollow', token})
            const newFollowers = followers.filter(follower => follower !== userName)
            setFollowers(newFollowers)
            setisFollowed(false)
            return
        }
        await followTo({from: userName, userToFollow: userID, type:  'follow', token})
        const newFollowers = followers
        newFollowers.push(userName)
        setFollowers(newFollowers)
        setisFollowed(true)
    }
    return (
        <button onClick={follow} className={style}>{isFollowed ? "Unfollow" : "Follow"}</button>
    )
}

export default FollowBtn


