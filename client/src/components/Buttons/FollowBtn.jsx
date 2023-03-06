import React from 'react'
import userDataStore from '../../state/userData'

const FollowBtn = ({ followTo, style = 'bg-white text-black h-fit rounded-full py-2 px-5 font-semibold' }) => {
    const {following, updateFollowing} =  userDataStore(state => state)
    const follow = async () => {

        const req = await fetch('')
        updateFollowing(followTo)

    }
    return (
        <button onClick={follow} className={style}>Follow</button>
    )
}

export default FollowBtn


//bg-white text-black h-fit rounded-full py-2 px-5 font-semibold