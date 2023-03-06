import React, { useRef, useState } from 'react'

const TweetMaker = () => {
    const [editing, setEditing] = useState(false)
    const [tweet, setTweet] = useState('')
    const handleFocus = (e) => {
        setEditing(true)
    }
    const handleChange = (e) => {
        setTweet(e.target.textContent)
    }
  return (
    <div className='border-gray-700 border py-3 h-auto px-4 flex items-center gap-3' >
        <img className='w-16 rounded-full h-auto' src="https://placeimg.com/200/200/any" alt="" />
        <div  placeholder="What's happening?"  className=' overflow-visible w-full resize-none outline-none bg-black text-white ' >
            <div className='text-gray-500' onClick={handleFocus}>{editing ? "" : "What's happening?"}</div>
            {editing  ? <div onKeyUp={handleChange}  contentEditable='true' className='outline-none'>{tweet}</div>: null }
            
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default TweetMaker