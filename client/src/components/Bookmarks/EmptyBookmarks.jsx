import React from 'react'

const EmptyBookmarks = () => {
    return (
        <section className='p-2 text-center flex flex-col gap-2'>
            <img className='m-auto w-2/4 h-auto' src="https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png" alt="bookmarked" />
            <h1 className='text-2xl font-bold'>Save Tweets for later</h1>
            <p className='text-gray-500 w-[60%] m-auto'>Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.</p>
        </section>
    )
}

export default EmptyBookmarks