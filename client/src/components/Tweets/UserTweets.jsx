import React, { useEffect, useState } from 'react'
import { profileStore } from '../../state/profileInfo'
import Tweet from './Tweet'
import { getUserTweets } from '../../../api/queries/getUserTweets'
import Loader from './../Loader'
const UserTweets = ({ userName }) => {
  const { tweets, setTweets, userExists } = profileStore(state => state)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const userTweets = await getUserTweets({ userName })
      setTweets(userTweets)
      setLoading(false)
    })()
  }, [userName])

  return (
    <div className='flex flex-col gap-3 p-4'>
      {
        loading ? <Loader/> : 
        userExists ? <>{tweets.length == 0 ? <h2 className="text-center font-bold text-2xl p-4">This user has no tweets</h2> : tweets.map(tweet => <Tweet key={tweet._id} content={tweet} />)}</> : <>
          <h2 className="text-center p-4 text-white font-bold text-4xl">This user don't exist</h2>
          <p className='text-center text-gray-500 font-bold text-xl'>Try searching for another</p>
        </>
      }
    </div>
  )
}

export default UserTweets
