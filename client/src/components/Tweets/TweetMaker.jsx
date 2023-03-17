import React, { useRef, useState } from 'react'
import { createTweet } from '../../../api/mutations/createTweet'
import {authStore} from '../../state/auth'

const TweetMaker = () => {
    const {credentials : {userName} } = authStore(state => state.auth)
    const [tweet, setTweet] = useState('')
    const tweetContent = useRef(null)
    const [tweetLng, setTweetLng] = useState(0)
    const [rows, setRows] = useState(2)
    const handleChange = (e) => {
        if (tweet.length >= 100) setRows(4)
        if (tweet.length <= 100) setRows(2)
        setTweetLng(e.target.value.length)
        setTweet(e.target.value)
    }
    return (
        <div className='border-gray-700 border py-3 h-auto px-4 flex items-center gap-3' >
            <img className='w-16 rounded-full h-auto' src="https://placeimg.com/200/200/any" alt="" />
            <form onSubmit={async(e) => {
                e.preventDefault()
                if(tweet.length > 200) {
                    return alert('The tweet should be no more than 200 characters')
                }
             const res = await  createTweet({date: `${Date.now()}`, content: tweet, maker: userName})
                if(res) {
                    setTweet('')
                    setTweetLng(0)

                }

                
            }} placeholder="What's happening?" className=' overflow-visible flex flex-col gap-2 w-full h-auto resize-none outline-none bg-black text-white ' >
                <textarea rows={rows} onChange={handleChange} placeholder="What's happening?" value={tweet} name='tweet-content' ref={tweetContent} className='outline-none overflow-hidden border-none bg-black max-w-[59ch]  text-white' />
                <div className='items-center flex justify-end gap-4'>
                    <span>{tweetLng}/200</span>
                    <button className='bg-blue-500 px-6 py-2 rounded-full text-xl'>Tweet</button>
                </div>

            </form>

        </div>
    )
}

export default TweetMaker