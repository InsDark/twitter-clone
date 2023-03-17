import React, { useEffect, useState } from 'react'
import { getBookmarkedTweets } from '../../../api/queries/getBookmarkedTweets'
import { authStore } from '../../state/auth'
import Tweet from '../Tweets/Tweet'
const TweetsBookmarked = () => {
  const { credentials: { userName } } = authStore(state => state.auth)
  const [bookmarkedTweets, setBookmarkedTweets] = useState([])
  useEffect(() => {
    (async () => {
      const { data: { getBookmarkedTweets: Tweets } } = await getBookmarkedTweets(userName)
      setBookmarkedTweets(Tweets)
    })()
  }, [])
  return (
    <div>{bookmarkedTweets.length == 0 ?
      <section className='p-2 text-center flex flex-col gap-2'>
        <img className='m-auto w-2/4 h-auto' src="https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png" alt="bookmarked" />
        <h1 className='text-2xl font-bold'>Save Tweets for later</h1>
        <p className='text-gray-500 w-[60%] m-auto'>Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.</p>
      </section>
      : bookmarkedTweets.map((tweet) => <Tweet content={tweet} key={tweet._id} />)}</div>
  )
}

export default TweetsBookmarked