import React, { useEffect } from 'react'
import {profileStore} from '../state/profileInfo'

const UserTweets = () => {
  const {tweets} = profileStore(state => state)
  return (
    <div>
      {tweets.length == 0 ? <h2 className="text-center text-2xl p-2">This user has no tweets</h2> : 'THis'}
    </div>
  )
}

export default UserTweets
