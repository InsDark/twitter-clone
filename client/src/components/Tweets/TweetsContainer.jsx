import React, { useEffect, useState } from 'react'
import { getTweets } from '../../../api/queries/getTweets'
import { authStore } from '../../state/auth'
import Tweet from './Tweet'
const TweetsContainer = () => {
  const [tweets, setTweets] = useState([])
  useEffect(() => {
    (async () => {
      const tweets = await getTweets(userName)
      const { data } = tweets
      setTweets(data.getTweets)

    })()
  }, [])
  const { credentials: { userName } } = authStore(state => state.auth)
  return (
    <div className=' flex flex-col gap-3'>{tweets.length > 0 ? tweets.map((tweet) => <Tweet key={tweet._id} content={tweet}/> 
  ) : "bruh no tweets"}</div>
  )
}

export default TweetsContainer