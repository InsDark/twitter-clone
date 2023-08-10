import React, { useEffect } from 'react'
import { getUserData } from '../../api/queries/getUserData'
import SideBar from '../components/SideBar'
import TweetMaker from '../components/Tweets/TweetMaker'
import { authStore } from '../state/auth'
import UserBar from '../components/UserBar'
import userDataStore from '../state/userData'
import TweetsContainer from '../components/Tweets/TweetsContainer'
import { ToastContainer, toast } from 'react-toastify'
import { toastStore } from '../state/toast'

const Home = () => {
    const { credentials: { userName } } = authStore(state => state.auth)
    const { setName } = userDataStore(state => state)
    const setToast = toastStore(state => state.setToast)
    setToast(toast)
    useEffect(() => {
        (async () => {
            document.title = 'Home / Twitter'
            const res = await getUserData(userName)
            const { data: { user: { name } } } = res
            setName(name)
        })()
    }, [])
    return (
        <main className='md:card mobile overflow-hidden bg-black text-white min-h-screen'>
            <UserBar />
            <section className='border max-w-screen  border-gray-700  '>
                <h2 className='text-2xl font-bold'>Home</h2>
                <TweetMaker />
                <TweetsContainer />
            </section>
            <SideBar />
        </main>
    )
}

export default Home