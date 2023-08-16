import React, { useEffect, useState } from 'react'
import { getBookmarkedTweets } from '../../../api/queries/getBookmarkedTweets'
import { authStore } from '../../state/auth'
import Tweet from '../Tweets/Tweet'
import EmptyBookmarks from '../Bookmarks/EmptyBookmarks'
import Loader from '../Loader'

const TweetsBookmarked = () => {
  const { credentials: { userName } } = authStore(state => state.auth)
  const [bookmarkedTweets, setBookmarkedTweets] = useState([])
  const [loading, setLoading] =  useState(true)
  useEffect(() => {
    (async () => {
      const { data: { getBookmarkedTweets: Tweets } } = await getBookmarkedTweets(userName)
      setBookmarkedTweets(Tweets)
      setLoading(false)
    })()
  }, [])
  return (
    loading ? <Loader/> : 
    <div>{bookmarkedTweets.length == 0 ?
      <EmptyBookmarks/>
      : bookmarkedTweets.map((tweet) => <Tweet content={tweet} key={tweet._id} />)}</div>
  )
}

export default TweetsBookmarked