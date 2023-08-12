import React, { useRef, useState } from 'react'
import { createTweet } from '../../../api/mutations/createTweet'
import { authStore } from '../../state/auth'
import { toastStore } from '../../state/toast'
const TweetMaker = () => {
    const { credentials } = authStore(state => state.auth)
    const {userName, token} = credentials
    const [tweet, setTweet] = useState('')
    const tweetContent = useRef(null)
    const [tweetLng, setTweetLng] = useState(0)
    const [rows, setRows] = useState(2)
    const toast = toastStore(state => state.toast)
    const handleChange = (e) => {
        if (tweet.length >= 60) setRows(2)
        if (tweet.length >= 120) setRows(3)
        if (tweet.length >= 160) setRows(4)
        setTweetLng(e.target.value.length)
        setTweet(e.target.value)
    }
    return (
        <div className='border-gray-700 border-t border-b py-4 h-auto px-5  ' >
            <form onSubmit={async (e) => {
                e.preventDefault()
                if(!tweet) return toast.error('The tweet is not longer enough')
                if (tweet.length > 200 ) {
                    return alert('The tweet should be no more than 200 characters')
                }
                const res = await createTweet({tweetInput: { date: `${Date.now()}`, content: tweet, maker: userName}, token})
                if (res) {
                    setTweet('')
                    setTweetLng(0)
                    toast.success('Twitter released!!');
                    e.target.reset()
                }


            }} className=' flex flex-col gap-2 w-full resize-none outline-none bg-black text-white ' >
                <div className='flex gap-4'>
                    
                    <img src={`https://api.dicebear.com/6.x/bottts/svg?seed=${userName}&backgroundColor=000000`} className='w-11 h-9' alt={`${userName}-profile-picture`} />
                    <textarea cols={10} rows={rows} onChange={(e) => handleChange(e)} placeholder="What's happening?"name='tweet-content' ref={tweetContent} className='outline-none  border-none bg-black max-w-[10] text-xl w-full  text-white' />
                </div>
                <div className='items-center flex justify-end gap-4'>
                    <span>{tweetLng}/200</span>
                    <button className='bg-blue-500 px-6 py-2 rounded-full text-xl'>Tweet</button>
                </div>

            </form>
            
        </div>
    )
}

export default TweetMaker