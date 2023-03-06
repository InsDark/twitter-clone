import React, { useEffect } from 'react'
import { profileStore } from '../state/profileInfo'
const UserTweets = ({ userName }) => {
  const { tweets, setTweets, userExists } = profileStore(state => state)
  useEffect(() => {
    const getUserTweets = async () => {
      const req = await fetch(`http://localhost:8000/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
          query {
            userTweets (userName: "${userName}") {
              content
            }
          }`
        })
      })
      const { data: { userTweets } } = await req.json()
      setTweets(userTweets)
    }
    getUserTweets()
  }, [])
  return (
    <div>
      {userExists ? <>{tweets.length == 0 ? <h2 className="text-center font-bold text-2xl p-4">This user has no tweets</h2> : 'THis'}</> : <>
        <h2 className="text-center p-4 text-white font-bold text-4xl">This user don't exist</h2>
        <p className='text-center text-gray-500 font-bold text-xl'>Try searching for another</p>

      </>}

    </div>
  )
}

export default UserTweets
