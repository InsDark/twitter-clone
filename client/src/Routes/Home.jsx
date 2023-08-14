import React from 'react'
import SideBar from '../components/SideBar'
import TweetMaker from '../components/Tweets/TweetMaker'
import UserBar from '../components/UserBar'
import TweetsContainer from '../components/Tweets/TweetsContainer'
import {  toast } from 'react-toastify'
import { toastStore } from '../state/toast'

const Home = () => {
    const setToast = toastStore(state => state.setToast)
    setToast(toast)
    
    return (
        <main className='md:card mobile bg-black text-white min-h-screen'>
            <UserBar />
            <section className='border max-w-screen  border-gray-700  '>
                <h2 className='p-3 text-2xl font-bold'>Home</h2>
                <TweetMaker />
                <TweetsContainer />
            </section>
            <SideBar />
        </main>
    )
}

export default Home