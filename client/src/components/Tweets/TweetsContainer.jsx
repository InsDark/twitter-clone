import React, { useEffect, useState } from 'react'
import { getTweets } from '../../../api/queries/getTweets'
import { authStore } from '../../state/auth'
import Loader from './../Loader'
import Tweet from './Tweet'
const TweetsContainer = () => {
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    (async () => {
      const tweets = await getTweets(userName)
      const { data } = tweets
      setTweets(data.getTweets)
      setLoading(false)
    })()
  }, [])
  const { credentials: { userName } } = authStore(state => state.auth)
  return (
    <div className=' flex flex-col gap-3'>

      {
        loading ? <Loader /> :
          tweets.length > 0 ? tweets.map((tweet) => <Tweet key={tweet._id} content={tweet} />
          ) :
            <div className='flex flex-col m-auto gap-2 p-3'>
              <h2 className='font-bold text-3xl'>Welcome to Twitter!</h2>
              <p className='w-[18rem] text-gray-500'>
                This is the best place to see what's happening in your world. 
                It seems you're the first one, let's make a new tweets!!!.
              </p>
            </div>
      }

    </div>
  )
}

export default TweetsContainer