import React from 'react'
import SideBar from '../components/SideBar'
import TweetsBookmarked from '../components/Tweets/TweetsBookmarked'
import UserBar from '../components/UserBar'
const Bookmarks = () => {
  return (
    <main className='card bg-black text-white min-h-screen'>
      <UserBar/>
      <section className='border-l border-r border-gray-600'>
          <h1 className='p-3 text-xl border-b font-bold border-gray-600'>Bookmarks</h1>
          <TweetsBookmarked/>
      </section>
      <SideBar/>
    </main>
  )
}

export default Bookmarks