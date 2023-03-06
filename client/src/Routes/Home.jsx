import React from 'react'
import SideBar from '../components/SideBar'
import TweetMaker from '../components/TweetMaker'

import UserBar from '../components/UserBar'
const Home = () => {
    return (
        <main className='card bg-black text-white min-h-screen'>
            <UserBar/>
            <section className='border border-gray-700 w-full '>
                <h2 className='text-2xl font-bold'>Home</h2>
                <TweetMaker/>
            </section>
            <SideBar/> 
        </main>
    )
}

export default Home